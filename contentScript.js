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
function Facepass_Btn() {
  let css_style = `
  #Facepass_btn {
    height: 50px;
    width: 300px; 
    background-image: linear-gradient(to right, rgb(137, 220, 102), rgb(0, 111, 67)); 
    border-radius: 30px; 
    border: none; 
    color: white;
    position: relative;
    top: -250px; 
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
  Element.addEventListener("click", () => {
    sendmessage("DO_SCAN");
  });
  return Element;
}

function facebook_test() {
  let em = document.getElementById("email");
  let ps = document.getElementById("pass");
  let form = document.querySelector("form._9vtf");
  em.style.display = "none";
  ps.style.display = "none";
  form.after(Facepass_Btn());
  ps.parentElement.style.border = "none";
  ps.parentElement.style.marginBottom = "20px";
}

if (site.includes("facebook.com")) {
  chrome.storage.local.get(["authorizedLogin"]).then((result) => {
    if (result.authorizedLogin) {
      authorizedLogin = result.authorizedLogin;
      console.log(authorizedLogin);
    }
    if (!authorizedLogin) {
      setTimeout(() => {
        facebook_test();
      }, 100);
    }
  });
}
