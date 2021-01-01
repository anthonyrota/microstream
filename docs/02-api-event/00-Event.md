> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# Event

<details><summary><b>Table of Contents</b></summary>

1. [<code>Event</code>](#Event)
   1. [<code>EventType</code>](#EventType)</details>

## <a name="Event"></a><code>Event</code>

> Source Location: [packages\/core\/src\/source.ts#L117](..\/..\/packages\/core\/src\/source.ts#L117)

<b>Signature</b>

<pre>type Event&lt;T&gt; = <a href="01-Push.md#Push-Interface">Push</a>&lt;T&gt; | <a href="02-Throw.md#Throw-Interface">Throw</a> | <a href="03-End.md#End-Interface">End</a></pre>

This is the base construct for distributing values\/messages. All things pushed and received to and from <code>[Sinks](..\/03-api-source\/02-Sink.md#Sink)</code> will be events. An event is an object which consists of a <code>type</code> field, which determines the type of the event. There are three types of events: <code>[Push](01-Push.md#Push)</code>, <code>[Throw](02-Throw.md#Throw)</code> and <code>[End](03-End.md#End)</code> events:

- A Push event represents the &quot;pushing&quot; of a value to a sink, and has a <code>value</code> field equal to the value the event is carrying.

- A Throw represents the &quot;throwing&quot; of an error, and has an <code>error</code> field equal to the error the event is carrying. After a Sink receives an Error event, it will be disposed and will not take any more events.

- An End event represents the &quot;end&quot; of a source, and has no additional properties. After a Sink receives an End event, it will be disposed and will not take any more events.

When determining an event's type, you should <b>always</b> use either <code>[PushType](01-Push.md#PushType)</code>, <code>[ThrowType](02-Throw.md#ThrowType)</code> or <code>[EndType](03-End.md#EndType)</code> directly instead of their constant number values.

<b>Example Usage</b>

```ts
const sink = Sink<number>(event => {
    console.log(event.type); // Either `PushType`, `ThrowType` or `EndType`.
    if (event.type === PushType) {
        // In this case event.value this will be of type `number`.
        console.log('value:', event.value);
    } else if (event.type === ThrowType) {
        const error = event.error; // This is of type `unknown`.
        console.log('error', event.error);
    }
});
sink(Push(2)); // `${PushType}`, value: 2.
sink(Throw(new Error('...'))); // `${ThrowType}`, Error(...).
```

<b>See Also</b>

- <code>[Source](..\/03-api-source\/00-Source.md#Source)</code>
- <code>[Sink](..\/03-api-source\/02-Sink.md#Sink)</code>

## <a name="EventType"></a><code>EventType</code>

> Source Location: [packages\/core\/src\/source.ts#L48](..\/..\/packages\/core\/src\/source.ts#L48)

<b>Signature</b>

<pre>type EventType = <a href="01-Push.md#PushType-TypeAlias">PushType</a> | <a href="02-Throw.md#ThrowType-TypeAlias">ThrowType</a> | <a href="03-End.md#EndType-TypeAlias">EndType</a></pre><br>

| [Previous \(implDisposableMethods\)](..\/01-api-disposable\/05-implDisposableMethods.md#readme) |
| --- |

<div align="right">

| [Next \(Push\)](01-Push.md#readme) |
| --- |
</div>