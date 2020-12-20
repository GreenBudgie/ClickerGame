const SECONDS = 10;
const MAX_TIME = 1000 * SECONDS;
let clicks = 0;
let clicking = false;

let record = 0, prevClicks = 0, overallAverage = 0, perSecondAverage = 0;
let clicksInSecond = [];

let time, responseTime, secondPassTime;

let button = $('#button');
let timerElement = $('#timer-wrapper h2');

updateTimeLabel();
updateButton();

function updateButton() {
    if(clicks == 0) {
        button.text('Click');
    } else {
        button.text(clicks);
    }
}

function formatTime() {
    if(clicking) {
        let ms = Math.floor(time.getUTCMilliseconds() / 100);
        timerElement.text(time.getUTCSeconds() + '.' + ms);
    } else {
        timerElement.text(Math.floor(MAX_TIME / 1000) + '.' + (MAX_TIME % 1000));
    }
}

function stopClicking() {
    updateRecord();
    clicking = false;
    prevClicks = 0;
    clicks = 0;
    clicksInSecond = [];
    updateButton();
    updateTimeLabel();
}

function updateTimeLabel() {
    timerElement.text(formatTime());
}

function getSecondsPassed() {
    return Math.round((MAX_TIME - time.getTime()) / 1000);
}

function updateAverage() {
    let clicksCurrentSecond = clicks - prevClicks;
    prevClicks = clicks;
    clicksInSecond.push(clicksCurrentSecond);
    if(overallAverage == 0) {
        overallAverage = clicksCurrentSecond;
    } else {
        let sum = 0;
        for(let item of clicksInSecond) {
            sum += item;
        }
        overallAverage = sum / clicksInSecond.length;
    }
    $('#average-counter').text(Math.round(overallAverage));
}

function updateRecord() {
    if(clicks > record) {
        record = clicks;
        $('#record-counter').text(record);
    }
}

function timerCount() {
    time.setTime(responseTime - Date.now());
    if(secondPassTime - Date.now() <= 0) {
        updateAverage();
        updateSecondPassTime();
    }
    updateTimeLabel();
    if((time.getUTCSeconds() <= 0 && time.getUTCMilliseconds() <= 0) || time.getUTCSeconds() > MAX_TIME / 1000) {
        stopClicking();
    } else {
        requestAnimationFrame(timerCount);
    }
}

function updateSecondPassTime() {
    secondPassTime = new Date(Date.now() + 1000);
}

function startClicking() {
    clicking = true;
    time = new Date();
    responseTime = new Date(Date.now() + MAX_TIME);
    overallAverage = 0;
    updateSecondPassTime();
    timerCount();
}

button.click(function (e) { 
    clicks++;
    if(!clicking) {
        startClicking();
    }
    updateButton();
});