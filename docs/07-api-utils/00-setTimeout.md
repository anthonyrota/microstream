> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# setTimeout

<details><summary><b>Table of Contents</b></summary>

1. [<code>setTimeout</code>](#setTimeout)</details>

## <a name="setTimeout"></a><code>setTimeout</code>

<b>Signature - [util.ts#L168](..\/..\/packages\/core\/src\/util.ts#L168)</b>

<pre>declare function setTimeoutImplementation&lt;T extends any[]&gt;(<br>    callback: (...args: T) =&gt; void,<br>    delayMs?: number,<br>    subscription?: <a href="../01-api-disposable/00-Disposable.md#Disposable-Interface">Disposable</a>,<br>    ...args: T<br>): void</pre>

Disposable-based alternative to built-in <code>setTimeout</code>.

<b>Parameters</b>

| Parameter | Type | Description |
| --- | --- | --- |
| callback | <pre lang="ts">(...args: T) =&gt; void</pre> | The callback to schedule. |
| delayMs | <pre lang="ts">number</pre> | The amount of delay. |
| subscription | <pre>[Disposable](../01-api-disposable/00-Disposable.md#Disposable-Interface)</pre> | If this is disposed then the request will be cancelled. |
| args | <pre lang="ts">T</pre> | The arguments to send to the callback. |
<br>

| [Previous \(scheduleSync\)](..\/06-api-schedule-functions\/09-scheduleSync.md#readme) |
| --- |

<div align="right">

| [Next \(setInterval\)](01-setInterval.md#readme) |
| --- |
</div>
