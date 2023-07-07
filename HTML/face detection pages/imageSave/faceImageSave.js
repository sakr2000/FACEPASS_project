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
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("scanbtn").addEventListener("click", () => {
  context.drawImage(video, 0, 0, 980, 740);
  let image = canvas.toDataURL("image/");
  const data = [{ image: image, username: "medooo" }];
  console.log(data);
  postJSON(data);
});
