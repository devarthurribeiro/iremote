const { app, BrowserWindow, ipcMain } = require('electron')

const startService = require('./src/server')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({width: 350, height: 600})

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

ipcMain.on('startService', (event, dataChannel) => {
  startService(dataChannel, event)
})
