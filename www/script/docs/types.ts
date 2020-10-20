import type { DeepCoreNode } from './core/nodes';
import type { PageNode } from './core/nodes/Page';

export type PageIds = /* PageId[] */ string[];
export type Pages = PageNode<DeepCoreNode>[];

export interface PageGroup {
    title: string;
    pageIds: PageIds;
}

export interface PagesMetadata {
    pageIdToWebsitePath: Record<string, string>;
    pageIdToPageTitle: Record<string, string>;
    pageGroups: PageGroup[];
    github: null | {
        org: string;
        repo: string;
        ref: string;
        sha: string;
    };
}

export interface TableOfContentsInlineReference {
    text: string;
    urlHashText: string;
}

export interface TableOfContentsMainReference
    extends TableOfContentsInlineReference {
    inlineReferences?: TableOfContentsInlineReference[];
    nestedReferences?: TableOfContentsMainReference[];
}

export type TableOfContents = TableOfContentsMainReference[];