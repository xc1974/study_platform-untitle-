const video = document.getElementById('video');
const button = document.getElementById('button');
const select = document.getElementById('select');

let currentStream;

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

button.addEventListener('click', event => {
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
  } else {
    videoConstraints.deviceId = { exact: select.value };
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      video.play();
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
    });
});

navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      if (device.kind === 'videoinput') {
        const option = document.createElement('option');
        option.value = device.deviceId;
        const label = device.label || `Camera ${select.length + 1}`;
        option.text = label;
        select.appendChild(option);
      }
    });
  })
  .catch(error => {
    console.error('Error enumerate devices.', error);
  });
