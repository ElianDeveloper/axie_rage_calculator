#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🎨 Configurando iconos para Rage Calculator...\n");

// Verificar si sharp está instalado
function checkSharp() {
  try {
    require("sharp");
    return true;
  } catch (error) {
    return false;
  }
}

// Instalar sharp si no está disponible
function installSharp() {
  console.log("📦 Instalando sharp para conversión de iconos...");
  try {
    execSync("npm install sharp", { stdio: "inherit" });
    console.log("✅ Sharp instalado correctamente\n");
    return true;
  } catch (error) {
    console.log("❌ Error instalando sharp. Usando herramientas online...\n");
    return false;
  }
}

// Convertir SVG a PNG usando sharp
function convertToPNG() {
  try {
    const sharp = require("sharp");

    console.log("🔄 Convirtiendo SVG a PNG...");

    sharp("build/icon.svg")
      .resize(512, 512)
      .png()
      .toFile("build/icon.png")
      .then(() => {
        console.log("✅ Icono PNG creado: build/icon.png");
        return convertToICO();
      })
      .catch((error) => {
        console.log("❌ Error convirtiendo a PNG:", error.message);
        console.log("📝 Usa herramientas online para crear los iconos");
      });
  } catch (error) {
    console.log("❌ Sharp no disponible. Usa herramientas online.");
  }
}

// Convertir PNG a ICO usando to-ico
function convertToICO() {
  try {
    const sharp = require("sharp");
    const toIco = require("to-ico");

    console.log("🔄 Convirtiendo PNG a ICO...");

    // Crear múltiples tamaños para el ICO
    Promise.all([
      sharp("build/icon.png").resize(16, 16).png().toBuffer(),
      sharp("build/icon.png").resize(32, 32).png().toBuffer(),
      sharp("build/icon.png").resize(48, 48).png().toBuffer(),
      sharp("build/icon.png").resize(64, 64).png().toBuffer(),
      sharp("build/icon.png").resize(128, 128).png().toBuffer(),
      sharp("build/icon.png").resize(256, 256).png().toBuffer(),
    ])
      .then((buffers) => {
        return toIco(buffers);
      })
      .then((icoBuffer) => {
        fs.writeFileSync("build/icon.ico", icoBuffer);
        console.log("✅ Icono ICO creado: build/icon.ico");
        return convertToICNS();
      })
      .catch((error) => {
        console.log("❌ Error convirtiendo a ICO:", error.message);
        console.log("📝 Usa herramientas online para crear el ICO");
      });
  } catch (error) {
    console.log("❌ Error creando ICO. Usa herramientas online.");
  }
}

// Convertir PNG a ICNS usando sharp
function convertToICNS() {
  try {
    const sharp = require("sharp");

    console.log("🔄 Convirtiendo PNG a ICNS...");

    sharp("build/icon.png")
      .resize(512, 512)
      .png()
      .toBuffer()
      .then((buffer) => {
        // Crear un archivo ICNS simple (formato básico)
        const icnsBuffer = createICNSBuffer(buffer);
        fs.writeFileSync("build/icon.icns", icnsBuffer);
        console.log("✅ Icono ICNS creado: build/icon.icns");
        console.log("\n🎉 ¡Todos los iconos han sido creados exitosamente!");
        console.log(
          "🚀 Ejecuta 'npm run electron:build' para crear el ejecutable"
        );
      })
      .catch((error) => {
        console.log("❌ Error convirtiendo a ICNS:", error.message);
        console.log("📝 Usa herramientas online para crear el ICNS");
      });
  } catch (error) {
    console.log("❌ Error creando ICNS. Usa herramientas online.");
  }
}

// Crear buffer ICNS simple
function createICNSBuffer(pngBuffer) {
  // Header ICNS básico
  const header = Buffer.alloc(8);
  header.write("icns", 0, 4); // Magic
  header.writeUInt32BE(pngBuffer.length + 8, 4); // Size

  // Icon data
  const iconHeader = Buffer.alloc(8);
  iconHeader.write("ic08", 0, 4); // Type (512x512)
  iconHeader.writeUInt32BE(pngBuffer.length, 4); // Size

  return Buffer.concat([header, iconHeader, pngBuffer]);
}

// Verificar archivos existentes
function checkExistingFiles() {
  const files = ["build/icon.png", "build/icon.ico", "build/icon.icns"];
  const existing = files.filter((file) => fs.existsSync(file));

  if (existing.length > 0) {
    console.log("📁 Archivos de icono encontrados:");
    existing.forEach((file) =>
      console.log(`   ✅ ${file.replace("build/", "")}`)
    );
    console.log("");
  }

  const missing = files.filter((file) => !fs.existsSync(file));
  if (missing.length > 0) {
    console.log("📁 Archivos faltantes:");
    missing.forEach((file) =>
      console.log(`   ❌ ${file.replace("build/", "")}`)
    );
    console.log("");
  }

  return { existing, missing };
}

// Función principal
function main() {
  console.log("🔍 Verificando archivos existentes...");
  const { existing, missing } = checkExistingFiles();

  if (missing.length === 0) {
    console.log("🎉 ¡Todos los iconos están listos!");
    console.log('🚀 Ejecuta "npm run electron:build" para crear el ejecutable');
    return;
  }

  if (missing.includes("build/icon.png")) {
    if (checkSharp()) {
      convertToPNG();
    } else {
      console.log("📦 Sharp no está instalado. ¿Quieres instalarlo? (y/n)");
      process.stdin.once("data", (data) => {
        const answer = data.toString().trim().toLowerCase();
        if (answer === "y" || answer === "yes") {
          if (installSharp()) {
            convertToPNG();
          }
        } else {
          console.log("📝 Usa herramientas online para crear los iconos:");
          console.log("   - https://convertio.co/svg-png/");
          console.log("   - https://cloudconvert.com/svg-to-png");
        }
      });
    }
  } else {
    console.log("📝 Para crear los iconos faltantes, usa:");
    console.log("   - icon.ico: https://convertio.co/png-ico/");
    console.log("   - icon.icns: https://cloudconvert.com/png-to-icns");
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { main, checkSharp, installSharp, convertToPNG };
