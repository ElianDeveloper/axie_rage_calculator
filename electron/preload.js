const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),

  // Métodos para el store usando IPC
  store: {
    // Obtener configuración del equipo
    getTeam: () => ipcRenderer.invoke("store-get-team"),

    // Guardar configuración del equipo
    setTeam: (team) => ipcRenderer.invoke("store-set-team", team),

    // Obtener configuración general
    getSettings: () => ipcRenderer.invoke("store-get-settings"),

    // Guardar configuración general
    setSettings: (settings) =>
      ipcRenderer.invoke("store-set-settings", settings),

    // Obtener cualquier valor
    get: (key) => ipcRenderer.invoke("store-get", key),

    // Guardar cualquier valor
    set: (key, value) => ipcRenderer.invoke("store-set", key, value),

    // Eliminar un valor
    delete: (key) => ipcRenderer.invoke("store-delete", key),

    // Verificar si existe un valor
    has: (key) => ipcRenderer.invoke("store-has", key),
  },
});
