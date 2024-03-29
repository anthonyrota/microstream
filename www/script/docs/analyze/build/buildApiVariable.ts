import { ApiVariable } from '@microsoft/api-extractor-model';
import * as ts from 'typescript';
import { DeepCoreNode } from '../../core/nodes';
import { ContainerNode } from '../../core/nodes/Container';
import { AnalyzeContext } from '../Context';
import { getApiItemTextKind } from '../util/getApiItemTextKind';
import { buildApiItemAnchor } from './util/buildApiItemAnchor';
import { buildApiItemExamples } from './util/buildApiItemExamples';
import { buildApiItemSeeBlocks } from './util/buildApiItemSeeBlocks';
import { buildApiItemSignature } from './util/buildApiItemSignature';
import { buildApiItemSummary } from './util/buildApiItemSummary';

export interface BuildApiVariableParameters {
    context: AnalyzeContext;
    variable: ApiVariable;
}

export function buildApiVariable(
    parameters: BuildApiVariableParameters,
): DeepCoreNode {
    const { variable, context } = parameters;
    const anchor = buildApiItemAnchor({
        apiItem: variable,
        context,
        textKind: getApiItemTextKind(variable.kind),
    });
    const signature = buildApiItemSignature({
        apiItem: variable,
        context,
        syntaxKind: ts.SyntaxKind.VariableDeclaration,
    });
    const summary = buildApiItemSummary({ apiItem: variable, context });
    const examples = buildApiItemExamples({ apiItem: variable, context });
    const seeBlocks = buildApiItemSeeBlocks({ apiItem: variable, context });

    const container = ContainerNode<DeepCoreNode>({});
    if (anchor) container.children.push(anchor);
    container.children.push(signature);
    if (summary) container.children.push(summary);
    if (examples) container.children.push(examples);
    if (seeBlocks) container.children.push(seeBlocks);

    return container;
}
