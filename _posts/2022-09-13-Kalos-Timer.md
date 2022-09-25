---
layout: post
title: Kalos Timer
---

<h1>Phase <a id="phase">1</a></h1>
<h3>Hacked Machines: <a id="hackCount"></a></h3>
<h3>Time to Next Hack: <a id="hackTimer"></a></h3>
<h3>Roar: <a id="roarTimer"></a></h3>
<h3 id="instantFail" style="display:none;color:crimson">All 4 machines hacked. Time to failure: <a id="failTimer" style="display:inherit;color:salmon"></a></h3>
<h3>Bombs: <a id="bombTimer"></a></h3>
<h3>Laser: <a id="laserTimer"></a></h3>
<h3>Breath: <a id="breathTimer"></a></h3>

<script src="/scripts/kalostimer.js"> </script>

<button onClick="togglePhase(0)">Phase 1 (Click after first person loads in to start)</button> 

<button onClick="togglePhase(1)">Phase 2-1</button> <button onClick="togglePhase(2)">Phase 2-2</button> <button onClick="togglePhase(3)">Phase 2-3</button> <button onClick="togglePhase(4)">Phase 2-4</button> <button onClick="toggleTest()">Test Start</button> <button onClick="failTest()">Test Failed</button>

<button onClick="bombReset()">Start / Reset Bomb Timer</button> <button onClick="bombEnd()">Stop Bomb Timer</button> 

<button onClick="laserReset()">Start / Reset Laser Timer</button> <button onClick="laserEnd()">Stop Laser Timer</button> 

<button onClick="breathReset()">Breath Used</button>

<button onClick="roarReset()">Roar Used</button>

<button onClick="hackRecover()">Machine Cleared</button>

# How to Use

While this timer is theoretically capable of timing everything, it's not recommended for one person to time everything. There's just way too much going on. One person could use this to time bombs, and another person to time lasers, etc. Most of the timers - other than Hacks and Barrage and test - are independent of the others, so it's perfectly serviceable to have an additional 1 or 2 people in Discord timing only the things the party can't keep track of themselves.

The exact timings for Groggy aren't conclusively known yet and may cause Hack/Barrage timings to be off by up to 5 sec.

Potential upcoming features: keyboard shortcuts for the button presses, playing audio alerts.

[Kalos Pattern Explanations]({% post_url 2022-09-22-Kalos-Patterns %})