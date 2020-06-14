chrome.browserAction.onClicked.addListener(function() {
    console.log('hello');
    chrome.tabs.query({active:false, currentWindow: true}, function(tabs) {
        console.log(tabs.length);
        var urls;
        for (var idx = 0; idx < tabs.length; idx++) {
            // console.log(typeof tabs[idx] + ":" + JSON.stringify(tabs[idx]));
            urls += tabs[idx].url + "\n";
        }

        alert(urls);
        document.execCommand('Copy');
    });
});