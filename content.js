function updateRetroMode(isEnabled) { // function to update the retro status based on the value of the button in the popup page
    if (isEnabled) {
        document.documentElement.classList.add('retro-active'); // adds the class to the html element to enable retro mode
    } else {
        document.documentElement.classList.remove('retro-active'); // removes the class to disable the retro mode
    }
}


chrome.storage.local.get(['retroEnabled'], (result) => {
    updateRetroMode(result.retroEnabled); // when the content script loads it checks the state of retro mode and applies ift if needed
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleRetro'){ // listens for the message from the popup script to toggle the retro mode
        updateRetroMode(request.isEnabled);
        sendResponse({status: 'success'}); // sends a response back to the popup script to check if the message was recived 
    }
    return true;
});



    