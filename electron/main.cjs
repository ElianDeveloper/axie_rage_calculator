const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

console.log("=== PROCESO PRINCIPAL INICIADO ===");

let mainWindow = null;
let store = null;

// Inicializar store de manera asíncrona
async function initializeStore() {
  try {
    const Store = (await import("electron-store")).default;
    store = new Store({
      name: "rage-calculator-config",
      defaults: {
        team: null,
        settings: {
          theme: "dark",
          language: "es",
        },
      },
    });
    console.log("Store inicializado en proceso principal:", store.path);

    // Registrar handlers de IPC DESPUÉS de inicializar el store
    console.log("Registrando handlers de IPC...");

    ipcMain.handle("store-get-team", () => {
      console.log("Handler store-get-team ejecutado");
      console.log("Obteniendo equipo desde proceso principal");
      const team = store.get("team");
      console.log("Equipo obtenido:", team);
      return team;
    });

    ipcMain.handle("store-set-team", (event, team) => {
      console.log("Guardando equipo desde proceso principal:", team);
      store.set("team", team);
      console.log("Equipo guardado exitosamente");
      return true;
    });

    ipcMain.handle("store-get-settings", () => {
      return store.get("settings");
    });

    ipcMain.handle("store-set-settings", (event, settings) => {
      store.set("settings", settings);
      return true;
    });

    ipcMain.handle("store-get", (event, key) => {
      return store.get(key);
    });

    ipcMain.handle("store-set", (event, key, value) => {
      store.set(key, value);
      return true;
    });

    ipcMain.handle("store-delete", (event, key) => {
      store.delete(key);
      return true;
    });

    ipcMain.handle("store-has", (event, key) => {
      return store.has(key);
    });

    console.log("Handlers de IPC registrados exitosamente");
  } catch (error) {
    console.error("Error inicializando store:", error);
  }
}
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // Quita la barra de título
    autoHideMenuBar: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
    titleBarStyle: "hidden",
    titleBarOverlay: false,
  });

  // Cargar aplicación React en desarrollo
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
};

// Manejar eventos de control de ventana
ipcMain.on("window-minimize", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on("window-maximize", () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

app.whenReady().then(async () => {
  // Inicializar store primero
  await initializeStore();

  // Luego crear la ventana
  createWindow();

  // macOS: recrear ventana al activar
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Cerrar aplicación al salir de todas las ventanas (Windows/Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
