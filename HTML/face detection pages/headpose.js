let video = document.getElementById("video");
let scanbtn = document.getElementById("scanbtn");
let message = document.getElementById("text_msg");
let result_msg = document.getElementById("result_msg");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
if (navigator.mediaDevices.getUserMedia);
{
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function (err) {
      console.log(err);
    });
}
const showMessage = [
  "Kindly,can you LOOK UP ",
  "Kindly,can you LOOK LEFT ",
  "Kindly,can you LOOK RIGHT",
];
let sendmessage = (msg) => {
  chrome.runtime.sendMessage({ message: msg }),
    (response) => {
      console.log(response);
    };
};

async function postJSON(data) {
  try {
    const response = await fetch("http://127.0.0.1:5000/test-headPose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    result_msg.innerHTML = result.headpose;

    if (
      result.headpose == "Looking Right" &&
      message.innerHTML.includes("LOOK RIGHT")
    ) {
      sendmessage("user SCANED ");
      setTimeout(() => {
        window.close();
      }, 100);
    } else if (
      result.headpose == "Looking Left" &&
      message.innerHTML.includes("LOOK LEFT")
    ) {
      sendmessage("user SCANED ");
      setTimeout(() => {
        window.close();
      }, 100);
    } else if (
      result.headpose == "Looking Up" &&
      message.innerHTML.includes("LOOK UP")
    ) {
      sendmessage("user SCANED ");
      setTimeout(() => {
        window.close();
      }, 100);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

scanbtn.addEventListener("click", () => {
  const randomElement =
    showMessage[Math.floor(Math.random() * showMessage.length)];
  console.log(randomElement);
  message.innerHTML = randomElement;
  document.querySelector("p.result-msg").style.display = "inline";
  setInterval(() => {
    context.drawImage(video, 0, 0, 980, 740);
    let image = canvas.toDataURL("image/");
    const data = { image: image };
    postJSON(data);
  }, 500);
});
