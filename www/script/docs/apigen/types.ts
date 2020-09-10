import { DeepCoreNode } from './core/nodes';

export type PageNodeMap = Record<string, DeepCoreNode>;

export interface PageNodeMapMetadata {
    hash: string;
    version: number;
}

export interface PageNodeMapWithMetadata {
    metadata: PageNodeMapMetadata;
    pageNodeMap: PageNodeMap;
}