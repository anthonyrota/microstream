> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# withTimeInterval

<details><summary><b>Table of Contents</b></summary>

1. [<code>withTimeInterval</code>](#withTimeInterval)
   1. [<code>TimeInterval</code>](#TimeInterval)</details>

## <a name="withTimeInterval"></a><code>withTimeInterval</code>

<b>Signature - [source.ts#L3914](..\/..\/packages\/core\/src\/source.ts#L3914)</b>

<pre>function withTimeInterval&lt;T&gt;(<br>    provideTime: <a href="../07-api-utils/04-TimeProvider.md#TimeProvider">TimeProvider</a>,<br>): <a href="000-Operator.md#Operator">Operator</a>&lt;T, <a href="#TimeInterval">TimeInterval</a>&lt;T&gt;&gt;</pre>

## <a name="TimeInterval"></a><code>TimeInterval</code>

<b>Signature - [source.ts#L3902](..\/..\/packages\/core\/src\/source.ts#L3902)</b>

```ts
interface TimeInterval<T> {
    lastTime: number
    startTime: number
    time: number
    timeDifference: number
    timeSinceStart: number
    value: T
}
```
<br>

| [Previous \(withTime\)](106-withTime.md#readme) |
| --- |

<div align="right">

| [Next \(wrapInPushEvents\)](108-wrapInPushEvents.md#readme) |
| --- |
</div>
