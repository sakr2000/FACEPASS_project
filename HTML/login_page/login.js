email = document.getElementById("email");
password = document.getElementById("password");
login = document.getElementById("login");
container = document.getElementById("container");
registerLink = document.getElementById("registerLink");
loginLink = document.getElementById("loginLink");

registerLink.addEventListener("click", () => {
  container.classList.add("active");
});
loginLink.addEventListener("click", () => {
  container.classList.remove("active");
});

// login.addEventListener("click", () => {
//   chrome.storage.local.set({ email: email.value });
//   chrome.storage.local.set({ password: password.value });

//   chrome.storage.local.get(["email"]).then((result) => {
//     console.log("Value currently is " + result.email);
//   });
// });
// console.log(email, password);
