> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# findWithIndex

<details><summary><b>Table of Contents</b></summary>

1. [<code>findWithIndex</code>](#findWithIndex)</details>

## <a name="findWithIndex"></a><code>findWithIndex</code>

> Source Location: [packages\/core\/src\/source.ts#L1652](..\/..\/packages\/core\/src\/source.ts#L1652)

<b>Signature</b>

<pre>function findWithIndex&lt;T, S extends T&gt;(<br>    predicate: (value: T, index: number) =&gt; value is S,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;<br>    T,<br>    {<br>        value: S<br>        index: number<br>    }<br>&gt;</pre>

<pre>function findWithIndex&lt;T&gt;(<br>    predicate: (value: T, index: number) =&gt; unknown,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;<br>    T,<br>    {<br>        value: T<br>        index: number<br>    }<br>&gt;</pre><br>

| [Previous \(findIndex\)](029-findIndex.md#readme) |
| --- |

<div align="right">

| [Next \(first\)](031-first.md#readme) |
| --- |
</div>