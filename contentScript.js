const site = window.location.hostname;

let Add_Custom_Style = (css) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

let sendmessage = (msg) => {
  chrome.runtime.sendMessage({ message: msg }),
    (response) => {
      console.log(response);
    };
};
function Create_Custom_Element(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
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
  Add_Custom_Style(css_style);
  custom_element.addEventListener("click", () => {
    sendmessage("DO_SCAN");
  });
  return custom_element;
}

if (site.includes("facebook.com")) {
  setTimeout(() => {
    let em = document.getElementById("email");
    let ps = document.getElementById("pass");
    let form = document.querySelector("form._9vtf");
    em.style.display = "none";
    ps.style.display = "none";
    form.after(
      Create_Custom_Element("button", "id", "Facepass_btn", "Facepass")
    );
    ps.parentElement.style.border = "none";
    ps.parentElement.style.marginBottom = "20px";
  }, 500);
}
