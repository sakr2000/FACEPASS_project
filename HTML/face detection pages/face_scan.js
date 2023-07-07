let video = document.getElementById("video");
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

let sendmessage = (msg) => {
  chrome.runtime.sendMessage({ message: msg }),
    (response) => {
      console.log(response);
    };
};

async function postJSON(data) {
  try {
    const response = await fetch("http://127.0.0.1:5000/test-image", {
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
        const element = result.activeUser;
        if (incomingName.includes(element.name)) {
          let m = "user SCANED , result : " + incomingName;
          sendmessage(m);
          setTimeout(() => {
            window.close();
          }, 100);
        } else {
          console.log(incomingName);
        }
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// getting the image data from the video and sending it to API
document.getElementById("scanbtn").addEventListener("click", () => {
  context.drawImage(video, 0, 0, 980, 740);
  let image = canvas.toDataURL("image/");
  const data = [{ image: image }];
  console.log(data);
  postJSON(data);
});
