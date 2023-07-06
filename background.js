chrome.runtime.onMessage.addListener((message) => {
  console.log(message);
  if (message.message == "DO_SCAN") {
    chrome.tabs.create({
      url: "chrome-extension://bhfpjlglfdpmlmjpomgppddpfbgcgmjd/HTML/face detection pages/face_scan.html",
      active: true,
    });
  }
});
