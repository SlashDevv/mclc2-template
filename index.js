// Importation des modules
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { Client, Authenticator } = require("minecraft-launcher-core");

// Variables globales
let mainWindow;

// Création de la fenêtre principale
function createWindow() {
  mainWindow = new BrowserWindow({
    // Icone du launcher
    icon: path.join(__dirname, "/assets/img/slashdev.png"),
    width: 1000,
    height: 750,
    autoHideMenuBar: true,
    webPreferences: {
      // Requis pour l'utilisation des modules coté renderer
      nodeIntegration: true,
      /* Requis en cas d'utilisation de titlebar custom
      enableRemoteModule: true,*/
    },
  });

  mainWindow.loadURL(path.join(__dirname, "index.html"));
}

// Quand l'application est chargée, afficher la fenêtre
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Si toutes les fenêtres sont fermées, quitter l'application
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
