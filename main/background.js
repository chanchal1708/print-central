import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}
let mainWindow;
(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    title: "Print-Central v1.0.0",
    icon: "./resources/icon.ico",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.maximize();
  if (isProd) {
    await mainWindow.loadURL("app://./activationkey");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/activationkey`);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.webContents.send("close-window-click", "close");
  });
})();

ipcMain.once("closeWindow-reply", (event, arg) => {
  if (arg == "okclose") {
    mainWindow.destroy();
    app.quit();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
