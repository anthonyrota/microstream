> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# TestSource

<details><summary><b>Table of Contents</b></summary>

1. [<code>TestSource</code>](#TestSource) - [<code>Function</code>](#TestSource-Function), [<code>Interface</code>](#TestSource-Interface)</details>

## <a name="TestSource"></a><code>TestSource</code>

### <a name="TestSource-Function"></a><code>TestSource - Function</code>

<b>Signature - [index.ts#L232](..\/..\/packages\/testing\/src\/index.ts#L232)</b>

<pre>function TestSource&lt;T&gt;(<br>    events: <a href="02-TestSourceEvent.md#TestSourceEvent">TestSourceEvent</a>&lt;T&gt;[],<br>    testSchedule: <a href="05-TestSchedule.md#TestSchedule-Interface">TestSchedule</a>,<br>): <a href="#TestSource-Interface">TestSource</a>&lt;T&gt;</pre>

### <a name="TestSource-Interface"></a><code>TestSource - Interface</code>

<b>Signature - [index.ts#L225](..\/..\/packages\/testing\/src\/index.ts#L225)</b>

<pre>interface TestSource&lt;T&gt; extends <a href="../03-api-source/00-Source.md#Source-Interface">Source</a>&lt;T&gt; {<br>    readonly subscriptions: <a href="04-TestSourceSubscriptions.md#TestSourceSubscriptions">TestSourceSubscriptions</a><br>}</pre><br>

| [Previous \(TimeProvider\)](..\/07-api-utils\/04-TimeProvider.md#readme) |
| --- |

<div align="right">

| [Next \(SharedTestSource\)](01-SharedTestSource.md#readme) |
| --- |
</div>
