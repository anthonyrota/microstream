> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# ScheduleQueuedDiscrete

<details><summary><b>Table of Contents</b></summary><br>

1. [<code>ScheduleQueuedDiscrete</code>](#ScheduleQueuedDiscrete)</details>

## <a name="ScheduleQueuedDiscrete"></a><code>ScheduleQueuedDiscrete</code>

> Source Location: [packages\/core\/src\/schedule.ts#L176](..\/..\/packages\/core\/src\/schedule.ts#L176)

<b>Signature</b>

<pre>function ScheduleQueuedDiscrete&lt;T extends any[] = []&gt;(<br>    schedule: (<br>        callback: (...args: T) =&gt; void,<br>        subscription: <a href="../01-api-basics/00-Disposable.md#Disposable-Interface">Disposable</a>,<br>    ) =&gt; void,<br>): <a href="00-ScheduleFunction.md#ScheduleFunction">ScheduleFunction</a>&lt;T&gt;</pre><br>

| [Previous \(ScheduleQueued\)](03-ScheduleQueued.md#readme) |
| --- |

<div align="right">

| [Next \(ScheduleSyncQueued\)](05-ScheduleSyncQueued.md#readme) |
| --- |
</div>