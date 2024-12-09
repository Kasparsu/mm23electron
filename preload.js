const { contextBridge, ipcRenderer } = require('electron/renderer')


contextBridge.exposeInMainWorld('electronAPI', {
  log: (message) => ipcRenderer.invoke('log', message),
});