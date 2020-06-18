import { Disposable, implDisposable } from './disposable';
import { removeOnce, asyncReportError } from './utils';
import { EventType, Event, Push, Throw, End, Source, Sink } from './source';
import {
    setPrototypeOf,
    NativeErrorWrapped,
    createSuper,
    joinErrors,
} from './errorBase';
import isFunction = require('lodash.isfunction');

export interface Subject<T> extends Source<T>, Sink<T> {}

interface SinkInfo<T> {
    sink: Sink<T>;
    didRemove: boolean;
    notAdded: boolean;
}

interface SubjectBasePrivateActiveState<T> {
    sinkInfos: SinkInfo<T>[];
    sinksToAdd: SinkInfo<T>[];
    eventsQueue: Event<T>[];
}

export function Subject<T>(): Subject<T> {
    let distributingEvent = false;
    let sinkIndex: number;
    let state: SubjectBasePrivateActiveState<T> | null = {
        sinkInfos: [],
        sinksToAdd: [],
        eventsQueue: [],
    };

    function nullifyState(): void {
        if (state) {
            const { sinkInfos, sinksToAdd, eventsQueue } = state;
            sinkInfos.length = 0;
            sinksToAdd.length = 0;
            eventsQueue.length = 0;
            state = null;
        }
    }

    const disposable = Disposable(() => {
        if (state && !distributingEvent) {
            nullifyState();
        }
    });

    const subject = implDisposable((eventOrSink: Event<T> | Sink<T>): void => {
        if (!state || !disposable.active) {
            return;
        }

        const { sinkInfos, sinksToAdd, eventsQueue } = state;

        if (isFunction(eventOrSink)) {
            if (!eventOrSink.active) {
                return;
            }

            const addedInDistribution = distributingEvent;
            const sinkInfo: SinkInfo<T> = {
                sink: eventOrSink,
                didRemove: false,
                notAdded: addedInDistribution,
            };

            const sinkList = addedInDistribution ? sinksToAdd : sinkInfos;
            sinkList.push(sinkInfo);

            eventOrSink?.add(
                Disposable(() => {
                    if (!state || !disposable.active || sinkInfo.didRemove) {
                        return;
                    }

                    sinkInfo.didRemove = true;

                    if (addedInDistribution && sinkInfo.notAdded) {
                        // The sink was added during the loop below, which is
                        // still running.
                        removeOnce(sinksToAdd, sinkInfo);
                        return;
                    }

                    if (distributingEvent) {
                        // We are in the loop below.
                        if (sinkInfos[sinkIndex] === sinkInfo) {
                            return;
                        }
                        const index = sinkInfos.indexOf(sinkInfo);
                        if (index < sinkIndex) {
                            sinkIndex--;
                        }
                        sinkInfos.splice(index, 1);
                        return;
                    }

                    // Nothing is happening in relation to this subject.
                    removeOnce(sinkInfos, sinkInfo);
                }),
            );
        } else if (sinkInfos.length > 0) {
            if (eventOrSink.type !== EventType.Push) {
                disposable.dispose();
            }

            if (distributingEvent) {
                eventsQueue.push(eventOrSink);
                return;
            }

            let event: Event<T> | undefined = eventOrSink;

            const errors: unknown[] = [];

            distributingEvent = true;
            while (event) {
                for (sinkIndex = 0; sinkIndex < sinkInfos.length; sinkIndex++) {
                    const sinkInfo = sinkInfos[sinkIndex];
                    const { sink } = sinkInfo;

                    let active = false;
                    try {
                        active = sink.active;
                    } catch (error) {
                        errors.push(error);
                    }

                    if (!active) {
                        // Only remove if the current event is a Push event as
                        // if the current event is a Throw or End event then
                        // there is no point in removing it now as it will be
                        // removed at the end of the loop.
                        if (event.type === EventType.Push) {
                            sinkInfos.splice(sinkIndex--, 1);
                        }
                        continue;
                    }

                    try {
                        sink(event);
                    } catch (error) {
                        asyncReportError(error);
                        sinkInfo.didRemove = true;
                    }

                    // Remove if it errored or was marked for removal during
                    // it's execution.
                    if (sinkInfo.didRemove && event.type === EventType.Push) {
                        sinkInfos.splice(sinkIndex--, 1);
                    }
                }

                if (event.type !== EventType.Push) {
                    break;
                }

                for (let i = 0; i < sinksToAdd.length; i++) {
                    const sinkToAdd = sinksToAdd[i];
                    sinkToAdd.notAdded = false;
                }
                sinksToAdd.length = 0;

                event = eventsQueue.shift();
            }
            distributingEvent = false;

            if (
                // Cannot throw.
                !disposable.active
            ) {
                nullifyState();
            }

            if (errors.length > 0) {
                throw new SubjectDistributionSinkDisposalError(errors);
            }
        }
    }, disposable);

    return subject;
}

