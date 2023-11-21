
//Great English
//Created by Samuel Corke on 19/11/2023.


let titleElement = document.getElementById('title');
let substitutedElement = document.getElementById('substituted');

let tabs = await browser.tabs.query({active: true, currentWindow: true});
let response = await browser.tabs.sendMessage(tabs[0].id, {update: "update"});

titleElement.textContent = response?.title;
substitutedElement.textContent = response?.substituted;
