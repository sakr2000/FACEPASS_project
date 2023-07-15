let video = document.getElementById("video");
let scanbtn = document.getElementById("scanbtn");
let message = document.getElementById("text_msg");
let result_msg = document.getElementById("result_msg");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
let recognized = false;
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
  "Kindly,can you LOOK UP",
  "Kindly,can you LOOK LEFT",
  "Kindly,can you LOOK RIGHT",
  "Kindly,can you LOOK DOWN",
];
let sendmessage = (msg) => {
  chrome.runtime.sendMessage({ message: msg }),
    (response) => {
      console.log(response);
    };
};

async function HeadPose(data) {
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
      message.innerHTML.includes("LOOK RIGHT") &&
      recognized
    ) {
      sendmessage("user SCANED ");
      setTimeout(() => {
        window.close();
      }, 100);
    } else if (
      result.headpose == "Looking Left" &&
      message.innerHTML.includes("LOOK LEFT") &&
      recognized
    ) {
      sendmessage("user SCANED ");
      setTimeout(() => {
        window.close();
      }, 100);
    } else if (
      result.headpose == "Looking Up" &&
      message.innerHTML.includes("LOOK UP") &&
      recognized
    ) {
      sendmessage("user SCANED ");
      setTimeout(() => {
        window.close();
      }, 100);
    } else if (
      result.headpose == "Looking Down" &&
      message.innerHTML.includes("LOOK DOWN") &&
      recognized
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

async function FaceRecogntion(data) {
  if (!recognized) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/test-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // getting the result from the API
      const result = await response.json();
      console.log("Success:", result);
      let incomingName = JSON.parse(result.username.replace(/'/g, '"'))[0];

      // comparing the result with the active-user name
      chrome.storage.local.get(["activeUser"]).then((result) => {
        if (result.activeUser) {
          if (incomingName.includes(result.activeUser.name)) {
            recognized = true;
          }
          console.log(recognized);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

scanbtn.addEventListener("click", () => {
  const randomElement =
    showMessage[Math.floor(Math.random() * showMessage.length)];
  console.log(randomElement);
  message.innerHTML = randomElement;
  document.querySelector("p.result-msg").style.display = "inline";

  // head pose detection every 0.3s
  setInterval(() => {
    context.drawImage(video, 0, 0, 980, 740);
    let image = canvas.toDataURL("image/");
    const data = { image: image };
    HeadPose(data);
  }, 300);

  // Face recogntion every 1s
  setInterval(() => {
    context.drawImage(video, 0, 0, 980, 740);
    let image = canvas.toDataURL("image/");
    const data = { image: image };
    FaceRecogntion(data);
  }, 1000);
});
