const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

const quoteDisplay = document.getElementById('quoteDispaly');
const quoteInput = document.getElementById('quoteInput');

const timer = document.getElementById('timer');

let restartTimerSwitch = true;
let timerID; // the ID of the current timer. 

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayInput = (quoteInput.value).split('');
    let corret = true;

    // if(restartTimerSwitch) {
    //     timerID = restartTimer();
    //     restartTimerSwitch = false;
    // }

    arrayQuote.forEach((charQuote, index) => {
        const charValue = charQuote.innerText;
        clearCheckingStyles(charQuote);
        if(arrayInput[index] == null) {
            corret = false;
            return;
        }
        else if(charValue === arrayInput[index]){
            charQuote.classList.add('correct');
        } else {
            charQuote.classList.add('incorrect');
            corret = false;
        }
    })
    if(corret) {
        rendernewQuote();
        // stopTimer(timerID);
        // restartTimerSwitch = true;
    };
})

function clearCheckingStylesAll(arrayQuote){
    arrayQuote.forEach(clearCheckingStyles);
}


function clearCheckingStyles(target){
    target.classList.remove('correct');
    target.classList.remove('incorrect');
}


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function rendernewQuote(){
    const quote = await getRandomQuote();
    quoteDisplay.innerText = '';
    quote.split('').forEach((character) => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    })
    quoteInput.value = null;
    startTimer();
}

function timeTicking(){
    return setInterval(timeTick, 1000);
}

function stopTimer(timerID){
    clearInterval(timerID);
}

function timeTick(){
    const newTime = parseInt(timer.innerText) + 1;
    timer.innerText = newTime.toString();
}

function restartTimer(){
    timer.innerText = '0';
    const timerID =  timeTicking();
    return timerID;
}


let startTime;
function startTimer(){
    timer.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000);
}


rendernewQuote();