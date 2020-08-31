import { Node } from '../../nodes';
import { HtmlElementNode } from '../../nodes/HtmlElement';
import { RichCodeBlockBase } from '../../nodes/RichCodeBlock';
import { MarkdownOutput } from './MarkdownOutput';
import { ParamWriteChildNode, ParamWriteCoreNode } from '.';

export function writeRichCodeBlock<ChildNode extends Node>(
    richCodeBlock: RichCodeBlockBase<ChildNode>,
    output: MarkdownOutput,
    writeCoreNode: ParamWriteCoreNode,
    writeChildNode: ParamWriteChildNode<ChildNode>,
): void {
    if (output.constrainedToSingleLine) {
        writeCoreNode(
            // TODO: fix breaking inside nested blocks.
            HtmlElementNode<ChildNode>({
                tagName: 'pre',
                children: richCodeBlock.children,
            }),
            output,
            writeChildNode,
        );
        return;
    }

    writeCoreNode(
        HtmlElementNode<ChildNode>({
            tagName: 'pre',
            children: richCodeBlock.children,
        }),
        output,
        writeChildNode,
    );
}