> This file is automatically generated by a build script.<br>If you notice anything off, please feel free to open a new issue!

# Subject

<details><summary><b>Table of Contents</b></summary><br>

1. [<code>Subject</code>](#Subject) - [<code>Function</code>](#Subject-Function), [<code>Interface</code>](#Subject-Interface)
   1. [<code>isSubject</code>](#isSubject)
   2. [<code>SubjectDistributionSinkDisposalError</code>](#SubjectDistributionSinkDisposalError) - [<code>Interface</code>](#SubjectDistributionSinkDisposalError-Interface), [<code>Variable</code>](#SubjectDistributionSinkDisposalError-Variable)
   3. [<code>SubjectDistributionSinkDisposalErrorConstructor</code>](#SubjectDistributionSinkDisposalErrorConstructor)
   4. [<code>markAsSubject</code>](#markAsSubject)</details>

## <a name="Subject"></a><code>Subject</code>

### <a name="Subject-Function"></a><code>Subject - Function</code>

> Source Location: [packages\/core\/src\/subject.ts#L333](..\/..\/packages\/core\/src\/subject.ts#L333)

<b>Signature</b>

<pre>function Subject&lt;T&gt;(): <a href="#Subject-Interface">Subject</a>&lt;T&gt;</pre>

### <a name="Subject-Interface"></a><code>Subject - Interface</code>

> Source Location: [packages\/core\/src\/subject.ts#L28](..\/..\/packages\/core\/src\/subject.ts#L28)

<b>Signature</b>

<pre>interface Subject&lt;T&gt; extends <a href="../01-api-basics/03-Source.md#Source-Interface">Source</a>&lt;T&gt;, <a href="../01-api-basics/02-Sink.md#Sink-Interface">Sink</a>&lt;T&gt; {<br>    (eventOrSink: <a href="../01-api-basics/01-Event.md#Event">Event</a>&lt;T&gt; | <a href="../01-api-basics/02-Sink.md#Sink-Interface">Sink</a>&lt;T&gt;): void<br>}</pre>

## <a name="isSubject"></a><code>isSubject</code>

> Source Location: [packages\/core\/src\/subject.ts#L66](..\/..\/packages\/core\/src\/subject.ts#L66)

<b>Signature</b>

<pre>function isSubject(value: unknown): value is <a href="#Subject-Interface">Subject</a>&lt;unknown&gt;</pre>

Determines whether the given value is a <code>[Subject](#Subject)</code>.

<b>Parameters</b>

| Parameter | Type | Description |
| --- | --- | --- |
| value | <pre lang="ts">unknown</pre> | The value to check. |

<b>Returns</b>

| Type | Description |
| --- | --- |
| <pre>value is [Subject](#Subject-Interface)&lt;unknown&gt;</pre> | Whether the value is a Subject. |

<b>Example Usage</b>

```ts
isSubject(Sink(() => {})); // false.
isSubject(Source(() => {})) // false.
isSubject(Subject()); // true.
isSubject(Disposable()); // false.
isSubject({}); // false.
isSubject(() => {}); // false.
isSubject(null); // false.
```

<b>See Also</b>

- <code>[isDisposable](..\/01-api-basics\/00-Disposable.md#isDisposable)</code>
- <code>[isSink](..\/01-api-basics\/02-Sink.md#isSink)</code>
- <code>[isSource](..\/01-api-basics\/03-Source.md#isSource)</code>

## <a name="SubjectDistributionSinkDisposalError"></a><code>SubjectDistributionSinkDisposalError</code>

### <a name="SubjectDistributionSinkDisposalError-Interface"></a><code>SubjectDistributionSinkDisposalError - Interface</code>

> Source Location: [packages\/core\/src\/subject.ts#L292](..\/..\/packages\/core\/src\/subject.ts#L292)

<b>Signature</b>

<pre>interface SubjectDistributionSinkDisposalError {<br>    readonly errors: <a href="../01-api-basics/00-Disposable.md#DisposalError-Interface">DisposalError</a>[]<br>}</pre>

### <a name="SubjectDistributionSinkDisposalError-Variable"></a><code>SubjectDistributionSinkDisposalError - Variable</code>

> Source Location: [packages\/core\/src\/subject.ts#L314](..\/..\/packages\/core\/src\/subject.ts#L314)

<b>Signature</b>

<pre>var SubjectDistributionSinkDisposalError: <a href="#SubjectDistributionSinkDisposalErrorConstructor">SubjectDistributionSinkDisposalErrorConstructor</a></pre>

Thrown when at least least one error is caught during the checking of whether a subscribed sink is active or not.

## <a name="SubjectDistributionSinkDisposalErrorConstructor"></a><code>SubjectDistributionSinkDisposalErrorConstructor</code>

> Source Location: [packages\/core\/src\/subject.ts#L302](..\/..\/packages\/core\/src\/subject.ts#L302)

<b>Signature</b>

<pre>interface SubjectDistributionSinkDisposalErrorConstructor {<br>    new (errors: <a href="../01-api-basics/00-Disposable.md#DisposalError-Interface">DisposalError</a>[]): <a href="#SubjectDistributionSinkDisposalError-Interface">SubjectDistributionSinkDisposalError</a><br>    prototype: <a href="#SubjectDistributionSinkDisposalError-Interface">SubjectDistributionSinkDisposalError</a><br>}</pre>

## <a name="markAsSubject"></a><code>markAsSubject</code>

> Source Location: [packages\/core\/src\/subject.ts#L36](..\/..\/packages\/core\/src\/subject.ts#L36)

<b>Signature</b>

<pre>function markAsSubject&lt;T&gt;(<br>    subjectFunction: ((eventOrSink: <a href="../01-api-basics/01-Event.md#Event">Event</a>&lt;T&gt; | <a href="../01-api-basics/02-Sink.md#Sink-Interface">Sink</a>&lt;T&gt;) =&gt; void) & <a href="../01-api-basics/00-Disposable.md#Disposable-Interface">Disposable</a>,<br>): <a href="#Subject-Interface">Subject</a>&lt;T&gt;</pre><br>

| [Previous \(zipWith\)](..\/03-api-operators\/104-zipWith.md#readme) |
| --- |

<div align="right">

| [Next \(CurrentValueSubject\)](01-CurrentValueSubject.md#readme) |
| --- |
</div>