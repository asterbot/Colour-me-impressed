chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("message received")
    var images = document.getElementsByTagName('img');
    for (var i = 0, l = images.length; i < l; i++) {
      images[i].style = 'filter: hue-rotate('+request["val"]+'deg);';
  }
  }
);