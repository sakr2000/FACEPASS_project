function delete_pass() {
  document.getElementById("email").value = "medo";
  document.getElementById("pass").value = "5050";
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("facebook.com")) {
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        function: delete_pass,
      })
      .then(() => console.log("injected script file"));
  }
});
