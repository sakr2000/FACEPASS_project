// signup
username = document.getElementById("username");
signup_email = document.getElementById("signup_email");
signup_pass = document.getElementById("signup_password");
repassword = document.getElementById("repassword");
signup_btn = document.getElementById("signup_btn");
// login
login_email = document.getElementById("login_email");
login_pass = document.getElementById("login_password");
login_btn = document.getElementById("login_btn");

// login <==> signup toggel
container = document.getElementById("container");
registerLink = document.getElementById("registerLink");
loginLink = document.getElementById("loginLink");

registerLink.addEventListener("click", () => {
  container.classList.add("active");
});
loginLink.addEventListener("click", () => {
  container.classList.remove("active");
});
// =====================================================================================
const setError = (element, message) => {
  const parent = element.parentElemrnt;
  const error = parent.querySelector(".error");
  error.innerText = message;
  element.classList.add("error");
};
const setValid = (element) => {
  const parent = element.parentElemrnt;
  const error = parent.querySelector(".error");
  error.innerText = "";
  element.classList.remove("error");
};
function checkname() {
  let re = /^([a-zA-Z ])$/;
  if (!username.querySelector("input").value.match(re)) {
    if (username.querySelector("input").value == "") {
      setError(username, "Username can't be empty ");
    } else {
      setValid(username);
    }
  }
}
console.log(username); // to be continued

// username.querySelector("input").onkeyup = () => {
//   checkname();
// };

// ======================================================================================
// adding new User
let users = [];
signup_btn.addEventListener("click", () => {
  if (
    signup_pass.querySelector("input").value ==
    repassword.querySelector("input").value
  ) {
    let user = {
      name: username.querySelector("input").value,
      email: signup_email.querySelector("input").value,
      password: signup_pass.querySelector("input").value,
      active: false,
    };
    users.push(user);
    console.log(users);
    chrome.storage.local.set({ users: users });
    chrome.storage.local.get(["users"]).then((result) => {
      console.log(JSON.stringify(result.users));
    });
    container.classList.remove("active");
  } else {
    alert("The two passwords are not the same");
  }
});

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });

// logging in
login_btn.addEventListener("click", () => {
  chrome.storage.local.get(["users"]).then((result) => {
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      console.log(element);
      if (
        element.email == login_email.value &&
        element.password == login_pass.value
      ) {
        result.users[i].active = true;
        chrome.storage.local.set({ users: result.users });
        window.location.href = "../main page/main.html";
      }
    }
  });
});
