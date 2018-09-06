const { desktopCapturer, ipcRenderer } = require('electron')
const SimplePeer = require('simple-peer')

function handleStream (stream) {
  peer = new SimplePeer({ initiator: true, trickle: false, stream: stream })
  peer.on('signal', (data) => {
    ipcRenderer.send('startService', data)
  })
  ipcRenderer.on('connectPeer', (event, data) => {
    console.log('connect remote');
    peer.signal(data)
  })
}

function handleError (e) {
  console.log(e)
}

module.exports = function startRTC() {
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
}