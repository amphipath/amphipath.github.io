---
layout: post
title: Kalos Timer
---

<h1>Phase <a id="phase">1</a></h1>

<script>
    var phase = 0;
    var phasemap = ['1','2-1','2-2','2-3','2-4']
    function togglePhase() {
            if (phase < 4) {
                phase++;
            }
            document.getElementById("phase").innerHTML = phasemap[phase];
    };
    </script>

<button onClick="togglePhase()">Phase</button>