import {
    ApiItem,
    ExcerptToken,
    ExcerptTokenKind,
} from '@microsoft/api-extractor-model';
import { DeclarationReference } from '@microsoft/tsdoc/lib/beta/DeclarationReference';
import * as colors from 'colors';
import { AnalyzeContext } from '../Context';

export const enum FoundExcerptTokenReferenceResultType {
    Export,
    LocalSignatureTokens,
}

export interface FoundApiItemReference {
    type: FoundExcerptTokenReferenceResultType.Export;
    apiItem: ApiItem;
}

export interface FoundLocalSignatureReference {
    type: FoundExcerptTokenReferenceResultType.LocalSignatureTokens;
    tokens: ExcerptToken[];
}

function findLocalReferenceTokens(
    canonicalReference: DeclarationReference,
    context: AnalyzeContext,
): FoundLocalSignatureReference {
    context;
    console.log(canonicalReference.toString());
    return (null as unknown) as FoundLocalSignatureReference;
}

export function getExcerptTokenReference(
    token: ExcerptToken,
    debugTokenText: string,
    debugExcerptText: string,
    context: AnalyzeContext,
): FoundApiItemReference | FoundLocalSignatureReference | null {
    if (
        token.kind !== ExcerptTokenKind.Reference ||
        !token.canonicalReference ||
        // Non-module reference.
        token.canonicalReference.toString().startsWith('!')
    ) {
        return null;
    }
    if (token.canonicalReference.toString().includes('!~')) {
        if (token.canonicalReference.toString().endsWith('!~value')) {
            // I don't know why this is a thing.
            return null;
        }
        // Local reference.
        return findLocalReferenceTokens(token.canonicalReference, context);
    }
    // Should be a exported reference now.
    let canonicalReference = token.canonicalReference;
    if (canonicalReference.toString().endsWith(':function')) {
        // Requires (overloadIndex) at the end if a function.
        canonicalReference = canonicalReference.withOverloadIndex(1);
    }
    // if (canonicalReference.toString().includes('!Event')) {
    //     // Event type shadows the global type so api-extractor replaces it
    //     // with Event_2, but doesn't bother changing the references to
    //     // the updated name.
    //     canonicalReference = DeclarationReference.parse(
    //         canonicalReference.toString().replace('!Event', '!Event_2'),
    //     );
    // }
    const result = context.apiModel.resolveDeclarationReference(
        canonicalReference,
        undefined,
    );

    if (result.errorMessage) {
        console.log(
            `Error resolving excerpt token ${colors.underline.bold(
                debugTokenText,
            )} reference: ${colors.red(
                result.errorMessage,
            )}. The original signature is ${colors.underline.bold(
                debugExcerptText,
            )}`,
        );
    }

    if (result.resolvedApiItem) {
        return {
            type: FoundExcerptTokenReferenceResultType.Export,
            apiItem: result.resolvedApiItem,
        };
    }

    return null;
}