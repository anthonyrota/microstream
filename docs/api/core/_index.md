---
title: API Reference - Basics
table_of_contents:
  - text: Disposable
    url_hash_text: disposable
    inline_references:
      - text: Function
        url_hash_text: disposable-function
      - text: Interface
        url_hash_text: disposable-interface
    nested_references:
      - text: isDisposable
        url_hash_text: isdisposable
      - text: DisposalError
        url_hash_text: disposalerror
        inline_references:
          - text: Interface
            url_hash_text: disposalerror-interface
          - text: Variable
            url_hash_text: disposalerror-variable
      - text: DisposalErrorConstructor
        url_hash_text: disposalerrorconstructor
      - text: DISPOSED
        url_hash_text: disposed
      - text: implDisposableMethods
        url_hash_text: impldisposablemethods
  - text: Event
    url_hash_text: event
    nested_references:
      - text: EventType
        url_hash_text: eventtype
      - text: Push
        url_hash_text: push
        inline_references:
          - text: Function
            url_hash_text: push-function
          - text: Interface
            url_hash_text: push-interface
      - text: PushType
        url_hash_text: pushtype
        inline_references:
          - text: Type Alias
            url_hash_text: pushtype-typealias
          - text: Variable
            url_hash_text: pushtype-variable
      - text: Throw
        url_hash_text: throw
        inline_references:
          - text: Function
            url_hash_text: throw-function
          - text: Interface
            url_hash_text: throw-interface
      - text: ThrowType
        url_hash_text: throwtype
        inline_references:
          - text: Type Alias
            url_hash_text: throwtype-typealias
          - text: Variable
            url_hash_text: throwtype-variable
      - text: End
        url_hash_text: end
        inline_references:
          - text: Interface
            url_hash_text: end-interface
          - text: Variable
            url_hash_text: end-variable
      - text: EndType
        url_hash_text: endtype
        inline_references:
          - text: Type Alias
            url_hash_text: endtype-typealias
          - text: Variable
            url_hash_text: endtype-variable
  - text: Sink
    url_hash_text: sink
    inline_references:
      - text: Function
        url_hash_text: sink-function
      - text: Interface
        url_hash_text: sink-interface
    nested_references:
      - text: isSink
        url_hash_text: issink
  - text: Source
    url_hash_text: source
    inline_references:
      - text: Function
        url_hash_text: source-function
      - text: Interface
        url_hash_text: source-interface
    nested_references:
      - text: isSource
        url_hash_text: issource
      - text: subscribe
        url_hash_text: subscribe
  - text: Operator
    url_hash_text: operator
    nested_references:
      - text: IdentityOperator
        url_hash_text: identityoperator
      - text: pipe
        url_hash_text: pipe
      - text: flow
        url_hash_text: flow
  - text: Subject
    url_hash_text: subject
    inline_references:
      - text: Function
        url_hash_text: subject-function
      - text: Interface
        url_hash_text: subject-interface
    nested_references:
      - text: isSubject
        url_hash_text: issubject
      - text: SubjectDistributionSinkDisposalError
        url_hash_text: subjectdistributionsinkdisposalerror
        inline_references:
          - text: Interface
            url_hash_text: subjectdistributionsinkdisposalerror-interface
          - text: Variable
            url_hash_text: subjectdistributionsinkdisposalerror-variable
      - text: SubjectDistributionSinkDisposalErrorConstructor
        url_hash_text: subjectdistributionsinkdisposalerrorconstructor
      - text: markAsSubject
        url_hash_text: markassubject
      - text: NonMarkedSubject
        url_hash_text: nonmarkedsubject
  - text: ScheduleFunction
    url_hash_text: schedulefunction
---

<!-- Do not edit this file. It is automatically generated by a build script. -->

## `Disposable`

<a name="disposable-function"></a>

### `Disposable - Function`

#### Signature
<pre>function Disposable(onDispose?: () =&gt; void): <a href="#disposable-interface">Disposable</a>;</pre>

<a name="disposable-interface"></a>

### `Disposable - Interface`

#### Signature
<pre>interface Disposable </pre>

## `isDisposable`

