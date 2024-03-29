> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# isSource

<details><summary><b>Table of Contents</b></summary>

1. [<code>isSource</code>](#isSource)</details>

## <a name="isSource"></a><code>isSource</code>

<b>Signature - [source.ts#L562](..\/..\/packages\/core\/src\/source.ts#L562)</b>

<pre>function isSource(value: unknown): value is <a href="00-Source.md#Source-Interface">Source</a>&lt;unknown&gt;</pre>

Determines whether the given value is a <code>[Source](00-Source.md#Source)</code>.

<b>Parameters</b>

| Parameter | Type | Description |
| --- | --- | --- |
| value | <pre lang="ts">unknown</pre> | The value to check. |

<b>Returns</b>

| Type | Description |
| --- | --- |
| <pre>value is [Source](00-Source.md#Source-Interface)&lt;unknown&gt;</pre> | Whether the value is a Source. |

<b>Example Usage</b>

```ts
isSource(Sink(() => {})); // false.
isSource(Source(() => {})); // true.
isSource(Subject()); // true.
isSource(Disposable()); // false.
isSource({}); // false.
isSource(() => {}); // false.
isSource(null); // false.
```

<b>See Also</b>

- <code>[isDisposable](..\/01-api-disposable\/01-isDisposable.md#isDisposable)</code>
- <code>[isSink](03-isSink.md#isSink)</code>
- <code>[isSubject](..\/05-api-subject\/01-isSubject.md#isSubject)</code><br>

| [Previous \(Source\)](00-Source.md#readme) |
| --- |

<div align="right">

| [Next \(Sink\)](02-Sink.md#readme) |
| --- |
</div>
