> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# combineSources

<details><summary><b>Table of Contents</b></summary><br>

1. [<code>combineSources</code>](#combineSources)</details>

## <a name="combineSources"></a><code>combineSources</code>

> Source Location: [packages\/core\/src\/source.ts#L1174](..\/..\/packages\/core\/src\/source.ts#L1174)

<b>Signature</b>

<pre>function combineSources&lt;T extends unknown[]&gt;(<br>    sources: {<br>        [K in keyof T]: <a href="../01-api-basics/03-Source.md#Source-Interface">Source</a>&lt;T[K]&gt;<br>    },<br>): <a href="../01-api-basics/03-Source.md#Source-Interface">Source</a>&lt;T&gt;</pre><br>

| [Previous \(animationFrames\)](01-animationFrames.md#readme) |
| --- |

<div align="right">

| [Next \(concatSources\)](03-concatSources.md#readme) |
| --- |
</div>