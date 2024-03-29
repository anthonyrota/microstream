import copy from 'copy-text-to-clipboard';
import { ComponentChildren, Fragment, h, VNode } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { DeepCoreNode, CoreNodeType } from '../../script/docs/core/nodes';
import { ListType } from '../../script/docs/core/nodes/List';
import { unencodedTokenizedLines } from '../../script/docs/util/tokenizeText/util';
import { getGithubUrl, getPagesMetadata } from '../data/docPages';
import { customHistory } from '../hooks/useHistory';
import { useSizeShowMenuChange } from '../hooks/useSizeShowMenu';
import { useTheme } from '../hooks/useTheme';
import { DocPageLink } from './DocPageLink';
import { Link } from './Link';

const linkClass = 'cls-node-link';

function relativeToRootPath(relativePath: string): string {
    const currentPath = customHistory.location.pathname;
    if (relativePath[0] === '/') {
        return '/';
    }
    if (relativePath[0] === '.' && relativePath[1] === '/') {
        return (
            currentPath.replace(/\/+$/, '') +
            relativePath.slice(relativePath.slice(1).search(/[^/]/))
        );
    }
    if (
        relativePath[0] === '.' &&
        relativePath[1] === '.' &&
        relativePath[2] === '/'
    ) {
        return (
            '/' +
            currentPath.replace(/\/+[^/]*\/*$/, '') +
            relativePath.slice(relativePath.slice(2).search(/[^/]/))
        );
    }
    return currentPath + '/' + relativePath;
}

const mapChildren = (
    children: DeepCoreNode[],
    pagePath: string,
    headingRefs: { current: HTMLHeadingElement }[] | undefined,
): VNode[] =>
    children.map((childNode) => (
        <DeepCoreNodeComponent
            node={childNode}
            pagePath={pagePath}
            headingRefs={headingRefs}
        />
    ));

export interface DeepCoreNodeComponentProps {
    node: DeepCoreNode;
    pagePath: string;
    headingRefs?: { current: HTMLHeadingElement }[];
}

export function DeepCoreNodeComponent({
    node,
    pagePath,
    headingRefs,
}: DeepCoreNodeComponentProps): VNode {
    switch (node.type) {
        case CoreNodeType.Container: {
            return (
                <Fragment>
                    {mapChildren(node.children, pagePath, headingRefs)}
                </Fragment>
            );
        }
        case CoreNodeType.PlainText: {
            return <Fragment>{node.text}</Fragment>;
        }
        case CoreNodeType.HorizontalRule: {
            throw new Error();
        }
        case CoreNodeType.BlockQuote: {
            return (
                <blockquote class="cls-node-blockquote">
                    <svg
                        class="cls-node-blockquote__icon"
                        preserveAspectRatio="xMidYMid meet"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                    >
                        <g>
                            <path
                                d="M12.2 8.98c.06-.01.12-.03.18-.06.06-.02.12-.05.18-.09l.15-.12c.18-.19.29-.45.29-.71 0-.06-.01-.13-.02-.19a.603.603 0 0 0-.06-.19.757.757 0 0 0-.09-.18c-.03-.05-.08-.1-.12-.15-.28-.27-.72-.37-1.09-.21-.13.05-.23.12-.33.21-.04.05-.09.1-.12.15-.04.06-.07.12-.09.18-.03.06-.05.12-.06.19-.01.06-.02.13-.02.19 0 .26.11.52.29.71.1.09.2.16.33.21.12.05.25.08.38.08.06 0 .13-.01.2-.02M13 16v-4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0M12 3c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9m0 20C5.935 23 1 18.065 1 12S5.935 1 12 1c6.066 0 11 4.935 11 11s-4.934 11-11 11"
                                fillRule="evenodd"
                            ></path>
                        </g>
                    </svg>
                    {mapChildren(node.children, pagePath, headingRefs)}
                </blockquote>
            );
        }
        case CoreNodeType.HtmlElement: {
            throw new Error();
        }
        case CoreNodeType.Italics: {
            return (
                <i class="cls-node-italics">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </i>
            );
        }
        case CoreNodeType.Bold: {
            return (
                <b class="cls-node-bold">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </b>
            );
        }
        case CoreNodeType.Strikethrough: {
            return (
                <del class="cls-node-strikethrough">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </del>
            );
        }
        case CoreNodeType.CodeSpan: {
            return (
                <span class="cls-node-code-span">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </span>
            );
        }
        case CoreNodeType.CodeBlock: {
            const theme = useTheme();
            const codeBlockStyleMap = getPagesMetadata().codeBlockStyleMap;
            const { foreground, background, colorMap } = codeBlockStyleMap[
                theme
            ];
            const { code, tokenizedLinesMap, codeLinks, language } = node;
            const ChildNodeType$Text = 1;
            const ChildNodeType$Link = 0;
            interface ChildText {
                type: typeof ChildNodeType$Text;
                text: string;
                style: preact.JSX.HTMLAttributes<HTMLSpanElement>['style'];
            }
            interface ChildLink {
                type: typeof ChildNodeType$Link;
                pageId: string;
                hash?: string;
                children: ChildText[];
            }
            type ChildNode = ChildText | ChildLink;
            const childNodes: ChildNode[] = [];
            if (tokenizedLinesMap) {
                const tokenizedLines = unencodedTokenizedLines(
                    tokenizedLinesMap[theme],
                );
                tokenizedLines.lines.forEach((line, lineIndex) => {
                    line.tokens.forEach((token, tokenIndex) => {
                        childNodes.push({
                            type: ChildNodeType$Text,
                            text: code.slice(
                                line.startIndex + token.startIndex,
                                tokenIndex === line.tokens.length - 1
                                    ? lineIndex ===
                                      tokenizedLines.lines.length - 1
                                        ? code.length
                                        : tokenizedLines.lines[lineIndex + 1]
                                              .startIndex
                                    : line.startIndex +
                                          line.tokens[tokenIndex + 1]
                                              .startIndex,
                            ),
                            style: {
                                color: colorMap[token.color],
                                fontStyle: (token.isItalic
                                    ? 'italic'
                                    : undefined) as string,
                            },
                        });
                    });
                });
            } else {
                childNodes.push({
                    type: ChildNodeType$Text,
                    text: code,
                    style: {
                        color: foreground,
                    },
                });
            }
            const getChildNodeLength = (childNode: ChildNode) => {
                if (childNode.type === ChildNodeType$Link) {
                    let childNodeLength = 0;
                    childNode.children.forEach((textNode) => {
                        childNodeLength += textNode.text.length;
                    });
                    return childNodeLength;
                }
                return childNode.text.length;
            };
            if (codeLinks) {
                codeLinks.forEach(({ startIndex, endIndex, pageId, hash }) => {
                    let i = 0;
                    let codePos = 0;
                    while (true) {
                        const childNodeLength = getChildNodeLength(
                            childNodes[i],
                        );
                        if (codePos + childNodeLength > startIndex) {
                            break;
                        }
                        codePos += childNodeLength;
                        i++;
                    }
                    const linkChildren: ChildText[] = [];
                    const startNode = childNodes[i] as ChildText;
                    childNodes.splice(i + 1, 0, {
                        type: ChildNodeType$Link,
                        children: linkChildren,
                        pageId,
                        hash,
                    });
                    if (codePos === startIndex) {
                        childNodes.splice(i, 1);
                    } else {
                        childNodes[i] = {
                            type: ChildNodeType$Text,
                            style: startNode.style,
                            text: startNode.text.slice(0, startIndex - codePos),
                        };
                        i++;
                    }
                    i++;
                    linkChildren.push({
                        type: ChildNodeType$Text,
                        style: startNode.style,
                        text: startNode.text.slice(
                            startIndex - codePos,
                            endIndex - codePos,
                        ),
                    });
                    if (endIndex <= codePos + startNode.text.length) {
                        const endText = startNode.text.slice(
                            endIndex - codePos,
                        );
                        if (endText) {
                            childNodes.splice(i, 0, {
                                type: ChildNodeType$Text,
                                style: startNode.style,
                                text: endText,
                            });
                        }
                        return;
                    }
                    codePos += getChildNodeLength(startNode);
                    while (true) {
                        const childNode = childNodes[i];
                        const childNodeLength = getChildNodeLength(childNode);
                        if (codePos + childNodeLength > endIndex) {
                            break;
                        }
                        childNodes.splice(i, 1);
                        linkChildren.push(childNode as ChildText);
                        codePos += childNodeLength;
                    }
                    const endNode = childNodes[i] as ChildText;
                    if (codePos === endIndex) {
                        return;
                    }
                    linkChildren.push({
                        type: ChildNodeType$Text,
                        style: endNode.style,
                        text: endNode.text.slice(0, endIndex - codePos),
                    });
                    childNodes.splice(i, 1, {
                        type: ChildNodeType$Text,
                        style: endNode.style,
                        text: endNode.text.slice(endIndex - codePos),
                    });
                });
            }
            if (childNodes.length === 0) {
                throw new Error();
            }
            const lines: ChildNode[][] = [[]];
            childNodes.forEach((childNode) => {
                const lastLine = lines[lines.length - 1];
                if (childNode.type === ChildNodeType$Text) {
                    if (childNode.text.indexOf('\n') === -1) {
                        lastLine.push(childNode);
                        return;
                    }
                    const split = childNode.text.split('\n');
                    if (split[0]) {
                        lastLine.push({
                            type: ChildNodeType$Text,
                            style: childNode.style,
                            text: split[0],
                        });
                    }
                    for (let i = 1; i < split.length; i++) {
                        lines.push([
                            {
                                type: ChildNodeType$Text,
                                style: childNode.style,
                                text: split[i],
                            },
                        ]);
                    }
                    return;
                }
                const splitLink: ChildLink[] = [
                    {
                        type: ChildNodeType$Link,
                        pageId: childNode.pageId,
                        hash: childNode.hash,
                        children: [],
                    },
                ];
                childNode.children.forEach((textNode) => {
                    const lastLink = splitLink[splitLink.length - 1];
                    if (textNode.text.indexOf('\n') === -1) {
                        lastLink.children.push(textNode);
                        return;
                    }
                    const split = textNode.text.split('\n');
                    if (split[0]) {
                        lastLink.children.push({
                            type: ChildNodeType$Text,
                            style: textNode.style,
                            text: split[0],
                        });
                    }
                    for (let i = 1; i < split.length; i++) {
                        splitLink.push({
                            type: ChildNodeType$Link,
                            pageId: childNode.pageId,
                            hash: childNode.hash,
                            children: [
                                {
                                    type: ChildNodeType$Text,
                                    style: textNode.style,
                                    text: split[i] || '\n',
                                },
                            ],
                        });
                    }
                });
                lastLine.push(splitLink[0]);
                for (let i = 1; i < splitLink.length; i++) {
                    lines.push([splitLink[i]]);
                }
                return;
            });
            function renderChildNodes(
                childNodes: ChildNode[],
            ): ComponentChildren {
                return childNodes.map((childNode) => {
                    // TODO: make so that empty text nodes don't appear here.
                    if (childNode.type === ChildNodeType$Text) {
                        if (!childNode.text) {
                            return null;
                        }
                        return (
                            <span style={childNode.style}>
                                {childNode.text}
                            </span>
                        );
                    }
                    if (
                        childNode.children.every((childText) => !childText.text)
                    ) {
                        return null;
                    }
                    return (
                        <DocPageLink
                            class="cls-node-code-block__link"
                            pageId={childNode.pageId}
                            hash={childNode.hash}
                        >
                            {childNode.children.map((childText) => (
                                <span
                                    class="cls-node-code-block__link__text"
                                    style={childText.style}
                                >
                                    {childText.text}
                                </span>
                            ))}
                        </DocPageLink>
                    );
                });
            }
            interface RGB {
                red: number;
                green: number;
                blue: number;
            }
            // eg. #00FF66.
            function parseHex(hex: string): RGB {
                return {
                    red: parseInt(hex.slice(1, 3), 16),
                    green: parseInt(hex.slice(3, 5), 16),
                    blue: parseInt(hex.slice(5, 7), 16),
                };
            }
            function stringifyRgb(rgb: RGB): string {
                return `rgb(${rgb.red},${rgb.green},${rgb.blue})`;
            }
            const foregroundRgb = parseHex(colorMap[0]);
            const backgroundRgb = parseHex(colorMap[1]);
            const averagedForegroundBackground = stringifyRgb({
                red: (foregroundRgb.red + backgroundRgb.red) / 2,
                green: (foregroundRgb.green + backgroundRgb.green) / 2,
                blue: (foregroundRgb.blue + backgroundRgb.blue) / 2,
            });
            const CopyState$AllowCopy = 0;
            const CopyState$CopySuccess = 1;
            const CopyState$CopyFail = 2;
            const { 0: copyState, 1: setCopyState } = useState<
                | typeof CopyState$AllowCopy
                | typeof CopyState$CopySuccess
                | typeof CopyState$CopyFail
            >(CopyState$AllowCopy);
            const onCopyButtonClick = () => {
                const didCopy = copy(code);
                setCopyState(
                    didCopy ? CopyState$CopySuccess : CopyState$CopyFail,
                );
            };
            useEffect(() => {
                if (copyState === CopyState$AllowCopy) {
                    return;
                }
                const delay = copyState === CopyState$CopyFail ? 2000 : 1000;
                const timeoutHandle = setTimeout(() => {
                    setCopyState(CopyState$AllowCopy);
                }, delay);
                return () => {
                    clearTimeout(timeoutHandle);
                };
            }, [copyState]);
            const lineNumberStyle: Record<string, string> = {
                color: averagedForegroundBackground,
                borderRight: `1px solid ${averagedForegroundBackground}`,
            };
            return (
                <pre
                    class="cls-node-code-block"
                    data-lang={language}
                    style={{
                        backgroundColor: background,
                    }}
                >
                    <button
                        type="button"
                        class="cls-node-code-block__copy-button"
                        aria-label="Copy Code to Clipboard"
                        title="Copy Code to Clipboard"
                        aria-hidden="true"
                        disabled={copyState !== CopyState$AllowCopy}
                        tabIndex={-1}
                        onClick={onCopyButtonClick}
                    >
                        {copyState === CopyState$AllowCopy
                            ? 'Copy'
                            : copyState === CopyState$CopySuccess
                            ? 'Copied'
                            : 'Copy Failed'}
                    </button>
                    <code class="cls-node-code-block__code">
                        <span class="cls-node-code-block__accessibility-hidden-text">
                            {code}
                        </span>
                        <table aria-hidden="true">
                            <tbody>
                                {lines.map((lineChildNodes, i) => (
                                    <tr>
                                        <td
                                            class="cls-node-code-block__line-number"
                                            style={lineNumberStyle}
                                        >
                                            {i + 1}
                                        </td>
                                        <td class="cls-node-code-block__line-code">
                                            {renderChildNodes(lineChildNodes)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </code>
                </pre>
            );
        }
        case CoreNodeType.Link: {
            let Comp: 'a' | typeof Link;
            let href: string;
            if (
                node.destination.indexOf('://') > 0 ||
                node.destination.indexOf('//') === 0
            ) {
                Comp = 'a';
                href = node.destination;
            } else {
                Comp = Link;
                href = relativeToRootPath(node.destination);
            }
            return (
                <Comp class={linkClass} href={href} title={node.title}>
                    {mapChildren(node.children, pagePath, headingRefs)}
                </Comp>
            );
        }
        case CoreNodeType.DocPageLink: {
            return (
                <DocPageLink
                    class={linkClass}
                    pageId={node.pageId}
                    hash={node.hash}
                    title={node.title}
                >
                    {mapChildren(node.children, pagePath, headingRefs)}
                </DocPageLink>
            );
        }
        case CoreNodeType.GithubSourceLink: {
            return (
                <a
                    class={linkClass}
                    href={getGithubUrl(node.pathFromRoot)}
                    title={node.title}
                >
                    {mapChildren(node.children, pagePath, headingRefs)}
                </a>
            );
        }
        case CoreNodeType.Image: {
            throw new Error();
        }
        case CoreNodeType.Paragraph: {
            return (
                <p class="cls-node-paragraph">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </p>
            );
        }
        case CoreNodeType.Heading123456: {
            const Comp = `h${node.level}` as
                | 'h1'
                | 'h2'
                | 'h3'
                | 'h4'
                | 'h5'
                | 'h6';
            const ref = useRef<HTMLHeadingElement>();
            headingRefs?.push(ref);

            const { 0: isSizeShowMenu, 1: setIsSizeShowMenu } = useState(true);

            useSizeShowMenuChange(
                (isSizeShowMenu) => {
                    setIsSizeShowMenu(isSizeShowMenu);
                },
                node.alternateId !== undefined,
                true,
            );

            const children = mapChildren(node.children, pagePath, headingRefs);

            return (
                <Comp
                    class={
                        // Needs to be statically analyzed and replaced to
                        // to minified class names during production.
                        node.level === 1
                            ? 'cls-node-heading-1'
                            : node.level === 2
                            ? 'cls-node-heading-2'
                            : node.level === 3
                            ? 'cls-node-heading-3'
                            : node.level === 4
                            ? 'cls-node-heading-4'
                            : node.level === 5
                            ? 'cls-node-heading-5'
                            : 'cls-node-heading-6'
                    }
                    id={node.alternateId}
                    ref={ref}
                >
                    {node.alternateId === undefined ? (
                        children
                    ) : isSizeShowMenu ? (
                        <a
                            href={`${pagePath}#${node.alternateId}`}
                            class="cls-node-heading__clickable-content"
                            tabIndex={-1}
                        >
                            {children}
                        </a>
                    ) : (
                        <Fragment>
                            <a
                                href={`${pagePath}#${node.alternateId}`}
                                aria-hidden="true"
                                class="cls-node-heading__anchor"
                                tabIndex={-1}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    version="1.1"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                                    ></path>
                                </svg>
                            </a>
                            {children}
                        </Fragment>
                    )}
                </Comp>
            );
        }
        case CoreNodeType.Heading: {
            return (
                <DeepCoreNodeComponent
                    node={{
                        type: CoreNodeType.Heading123456,
                        alternateId: node.alternateId,
                        level: 2,
                        children: node.children,
                    }}
                    pagePath={pagePath}
                    headingRefs={headingRefs}
                />
            );
        }
        case CoreNodeType.Subheading: {
            return (
                <DeepCoreNodeComponent
                    node={{
                        type: CoreNodeType.Heading123456,
                        alternateId: node.alternateId,
                        level: 3,
                        children: node.children,
                    }}
                    pagePath={pagePath}
                    headingRefs={headingRefs}
                />
            );
        }
        case CoreNodeType.Title: {
            return (
                <DeepCoreNodeComponent
                    node={{
                        type: CoreNodeType.Heading123456,
                        alternateId: node.alternateId,
                        level: 4,
                        children: node.children,
                    }}
                    pagePath={pagePath}
                    headingRefs={headingRefs}
                />
            );
        }
        case CoreNodeType.List: {
            const children = node.children.map((childNode) => (
                <li class="cls-node-list__item">
                    <DeepCoreNodeComponent
                        node={childNode}
                        pagePath={pagePath}
                        headingRefs={headingRefs}
                    />
                </li>
            ));
            return node.listType.type === ListType.Ordered ? (
                <ol class="cls-node-ordered-list" start={node.listType.start}>
                    {children}
                </ol>
            ) : (
                <ul class="cls-node-unordered-list">{children}</ul>
            );
        }
        case CoreNodeType.Table: {
            return (
                <table class="cls-node-table">
                    <thead>
                        <tr class="cls-node-table__tr">
                            {node.header.children.map((childNode) => (
                                <th class="cls-node-table__th">
                                    <DeepCoreNodeComponent
                                        node={childNode}
                                        pagePath={pagePath}
                                        headingRefs={headingRefs}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {node.rows.map((row) => (
                            <tr class="cls-node-table__tr">
                                {row.children.map((childNode) => (
                                    <td class="cls-node-table__td">
                                        <DeepCoreNodeComponent
                                            node={childNode}
                                            pagePath={pagePath}
                                            headingRefs={headingRefs}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
        case CoreNodeType.CollapsibleSection: {
            return (
                <details class="cls-node-collapsible-section">
                    {node.summaryNode && (
                        <summary class="cls-node-collapsible-section__summary">
                            <DeepCoreNodeComponent
                                node={node.summaryNode}
                                pagePath={pagePath}
                                headingRefs={headingRefs}
                            />
                        </summary>
                    )}
                    {mapChildren(node.children, pagePath, headingRefs)}
                </details>
            );
        }
        case CoreNodeType.Subscript: {
            return (
                <sub class="cls-node-subscript">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </sub>
            );
        }
        case CoreNodeType.Superscript: {
            return (
                <sup class="cls-node-superscript">
                    {mapChildren(node.children, pagePath, headingRefs)}
                </sup>
            );
        }
        case CoreNodeType.NamedAnchor: {
            return <span id={node.name} />;
        }
        case CoreNodeType.LineBreak: {
            return <br />;
        }
        case CoreNodeType.PageTitle: {
            throw new Error();
        }
        case CoreNodeType.Page: {
            throw new Error();
        }
        default: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error Should already implement writing all node types.
            // eslint-disable-next-line max-len
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Unexpected node type ${node.type}`);
        }
    }
}
