const fs = require("fs");

const filePath = "app.json"; // Eğer app.config.js kullanıyorsan bunu değiştir
const appConfig = JSON.parse(fs.readFileSync(filePath, "utf8"));

const versionParts = appConfig.expo.version.split(".");
versionParts[2] = (parseInt(versionParts[2]) + 1).toString(); // Patch numarasını artır
appConfig.expo.version = versionParts.join(".");

fs.writeFileSync(filePath, JSON.stringify(appConfig, null, 2));

console.log(`Yeni sürüm: ${appConfig.expo.version}`);
