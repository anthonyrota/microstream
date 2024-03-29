import { IndentedWriter } from '../../../util/IndentedWriter';

export interface MarkdownOutputParameters {
    pageId: string;
    getPagePathFromPageId: (pageId: string) => string;
    getPageTitleFromPageId: (pageId: string) => string;
}

export class MarkdownOutput extends IndentedWriter {
    private _inSingleLineCodeBlock = false;
    private _inTable = false;
    private _writeSingleLine = false;
    private _inHtmlBlockTag = false;
    private _inMarkdownCode = false;
    private _inListNode = false;
    private _inHtmlAttribute = false;
    private _isMarkedNewParagraph = false;
    private _writingInlineHtmlTag = false;
    public readonly pageId: string;
    public readonly getPagePathFromPageId: (pageId: string) => string;
    public readonly getPageTitleFromPageId: (pageId: string) => string;

    constructor(parameters: MarkdownOutputParameters) {
        super();
        this.pageId = parameters.pageId;
        this.getPagePathFromPageId = parameters.getPagePathFromPageId;
        this.getPageTitleFromPageId = parameters.getPageTitleFromPageId;
    }

    public withInTable(write: () => void): void {
        const before = this._inTable;
        this._inTable = true;
        write();
        this._inTable = before;
    }

    public withInSingleLineCodeBlock(write: () => void): void {
        const before = this._inSingleLineCodeBlock;
        this._inSingleLineCodeBlock = true;
        write();
        this._inSingleLineCodeBlock = before;
    }

    public withInSingleLine(write: () => void): void {
        const before = this._writeSingleLine;
        this._writeSingleLine = true;
        write();
        this._writeSingleLine = before;
    }

    public withInHtmlBlockTag(write: () => void): void {
        const before = this._inHtmlBlockTag;
        this._inHtmlBlockTag = true;
        write();
        this._inHtmlBlockTag = before;
    }

    public withInMarkdownCode(write: () => void): void {
        const before = this._inMarkdownCode;
        this._inMarkdownCode = true;
        write();
        this._inMarkdownCode = before;
    }

    public withInListNode(write: () => void): void {
        const before = this._inListNode;
        this._inListNode = true;
        write();
        this._inListNode = before;
    }

    public withInHtmlAttribute(write: () => void): void {
        const before = this._inHtmlAttribute;
        this._inHtmlAttribute = true;
        write();
        this._inHtmlAttribute = before;
    }

    public withParagraphBreak(
        write: () => void,
        breakIfInHtmlBlockTag = true,
    ): void {
        if (this._isMarkedNewParagraph) {
            if (breakIfInHtmlBlockTag && this._inHtmlBlockTag) {
                this._isMarkedNewParagraph = false;
            } else {
                write();
                return;
            }
        }
        if (!this._isMarkedNewParagraph) {
            if (this.constrainedToSingleLine) {
                throw new Error(
                    'Cannot start new paragraph if constrained to single line.',
                );
            }
            this.ensureSkippedLine();
            // Content after skipped line in block tag is parsed as markdown.
            this._inHtmlBlockTag = false;
            this.markStartOfParagraph();
        }
        write();
    }

    public markStartOfParagraph(): void {
        this._isMarkedNewParagraph = true;
    }

    public withWritingInlineHtmlTag(write: () => void): void {
        const before = this._writingInlineHtmlTag;
        this._writingInlineHtmlTag = true;
        write();
        this._writingInlineHtmlTag = before;
    }

    public get constrainedToSingleLine(): boolean {
        return this._writeSingleLine || this._inTable;
    }

    public get inTable(): boolean {
        return this._inTable;
    }

    public get inSingleLineCodeBlock(): boolean {
        return this._inSingleLineCodeBlock;
    }

    public get inHtmlBlockTag(): boolean {
        return this._inHtmlBlockTag;
    }

    public get inMarkdownCode(): boolean {
        return this._inMarkdownCode;
    }

    public get inListNode(): boolean {
        return this._inListNode;
    }

    public get inHtmlAttribute(): boolean {
        return this._inHtmlAttribute;
    }

    protected _write(str: string): void {
        if (this.constrainedToSingleLine && /[\n\r]/.test(str)) {
            throw new Error('Newline when constrained to single line.');
        }
        if (
            this._isMarkedNewParagraph &&
            !this._writingInlineHtmlTag &&
            /\S/.test(str)
        ) {
            this._isMarkedNewParagraph = false;
        }
        super._write(str);
    }
}
