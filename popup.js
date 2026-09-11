const btn = document.getElementById('toggleBtn'); // initalize the button element

chrome.storage.local.get(['retroEnabled'], (result) => {
    let enabled = result.retroEnabled || false; // defultly sets to false if its not set yet
    btn.innerText = `MODE: ${enabled ? 'ON' : 'OFF'}`; // upades the button
});

btn.onclick = () => {  // when the button is clicked we toggle the start of retro mode so we can turn it on/off
    chrome.storage.local.get(['retroEnabled'], (result) => {
        let newState = !result.retroEnabled; // toggles the state
        chrome.storage.local.set({retroEnabled: newState}, () => {
            btn.innerText = `MODE: ${newState ? 'ON' : 'OFF'}`; // updates the button 
            
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0]) {
                    try {
                        const reply = chrome.tabs.sendMessage(tabs[0].id, {action: "toggleRetro", enabled: newState, isEnabled: newState});
                        // MV3 Chrome returns a Promise; older callback style returns undefined
                        if (reply && typeof reply.catch === "function") {
                            reply.catch(() => {
                                console.log("Refresh The Page To Apply Changes!!"); // content script not loaded yet
                            });
                        }
                    } catch (e) {
                        console.log("Refresh The Page To Apply Changes!!");
                    }
                }
            });
        });
    });
};