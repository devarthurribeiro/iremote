const { desktopCapturer } = require('electron')
const SimplePeer = require('simple-peer')

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error
  for (let i = 0; i < sources.length; ++i) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      })
      .then((stream) => handleStream(stream))
      .catch((e) => handleError(e))
      return
  }
})

const config = {
  iceServers: [{
      url: 'stun:stun.l.google.com:19302'
  }]
}

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
  peer = new SimplePeer({ initiator: true, trickle: false, config: config })
  peer._pc.addStream(stream)
  console.log(peer);
}

function handleError (e) {
  console.log(e)
}