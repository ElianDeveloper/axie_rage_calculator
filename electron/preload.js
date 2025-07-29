const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Puedes exponer APIs aquí
});
