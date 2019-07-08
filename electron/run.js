const electron = require('electron');
const { app, BrowserWindow } = electron;

function createWindow () {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  let win = new BrowserWindow({
    width, height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setFullScreen(true)
  win.loadURL('https://dashboard.goodcity.hk');
}

app.on('ready', createWindow)