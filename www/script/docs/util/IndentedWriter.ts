/* eslint-disable max-len */
/**
 * Thanks to the api-documenter team for some ideas used in this script:
 *
 * https://github.com/microsoft/rushstack/blob/e7e9429/apps/api-documenter/src/utils/IndentedWriter.ts
 *
 * The api-documenter project is licensed under MIT, and its license can be found at <rootDir>/vendor/licenses/@microsoft/api-documenter/LICENSE
 */
/* eslint-enable max-len */

import { StringBuilder } from './StringBuilder';

export class IndentedWriter {
    /**
     * The text characters used to create one level of indentation.
     * Two spaces by default.
     */
    public defaultIndentPrefix = '  ';

    private readonly _builder = new StringBuilder();

    private _latestChunk: string | undefined;
    private _previousChunk: string | undefined;
    private _atStartOfLine: boolean;

    private readonly _indentStack: string[];
    private _indentText: string;

    public constructor() {
        this._latestChunk = undefined;
        this._previousChunk = undefined;
        this._atStartOfLine = true;

        this._indentStack = [];
        this._indentText = '';
    }

    /**
     * Retrieves the output that was built so far.
     */
    public getText(): string {
        return this._builder.toString();
    }

    public toString(): string {
        return this.getText();
    }

    public withIndent(
        indentPrefix: string | undefined,
        write: () => void,
    ): void {
        this._increaseIndent(indentPrefix);
        write();
        this._decreaseIndent();
    }

    /**
     * Increases the indentation.  Normally the indentation is two spaces,
     * however an arbitrary prefix can optional be specified.  (For example,
     * the prefix could be "// " to indent and comment simultaneously.)
     * Each call to IndentedWriter.increaseIndent() must be followed by a
     * corresponding call to IndentedWriter.decreaseIndent().
     */
    private _increaseIndent(indentPrefix?: string): void {
        this._indentStack.push(
            indentPrefix !== undefined
                ? indentPrefix
                : this.defaultIndentPrefix,
        );
        this._updateIndentText();
    }

    /**
     * Decreases the indentation, reverting the effect of the corresponding call
     * to IndentedWriter.increaseIndent().
     */
    private _decreaseIndent(): void {
        this._indentStack.pop();
        this._updateIndentText();
    }

    /**
     * Adds a newline if the file pointer is not already at the start of the
     * line (or start of the stream).
     */
    public ensureNewLine(): void {
        const lastCharacter: string = this.peekLastCharacter();
        if (lastCharacter !== '\n' && lastCharacter !== '') {
            this._writeNewLine();
        }
    }

    /**
     * Adds up to two newlines to ensure that there is a blank line above the
     * current line.
     */
    public ensureSkippedLine(): void {
        const lastCharacter = this.peekLastCharacter();
        if (lastCharacter !== '\n' && lastCharacter !== '') {
            this._writeNewLine();
        }

        const secondLastCharacter: string = this.peekSecondLastCharacter();
        if (secondLastCharacter !== '\n' && secondLastCharacter !== '') {
            this._writeNewLine();
        }
    }

    /**
     * Returns the last character that was written, or an empty string if no
     * characters have been written yet.
     */
    public peekLastCharacter(): string {
        if (this._latestChunk !== undefined) {
            return this._latestChunk.substr(-1, 1);
        }
        return '';
    }

    /**
     * Returns the second to last character that was written, or an empty string
     * if less than one characters have been written yet.
     */
    public peekSecondLastCharacter(): string {
        if (this._latestChunk !== undefined) {
            if (this._latestChunk.length > 1) {
                return this._latestChunk.substr(-2, 1);
            }
            if (this._previousChunk !== undefined) {
                return this._previousChunk.substr(-1, 1);
            }
        }
        return '';
    }

    public *iterateCharactersBackwards(): Generator<string, void, undefined> {
        yield* this._builder.iterateCharactersBackwards();
    }

    /**
     * Writes some text to the internal string buffer, applying indentation
     * according to the current indentation level.  If the string contains
     * multiple newlines, each line will be indented separately.
     */
    public write(message: string): void {
        if (message.length === 0) {
            return;
        }

        // If there are no newline characters, then write the string verbatim
        if (!/[\r\n]/.test(message)) {
            this._writeLinePart(message);
            return;
        }

        // Otherwise split the lines and write each one individually
        let first = true;
        for (const linePart of message.split('\n')) {
            if (!first) {
                this._writeNewLine();
            } else {
                first = false;
            }
            if (linePart) {
                this._writeLinePart(linePart.replace(/[\r]/g, ''));
            }
        }
    }

    /**
     * A shorthand for writing an optional message, followed by a newline.
     * Indentation is applied following the semantics of IndentedWriter.write().
     */
    public writeLine(message = ''): void {
        if (message.length > 0) {
            this.write(message);
        }
        this._writeNewLine();
    }

    /**
     * Writes a string that does not contain any newline characters.
     */
    private _writeLinePart(message: string): void {
        if (message.length > 0) {
            if (this._atStartOfLine && this._indentText.length > 0) {
                this._write(this._indentText);
            }
            this._write(message);
            this._atStartOfLine = false;
        }
    }

    private _writeNewLine(): void {
        if (this._atStartOfLine && this._indentText.length > 0) {
            this._write(this._indentText);
        }

        this._write('\n');
        this._atStartOfLine = true;
    }

    protected _write(s: string): void {
        this._previousChunk = this._latestChunk;
        this._latestChunk = s;
        this._builder.write(s);
    }

    private _updateIndentText(): void {
        this._indentText = this._indentStack.join('');
    }
}
