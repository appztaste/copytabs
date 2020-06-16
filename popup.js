let status = document.getElementById('status');
let fetchUrls = document.getElementById('fetchUrls');
let copiedUrls = document.getElementById('copiedUrls');
let copyUrls = document.getElementById('copyUrls');
let fetchNCopyUrls = document.getElementById('fetchNCopyUrls');
let fetchNCopyUrlsNTitles = document.getElementById('fetchNCopyUrlsNTitles');
let fetchNCopyThisUrl = document.getElementById('fetchNCopyThisUrl');
let fetchNCopyThisUrlNTitle = document.getElementById('fetchNCopyThisUrlNTitle');

function fetchTabUrls(currTab, withTitle) {
    return new Promise(function(resolve, reject) {
        try {
            chrome.tabs.query({active:currTab, currentWindow: true}, tabs => {
                // console.log(tabs.length);
                var urls = "";
                for (var idx = 0; idx < tabs.length; idx++) {
                    // console.log(typeof tabs[idx] + ":" + JSON.stringify(tabs[idx]));
                    if (withTitle) urls += tabs[idx].title + "\n";
                    urls += tabs[idx].url + "\n";
                }
        
                // alert(urls);
                copiedUrls.value = urls;
                status.innerText = `Copied ${tabs.length} tabs`;
                
                resolve(tabs.length);
            });
        } catch (error) {
            reject(error);
        }
    });
}

fetchUrls.onclick = function(element) {
    // console.log('hello from popup');
    fetchTabUrls(false, false).then(tCount => {
        var buttonText = copyUrls.innerText;
        buttonText += "(" + tCount + ")";
        copyUrls.innerText = buttonText;
    }, err => console.log(err));
};

function copyToClipboard() {
    copiedUrls.select();
    document.execCommand('Copy');
}

copyUrls.onclick = function(element) {
    copyToClipboard();
};

fetchNCopyUrls.onclick = function(element) {
    fetchTabUrls(false, false).then(tCount => copyToClipboard());
};

fetchNCopyUrlsNTitles.onclick = function(element) {
    fetchTabUrls(false, true).then(tCount => copyToClipboard());
};

fetchNCopyThisUrl.onclick = function(element) {
    fetchTabUrls(true, false).then(tCount => copyToClipboard());
};

fetchNCopyThisUrlNTitle.onclick = function(element) {
    fetchTabUrls(true, true).then(tCount => copyToClipboard());
};