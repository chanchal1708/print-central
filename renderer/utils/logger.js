const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const { CONFIG_JSON } = require("@pages/api");
const { combine, timestamp, label, printf, json } = format;
require("winston-daily-rotate-file");

function getConfigJSON() {
  if (!fs.existsSync("data/config.json")) {
    fs.mkdir("data", (error) => {
      if (error) {
        console.log(error);
      } else {
        fs.writeFileSync(
          "data/config.json",
          JSON.stringify(CONFIG_JSON, null, 4),
          "UTF-8"
        );
      }
    });

    return CONFIG_JSON;
  } else {
    let data = fs.readFileSync("data/config.json", "UTF-8");
    return JSON.parse(data);
  }
}

const configJson = getConfigJSON();
const logPath = configJson["logPath"];
// const logPath = "C:\\PrinterLogs";
const CATEGORY = "SunPharma";

const fileLogger = createLogger({
  level: "info", // Set the default level to info for production
  format: combine(
    label({ label: CATEGORY }),
    timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    json(),
    printf(({ level, timestamp, label, message }) => {
      return JSON.stringify({ level, timestamp, label, message });
    })
  ),
  transports: [
    new transports.DailyRotateFile({
      level: "info",
      datePattern: "YYYY-MM-DD",
      filename: `${logPath}/info-%DATE%.log`,
      maxSize: "10m", // Adjusted size to 10MB
      maxFiles: null, // Keep all files
    }),
    new transports.DailyRotateFile({
      level: "error",
      datePattern: "YYYY-MM-DD",
      filename: `${logPath}/error-%DATE%.log`,
      maxSize: "10m", // Adjusted size to 10MB
      maxFiles: null, // Keep all files
    }),
    // new transports.DailyRotateFile({
    //   level: "warn",
    //   datePattern: "YYYY-MM-DD",
    //   filename: `${logPath}/warn-%DATE%.log`,
    //   maxSize: "10m", // Adjusted size to 10MB
    //   maxFiles: null, // Keep all files
    // }),
    // new transports.DailyRotateFile({
    //   level: "debug",
    //   datePattern: "YYYY-MM-DD",
    //   filename: `${logPath}/debug-%DATE%.log`,
    //   maxSize: "10m", // Adjusted size to 10MB
    //   maxFiles: null, // Keep all files
    // }),
  ],
});

// fileLogger.info("info", { label: "info label" });
// fileLogger.error("error", { label: "error label" });
// fileLogger.warn("warn", { label: "warn label" });
// fileLogger.debug("debug", { label: "debug label" });

module.exports = fileLogger;
