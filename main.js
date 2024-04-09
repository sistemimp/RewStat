// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch("ignore-certificate-errors");

const log = require('electron-log/main')
log.initialize();
//crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('electron-fiddle')
}



const createWindow = () => {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    title: "RewStat",
    width: 1080,
    height: 900,
    webPreferences: {
      nodeIntegration: true, //mariiiiia importantissimo
      contextIsolation: false,//mariiiiia importantissimo
      enableRemoteModule: true,//mariiiiia importantissimo
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  mainWindow.resizable = true;
  // mainWindow.menuBarVisible = false;
  // mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const appdata = app.getPath('userData')
global.appdata = appdata

app.whenReady().then(async () => {
  createWindow()
  app.on('activate', () => {

    log.info("App Start")
    console.log("App Start")
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();

  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {

    app.quit()
  }
})

// app.on('open-url', (event, url) => {
//     dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
//   })

app.setAsDefaultProtocolClient("RewStat")