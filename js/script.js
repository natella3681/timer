const output = document.getElementById('count');
const btnPause = document.querySelector('.pause');
const btnReset = document.querySelector('.reset');
const btnPlay = document.querySelector('.play');
const sessionInp = document.querySelector('.session');
const breakInp = document.querySelector('.break');
const plusCountSes = document.querySelector('.up-arrow-one');
const minusCountSes = document.querySelector('.down-arrow-one');
const plusCountBr = document.querySelector('.up-arrow-two');
const minusCountBr = document.querySelector('.down-arrow-two');
let startLength = +sessionInp.value * 60;
let breakLength = +breakInp.value * 60;
let startTimerSession;
let startBreakSession;
let countType;

output.innerHTML = `${+sessionInp.value}:00`;

btnPlay.addEventListener('click', () => {
    if (countType === 'break') {
        startBreak();
    } else {
        startSession();
    };
});
btnPause.addEventListener('click', () => {
    clearInterval(startTimerSession);
    clearInterval(startBreakSession);
});
btnReset.addEventListener('click', () => {
    clearInterval(startTimerSession);
    clearInterval(startBreakSession);
    output.innerHTML = `25:00`;
    startLength = 25 * 60;
    breakLength = 5 * 60;
    sessionInp.value = 25;
    breakInp.value = 5;
});
sessionInp.addEventListener('change', () => {
    output.innerHTML = `${+sessionInp.value}:00`;
    updateSession();
});
breakInp.addEventListener('change', () => {
    output.innerHTML = `${+breakInp.value}:00`;
    updateBreak();
});
plusCountSes.addEventListener('click', (e) => {
    if (e.target) {
        if (sessionInp.value < 60) {
            sessionInp.value++;
            updateSession();
        } else {
            defaultCountSes();
        };
    };
});
minusCountSes.addEventListener('click', (e) => {
    if (e.target) {
        if (sessionInp.value > 1) {
            sessionInp.value--;
            updateSession();
        } else {
            defaultCountSes();
        };
    };
});
plusCountBr.addEventListener('click', (e) => {
    if (e.target) {
        if (breakInp.value < 15) {
            breakInp.value++;
            updateBreak();
        } else {
            defaultCountBr();
        };
    };
});
minusCountBr.addEventListener('click', (e) => {
    if (e.target) {
        if (breakInp.value > 1) {
            breakInp.value--;
            updateBreak();
        } else {
            defaultCountBr();
        };
    };
});

function startSession() {
    startTimerSession = setInterval(start, 1000);
};

function startBreak() {
    startBreakSession = setInterval(breakSec, 1000);
};

function start() {
    startLength--;
    countType = 'session';
    btnPlay.disabled = true;
    if (startLength >= 0) {
        let minutes = Math.floor(startLength % 3600 / 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        };
        let seconds = Math.floor(startLength % 3600 % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        };
        output.innerHTML = `${minutes}:${seconds}`;
    } else {
        clearInterval(startTimerSession);
        btnPlay.disabled = false;
        countType = 'break';
    };
};

function breakSec() {
    breakLength--;
    btnPlay.disabled = true;
    countType = 'break';
    if (breakLength >= 0) {
        let minutes = Math.floor(breakLength % 3600 / 60);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        };
        let seconds = Math.floor(breakLength % 3600 % 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        };
        output.innerHTML = `${minutes}:${seconds}`;
    } else {
        clearInterval(startBreakSession);
        btnPlay.disabled = false;
        countType = 'session';
    };
};

function updateSession() {
    output.innerHTML = `${+sessionInp.value}:00`;
    startLength = +sessionInp.value * 60;
};

function updateBreak() {
    output.innerHTML = `${+breakInp.value}:00`;
    breakLength = +breakInp.value * 60;
};

function defaultCountSes() {
    output.innerHTML = '25:00';
    sessionInp.value = '25';
    startLength = sessionInp.value * 60;
};

function defaultCountBr() {
    output.innerHTML = '5:00';
    breakInp.value = '5';
    breakLength = breakInp.value * 60;
};
