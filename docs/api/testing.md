<!-- Do not edit this file. It is automatically generated by a build script. -->

## `E`

<pre>function E(frame: number): End &amp; {     readonly frame: number; };</pre>

## `P`

<pre>function P&lt;T&gt;(value: T, frame: number): Push&lt;T&gt; &amp; {     readonly frame: number; };</pre>

## `SharedTestSource`

<pre>function SharedTestSource&lt;T&gt;(events: <a href="#testsourceevent">TestSourceEvent</a>&lt;T&gt;[], testSchedule: <a href="#testschedule">TestSchedule</a>): <a href="#sharedtestsource">SharedTestSource</a>&lt;T&gt;;</pre>

<pre>export interface SharedTestSource&lt;T&gt; extends <a href="#testsource">TestSource</a>&lt;T&gt; </pre>

## `T`

<pre>function T(error: unknown, frame: number): Throw &amp; {     readonly frame: number; };</pre>

## `TestSchedule`

<pre>function TestSchedule(): <a href="#testschedule">TestSchedule</a>;</pre>

<pre>export interface TestSchedule </pre>

## `TestSource`

<pre>function TestSource&lt;T&gt;(events: <a href="#testsourceevent">TestSourceEvent</a>&lt;T&gt;[], testSchedule: <a href="#testschedule">TestSchedule</a>): <a href="#testsource">TestSource</a>&lt;T&gt;;</pre>

<pre>export interface TestSource&lt;T&gt; extends Source&lt;T&gt; </pre>

## `TestSourceEvent`

<pre>type TestSourceEvent&lt;T&gt; = <a href="event.md">Event</a>&lt;T&gt; &amp; {     readonly frame: number; };</pre>

## `TestSourceSubscriptions`

<pre>type TestSourceSubscriptions = ReadonlyArray&lt;Readonly&lt;<a href="#testsubscriptioninfo">TestSubscriptionInfo</a>&gt;&gt;;</pre>

## `TestSubscriptionInfo`

<pre>function TestSubscriptionInfo(subscriptionStartFrame: number, subscriptionEndFrame: number): <a href="#testsubscriptioninfo">TestSubscriptionInfo</a>;</pre>

<pre>export interface TestSubscriptionInfo </pre>

## `watchSourceEvents`

<pre>function watchSourceEvents&lt;T&gt;(source: Source&lt;T&gt;, testSchedule: <a href="#testschedule">TestSchedule</a>, subscriptionInfo?: <a href="#testsubscriptioninfo">TestSubscriptionInfo</a>): <a href="#testsourceevent">TestSourceEvent</a>&lt;T&gt;[];</pre>