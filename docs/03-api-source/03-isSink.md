> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# isSink

<details><summary><b>Table of Contents</b></summary>

1. [<code>isSink</code>](#isSink)</details>

## <a name="isSink"></a><code>isSink</code>

<b>Signature - [source.ts#L347](..\/..\/packages\/core\/src\/source.ts#L347)</b>

<pre>function isSink(value: unknown): value is <a href="02-Sink.md#Sink-Interface">Sink</a>&lt;unknown&gt;</pre>

Determines whether the given value is a <code>[Sink](02-Sink.md#Sink)</code>.

<b>Parameters</b>

| Parameter | Type | Description |
| --- | --- | --- |
| value | <pre lang="ts">unknown</pre> | The value to check. |

<b>Returns</b>

| Type | Description |
| --- | --- |
| <pre>value is [Sink](02-Sink.md#Sink-Interface)&lt;unknown&gt;</pre> | Whether the value is a Sink. |

<b>Example Usage</b>

```ts
isSink(Sink(() => {})); // true.
isSink(Source(() => {})) // false.
isSink(Subject()); // true.
isSink(Disposable()); // false.
isSink({}); // false.
isSink(() => {}); // false.
isSink(null); // false.
```

<b>See Also</b>

- <code>[isDisposable](..\/01-api-disposable\/01-isDisposable.md#isDisposable)</code>
- <code>[isSource](01-isSource.md#isSource)</code>
- <code>[isSubject](..\/05-api-subject\/01-isSubject.md#isSubject)</code><br>

| [Previous \(Sink\)](02-Sink.md#readme) |
| --- |

<div align="right">

| [Next \(subscribe\)](04-subscribe.md#readme) |
| --- |
</div>
