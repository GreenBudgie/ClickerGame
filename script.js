const MAX_TIME = 1000 * 10;
let clicks = 0;
let clicking = false;

let record = 0, prevCLicks = 0, overallAverage = 0, perSecondAverage = 0;

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
    clicking = false;
    clicks = 0;
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
    let clicksCurrentSecond = clicks - prevCLicks;
    if(perSecondAverage == 0) {
        overallAverage == clicksCurrentSecond;
    } else {
        
    }
    $('#average-counter').text('0');
}

function timerCount() {
    console.log(getSecondsPassed());
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