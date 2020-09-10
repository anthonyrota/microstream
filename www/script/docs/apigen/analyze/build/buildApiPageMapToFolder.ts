import { DeepCoreNode } from '../../core/nodes';
import { BoldNode } from '../../core/nodes/Bold';
import { CollapsibleSectionNode } from '../../core/nodes/CollapsibleSection';
import { ContainerNode } from '../../core/nodes/Container';
import { DoNotEditCommentNode } from '../../core/nodes/DoNotEditComment';
import { HeadingNode } from '../../core/nodes/Heading';
import { LocalPageLinkNode } from '../../core/nodes/LocalPageLink';
import { PageNode } from '../../core/nodes/Page';
import { PageTitleNode } from '../../core/nodes/PageTitle';
import { PlainTextNode } from '../../core/nodes/PlainText';
import { SubheadingNode } from '../../core/nodes/Subheading';
import { TableOfContentsNode } from '../../core/nodes/TableOfContents';
import { renderDeepCoreNodeAsMarkdown } from '../../core/render/markdown';
import { addFileToFolder, Folder, moveFileInFolder } from '../../util/Folder';
import { AnalyzeContext } from '../Context';

export interface BuildApiPageMapToFolderParameters {
    pageMap: Map<string, PageNode<DeepCoreNode>>;
    context: AnalyzeContext;
}

export function buildApiPageMapToFolder(
    parameters: BuildApiPageMapToFolderParameters,
): Folder {
    const { pageMap: pageNodeMap, context } = parameters;
    const { packageDataList } = context;
    const outFolder = Folder();

    for (const [path, page] of pageNodeMap) {
        addFileToFolder(
            outFolder,
            `${path}.md`,
            renderDeepCoreNodeAsMarkdown(page),
        );
    }

    interface GetPageLinksFunction {
        (inBase: boolean): {
            headingLink: LocalPageLinkNode<DeepCoreNode>;
            tableOfContents: TableOfContentsNode;
        }[];
    }

    const packageDirectoryToPageSummaryMap = new Map<
        string,
        {
            isOneIndexPagePackage: boolean;
            pageTitleTextNode: PlainTextNode;
            getPageLinks: GetPageLinksFunction;
        }
    >();

    for (const packageData of packageDataList) {
        const { pages } = packageData;
        const isOneIndexPagePackage =
            pages.length === 1 && pages[0].pageDirectory === '_index';
        const pageTitleTextNode = PlainTextNode({
            text: `API Reference - ${packageData.packageName}`,
        });
        const getPageLinks: GetPageLinksFunction = (inBase) =>
            pages.map((pageData) => {
                const pageName = isOneIndexPagePackage
                    ? 'README'
                    : pageData.pageDirectory;
                const pagePath = inBase
                    ? `${packageData.packageDirectory}/${pageName}`
                    : pageName;
                return {
                    headingLink: LocalPageLinkNode({
                        destination: pagePath,
                        children: [PlainTextNode({ text: pageData.pageTitle })],
                    }),
                    tableOfContents: TableOfContentsNode({
                        // eslint-disable-next-line max-len
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        tableOfContents: pageNodeMap.get(
                            `${packageData.packageDirectory}/${pageData.pageDirectory}`,
                        )!.metadata.tableOfContents,
                        relativePagePath: pagePath,
                    }),
                };
            });

        packageDirectoryToPageSummaryMap.set(packageData.packageDirectory, {
            isOneIndexPagePackage,
            pageTitleTextNode,
            getPageLinks,
        });

        if (isOneIndexPagePackage) {
            moveFileInFolder(
                outFolder,
                `${packageData.packageDirectory}/_index.md`,
                `${packageData.packageDirectory}/README.md`,
            );
            continue;
        }

        const contents = ContainerNode({
            children: [
                DoNotEditCommentNode({}),
                PageTitleNode({
                    children: [pageTitleTextNode],
                }),
                ...getPageLinks(false).flatMap(
                    ({ headingLink, tableOfContents }) => [
                        HeadingNode({
                            children: [headingLink],
                        }),
                        tableOfContents,
                    ],
                ),
            ],
        });

        addFileToFolder(
            outFolder,
            `${packageData.packageDirectory}/README.md`,
            renderDeepCoreNodeAsMarkdown(contents),
        );
    }

    const packageSummaries = [
        ...packageDirectoryToPageSummaryMap.entries(),
    ].flatMap<DeepCoreNode>(([packageDirectory, packageSummary]) => {
        const {
            isOneIndexPagePackage,
            pageTitleTextNode,
            getPageLinks,
        } = packageSummary;

        const heading = HeadingNode({
            children: [
                LocalPageLinkNode({
                    destination: `${packageDirectory}/README`,
                    children: [pageTitleTextNode],
                }),
            ],
        });

        if (isOneIndexPagePackage) {
            const { tableOfContents } = getPageLinks(true)[0];
            return [heading, tableOfContents];
        }

        return [
            heading,
            CollapsibleSectionNode({
                summaryNode: BoldNode({
                    children: [PlainTextNode({ text: 'Table of Contents' })],
                }),
                children: getPageLinks(true).flatMap(
                    ({ headingLink, tableOfContents }) => [
                        SubheadingNode({
                            children: [headingLink],
                        }),
                        tableOfContents,
                    ],
                ),
            }),
        ];
    });

    const contents = ContainerNode<DeepCoreNode>({
        children: [
            DoNotEditCommentNode({}),
            PageTitleNode({
                children: [PlainTextNode({ text: 'Awaken API Reference' })],
            }),
            // TODO.
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...packageSummaries,
        ],
    });

    addFileToFolder(
        outFolder,
        'README.md',
        renderDeepCoreNodeAsMarkdown(contents),
    );

    return outFolder;
}