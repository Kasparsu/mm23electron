const { contextBridge, ipcRenderer } = require('electron/renderer')


contextBridge.exposeInMainWorld('electronAPI', {
  files: (path) => ipcRenderer.invoke('files', path),
});