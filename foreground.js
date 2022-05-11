document.addEventListener('DOMContentLoaded', function(){
  var checkPageButton=document.getElementById('download');
  checkPageButton.addEventListener('click', function(){
                      
    chrome.tabs.getSelected(null, function(tab){
      chrome.storage.local.get(['key'], function(result){
       var openWin =  window.open(result.key, "_blank", "width=10, height=10");
        setTimeout(() => {
          openWin.close();
        },1250);
        //console.log("FRONT: download link is " + result.key);
      });
    });
 }, false);
}, false);