> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# zipWith

<details><summary><b>Table of Contents</b></summary>

1. [<code>zipWith</code>](#zipWith)</details>

## <a name="zipWith"></a><code>zipWith</code>

<b>Signature - [source.ts#L1451](..\/..\/packages\/core\/src\/source.ts#L1451)</b>

<pre>function zipWith&lt;T extends unknown[]&gt;(<br>    sources: {<br>        [K in keyof T]: <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;T[K]&gt;<br>    },<br>): &lt;U&gt;(source: <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;U&gt;) =&gt; <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;[U, ...T]&gt;</pre><br>

| [Previous \(wrapInPushEvents\)](108-wrapInPushEvents.md#readme) |
| --- |

<div align="right">

| [Next \(Subject\)](..\/05-api-subject\/00-Subject.md#readme) |
| --- |
</div>
