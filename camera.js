function startCamera() {
    const constraints = { video: true };
  
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        // 在成功获取视频流后的处理逻辑
        // 可以将视频流赋值给 <video> 元素的 srcObject 属性进行播放
        const videoElement = document.getElementById("videoElement");
        videoElement.srcObject = stream;
      })
      .catch(function (error) {
        // 在获取视频流失败后的处理逻辑
        console.error("无法获取视频流:", error);
        alert("无法访问摄像头，请确保已授权访问并重新加载页面！");
      });
  }
  
function switchCamera() {
    if (videoElement.srcObject) {
      let videoTracks = videoElement.srcObject.getVideoTracks();
      if (videoTracks.length > 0) {
        let currentTrack = videoTracks[0];
        let facingMode = currentTrack.getSettings().facingMode;
  
        const constraints = { video: {} };
        if (facingMode === "user") {
          constraints.video.facingMode = "environment"; // 切換到後鏡頭
        } else {
          constraints.video.facingMode = "user"; // 切換到前鏡頭
        }
  
        // 停止原本的視訊串流
        videoTracks.forEach(function (track) {
          track.stop();
        });
  
        // 確保瀏覽器支援 MediaDevices API
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // 取得新的視訊串流
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
              videoElement.srcObject = stream;
            })
            .catch(function (error) {
              console.error("無法取得視訊串流:", error);
              alert(
                "您使用的瀏覽器不支援視訊串流，請使用其他瀏覽器，再重新開啟頁面！"
              );
            });
        } else {
          alert(
            "您使用的瀏覽器不支援視訊串流，請使用其他瀏覽器，再重新開啟頁面！"
          );
        }
      }
    }
  }