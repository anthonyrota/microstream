> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# distinctFromLast

<details><summary><b>Table of Contents</b></summary>

1. [<code>distinctFromLast</code>](#distinctFromLast)</details>

## <a name="distinctFromLast"></a><code>distinctFromLast</code>

> Source Location: [packages\/core\/src\/source.ts#L2490](..\/..\/packages\/core\/src\/source.ts#L2490)

<b>Signature</b>

<pre>function distinctFromLast(): <a href="001-IdentityOperator.md#IdentityOperator">IdentityOperator</a></pre>

<pre>function distinctFromLast&lt;T&gt;(<br>    isDifferent: (keyA: T, keyB: T, currentIndex: number) =&gt; unknown,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;T, T&gt;</pre>

<pre>function distinctFromLast&lt;T, K&gt;(<br>    isDifferent:<br>        | ((keyA: K, keyB: K, currentIndex: number) =&gt; unknown)<br>        | undefined,<br>    getKey: (value: T) =&gt; K,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;T, T&gt;</pre><br>

| [Previous \(distinct\)](021-distinct.md#readme) |
| --- |

<div align="right">

| [Next \(endWith\)](023-endWith.md#readme) |
| --- |
</div>