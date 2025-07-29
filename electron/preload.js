const { contextBridge, ipcRenderer } = require("electron");

// Crear instancia del store de manera segura
let store = null;
try {
  const Store = require("electron-store");
  store = new Store({
    name: "rage-calculator-config", // Nombre del archivo de configuración
    defaults: {
      team: null, // Configuración del equipo
      settings: {
        theme: "dark",
        language: "es",
      },
    },
  });
} catch (error) {
  console.error("Error initializing electron-store:", error);
}

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close: () => ipcRenderer.send("window-close"),

  // Métodos para el store
  store: {
    // Obtener configuración del equipo
    getTeam: () => (store ? store.get("team") : null),

    // Guardar configuración del equipo
    setTeam: (team) => {
      if (store) {
        store.set("team", team);
      } else {
        console.log("Store no disponible");
      }
    },

    // Obtener configuración general
    getSettings: () => (store ? store.get("settings") : null),

    // Guardar configuración general
    setSettings: (settings) => {
      if (store) {
        store.set("settings", settings);
      } else {
        console.log("Store no disponible");
      }
    },

    // Obtener cualquier valor
    get: (key) => (store ? store.get(key) : null),

    // Guardar cualquier valor
    set: (key, value) => {
      if (store) {
        store.set(key, value);
      } else {
        console.log("Store no disponible");
      }
    },

    // Eliminar un valor
    delete: (key) => {
      if (store) {
        store.delete(key);
      } else {
        console.log("Store no disponible");
      }
    },

    // Verificar si existe un valor
    has: (key) => (store ? store.has(key) : false),
  },
});
