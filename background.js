
function URLtoID(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
      } else {
        return 1;
      }
}

var pK = "rapidapi private key";


var link = null;

    chrome.tabs.onActivated.addListener(tab =>{
        chrome.tabs.get(tab.tabId, current_tab_info => {
            if(/^https:\/\/www\.youtube/.test(current_tab_info.url)){

                chrome.tabs.executeScript(null,{file: 'foreground.js'}, () => console.log("injecting"))
                const data = null;
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                        const returnedObject = JSON.parse(this.responseText);
                        link = returnedObject.link;
                        chrome.storage.local.set({key: link}, function(){
                            console.log("BACK: download link is "+ link);
                        });
                    }
                });

                xhr.open("GET", "https://youtube-mp3-download1.p.rapidapi.com/dl?id=" + URLtoID(current_tab_info.url));
                xhr.setRequestHeader("X-RapidAPI-Host", "youtube-mp3-download1.p.rapidapi.com");
                xhr.setRequestHeader("X-RapidAPI-Key", pK);

                xhr.send(data);


            }
        });

    });
