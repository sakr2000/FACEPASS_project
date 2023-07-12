let site = "";
chrome.storage.local.set({ authorizedLogin: false });

// on receiveing a message
chrome.runtime.onMessage.addListener((message) => {
  if (message.message.includes("DO_SCAN")) {
    chrome.tabs.create({
      url: "HTML/face detection pages/face_scan.html",
      active: true,
    });

    if (message.message == "DO_SCAN_facebook") {
      site = "facebook.com";
    } else if (message.message == "DO_SCAN_udemy") {
      site = "udemy.com";
    }
  }

  if (message.message.includes("SCANED")) {
    console.log(message);
    chrome.storage.local.set({ authorizedLogin: true });
    // reload the page
    chrome.tabs.query({ url: `*://*.${site}/*` }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});

// when window is colsed
chrome.windows.onRemoved.addListener(() => {
  chrome.storage.local.set({ authorizedLogin: false });
  chrome.storage.local.get(["users"]).then((result) => {
    if (result.users) {
      for (let i = 0; i < result.users.length; i++) {
        result.users[i].active = false;
      }
      chrome.storage.local.set({ users: result.users });
      chrome.storage.local.set({ activeUser: {} });
    }
  });
});
