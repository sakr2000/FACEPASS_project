settingbtn = document.getElementById("settingbtn");
sidebar = document.getElementById("sidebar");
closesidebar = document.getElementById("closesidebar");
settingbtn.addEventListener("click", function () {
  sidebar.classList.add("active");
});
closesidebar.addEventListener("click", function () {
  sidebar.classList.remove("active");
});
