account = document.getElementById("account");
password = document.getElementById("password");
displayElement = document.getElementById("displayElement");
password_page = document.getElementById("password_page");
account_page = document.getElementById("account_page");

account.onclick = () => {
    account_page.style.display="block";
    password_page.style.display="none";
    account.style.color ="#077545";
    account.style.backgroundColor ="white";
    account.style.borderRadius = "20px 0px 0px 20px";
    password.style = "none";
}

password.onclick = () => {
    account_page.style.display="none";
    password_page.style.display="block";
    password.style.color ="#077545";
    password.style.backgroundColor ="white";
    password.style.borderRadius = "20px 0px 0px 20px";
    account.style = "none";
}

/** =========================================================================================
    ========================================================================================= **/

    first_name = document.getElementById("first_name");
    last_name = document.getElementById("last_name");
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

function checkFirstname() {
    let re = /^[a-zA-Z][a-zA-Z0-9]{2,50}$/;
    let name = first_name.querySelector("input").value;
    if (name == "") {
    setError(first_name, "field can't be empty");
    } else if (!name.match(re)) {
    setError(first_name, "name not valid ");
    } else {
    setValid(first_name);
    }
};

function checkLastname() {
    let re = /^[a-zA-Z][a-zA-Z0-9]{2,50}$/;
    let name = last_name.querySelector("input").value;
    if (name == "") {
    setError(last_name, "field can't be empty");
    } else if (!name.match(re)) {
    setError(last_name, "name not valid ");
    } else {
    setValid(last_name);
    }
};

first_name.querySelector("input").onkeyup = () => {
    checkFirstname();
};
last_name.querySelector("input").onkeyup = () => {
    checkLastname();
};

//====================================================================================//

current_password = document.getElementById("current_password");
new_password = document.getElementById("new_password");
confirm_password = document.getElementById("confirm_password");
pass_btn = document.getElementById("pass_btn");

function currentpassword() {
    chrome.storage.local.get(["users"]).then((result) => {
        for(let i = 0; i < result.users.length; i++) {
            const element = result.users[i];
            if(element.active == true) {
                if(current_password.querySelector("input").value != element.password) {
                    setError(current_password, "Password doesn't match ");
                } else {
                    setValid(current_password);
                }
            }
        }
    });
};

function newpassword() {
    let pass = new_password.querySelector("input").value;
    if (pass == "") {
    setError(new_password, "Password can't be empty");
    } else if (pass.length < 8) {
    setError(new_password, "Password length must be greater than 8");
    } else {
    setValid(new_password);
    }
};

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
};

current_password.querySelector("input").onkeyup = () => {
    currentpassword();
};
new_password.querySelector("input").onkeyup = () => {
    newpassword();
};
confirm_password.querySelector("input").onblur = () => {
    confirmpassword();
};
//==================================================================================================//
//change username
save_btn.addEventListener("click", () => {
    checkFirstname();
    checkLastname();
    
    if(!first_name.classList.contains("invalid") &&
        !last_name.classList.contains("invalid"))
    {
        let username = first_name.querySelector("input").value + last_name.querySelector("input").value;
        chrome.storage.local.get(["users"]).then((result) => {
            console.log(result.users);
            for (let i = 0; i < result.users.length; i++) {
                const element = result.users[i];
                if(element.active == true) {
                    element.name = username;
                }
                console.log("new name: " + element.name);
                chrome.storage.local.set({users: result.users});
            }
        });
    }
});

//=================================================================================================//
//change password
pass_btn.addEventListener("click", () => {
    currentpassword();
    newpassword();
    confirmpassword();
    let element;
    if(!current_password.classList.contains("invallid") &&
        !new_password.classList.contains("invalid") &&
        !confirm_password.classList.contains("invalid"))
        {
            chrome.storage.local.get(["users"]).then((result) => {
                console.log(result.users);
                for(let i = 0; i < result.users.length; i++) {
                    element = result.users[i];
                    if(element.active == true) {
                        element.password = confirm_password.querySelector("input").value;
                    }
                    console.log("new password: " + element.password);
                    chrome.storage.local.set({users: result.users});
                }
            });
        }
});

