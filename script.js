const MAX_TIME = 1000 * 10;
let clicks = 0;
let clicking = false;

let time, responseTime;

let button = $('#button');
let timerElement = $('#timer-wrapper h2');

updateTimeLabel();
updateButton();

function updateButton() {
    if(clicks == 0) {
        button.text('CLICK ME');
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

function timerCount() {
    time.setTime(responseTime - Date.now());
    updateTimeLabel();
    if((time.getUTCSeconds() <= 0 && time.getUTCMilliseconds() <= 0) || time.getUTCSeconds() > MAX_TIME / 1000) {
        stopClicking();
    } else {
        requestAnimationFrame(timerCount);
    }
}

function startClicking() {
    clicking = true;
    time = new Date();
    responseTime = new Date(Date.now() + MAX_TIME);
    timerCount();
}

button.click(function (e) { 
    clicks++;
    if(!clicking) {
        startClicking();
    }
    updateButton();
});