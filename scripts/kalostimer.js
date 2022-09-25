var phase = 0;
var phasemap = ['1','2-1','2-2','2-3','2-4'];
var bombEta = 0;
var bombTimerID = 0;
var laserEta = 0;
var laserTimerID = 0;
var breathEta = 0;
var breathTimerID = 0;
var roarEta = 0;
var roarTimerID = 0;
var hackCount = 0;
var hackTimerID = 0;
var hackEta = 0;
var failEta = 0;
var failTimerID = 0;

var breathCooldowns = [59, 59, 44, 29, 29];
var testState = false;

function togglePhase(n) {
    phase = n;
    if(phase == 0){
        failRecover();
        roarReset();
        hackReset();
        bombReset();
        laserEnd();
        bombEta = 25000;
    } else if(phase == 1){
        failRecover();
        roarReset();
        hackReset();
        laserEnd();
        bombReset();
    } else if (phase > 1){
        bombReset();
        bombEta += 17000;
        roarEta += 27;
        hackEta += 17;
    }
    document.getElementById("phase").innerHTML = phasemap[phase];
    testState = false;
    
};

function toggleTest() {
    testState = true;
    document.getElementById("bombTimer").innerHTML = '<span style="color:steelblue">Paused for test</span>';
    document.getElementById("hackTimer").innerHTML = '<span style="color:steelblue">Paused for test</span>';
    document.getElementById("roarTimer").innerHTML = '<span style="color:steelblue">Paused for test</span>';
};
function failTest(){
    testState = false;
}

function bombTick(){
    if(testState){
        return 0;
    };
    if(bombEta < 100){
        bombEta = 10200;
    };
    bombEta -= 100;

    if(bombEta < 4000) {
        document.getElementById("bombTimer").innerHTML = '<span style="color:FireBrick">' + bombEta/1000 + '</span>';
    }
    else {
        document.getElementById("bombTimer").innerHTML = bombEta/1000;
    };
};
function bombReset(){
    bombEta = 10200;
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

function laserTick(){
    if(laserEta < 100){
        laserEta = 15000;
    };
    laserEta -= 100;

    if(laserEta < 4000) {
        document.getElementById("laserTimer").innerHTML = '<span style="color:firebrick">' + laserEta/1000 + '</span>';
    }
    else {
        document.getElementById("laserTimer").innerHTML = laserEta/1000;
    };
};
function laserReset(){
    laserEta = 15000;
    if(laserTimerID == 0){
        laserTimerID = setInterval(laserTick,100);
    };
};
function laserEnd(){
    laserEta =0;
    clearInterval(laserTimerID);
    laserTimerID = 0;
    document.getElementById("laserTimer").innerHTML = '';
};

function breathTick(){
    if(breathEta < 1){
        breathEta = 0;
        document.getElementById("breathTimer").innerHTML = '<span style="color:plum">Off Cooldown</span>';
        clearInterval(breathTimerID);
        breathTimerID = 0;
    }
    else {
        breathEta -= 1;
        document.getElementById("breathTimer").innerHTML = breathEta;
    };
};
function breathReset(){
    breathEta = breathCooldowns[phase];
    document.getElementById("breathTimer").innerHTML = breathEta;
    if(breathTimerID == 0){
        breathTimerID = setInterval(breathTick,1000);
    };
};

function roarTick(){
    if(testState){
        return 0;
    };
    if(roarEta < 1){
        roarEta = 0;
        document.getElementById("roarTimer").innerHTML = '<span style="color:firebrick">Off Cooldown</span>';
        clearInterval(roarTimerID);
        roarTimerID = 0;
    }
    else {
        roarEta -= 1;
        if (roarEta < 10) {
            document.getElementById("roarTimer").innerHTML = '<span style="color:salmon">' + roarEta + '</span>';
        } else {
            document.getElementById("roarTimer").innerHTML = roarEta;
        }
    };
};
function roarReset(){
    roarEta = 150;
    hackProc();
    document.getElementById("roarTimer").innerHTML = roarEta;
    if(roarTimerID == 0){
        roarTimerID = setInterval(roarTick,1000);
    };
};

function hackTick(){
    if(testState){
        return 0;
    };
    if (hackEta == 0){
        hackEta = 59;
        hackProc();
    } else {
        hackEta--;
    }
    document.getElementById("hackTimer").innerHTML = hackEta;
};
function hackProc() {
    if(hackCount < 4) {
        hackCount++;
    }
    document.getElementById("hackCount").innerHTML = hackCount;
    if(hackCount == 4){
        failStart();
    }
};
function hackReset(){
    hackCount = 0;
    hackEta = 60;
    if(hackTimerID == 0) {
        hackTimerID = setInterval(hackTick,1000);
    }
};
function hackRecover(){
    if(hackCount == 4){
        failRecover();
    } else if (hackCount > 0) {
        hackCount--;
        document.getElementById("hackCount").innerHTML = hackCount;
    }
};

function failStart() {
    failEta = 60;
    document.getElementById("instantFail").style.display = 'inline';
    if(failTimerID == 0) {
        failTimerID = setInterval(failTick,1000);
    };    
    hackEta = 0;
    document.getElementById("hackCount").innerHTML = 4;
    clearInterval(hackTimerID);
    hackTimerID = 0;
    document.getElementById("hackTimer").innerHTML = '-';
};
function failTick(){
    if(failEta > 0){
        failEta--;
        document.getElementById("failTimer").innerHTML = failEta;
    }
};
function failRecover(){
    failEta = 0;
    document.getElementById("instantFail").style.display = 'none';
    hackCount--;
    document.getElementById("hackCount").innerHTML = 3;
    hackEta = 59;
    if(hackTimerID == 0){
        hackTimerID = setInterval(hackTick,1000);
    };
};