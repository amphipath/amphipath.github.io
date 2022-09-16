---
layout: post
title: Kalos Timer
---

<h1>Phase <a id="phase">1</a></h1>
<h3>Bombs: <a id="bombTimer"></a></h3>
<h3>Laser: <a id="laserTimer"></a></h3>
<h3>Breath: <a id="breathTimer"></a></h3>

<script src="/scripts/kalostimer.js"> </script>

<button onClick="togglePhase(0)">Phase 1</button> <button onClick="togglePhase(1)">Phase 2-1</button> <button onClick="togglePhase(2)">Phase 2-2</button> <button onClick="togglePhase(3)">Phase 2-3</button> <button onClick="togglePhase(4)">Phase 2-4</button>

<button onClick="bombReset()">Start / Reset Bomb Timer</button> <button onClick="bombEnd()">Stop Bomb Timer</button> 

<button onClick="laserReset()">Start / Reset Laser Timer</button> <button onClick="laserEnd()">Stop Laser Timer</button> 

<button onClick="breathReset()">Breath Used</button>