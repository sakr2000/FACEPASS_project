username = document.getElementById("username");
signup_email = document.getElementById("signup_email");
signup_pass = document.getElementById("signup_password");
repassword = document.getElementById("repassword");
signup_btn = document.getElementById("signup_btn");
login_email = document.getElementById("login_email");
login_pass = document.getElementById("login_password");
login_btn = document.getElementById("login_btn");

container = document.getElementById("container");
registerLink = document.getElementById("registerLink");
loginLink = document.getElementById("loginLink");

registerLink.addEventListener("click", () => {
  container.classList.add("active");
});
loginLink.addEventListener("click", () => {
  container.classList.remove("active");
});

// adding new User
let users = [];
signup_btn.addEventListener("click", () => {
  if (signup_pass.value == repassword.value) {
    let user = {
      name: username.value,
      email: signup_email.value,
      password: signup_pass.value,
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

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

// logging in
login_btn.addEventListener("click", () => {
  chrome.storage.local.get(["users"]).then((result) => {
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      console.log(element);
      if (
        (element.email == login_email.value) &
        (element.password == login_pass.value)
      ) {
        result.users[i].active = true;
        chrome.storage.local.set({ users: result.users });
        window.location.href = "../main page/main.html";
      }
    }
  });
});
