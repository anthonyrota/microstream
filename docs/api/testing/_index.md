---
title: API Reference
table_of_contents:
  - text: TestSource
    url_hash_text: testsource
    inline_references:
      - text: Function
        url_hash_text: testsource-function
      - text: Interface
        url_hash_text: testsource-interface
  - text: SharedTestSource
    url_hash_text: sharedtestsource
    inline_references:
      - text: Function
        url_hash_text: sharedtestsource-function
      - text: Interface
        url_hash_text: sharedtestsource-interface
  - text: TestSourceEvent
    url_hash_text: testsourceevent
  - text: TestSubscriptionInfo
    url_hash_text: testsubscriptioninfo
    inline_references:
      - text: Function
        url_hash_text: testsubscriptioninfo-function
      - text: Interface
        url_hash_text: testsubscriptioninfo-interface
  - text: TestSourceSubscriptions
    url_hash_text: testsourcesubscriptions
  - text: TestSchedule
    url_hash_text: testschedule
    inline_references:
      - text: Function
        url_hash_text: testschedule-function
      - text: Interface
        url_hash_text: testschedule-interface
  - text: watchSourceEvents
    url_hash_text: watchsourceevents
  - text: P
    url_hash_text: p
  - text: T
    url_hash_text: t
  - text: E
    url_hash_text: e
---

<!-- Do not edit this file. It is automatically generated by a build script. -->

## `TestSource`

<a name="testsource-function"></a>

### `TestSource - Function`

#### Signature
<pre>function TestSource&lt;T&gt;(events: <a href="#testsourceevent">TestSourceEvent</a>&lt;T&gt;[], testSchedule: <a href="#testschedule-interface">TestSchedule</a>): <a href="#testsource-interface">TestSource</a>&lt;T&gt;;</pre>

<a name="testsource-interface"></a>

### `TestSource - Interface`

#### Signature
<pre>interface TestSource&lt;T&gt; extends <a href="../core/_index.md#source-interface">Source</a>&lt;T&gt; </pre>

## `SharedTestSource`

<a name="sharedtestsource-function"></a>

### `SharedTestSource - Function`

#### Signature
<pre>function SharedTestSource&lt;T&gt;(events: <a href="#testsourceevent">TestSourceEvent</a>&lt;T&gt;[], testSchedule: <a href="#testschedule-interface">TestSchedule</a>): <a href="#sharedtestsource-interface">SharedTestSource</a>&lt;T&gt;;</pre>

<a name="sharedtestsource-interface"></a>

### `SharedTestSource - Interface`

#### Signature
<pre>interface SharedTestSource&lt;T&gt; extends <a href="#testsource-interface">TestSource</a>&lt;T&gt; </pre>

## `TestSourceEvent`

#### Signature
<pre>type TestSourceEvent&lt;T&gt; = <a href="../core/_index.md#event">Event</a>&lt;T&gt; &amp; { readonly frame: number; };</pre>

## `TestSubscriptionInfo`

<a name="testsubscriptioninfo-function"></a>

### `TestSubscriptionInfo - Function`

#### Signature
<pre>function TestSubscriptionInfo(subscriptionStartFrame: number, subscriptionEndFrame: number): <a href="#testsubscriptioninfo-interface">TestSubscriptionInfo</a>;</pre>

<a name="testsubscriptioninfo-interface"></a>

### `TestSubscriptionInfo - Interface`

#### Signature
<pre>interface TestSubscriptionInfo </pre>

## `TestSourceSubscriptions`

#### Signature
<pre>type TestSourceSubscriptions = ReadonlyArray&lt;Readonly&lt;<a href="#testsubscriptioninfo-interface">TestSubscriptionInfo</a>&gt;&gt;;</pre>

## `TestSchedule`

<a name="testschedule-function"></a>

### `TestSchedule - Function`

#### Signature
<pre>function TestSchedule(): <a href="#testschedule-interface">TestSchedule</a>;</pre>

<a name="testschedule-interface"></a>

### `TestSchedule - Interface`

#### Signature
<pre>interface TestSchedule </pre>

## `watchSourceEvents`

#### Signature
<pre>function watchSourceEvents&lt;T&gt;(source: <a href="../core/_index.md#source-interface">Source</a>&lt;T&gt;, testSchedule: <a href="#testschedule-interface">TestSchedule</a>, subscriptionInfo?: <a href="#testsubscriptioninfo-interface">TestSubscriptionInfo</a>): <a href="#testsourceevent">TestSourceEvent</a>&lt;T&gt;[];</pre>

## `P`

#### Signature
<pre>function P&lt;T&gt;(value: T, frame: number): <a href="../core/_index.md#push-interface">Push</a>&lt;T&gt; &amp; { readonly frame: number; };</pre>

## `T`

#### Signature
<pre>function T(error: unknown, frame: number): <a href="../core/_index.md#throw-interface">Throw</a> &amp; { readonly frame: number; };</pre>

## `E`

#### Signature
<pre>function E(frame: number): <a href="../core/_index.md#end-interface">End</a> &amp; { readonly frame: number; };</pre>
