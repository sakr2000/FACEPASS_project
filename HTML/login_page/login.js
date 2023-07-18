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
  const parent = element.parentElement;
  const error = parent.querySelector(".error");
  error.innerText = message;
  element.classList.add("invalid");
};
const setValid = (element) => {
  const parent = element.parentElement;
  const error = parent.querySelector(".error");
  error.innerText = "";
  element.classList.remove("invalid");
};

function checkname() {
  let re = /^[a-zA-Z][a-zA-Z0-9]{2,50}$/;
  let name = username.querySelector("input").value;
  // check if username exists
  chrome.storage.local.get(["users"]).then((result) => {
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      if (element.name == name) {
        setError(username, "Username already exist");
        break;
      }
    }
  });
  if (name == "") {
    setError(username, "Username can't be empty ");
  } else if (!name.match(re)) {
    setError(username, "Username not valid ");
  } else {
    setValid(username);
  }
}
function checkemail() {
  let re = /^[a-zA-Z][a-zA-Z0-9]{2,50}@[a-zA-Z]{2,10}(\.[a-zA-Z]{2,4})+$/;
  let email = signup_email.querySelector("input").value;
  // check if email exists
  chrome.storage.local.get(["users"]).then((result) => {
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      if (element.email == email) {
        setError(signup_email, "Email address already exist");
        break;
      }
    }
  });
  if (email == "") {
    setError(signup_email, "Email can't be empty ");
  } else if (!email.match(re)) {
    setError(signup_email, "Email not valid ");
  } else {
    setValid(signup_email);
  }
}
function checkpassword() {
  let pass = signup_pass.querySelector("input").value;
  if (pass == "") {
    setError(signup_pass, "Password can't be empty ");
  } else if (pass.length < 8) {
    setError(signup_pass, "Password length must be greater than 8");
  } else {
    setValid(signup_pass);
  }
}
function confirmpassword() {
  if (
    signup_pass.querySelector("input").value !=
    repassword.querySelector("input").value
  ) {
    setError(repassword, "Password doesn't match");
  } else if (repassword.querySelector("input").value == "") {
    setError(repassword, "This field can't be empty");
  } else {
    setValid(repassword);
  }
}
username.querySelector("input").onkeyup = () => {
  checkname();
};
signup_email.querySelector("input").onkeyup = () => {
  checkemail();
};
signup_pass.querySelector("input").onkeyup = () => {
  checkpassword();
};
repassword.querySelector("input").onblur = () => {
  confirmpassword();
};

// ======================================================================================
// adding new User
let users = [];
// getting old values
chrome.storage.local.get(["users"]).then((result) => {
  if (result.users) {
    console.log(result.users);
    users = result.users;
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      if (element.active == true) {
        window.location.href = "../main page/main.html";
      }
    }
  } else {
    chrome.storage.local.set({ users: [] });
  }
});
signup_btn.addEventListener("click", () => {
  checkname();
  checkemail();
  checkpassword();
  confirmpassword();
  if (
    !username.classList.contains("invalid") &&
    !signup_email.classList.contains("invalid") &&
    !signup_pass.classList.contains("invalid") &&
    !repassword.classList.contains("invalid")
  ) {
    let user = {
      name: username.querySelector("input").value,
      email: signup_email.querySelector("input").value,
      password: signup_pass.querySelector("input").value,
      active: false,
      firstLogin: true,
      sites: [],
    };
    users.push(user);
    console.log(users);
    chrome.storage.local.set({ users: users });
    container.classList.remove("active");
  }
});

// logging in
login_btn.addEventListener("click", () => {
  chrome.storage.local.get(["users"]).then((result) => {
    console.log(result.users);
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      if (
        element.email == login_email.querySelector("input").value &&
        element.password == login_pass.querySelector("input").value
      ) {
        result.users[i].active = true;
        chrome.storage.local.set({ users: result.users });
        chrome.storage.local.set({ activeUser: result.users[i] });
        window.location.href = "../main page/main.html";
      } else {
        setError(login_email, "");
        setError(login_pass, "Email or Password not correct");
      }
    }
  });
});
