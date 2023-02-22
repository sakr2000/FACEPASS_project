let sites_container = document.getElementById("container");
const form = document.querySelector("form");
nField = form.querySelector(".name"),
nInput = nField.querySelector("input"),
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".url"),
pInput = pField.querySelector("input");

setTimeout(() => {
    //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    nField.classList.remove("shake");
  }, 500);

  eInput.onkeyup = () => {
    checkEmail();
  }; //calling checkEmail function on email input keyup
  pInput.onkeyup = () => {
    checkurl();
  }; //calling checkurl function on url input keyup
  nInput.onkeyup = () => {
    checkname();
  }; //calling checkname function on name input keyup

  function checkname() {
    //checkname function
    let pattern = /^([a-zA-Z ])$/; //pattern for validate name
    if (!eInput.value.match(pattern)) {
      if (nInput.value == "") {
        //if name is empty then add error and remove valid class
        nField.classList.add("error");
        nField.classList.remove("valid");
      } else {
        //if name is empty then remove error and add valid class
        nField.classList.remove("error");
        nField.classList.add("valid");
      }
    }
  }
//=============================================================================================

  function checkEmail()  //checkEmail function
  {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;  //pattern for validate email
    if (!eInput.value.match(pattern)) {        //if pattern not matched then add error and remove valid class                                 
    eField.classList.add("error");
    eField.classList.remove("valid");          //if email value is not empty then show please enter valid email else show Email can't be blank
    let errorTxt = eField.querySelector(".error-txt");
      eInput.value != ""
        ? (errorTxt.innerText = "Enter a valid email address")
        : (errorTxt.innerText = "email can't be blank");
    } else {
      //if pattern matched then remove error and add valid class
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }
  //================================================================================================
  function checkurl()    //checkurl function
  {
  let pattern =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/; //pattern for validate url
    if (!pInput.value.match(pattern)) {                     //if pattern not matched then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
      let errorTxt = pField.querySelector(".error-txt");    //if url value is not empty then show please enter valid url else show Email can't be blank
      pInput.value != ""
        ? (errorTxt.innerText = "Enter a valid url")
        : (errorTxt.innerText = "link can't be blank");
    } else {                                                 //if pattern matched then remove error and add valid class
    pField.classList.remove("error");
    pField.classList.add("valid");
    }
  }
//==================================================================================================
  form.onsubmit = (e) => {
  e.preventDefault(); //preventing from form submitting

   //if email and password and name is blank then add shake class in it else call specified function
  nInput.value == "" ? nField.classList.add("shake", "error") : checkname();
  eInput.value == "" ? eField.classList.add("shake", "error") : checkEmail();
  pInput.value == "" ? pField.classList.add("shake", "error") : checkurl();

  setTimeout(() => {
    //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    nField.classList.remove("shake");
  }, 500);

//if eField and pField doesn't and nfield contains error class that mean user filled details properly
  
    window.location.href = form.getAttribute("action"); 
    const btn = document.getElementById("add");
    btn.addEventListener("click", () => {
      const box = document.getElementsByClassName("popup")[0];
      box.style.visibility = "hidden";
    });
    
  if (
    !eField.classList.contains("error") &&
    !pField.classList.contains("error") &&
    !nField.classList.contains("error"))
    {
    
    let newSite = `            
      <div class="site">
      <img src="images/google (1).png" alt="google" />
      <div class="caption">
      <p class="site-name">${nInput.value}</p>
      <p class="site-email">${eInput.value}</p>
    </div>
    <div class="remove">
      <i class="fa-sharp fa-solid fa-trash"></i>
    </div>
  </div>`;
    document.getElementById("container").innerHTML += newSite;

// Click on a remove button to hide the current div
    var close = document.getElementsByClassName("remove");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
      };
    }
  
  } 
}
//=========================================================================
//show popup when click on "+" button
document.getElementById("buton").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "flex";
});

//============================================================================
// Click on a remove button to hide the current div
var close = document.getElementsByClassName("remove");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}
