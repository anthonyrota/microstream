> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# withLatestFromLazy

<details><summary><b>Table of Contents</b></summary>

1. [<code>withLatestFromLazy</code>](#withLatestFromLazy)</details>

## <a name="withLatestFromLazy"></a><code>withLatestFromLazy</code>

<b>Signature - [source.ts#L1465](..\/..\/packages\/core\/src\/source.ts#L1465)</b>

<pre>function withLatestFromLazy&lt;T extends unknown[]&gt;(<br>    getSources: () =&gt; {<br>        [K in keyof T]: <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;T[K]&gt;<br>    },<br>): &lt;U&gt;(source: <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;U&gt;) =&gt; <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;[U, ...T]&gt;</pre><br>

| [Previous \(withLatestFrom\)](103-withLatestFrom.md#readme) |
| --- |

<div align="right">

| [Next \(withPrevious\)](105-withPrevious.md#readme) |
| --- |
</div>
