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

async function postJSON(data) {
  try {
    const response = await fetch("http://127.0.0.1:5000/save-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
    if (result.message.includes("saved successfully")) {
      chrome.storage.local.get(["activeUser"]).then((r) => {
        if (r.activeUser) {
          r.activeUser.firstLogin = false;
          console.log(r.activeUser);
          chrome.storage.local.get(["users"]).then((result) => {
            if (result.users) {
              for (let i = 0; i < result.users.length; i++) {
                if (r.activeUser.name == result.users[i].name) {
                  result.users[i].firstLogin = false;
                }
              }
              chrome.storage.local.set({ users: result.users });
              chrome.storage.local.set({ activeUser: r.activeUser });
            }
          });
          location.href = "scan_end.html";
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("scanbtn").addEventListener("click", () => {
  context.drawImage(video, 0, 0, 980, 740);
  let image = canvas.toDataURL("image/");
  chrome.storage.local.get(["activeUser"]).then((r) => {
    if (r.activeUser) {
      const data = { image: image, username: r.activeUser.name };
      console.log(data);
      postJSON(data);
    }
  });
});
