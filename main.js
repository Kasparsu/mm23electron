// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, desktopCapturer, session } = require('electron')
const path = require('node:path')
const fs = require('fs');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    // x: 100,
    // y: 100,
    // minHeight: 300,
    // minWidth: 300,
    // maxHeight: 1000,
    // maxWidth: 1300,
    // resizable: false,
    // movable: false,
    // minimizable: false,
    // closable: false,
    // focusable: false,
    //alwaysOnTop: true,
    //fullscreen: true,
    //skipTaskbar: true,
    title: 'Some cool title',
    //show: false,
    //frame: false,
    //opacity: 0.5,
    //transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      // contextIsolation: false,
    }
  })

  ipcMain.handle('files', (event, path) => {
    
    return fs.readdirSync(path);
  });

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      // Grant access to the first screen found.
      callback({ video: sources[1], audio: 'loopback' })
    })
    // If true, use the system picker if available.
    // Note: this is currently experimental. If the system picker
    // is available, it will be used and the media request handler
    // will not be invoked.
  }, { useSystemPicker: true })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