#### Signature
<pre>function isDisposable(value: unknown): value is <a href="#disposable-interface">Disposable</a>;</pre>

Determines whether the given value is a <a href="#disposable">Disposable</a>.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`value`</p> | <p><code>unknown</code></p> | <p>The value to check.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>value is [Disposable](#disposable-interface)</code></p> | <p>Whether the value is a Disposable.</p> |

#### Example

```ts
isDisposable(Sink(() => {})); // true.
isDisposable(Source(() => {})) // false.
isDisposable(Subject()); // true.
isDisposable(Disposable()); // true.
isDisposable({}); // false.
isDisposable(() => {}); // false.
isDisposable(null); // false.
```

#### See Also
* <p><a href="#issink">isSink</a></p>
* <p><a href="#issource">isSource</a></p>
* <p><a href="#issubject">isSubject</a></p>

## `DisposalError`

<a name="disposalerror-interface"></a>

### `DisposalError - Interface`

#### Signature
<pre>interface DisposalError extends DisposalErrorImplementation </pre>

<a name="disposalerror-variable"></a>

### `DisposalError - Variable`

#### Signature
<pre>var DisposalError: <a href="#disposalerrorconstructor">DisposalErrorConstructor</a></pre>

Thrown when at least one error is caught during the disposal of a disposable.

## `DisposalErrorConstructor`

#### Signature
<pre>interface DisposalErrorConstructor </pre>

## `DISPOSED`

#### Signature
<pre>var DISPOSED: <a href="#disposable-interface">Disposable</a></pre>

## `implDisposableMethods`

#### Signature
<pre>function implDisposableMethods&lt;T extends object&gt;(value: T, disposable: <a href="#disposable-interface">Disposable</a>): T &amp; <a href="#disposable-interface">Disposable</a>;</pre>

Implements the Disposable Interface onto the given value by copying the disposable methods &amp; properties from the given value to the given disposable.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`value`</p> | <p><code>T</code></p> | <p>The value to implement the Disposable Interface on.</p> |
| <p>`disposable`</p> | <p><code>[Disposable](#disposable-interface)</code></p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>T &amp; [Disposable](#disposable-interface)</code></p> | <p>The given value which has been mutated. In strict javascript this is unnecessary but here it is useful as the returned value will have the type <code>T &amp; Disposable</code></p> |

## `Event`

#### Signature
<pre>type Event&lt;T&gt; = <a href="#push-interface">Push</a>&lt;T&gt; | <a href="#throw-interface">Throw</a> | <a href="#end-interface">End</a>;</pre>

This is the base construct for distributing values/messages. All things pushed and received to and from <a href="#sink">Sinks</a> will be events. An event is an object which consists of a `type` field, which determines the type of the event. There are three types of events: <a href="#push">Push</a>, <a href="#throw">Throw</a> and <a href="#end">End</a> events:

- A Push event represents the &quot;pushing&quot; of a value to a sink, and has a `value` field equal to the value the event is carrying.

- A Throw represents the &quot;throwing&quot; of an error, and has an `error` field equal to the error the event is carrying. After a Sink receives an Error event, it will be disposed and will not take any more events.

- An End event represents the &quot;end&quot; of a source, and has no additional properties. After a Sink receives an End event, it will be disposed and will not take any more events.

When determining an event's type, you should **always** use either <a href="#pushtype">PushType</a>, <a href="#throwtype">ThrowType</a> or <a href="#endtype">EndType</a> directly instead of their constant number values.

#### Example

```ts
const sink = Sink<number>(event => {
    console.log(event.type); // Either `PushType`, `ThrowType` or `EndType`.
    if (event.type === PushType) {
        // In this case event.value this will be of type `number`.
        console.log('value:', event.value);
    } else if (event.type === ThrowType) {
        const error = event.error; // This is of type `unknown`.
        console.log('error', event.error);
    }
});
sink(Push(2)); // `${PushType}`, value: 2.
sink(Throw(new Error('...'))); // `${ThrowType}`, Error(...).
```

#### See Also
* <p><a href="#source">Source</a></p>
* <p><a href="#sink">Sink</a></p>

## `EventType`

#### Signature
<pre>type EventType = <a href="#pushtype-typealias">PushType</a> | <a href="#throwtype-typealias">ThrowType</a> | <a href="#endtype-typealias">EndType</a>;</pre>

## `Push`

<a name="push-function"></a>

### `Push - Function`

#### Signature
<pre>function Push&lt;T&gt;(): <a href="#push-interface">Push</a>&lt;undefined&gt;;</pre>

A Push event represents the &quot;pushing&quot; of a value to a <a href="#sink">Sink</a>, and has a `value` field equal to the value the event is carrying.

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>[Push](#push-interface)<!---->&lt;undefined&gt;</code></p> | <p>The created Push event.</p> |

#### Example

```ts
const event = Push([1, 2, 3]);
console.log(event.type); // `${PushType}`.
console.log(event.value); // [1, 2, 3].
```

#### See Also
* <p><a href="#event">Event</a></p>

#### Signature
<pre>function Push&lt;T&gt;(value: T): <a href="#push-interface">Push</a>&lt;T&gt;;</pre>

<a name="push-interface"></a>

### `Push - Interface`

#### Signature
<pre>interface Push&lt;T&gt; </pre>

## `PushType`

<a name="pushtype-typealias"></a>

### `PushType - Type Alias`

#### Signature
<pre>type PushType = 0;</pre>

<a name="pushtype-variable"></a>

### `PushType - Variable`

#### Signature
<pre>var PushType: <a href="#pushtype-typealias">PushType</a></pre>

## `Throw`

<a name="throw-function"></a>

### `Throw - Function`

#### Signature
<pre>function Throw(error: unknown): <a href="#throw-interface">Throw</a>;</pre>

A Throw represents the &quot;throwing&quot; of an error, and has an `error` field equal to the error the event is carrying. After a <a href="#sink">Sink</a> receives an Error event, it will be disposed and will not take any more events.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`error`</p> | <p><code>unknown</code></p> | <p>The error to be thrown.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>[Throw](#throw-interface)</code></p> | <p>The created Throw event.</p> |

#### Example

```ts
const event = Throw(new Error(...));
console.log(event.type); // `${ThrowType}`.
console.log(event.value); // Error(...).
```

#### See Also
* <p><a href="#event">Event</a></p>

<a name="throw-interface"></a>

### `Throw - Interface`

#### Signature
<pre>interface Throw </pre>

## `ThrowType`

<a name="throwtype-typealias"></a>

### `ThrowType - Type Alias`

#### Signature
<pre>type ThrowType = 1;</pre>

<a name="throwtype-variable"></a>

### `ThrowType - Variable`

#### Signature
<pre>var ThrowType: <a href="#throwtype-typealias">ThrowType</a></pre>

## `End`

<a name="end-interface"></a>

### `End - Interface`

#### Signature
<pre>interface End </pre>

<a name="end-variable"></a>

### `End - Variable`

#### Signature
<pre>var End: <a href="#end-interface">End</a></pre>

An End event represents the &quot;end&quot; of a <a href="#source">Source</a>, and has no additional properties. After a Sink receives an End event, it will be disposed and will not take any more events.

#### Example

```ts
function onEvent(event: Event<unknown>): void {
    console.log(event.type);
};
const sink = Sink(onEvent);
sink(End); // This disposes the sink, then calls `onEvent` above.
// Logs:
// `${EndType}`
```

#### See Also
* <p><a href="#event">Event</a></p>

## `EndType`

<a name="endtype-typealias"></a>

### `EndType - Type Alias`

#### Signature
<pre>type EndType = 2;</pre>

<a name="endtype-variable"></a>

### `EndType - Variable`

#### Signature
<pre>var EndType: <a href="#endtype-typealias">EndType</a></pre>

## `Sink`

<a name="sink-function"></a>

### `Sink - Function`

#### Signature
<pre>function Sink&lt;T&gt;(onEvent: (event: <a href="#event">Event</a>&lt;T&gt;) =&gt; void): <a href="#sink-interface">Sink</a>&lt;T&gt;;</pre>

A Sink is what a <a href="#source">Source</a> subscribes to. All events emitted by the source will be passed to the sink that has been given to the source.

The shape of a Sink is a function which takes an <a href="#event">Event</a> and distributes it to the `onEvent` function as described below. Sinks also implement the <a href="#disposable">Disposable</a> construct, and has all of the methods of the Disposable type, and can be treated as a Disposable. This is important as the way to stop a sink (and also unsubscribe the sources subscribed to the sink) is to dispose the sink itself. This also means that the way to cleanup or cancel some process when a Sink stops taking values (for example, when creating a custom Source), is to add a child to the Sink (as done on a disposable), which will then be called when the Sink is disposed. An example of this cancellation ability is say, cancelling a http request.

The sink constructor takes an `onEvent` function, which is called every time an event is received. When a sink is disposed, it will stop taking values and will ignore all subsequent events received. As well as this, when the sink is active and when the event received is a ThrowEvent or an EndEvent, then the sink will be disposed and then *after* this the `onEvent` function will called with the given event. If the `onEvent` function throws upon receiving an event, then the sink will immediately be disposed and the error will be thrown asynchronously in a `setTimeout` with delay zero.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`onEvent`</p> | <p><code>(event: [Event](#event)<!---->&lt;T&gt;) =&gt; void</code></p> | <p>The callback for when an event is received.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>[Sink](#sink-interface)<!---->&lt;T&gt;</code></p> | <p>The created Sink.</p> |

#### Example

```ts
const sink = Sink<number>(event => {
    if (event.type === PushType) {
        console.log(event.value);
    } else if (event.type === EndType) {
        console.log('ended');
    }
});
sink(Push(1));
sink(Push(2));
sinK(End);
// Logs:
// 1
// 2
// ended
```

#### Example

```ts
const sink = Sink<number>(event => {
    console.log(event);
});
sink(Push(1));
sink(Throw(new Error('some error was caught')));
sink(Push(4)); // Ignored.
sink(End); // Ignored.
sink(Throw(...)); // Ignored.
// Logs:
// { type: PushType, value: 1 }
// { type: ThrowType, error: Error }
```

#### Example

```ts
const sink = Sink<number>(event => {
    if (event.type === PushType && event.value === 5) {
        // This means that the Sink will stop receiving values, and all
        // disposable children added to this Sink will be disposed, allowing
        // for cleanup, for example in sources subscribed to this Sink.
        sink.dispose();
    }
    console.log(event);
});
for (let i = 0; i < 1_000_000_000 && sink.active; i++) {
    // Because the loop above checks if `sink.active` is true at the start of
    // every iteration, the loop will be exited when i === 6 before the
    // following is called, meaning that the following will never be reached
    // when i > 5. This is important as we want to stop iterating after the
    // source is disposed, meaning it won't take any more values. This
    // optimization prevents us from iterating pointlessly one billion times,
    // and instead we only iterate six times, with the `sink.active` check
    // breaking the loop on the seventh iteration.
    sink(Push(i));
}
sink(End); // This is ignored.
// Logs:
// { type: PushType, value: 0 }
// { type: PushType, value: 1 }
// { type: PushType, value: 2 }
// { type: PushType, value: 3 }
// { type: PushType, value: 4 }
// { type: PushType, value: 5 }
// Note: The End event is ignored here, as the sink was disposed upon
// receiving the Push(5) event.
```

#### Example

```ts
function onEvent(event: Event<unknown>): void {
    console.log(event);
    if (event.type === PushType && event.value === 2) {
        throw new Error('I don\'t like the value two. Begone.');
    }
}
const sink = Sink<number>(onEvent);
for (let i = 0; i < 10 && sink.active; i++) {
    // When i === 2, after the event is logged above, `onEvent` will throw an
    // error. When this happens, the sink will catch the error and it will be
    // thrown asynchronously in a setTimeout. As well as this, the sink will
    // be disposed immediately, unsubscribing anything subscribed to it.
    // Because the loop above checks if `sink.active` is true at the start of
    // every iteration, the loop will be exited when i === 3 before the
    // following is called.
    sink(Push(i));
}
sink(End); // This is ignored.
// Logs:
// { type: PushType, value: 0 }
// { type: PushType, value: 1 }
// { type: PushType, value: 2 }
```

#### Example

```ts
import { Request, startRequest, cancelRequest } from './my-api.ts';

const sink = Sink(() => {});
// This is important as, in the case where the sink is disposed later
// (meaning it will no longer take events), the request should be cancelled.
// Note that in this case, cancelRequest will be called straight after the
// sink receives the End event, which happens after the request completes and
// the sink has already received a Push event with the result of the request.
// However, in this example it is presumed that the cancelRequest function
// will do nothing when given an already completed request.
sink.add(() => {
    cancelRequest(myRequest);
});
const myRequest = startRequest(result => {
    sink(Push(result)));
    sink(End);
});

// Alternatively, if `startRequest` takes a Disposable and will automatically
// cancel the request when the disposable is disposed, in a similar manner to
// `ScheduleFunction`, we can directly pass the sink to the `startRequest`
// function and the request will automatically be cancelled when the sink is
// disposed.
const sink = Sink(() => {});
startRequest(result => {
    sink(Push(result));
    sink(End)
}, sink);
```

#### Example

```ts
// In this example the source emits values 0..49.
const source = range(50);
const sink = Sink(event => {
    console.log(event);
    if (event.value === 3) {
        sink.dispose();
    }
})
source(sink);
// Logs:
// Push(0)
// Push(1)
// Push(2)
// Push(3)
```

#### See Also
* <p><a href="#disposable">Disposable</a></p>
* <p><a href="#event">Event</a></p>
* <p><a href="#source">Source</a></p>
* <p><a href="#subject">Subject</a></p>

<a name="sink-interface"></a>

### `Sink - Interface`

#### Signature
<pre>interface Sink&lt;T&gt; extends <a href="#disposable-interface">Disposable</a> </pre>

## `isSink`

#### Signature
<pre>function isSink(value: unknown): value is <a href="#sink-interface">Sink</a>&lt;unknown&gt;;</pre>

Determines whether the given value is a <a href="#sink">Sink</a>.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`value`</p> | <p><code>unknown</code></p> | <p>The value to check.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>value is [Sink](#sink-interface)<!---->&lt;unknown&gt;</code></p> | <p>Whether the value is a Sink.</p> |

#### Example

```ts
isSink(Sink(() => {})); // true.
isSink(Source(() => {})) // false.
isSink(Subject()); // true.
isSink(Disposable()); // false.
isSink({}); // false.
isSink(() => {}); // false.
isSink(null); // false.
```

#### See Also
* <p><a href="#isdisposable">isDisposable</a></p>
* <p><a href="#issource">isSource</a></p>
* <p><a href="#issubject">isSubject</a></p>

## `Source`

<a name="source-function"></a>

### `Source - Function`

#### Signature
<pre>function Source&lt;T&gt;(produce: (sink: <a href="#sink-interface">Sink</a>&lt;T&gt;) =&gt; void): <a href="#source-interface">Source</a>&lt;T&gt;;</pre>

A Source is a function which can be subscribed to with a <a href="#sink">Sink</a>. This construct is the basis of all reactive programming done with this library. Sources are by default essentially a lazy push-style stream/observable which will produce new values every subscription. The &quot;lazy&quot; part can be thought of as follows:

```ts
function mySource(): void {
    return (sink: Sink<mySourceType>) => {
        const producer = Producer();
        // ...add subscriber to producer.
        producer.produce();
    }
}
```

Compared to a less lazy and more eager implementation:

```ts
function mySource(): void {
    const producer = Producer();
    producer.produce();
    return (sink: Sink<mySourceType>) => {
         // ...add subscriber to producer.
    }
}
```

The shape of a Source is a function which takes a Sink, which will be passed to the &quot;produce&quot; function given at the creation of the Source whose job is to fill up the Sink with values. When the Source is subscribed to, this produce function is called with the sink given to the source. The given produce function should stop trying to emit values to the subscribed sink when the subscribed sink is disposed, and should stop/cleanup any ongoing side processes.

If the given (subscribed) sink is disposed (meaning it will not take any more values), then the given produce function will never be called and the sink will just be ignored. On the other hand, if the sink is active, then the given produce function will be called with the sink as the only parameter.

However, if the given produce function throws an error during initial execution, the error will be passed to the sink if it is active at the time of throwing (it might not be active in the case where it is disposed inside the given produce function, and then *after* this the given produce function throws), then the error will be passed to the sink as a Throw event, otherwise is will be asynchronously reported through a `setTimeout` with delay zero, similar to how Promises don't synchronously throw errors during construction. Because of this error handling behavior, it is *always* a good practice to wrap any functions called asynchronously after subscription in a try/catch, then to pass the error on in a Throw event to the subscribed sink which can then handle it.

The implementation for Source is very basic, and can roughly be thought of as follows:

```ts
const Source = produce => sink => {
    if (sink.active) {
        try { produce(sink) }
        catch (error) {
            if (sink.active) sink(Throw(error));
            else setTimeout(() => { throw error })
        }
    }
}
```

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`produce`</p> | <p><code>(sink: [Sink](#sink-interface)<!---->&lt;T&gt;) =&gt; void</code></p> | <p>This will be called with the given sink each subscription. When the sink is disposed this function should stop trying to emit values, and should stop/cleanup any ongoing side processes</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>[Source](#source-interface)<!---->&lt;T&gt;</code></p> | <p>The created Source.</p> |

#### Example

```ts
// Creating a Source which synchronously produces values 0..50
const source = Source(sink => {
    // Note: It is guaranteed (at the start of execution of this function
    // at least) that the sink here is active.
    for (let i = 0; i <= 50 && sink.active; i++) {
        sink(Push(i));
    }
    // Even if the above loop breaks, and the sink is no longer active, it
    // will just ignore this End event, meaning there is no need to check
    // whether the sink is active for distributing singular events like this
    // at the end of execution.
    sink(End);
});
source(Sink(console.log));
source(Sink(console.log));
// Logs:
// Push(0)
// Push(1)
// ...
// Push(50)
// End
// Push(0)
// Push(1)
// ...
// Push(50)
// End
```

#### Example

```ts
// Creating a Factory function which creates a Source that emits all the
// values in the provided array at construction.
function fromArray<T>(array: ArrayLike<T>): Source<T> {
    return Source(sink => {
        for (let i = 0; i < array.length && sink.active; i++) {
            sink(Push(array[i]));
        }
        sink(End);
    });
}
const array = [1, 2];
fromArray(array)(Sink(console.log));
fromArray(array)(Sink(console.log));
// Logs:
// Push(1)
// Push(2)
// End
// Push(1)
// Push(2)
// End
```

#### Example

```ts
// Creating a Source that maps an external api into a reactive one.
import { MyExternalSubscriptionToken, myExternalApi } from './myExternalApi';
const source = Source(sink => {
    let subscriptionToken: { v: MyExternalSubscriptionToken } | undefined;
    sink.add(() => {
        if (subscriptionToken) {
             myExternalApi.cancel(subscriptionToken);
        }
    })
    // In this example myExternalApi may throw.
    try {
        subscriptionToken = myExternalApi.request((value, error) => {
            if (error) {
                sink(Throw(error));
                return;
            }
            sink(Push(value));
            sink(End);
        });
    } catch (error) {
        sink(Throw(error));
    }
});
```

#### See Also
* <p><a href="#disposable">Disposable</a></p>
* <p><a href="#event">Event</a></p>
* <p><a href="#sink">Sink</a></p>
* <p><a href="#subject">Subject</a></p>

<a name="source-interface"></a>

### `Source - Interface`

#### Signature
<pre>interface Source&lt;T&gt; </pre>

## `isSource`

#### Signature
<pre>function isSource(value: unknown): value is <a href="#sink-interface">Sink</a>&lt;unknown&gt;;</pre>

Determines whether the given value is a <a href="#source">Source</a>.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`value`</p> | <p><code>unknown</code></p> | <p>The value to check.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>value is [Sink](#sink-interface)<!---->&lt;unknown&gt;</code></p> | <p>Whether the value is a Source.</p> |

#### Example

```ts
isSource(Sink(() => {})); // false.
isSource(Source(() => {})); // true.
isSource(Subject()); // true.
isSource(Disposable()); // false.
isSource({}); // false.
isSource(() => {}); // false.
isSource(null); // false.
```

#### See Also
* <p><a href="#isdisposable">isDisposable</a></p>
* <p><a href="#issink">isSink</a></p>
* <p><a href="#issubject">isSubject</a></p>

## `subscribe`

#### Signature
<pre>function subscribe&lt;T&gt;(sink?: <a href="#sink-interface">Sink</a>&lt;T&gt;): (source: <a href="#source-interface">Source</a>&lt;T&gt;) =&gt; void;</pre>

Higher order function which takes a sink, and returns another function which receives a source that will be subscribed to using the given sink. This is useful, for example, at the end of pipe calls in order to subscribe to the transformed source.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`sink`</p> | <p><code>[Sink](#sink-interface)<!---->&lt;T&gt;</code></p> | <p>The sink to be given to the received source.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>(source: [Source](#source-interface)<!---->&lt;T&gt;) =&gt; void</code></p> | <p>The higher order function which takes a source to subscribe to.</p> |

#### Example

```ts
import { DogPictures, myGetDogPictures } from './myApi.ts';
import { MyRequestTimeoutError } from './myRequestTimeoutError.ts';
import { myReportError } from './myReportError.ts'
import { myUpdateViewWithDogs } from './myUpdateViewWithDogs.ts'

const sink = Sink<DogPictures>(event => {
    if (event.type === ThrowType) {
        myReportError(event.error)
    } else if (event.type === EndType) {
        return;
    }
    myUpdateViewWithDogs(event.value)
});

pipe(
    myGetDogPictures(...),
    timeoutMs(5000, throwError(() => new MyRequestTimeoutError())),
    retry(3),
    subscribe(sink)
);
```

#### See Also
* <p><a href="#source">Source</a></p>
* <p><a href="#sink">Sink</a></p>

## `Operator`

#### Signature
<pre>interface Operator&lt;T, U&gt; </pre>

## `IdentityOperator`

#### Signature
<pre>interface IdentityOperator </pre>

## `pipe`

#### Signature
<pre>function pipe&lt;T&gt;(x: T): T;</pre>

Calls the value accumulatively against all of the functions given left-to-right. The result of calling a function with the accumulated value will be given to the next function, and the result of the last function will be returned. If there are no functions given, the given value will be returned.

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>T</code></p> | <p>The result of accumulatively calling the given value against all of the functions given left-to-right.</p> |

#### Signature
<pre>function pipe&lt;T, R&gt;(x: T, f1: (x: T) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, D, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, D, E, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, D, E, F, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, D, E, F, G, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; G, f8: (x: G) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, D, E, F, G, H, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; G, f8: (x: G) =&gt; H, f9: (x: H) =&gt; R): R;</pre>

#### Signature
<pre>function pipe&lt;T, A, B, C, D, E, F, G, H, R&gt;(x: T, f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; G, f8: (x: G) =&gt; H, f9: (x: H) =&gt; R, ...funcs: Array&lt;(x: any) =&gt; any&gt;): R;</pre>

#### Signature
<pre>function pipe&lt;T&gt;(x: T, ...fns: ((x: T) =&gt; T)[]): T;</pre>

## `flow`

#### Signature
<pre>function flow(): &lt;T&gt;(x: T) =&gt; T;</pre>

Combines all of the functions given into a single function. This function takes a value and will accumulatively call it against all of the given functions left-to-right. The result of calling a function with the accumulated value will be given to the next function, and the result of the last function will be returned. If there are no functions given, then the combined function will return the value passed to it.

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>&lt;T&gt;(x: T) =&gt; T</code></p> | <p>A function which takes a value and will return the result of accumulatively calling the value against all of the functions given left-to-right.</p> |

#### Signature
<pre>function flow&lt;T, R&gt;(f1: (x: T) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, D, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, D, E, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, D, E, F, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, D, E, F, G, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; G, f8: (x: G) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, D, E, F, G, H, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; G, f8: (x: G) =&gt; H, f9: (x: H) =&gt; R): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T, A, B, C, D, E, F, G, H, R&gt;(f1: (x: T) =&gt; A, f2: (x: A) =&gt; B, f3: (x: B) =&gt; C, f4: (x: C) =&gt; D, f5: (x: D) =&gt; E, f6: (x: E) =&gt; F, f7: (x: F) =&gt; G, f8: (x: G) =&gt; H, f9: (x: H) =&gt; R, ...funcs: Array&lt;(x: any) =&gt; any&gt;): (x: T) =&gt; R;</pre>

#### Signature
<pre>function flow&lt;T&gt;(...fns: Array&lt;(x: T) =&gt; T&gt;): (x: T) =&gt; T;</pre>

## `Subject`

<a name="subject-function"></a>

### `Subject - Function`

#### Signature
<pre>function Subject&lt;T&gt;(): <a href="#subject-interface">Subject</a>&lt;T&gt;;</pre>

<a name="subject-interface"></a>

### `Subject - Interface`

#### Signature
<pre>interface Subject&lt;T&gt; extends <a href="#source-interface">Source</a>&lt;T&gt;, <a href="#sink-interface">Sink</a>&lt;T&gt;, <a href="#nonmarkedsubject">NonMarkedSubject</a>&lt;T&gt; </pre>

## `isSubject`

#### Signature
<pre>function isSubject(value: unknown): value is <a href="#subject-interface">Subject</a>&lt;unknown&gt;;</pre>

Determines whether the given value is a <a href="#subject">Subject</a>.

#### Parameters

| <p>Parameter</p> | <p>Type</p> | <p>Description</p> |
| --- | --- | --- |
| <p>`value`</p> | <p><code>unknown</code></p> | <p>The value to check.</p> |

#### Returns

| <p>Type</p> | <p>Description</p> |
| --- | --- |
| <p><code>value is [Subject](#subject-interface)<!---->&lt;unknown&gt;</code></p> | <p>Whether the value is a Subject.</p> |

#### Example

```ts
isSubject(Sink(() => {})); // false.
isSubject(Source(() => {})) // false.
isSubject(Subject()); // true.
isSubject(Disposable()); // false.
isSubject({}); // false.
isSubject(() => {}); // false.
isSubject(null); // false.
```

#### See Also
* <p><a href="#isdisposable">isDisposable</a></p>
* <p><a href="#issink">isSink</a></p>
* <p><a href="#issource">isSource</a></p>

## `SubjectDistributionSinkDisposalError`

<a name="subjectdistributionsinkdisposalerror-interface"></a>

### `SubjectDistributionSinkDisposalError - Interface`

#### Signature
<pre>interface SubjectDistributionSinkDisposalError extends SubjectDistributionSinkDisposalErrorImplementation </pre>

<a name="subjectdistributionsinkdisposalerror-variable"></a>

### `SubjectDistributionSinkDisposalError - Variable`

#### Signature
<pre>var SubjectDistributionSinkDisposalError: <a href="#subjectdistributionsinkdisposalerrorconstructor">SubjectDistributionSinkDisposalErrorConstructor</a></pre>

Thrown when at least least one error is caught during the checking of whether a subscribed sink is active or not.

## `SubjectDistributionSinkDisposalErrorConstructor`

#### Signature
<pre>interface SubjectDistributionSinkDisposalErrorConstructor </pre>

## `markAsSubject`

#### Signature
<pre>function markAsSubject&lt;T&gt;(subjectFunction: <a href="#nonmarkedsubject">NonMarkedSubject</a>&lt;T&gt;): <a href="#subject-interface">Subject</a>&lt;T&gt;;</pre>

## `NonMarkedSubject`

#### Signature
<pre>interface NonMarkedSubject&lt;T&gt; extends <a href="#disposable-interface">Disposable</a> </pre>

## `ScheduleFunction`

#### Signature
<pre>interface ScheduleFunction&lt;T extends any[] = []&gt; </pre>
