settingbtn = document.getElementById("settingbtn");
sidebar = document.getElementById("sidebar");
closesidebar = document.getElementById("closesidebar");

account = document.getElementById("acc").onclick = function() {
  window.open("setting page/acc.html", "_blank");
}


password = document.getElementById("pass").onclick = function(){
  window.open("setting page/pass.html", "_blank");
};

settingbtn.addEventListener("click", function () {
  sidebar.classList.add("active");
});
closesidebar.addEventListener("click", function () {
  sidebar.classList.remove("active");
});
