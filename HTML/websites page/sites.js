

const form = document.querySelector("form");
nField = form.querySelector(".name"),
nInput = nField.querySelector("input"),
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".url"),
pInput = pField.querySelector("input");
form.onsubmit = (e)=>{e.preventDefault(); //preventing from form submitting

//if email and password and name is blank then add shake class in it else call specified function
(nInput.value == "") ? nField.classList.add("shake", "error") : checkname();
(eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
(pInput.value == "") ? pField.classList.add("shake", "error") : checkurl();


setTimeout(()=>{ //remove shake class after 500ms
eField.classList.remove("shake");
pField.classList.remove("shake");
nField.classList.remove("shake");

}, 500);

eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
pInput.onkeyup = ()=>{checkurl();} //calling checkurl function on pass input keyup
nInput.onkeyup = ()=>{checkname();} //calling checkname function on name input keyup


function checkname(){ //checkname function
let pattern = /^([a-zA-Z ])$/; //pattern for validate email
if(!eInput.value.match(pattern)){ 
    if(nInput.value == ""){ //if pass is empty then add error and remove valid class
    nField.classList.add("error");
    nField.classList.remove("valid");
    }else{ //if pass is empty then remove error and add valid class
    nField.classList.remove("error");
    nField.classList.add("valid");
    }
}}
//if eField and pField doesn't contains error class that mean user filled details properly
if(!eField.classList.contains("error") && !pField.classList.contains("error")  && !nField.classList.contains("error")){
    window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
}

//=============================================================================================


function checkEmail(){ //checkEmail function
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
if(!eInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class
    eField.classList.add("error");
    eField.classList.remove("valid");
    let errorTxt = eField.querySelector(".error-txt");
    //if email value is not empty then show please enter valid email else show Email can't be blank
    (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "email can't be blank";
    }
    else{ //if pattern matched then remove error and add valid class
    eField.classList.remove("error");
    eField.classList.add("valid");
    }
//if eField and pField and nField doesn't contains error class that mean user filled details properly
if(!eField.classList.contains("error") && !pField.classList.contains("error")  && !nField.classList.contains("error")){
    window.location.href = form.getAttribute("action"); //redirecting user to the specified email which is inside action attribute of form tag
}
}

//================================================================================================

function checkurl(){ //checkurl function
let pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/; //pattern for validate url
if(!pInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class
    pField.classList.add("error");
    pField.classList.remove("valid");
    let errorTxt = pField.querySelector(".error-txt");
    //if url value is not empty then show please enter valid url else show Email can't be blank
    (pInput.value != "") ? errorTxt.innerText = "Enter a valid url" : errorTxt.innerText = "link can't be blank";
}
  else{ //if pattern matched then remove error and add valid class
    pField.classList.remove("error");
    pField.classList.add("valid");
}
//if eField and pField and nField doesn't contains error class that mean user filled details properly
if(!eField.classList.contains("error") && !pField.classList.contains("error")  && !nField.classList.contains("error")){
    window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
}
}};
//==================================================================================================
// Create a new site when clicking on the "Add" button
function newSite() {

    
}

//=========================================================================
document.getElementById("buton").addEventListener("click",function(){
    document.querySelector(".popup").style.display="flex";
})




