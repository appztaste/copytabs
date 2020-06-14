let showUrls = document.getElementById('showUrls');
let copiedUrls = document.getElementById('copiedUrls');

showUrls.onclick = function(element) {
    // console.log('hello from popup');
    chrome.tabs.query({active:false, currentWindow: true}, function(tabs) {
        // console.log(tabs.length);
        var urls = "";
        for (var idx = 0; idx < tabs.length; idx++) {
            // console.log(typeof tabs[idx] + ":" + JSON.stringify(tabs[idx]));
            urls += tabs[idx].url + "\n";
        }

        // alert(urls);
        
        copiedUrls.value = urls;
    });
};

let copyUrls = document.getElementById('copyUrls');

copyUrls.onclick = function(element) {
    copiedUrls.select();
    document.execCommand('Copy');
}