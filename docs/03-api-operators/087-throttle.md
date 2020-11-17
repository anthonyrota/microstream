> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# throttle

<details><summary><b>Table of Contents</b></summary><br>

1. [<code>throttle</code>](#throttle)
   1. [<code>ThrottleConfig</code>](#ThrottleConfig)
   2. [<code>defaultThrottleConfig</code>](#defaultThrottleConfig)</details>

## <a name="throttle"></a><code>throttle</code>

> Source Location: [packages\/core\/src\/source.ts#L3634](..\/..\/packages\/core\/src\/source.ts#L3634)

<b>Signature</b>

<pre>function throttle(<br>    getDurationSource: () =&gt; <a href="../01-api-basics/03-Source.md#Source-Interface">Source</a>&lt;unknown&gt;,<br>    config?: <a href="#ThrottleConfig">ThrottleConfig</a> | null,<br>): <a href="../01-api-basics/04-Operator.md#IdentityOperator">IdentityOperator</a></pre>

<pre>function throttle&lt;T&gt;(<br>    getDurationSource: (value: T, index: number) =&gt; <a href="../01-api-basics/03-Source.md#Source-Interface">Source</a>&lt;unknown&gt;,<br>    config?: <a href="#ThrottleConfig">ThrottleConfig</a> | null,<br>): <a href="../01-api-basics/04-Operator.md#Operator">Operator</a>&lt;T, T&gt;</pre>

## <a name="ThrottleConfig"></a><code>ThrottleConfig</code>

> Source Location: [packages\/core\/src\/source.ts#L3605](..\/..\/packages\/core\/src\/source.ts#L3605)

<b>Signature</b>

```ts
interface ThrottleConfig {
    emitPendingOnEnd?: boolean | null
    leading?: boolean | null
    trailing?: boolean | null
}
```

## <a name="defaultThrottleConfig"></a><code>defaultThrottleConfig</code>

> Source Location: [packages\/core\/src\/source.ts#L3614](..\/..\/packages\/core\/src\/source.ts#L3614)

<b>Signature</b>

<pre>var defaultThrottleConfig: <a href="#ThrottleConfig">ThrottleConfig</a></pre><br>

| [Previous \(takeWhile\)](086-takeWhile.md#readme) |
| --- |

<div align="right">

| [Next \(throttleMs\)](088-throttleMs.md#readme) |
| --- |
</div>