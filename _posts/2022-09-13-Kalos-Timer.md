---
layout: post
title: Kalos Timer
---

<h1>Phase <a id="phase">1</a></h1>
<h3> Bombs: <a id="bombTimer"></a></h3>
<h3> Laser: <a id="laserTimer"></a></h3>

<script>
    var phase = 0;
    var phasemap = ['1','2-1','2-2','2-3','2-4']
    function togglePhase(n) {
            phase = n;
            document.getElementById("phase").innerHTML = phasemap[phase];
    };
    var bombEta = 0;
    var bombTimerID = 0;
    var laserEta = 0;
    function bombTick(){
        if(bombEta < 100){
            bombEta = 11000;
        };
        bombEta -= 100;

        if(bombEta < 2000) {
            document.getElementById("bombTimer").innerHTML = '<span style="color:red">' + bombEta/1000 + '</span>'
        }
        else {
            document.getElementById("bombTimer").innerHTML = bombEta/1000
        };
    };
    function bombReset(){
        bombEta = 11000;
        if(bombTimerID == 0){
            bombTimerID = setInterval(bombTick,100);
        };
    };
    function bombEnd(){
        bombEta =0;
        clearInterval(bombTimerID);
        bombTimerID = 0;
        document.getElementById("bombTimer").innerHTML = '';
    };
    </script>

<button onClick="togglePhase(0)">Phase 1</button> <button onClick="togglePhase(1)">Phase 2-1</button> <button onClick="togglePhase(2)">Phase 2-2</button> <button onClick="togglePhase(3)">Phase 2-3</button> <button onClick="togglePhase(4)">Phase 2-4</button>

<button onClick="bombReset()">Start / Reset Bomb Timer</button> <button onClick="bombEnd()">Stop Bomb Timer</button> 