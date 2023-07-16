account = document.getElementById("account");
password = document.getElementById("password");
displayElement = document.getElementById("displayElement");
password_page = document.getElementById("password_page");
account_page = document.getElementById("account_page");

// account.onclick = () => {
//   account_page.style.display = "block";
//   password_page.style.display = "none";
//   account.style.color = "#077545";
//   account.style.backgroundColor = "white";
//   account.style.borderRadius = "20px 0px 0px 20px";
//   password.style = "none";
// };

// password.onclick = () => {
//   account_page.style.display = "none";
//   password_page.style.display = "block";
//   password.style.color = "#077545";
//   password.style.backgroundColor = "white";
//   password.style.borderRadius = "20px 0px 0px 20px";
//   account.style = "none";
// };

/** ========================================================================================= **/

user_name = document.getElementById("user_name");
save_btn = document.getElementById("save_btn");

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

async function RenameUser(newname, oldName) {
  try {
    const response = await fetch("http://127.0.0.1:5000/rename-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldName: oldName, newName: newname }),
    });

    const result = await response.json();
    console.log("Success:", result);

    if (result.message.includes("renamed successfully")) {
      chrome.storage.local.get(["activeUser"]).then((r) => {
        if (r.activeUser) {
          chrome.storage.local.get(["users"]).then((result) => {
            if (result.users) {
              for (let i = 0; i < result.users.length; i++) {
                if (r.activeUser.name == result.users[i].name) {
                  result.users[i].name = newname;
                  r.activeUser.name = newname;
                }
              }
              chrome.storage.local.set({ users: result.users });
              chrome.storage.local.set({ activeUser: r.activeUser });
            }
          });
        }
      });
    } else {
      setError(user_name, "Server side error");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function checkUserName() {
  let re = /^[a-zA-Z][a-zA-Z0-9]{2,50}$/;
  let name = user_name.querySelector("input").value;
  if (name == "") {
    setError(user_name, "Field can't be empty");
  } else if (!name.match(re)) {
    setError(user_name, "Name not valid ");
  } else {
    setValid(user_name);
  }
}

user_name.querySelector("input").onkeyup = () => {
  checkUserName();
};

//==================================================================================================//
//change username
save_btn.addEventListener("click", () => {
  checkUserName();

  if (!user_name.classList.contains("invalid")) {
    chrome.storage.local.get(["activeUser"]).then((r) => {
      if (r.activeUser) {
        let oldName = r.activeUser.name;
        let newName = user_name.querySelector("input").value;
        RenameUser(newName, oldName);
      }
    });
  }
});

//====================================================================================//

current_password = document.getElementById("current_password");
new_password = document.getElementById("new_password");
confirm_password = document.getElementById("confirm_password");
pass_btn = document.getElementById("pass_btn");

function currentpassword() {
  chrome.storage.local.get(["users"]).then((result) => {
    for (let i = 0; i < result.users.length; i++) {
      const element = result.users[i];
      if (element.active == true) {
        if (current_password.querySelector("input").value != element.password) {
          setError(current_password, "Password doesn't match ");
        } else {
          setValid(current_password);
        }
      }
    }
  });
}

function newpassword() {
  let pass = new_password.querySelector("input").value;
  if (pass == "") {
    setError(new_password, "Password can't be empty");
  } else if (pass.length < 8) {
    setError(new_password, "Password length must be greater than 8");
  } else {
    setValid(new_password);
  }
}

function confirmpassword() {
  if (
    new_password.querySelector("input").value !=
    confirm_password.querySelector("input").value
  ) {
    setError(confirm_password, "Password doesn't match");
  } else if (confirm_password.querySelector("input").value == "") {
    setError(confirm_password, "This field can't be empty");
  } else {
    setValid(confirm_password);
  }
}

current_password.querySelector("input").onkeyup = () => {
  currentpassword();
};
new_password.querySelector("input").onkeyup = () => {
  newpassword();
};
confirm_password.querySelector("input").onblur = () => {
  confirmpassword();
};
//=================================================================================================//
//change password
pass_btn.addEventListener("click", () => {
  currentpassword();
  newpassword();
  confirmpassword();
  let element;
  if (
    !current_password.classList.contains("invallid") &&
    !new_password.classList.contains("invalid") &&
    !confirm_password.classList.contains("invalid")
  ) {
    chrome.storage.local.get(["users"]).then((result) => {
      for (let i = 0; i < result.users.length; i++) {
        element = result.users[i];
        if (element.active == true) {
          element.password = confirm_password.querySelector("input").value;
        }
        console.log("new password: " + element.password);
        chrome.storage.local.set({ users: result.users });
      }
    });
  }
});

// collapsible elements
let coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
