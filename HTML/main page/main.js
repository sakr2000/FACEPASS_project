settingbtn = document.getElementById("settingbtn");
sidebar = document.getElementById("sidebar");
username = document.getElementById("username");
closesidebar = document.getElementById("closesidebar");
logout = document.getElementById("logout");

chrome.storage.local.get(["activeUser"]).then((r) => {
  if (r.activeUser.firstLogin) {
    window.open("../face detection pages/imageSave/starterPage.html", "_blank");
  }
});

settingbtn.addEventListener("click", function () {
  sidebar.classList.add("active");
});
closesidebar.addEventListener("click", function () {
  sidebar.classList.remove("active");
});

chrome.storage.local.get(["activeUser"]).then((result) => {
  if (result.activeUser) {
    const element = result.activeUser;
    console.log(element);
    if (element.active == true) {
      username.innerHTML = element.name;
    }
  }
});

logout.onclick = function () {
  chrome.storage.local.get(["users"]).then((result) => {
    if (result.users) {
      for (let i = 0; i < result.users.length; i++) {
        result.users[i].active = false;
      }
      chrome.storage.local.set({ users: result.users });
      chrome.storage.local.set({ activeUser: {} });
    }
  });
  location.href = "../login_page/login.html";
};
