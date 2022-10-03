const clockerTime = document.getElementById('clocker-time');
const clockerEvent = document.getElementById('clocker-event');
const eventTime = document.getElementById('event-time');
const debug = document.getElementById('debug');
const submit = document.getElementById('clocker-submit');
const eventCard = document.getElementById('1');

let eventTimeDisplay = "";

time_();
submit.onclick = addEvent;

setInterval(time_, 1000);


function time_() {
    const nowDate = new Date();
    const time = nowDate.toLocaleTimeString('en-GB');
    
    clockerTime.innerHTML = time;
    let eventsElements = eventCard.children;

    chrome.storage.sync.get("time", ({ time }) => {
        if (time === "") {
            eventsElements[1].innerText = "";
            return;
        }
        
        eventsElements[1].innerText = time;
    });

    chrome.storage.sync.get("currentEvent", ({ currentEvent }) => {
        if (currentEvent === "") {
            eventsElements[0].innerText = "No Event Set!";
            submit.disabled = false;
            return;
        }
        
        eventsElements[0].innerText = currentEvent;
        submit.disabled = true;
    });
}


let counter = 0;
function addEvent() {
    if (eventTime.value === "" || clockerEvent.value === "") {return;}
    
    let time = eventTime.value + ':00';
    chrome.storage.sync.set({ time });
    
    let currentEvent = clockerEvent.value;
    chrome.storage.sync.set({ currentEvent });


    eventTime.value = "";
    clockerEvent.value = "";
    submit.disabled = true;
}