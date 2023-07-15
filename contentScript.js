const site = window.location.hostname;
let authorizedLogin = false;

let Add_Style = (css) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

let sendmessage = (msg) => {
  chrome.runtime.sendMessage({ message: msg }),
    (response) => {
      console.log(response);
    };
};
function Facepass_Btn(top) {
  let css_style = `
  #Facepass_btn {
    height: 50px;
    width: 300px; 
    background-image: linear-gradient(to right, rgb(137, 220, 102), rgb(0, 111, 67)); 
    border-radius: 30px; 
    border: none; 
    color: white;
    position: relative;
    top: ${top}px; 
    font-size: 35px; 
    margin-bottom: 30px;
    transition: 0.5s;  
  }

#Facepass_btn:hover {
  transform: scale(110%);
  cursor: pointer;
}
`;
  const Element = document.createElement("button");
  Element.setAttribute("id", "Facepass_btn");
  Element.innerHTML = "Facepass";
  Add_Style(css_style);

  return Element;
}

if (site.includes("facebook.com")) {
  chrome.storage.local.get(["authorizedLogin"]).then((result) => {
    if (result.authorizedLogin) {
      authorizedLogin = result.authorizedLogin;
      console.log(authorizedLogin);
    }
    if (!authorizedLogin) {
      setTimeout(() => {
        let em = document.getElementById("email");
        let ps = document.getElementById("pass");
        let form = document.querySelector("form._9vtf");
        let facebtn = Facepass_Btn(-250);
        facebtn.addEventListener("click", () => {
          sendmessage("DO_SCAN_facebook");
        });
        ps.parentElement.style.border = "none";
        ps.parentElement.style.marginBottom = "20px";
        em.remove();
        ps.remove();
        form.after(facebtn);
      }, 200);
    }
  });
}

if (site.includes("github.com")) {
  chrome.storage.local.get(["authorizedLogin"]).then((result) => {
    if (result.authorizedLogin) {
      authorizedLogin = result.authorizedLogin;
      console.log(authorizedLogin);
    }
    if (!authorizedLogin) {
      setTimeout(() => {
        let form = document.querySelector("form");
        let facebtn = Facepass_Btn(6);
        facebtn.addEventListener("click", () => {
          sendmessage("DO_SCAN_github");
        });
        form.after(facebtn);
        form.parentElement.style.height = "100px";
        form.parentElement.style.width = "330px";
        form.remove();
      }, 100);
    }
  });
}

if (site.includes("udemy.com")) {
  chrome.storage.local.get(["authorizedLogin"]).then((result) => {
    if (result.authorizedLogin) {
      authorizedLogin = result.authorizedLogin;
      console.log(authorizedLogin);
    }
    if (!authorizedLogin) {
      setTimeout(() => {
        let form = document.querySelectorAll("form")[1];
        let section1 = form.previousSibling;
        let section2 = section1.previousSibling;

        let section3 = section2.previousSibling;
        let facebtn = Facepass_Btn(10);
        facebtn.addEventListener("click", () => {
          sendmessage("DO_SCAN_udemy");
        });
        form.style.display = "none";
        section1.remove();
        section2.remove();
        section3.remove();
        form.after(facebtn);
      }, 600);
    }
  });
}
