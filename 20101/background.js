console.log("EXTENSION INSTALLED!");

let time = "";
let currentEvent = "";

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ time });
    chrome.storage.sync.set({ currentEvent });
});

time_();
setInterval(time_, 1000);


function time_() {

    const nowDate = new Date();
    const clockTime = nowDate.toLocaleTimeString('en-GB');
    
    chrome.storage.sync.get(["time", "currentEvent"], ({ time, currentEvent}) => {
        console.log(currentEvent, time);

        if (time === clockTime) {
            console.log("ALERT TIMEEEE!!");

            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/icon16.png',
                title: 'Reminder!',
                message: currentEvent,
                priority: 2
            });

            time = "";
            currentEvent = "";
            chrome.storage.sync.set({ time, currentEvent });
        }
    });



}
