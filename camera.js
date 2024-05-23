function checkCamera() {
  const device = window.navigator.mediaDevices;
  console.log("device", device);
}

async function checkCamera() {
  const navigator = window.navigator.mediaDevices;
  const devices = await navigator.enumerateDevices();
  console.log("devices", devices);
}

navigator.getUserMedia(
  {
    audio: false,
    video: {
      width: 500,
      height: 500,
      facingMode: { exact: "environment" },
    },
  },
  (stream) => {
    // Handle the stream
  },
  (error) => {
    // Handle the error
  }
);
