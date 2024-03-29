> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# debounce

<details><summary><b>Table of Contents</b></summary>

1. [<code>debounce</code>](#debounce)
   1. [<code>DebounceConfig</code>](#DebounceConfig)
   2. [<code>defaultDebounceConfig</code>](#defaultDebounceConfig)
   3. [<code>InitialDurationInfo</code>](#InitialDurationInfo)
   4. [<code>DebounceTrailingRestart</code>](#DebounceTrailingRestart) - [<code>Type</code>](#DebounceTrailingRestart-TypeAlias), [<code>Variable</code>](#DebounceTrailingRestart-Variable)</details>

## <a name="debounce"></a><code>debounce</code>

<b>Signature - [source.ts#L3489](..\/..\/packages\/core\/src\/source.ts#L3489)</b>

<pre>function debounce&lt;T&gt;(<br>    getDurationSource: (value: T, index: number) =&gt; <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;unknown&gt;,<br>    getInitialDurationRange?:<br>        | ((firstDebouncedValue: T, index: number) =&gt; <a href="#InitialDurationInfo">InitialDurationInfo</a>)<br>        | null,<br>    config?: <a href="#DebounceConfig">DebounceConfig</a> | null,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;T, T&gt;</pre>

<pre>function debounce&lt;T&gt;(<br>    getDurationSource: undefined | null,<br>    getInitialDurationRange: (<br>        firstDebouncedValue: T,<br>        index: number,<br>    ) =&gt; <a href="#InitialDurationInfo">InitialDurationInfo</a>,<br>    config?: <a href="#DebounceConfig">DebounceConfig</a> | null,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;T, T&gt;</pre>

## <a name="DebounceConfig"></a><code>DebounceConfig</code>

<b>Signature - [source.ts#L3440](..\/..\/packages\/core\/src\/source.ts#L3440)</b>

<pre>interface DebounceConfig {<br>    emitPendingOnEnd?: boolean | null<br>    leading?: boolean | null<br>    trailing?: boolean | <a href="#DebounceTrailingRestart-TypeAlias">DebounceTrailingRestart</a> | null<br>}</pre>

## <a name="defaultDebounceConfig"></a><code>defaultDebounceConfig</code>

<b>Signature - [source.ts#L3449](..\/..\/packages\/core\/src\/source.ts#L3449)</b>

<pre>var defaultDebounceConfig: <a href="#DebounceConfig">DebounceConfig</a></pre>

## <a name="InitialDurationInfo"></a><code>InitialDurationInfo</code>

<b>Signature - [source.ts#L3458](..\/..\/packages\/core\/src\/source.ts#L3458)</b>

<pre>type InitialDurationInfo =<br>    | [<a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;unknown&gt;, (<a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;unknown&gt; | undefined | null)?]<br>    | [undefined | null, <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;unknown&gt;]</pre>

## <a name="DebounceTrailingRestart"></a><code>DebounceTrailingRestart</code>

### <a name="DebounceTrailingRestart-TypeAlias"></a><code>DebounceTrailingRestart - Type</code>

<b>Signature - [source.ts#L3431](..\/..\/packages\/core\/src\/source.ts#L3431)</b>

```ts
type DebounceTrailingRestart = 'restart'
```

### <a name="DebounceTrailingRestart-Variable"></a><code>DebounceTrailingRestart - Variable</code>

<b>Signature - [source.ts#L3435](..\/..\/packages\/core\/src\/source.ts#L3435)</b>

<pre>var DebounceTrailingRestart: <a href="#DebounceTrailingRestart-TypeAlias">DebounceTrailingRestart</a></pre><br>

| [Previous \(count\)](014-count.md#readme) |
| --- |

<div align="right">

| [Next \(debounceMs\)](016-debounceMs.md#readme) |
| --- |
</div>