interface _SubjectDistributionSinkDisposalError extends Error {
    errors: unknown[];
}

export interface SubjectDistributionSinkDisposalError
    extends _SubjectDistributionSinkDisposalError {
    /**
     * The flattened list of errors thrown during disposable.
     */
    readonly errors: unknown[];
}

export interface SubjectDistributionSinkDisposalErrorConstructor
    extends Omit<ErrorConstructor, 'prototype'> {
    new (errors: unknown[]): SubjectDistributionSinkDisposalError;
    prototype: SubjectDistributionSinkDisposalError;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const SubjectDistributionSinkDisposalErrorSuper = createSuper(
    _SubjectDistributionSinkDisposalError,
);

function _SubjectDistributionSinkDisposalError(
    this: _SubjectDistributionSinkDisposalError,
    errors: unknown[],
) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, max-len
    const instance: _SubjectDistributionSinkDisposalError = SubjectDistributionSinkDisposalErrorSuper.apply(
        this,
    );

    instance.message = `${errors.length} error${
        errors.length === 1 ? ' was' : 's were'
    } caught while distributing an event through a subject.${joinErrors(
        errors,
    )}`;

    instance.name = 'SubjectDistributionSinkDisposalError';
    instance.errors = errors;

    return instance;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
_SubjectDistributionSinkDisposalError.prototype = Object.create(
    NativeErrorWrapped.prototype,
    {
        constructor: {
            value: _SubjectDistributionSinkDisposalError,
            writable: true,
            configurable: true,
        },
    },
);

setPrototypeOf(_SubjectDistributionSinkDisposalError, NativeErrorWrapped);

/**
 * Thrown when at least one error is caught during a the distribution of an
 * by a subject.
 */
// eslint-disable-next-line max-len
export const SubjectDistributionSinkDisposalError: SubjectDistributionSinkDisposalErrorConstructor = (_SubjectDistributionSinkDisposalError as unknown) as SubjectDistributionSinkDisposalErrorConstructor;

/** @todo align with queueing behaviour */
export function KeepFinalEventSubject<T>(): Subject<T> {
    const base = Subject<T>();
    let finalEvent: Throw | End | undefined;

    return implDisposable((eventOrSink: Event<T> | Sink<T>): void => {
        if (isFunction(eventOrSink)) {
            if (finalEvent) {
                eventOrSink(finalEvent);
            } else {
                base(eventOrSink);
            }
        } else {
            if (!base.active) {
                return;
            }

            if (eventOrSink.type !== EventType.Push) {
                finalEvent = eventOrSink;
            }

            base(eventOrSink);
        }
    }, base);
}

/** @todo align with queuing behaviour */
export function LastValueSubject<T>(): Subject<T> {
    const base = Subject<T>();
    let lastPushEvent: Push<T> | undefined;
    let finalEvent: Throw | End | undefined;

    return implDisposable((eventOrSink: Event<T> | Sink<T>) => {
        if (isFunction(eventOrSink)) {
            if (finalEvent) {
                if (lastPushEvent && !base.active) {
                    eventOrSink(lastPushEvent);
                }
                eventOrSink(finalEvent);
            } else {
                base(eventOrSink);
            }
        } else {
            if (!base.active) {
                return;
            }

            if (eventOrSink.type === EventType.Push) {
                lastPushEvent = eventOrSink;
            } else {
                finalEvent = eventOrSink;
                if (finalEvent.type === EventType.End && lastPushEvent) {
                    base(lastPushEvent);
                } else {
                    lastPushEvent = undefined;
                }
                base(finalEvent);
            }
        }
    }, base);
}
