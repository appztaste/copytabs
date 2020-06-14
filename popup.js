let showUrls = document.getElementById('showUrls');
let copiedUrls = document.getElementById('copiedUrls');
let copyUrls = document.getElementById('copyUrls');

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
        var buttonText = copyUrls.innerText;
        buttonText += "(" + tabs.length + ")";
        // alert(buttonText);
        copyUrls.innerText = buttonText;
    });
};

copyUrls.onclick = function(element) {
    copiedUrls.select();
    document.execCommand('Copy');
}