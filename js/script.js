const output = document.getElementById('count');
const btnPause = document.querySelector('.pause');
const btnReset = document.querySelector('.reset');
const btnPlay = document.querySelector('.play');
const sessionInp = document.querySelector('.session');
const breakInp = document.querySelector('.break');
let startLength = +sessionInp.value * 60;
//1 * 60;
let breakLength = +breakInp.value * 60;
//2 * 60;
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
    output.innerHTML = `${+sessionInp.value}:00`;
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
    //btnPlay.setAttribute('disabled','');
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
        //btnPlay.removeAttribute("disabled","disabled");
        countType = 'break';
    };
};

function breakSec() {
    breakLength--;
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
        countType = 'session';
    };
};



/*function myFunc() {
  counter--;
  if(counter >= 0) {
    let minutes = Math.floor(counter % 3600 / 60);
    if( minutes < 10 ) {
      minutes = `0${minutes}`;
    };
    let seconds = Math.floor(counter % 3600 % 60);
    if( seconds < 10 ) {
      seconds = `0${seconds}`;
    };
    output.innerHTML = `${minutes}:${seconds}`;
  } else {
    clearInterval(startTimer);
  };
};*/