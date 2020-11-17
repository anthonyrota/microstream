> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# reduce

<details><summary><b>Table of Contents</b></summary><br>

1. [<code>reduce</code>](#reduce)</details>

## <a name="reduce"></a><code>reduce</code>

> Source Location: [packages\/core\/src\/source.ts#L1840](..\/..\/packages\/core\/src\/source.ts#L1840)

<b>Signature</b>

<pre>function reduce&lt;T, R, I&gt;(<br>    transform: (<br>        previousAccumulatedResult: R | I,<br>        currentValue: T,<br>        currentIndex: number,<br>    ) =&gt; R,<br>    initialValue: I,<br>): <a href="../01-api-basics/04-Operator.md#Operator">Operator</a>&lt;T, R&gt;</pre>

Calls the specified transform function for all the values pushed by the given source. The return value of the transform function is the accumulated result, and is provided as an argument in the next call to the transform function. The accumulated result will be emitted as a Push event once the given source ends.

<b>Parameters</b>

| Parameter | Type | Description |
| --- | --- | --- |
| transform | <pre>(<br>    previousAccumulatedResult: R &#124; I,<br>    currentValue: T,<br>    currentIndex: number,<br>) =&gt; R</pre> | A function that transforms the previousAccumulatedResult \(last value returned by this function\), the currentValue of the emitted Push event and the currentIndex, and returns an accumulated result. |
| initialValue | <pre lang="ts">I</pre> | This is used as the initial value to start the accumulation. The first call to the transform function provides this as the previousAccumulatedResult. |
<br>

| [Previous \(raceWith\)](050-raceWith.md#readme) |
| --- |

<div align="right">

| [Next \(repeat\)](052-repeat.md#readme) |
| --- |
</div>