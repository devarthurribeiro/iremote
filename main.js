const {app, BrowserWindow} = require('electron')
require('./src/server')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({width: 300, height: 600})

  mainWindow.loadFile('./src/index.html')

  mainWindow.on('close', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
