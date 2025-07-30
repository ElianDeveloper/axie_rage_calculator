const fs = require("fs");
const path = require("path");

// Función para crear un icono PNG simple usando Canvas (si está disponible)
function createPNGIcon() {
  try {
    // Crear un canvas simple de 512x512
    const canvas = require("canvas");
    const { createCanvas } = canvas;

    const size = 512;
    const c = createCanvas(size, size);
    const ctx = c.getContext("2d");

    // Fondo circular con gradiente
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "#1f2937");
    gradient.addColorStop(1, "#111827");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 20, 0, 2 * Math.PI);
    ctx.fill();

    // Borde
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Calculadora (rectángulo dorado)
    const calcWidth = 200;
    const calcHeight = 280;
    const calcX = (size - calcWidth) / 2;
    const calcY = (size - calcHeight) / 2;

    const calcGradient = ctx.createLinearGradient(
      calcX,
      calcY,
      calcX + calcWidth,
      calcY + calcHeight
    );
    calcGradient.addColorStop(0, "#f59e0b");
    calcGradient.addColorStop(1, "#d97706");

    ctx.fillStyle = calcGradient;
    ctx.beginPath();
    ctx.roundRect(calcX, calcY, calcWidth, calcHeight, 20);
    ctx.fill();

    // Pantalla
    const screenWidth = 160;
    const screenHeight = 60;
    const screenX = calcX + 20;
    const screenY = calcY + 20;

    const screenGradient = ctx.createLinearGradient(
      screenX,
      screenY,
      screenX + screenWidth,
      screenY + screenHeight
    );
    screenGradient.addColorStop(0, "#374151");
    screenGradient.addColorStop(1, "#1f2937");

    ctx.fillStyle = screenGradient;
    ctx.beginPath();
    ctx.roundRect(screenX, screenY, screenWidth, screenHeight, 8);
    ctx.fill();

    // Texto en la pantalla
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("RAGE", size / 2, calcY + 45);

    ctx.font = "16px Arial";
    ctx.fillText("CALC", size / 2, calcY + 65);

    // Símbolo de rayo
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.moveTo(size / 2, calcY - 40);
    ctx.lineTo(size / 2 - 10, calcY - 20);
    ctx.lineTo(size / 2, calcY - 10);
    ctx.lineTo(size / 2 - 10, calcY + 10);
    ctx.lineTo(size / 2 + 10, calcY - 10);
    ctx.lineTo(size / 2, calcY - 20);
    ctx.closePath();
    ctx.fill();

    // Guardar como PNG
    const buffer = c.toBuffer("image/png");
    fs.writeFileSync(path.join(__dirname, "icon.png"), buffer);
    console.log("✅ Icono PNG creado: build/icon.png");
  } catch (error) {
    console.log(
      "⚠️  No se pudo crear el PNG con canvas. Creando un PNG simple..."
    );
    createSimplePNG();
  }
}

function createSimplePNG() {
  // Crear un PNG simple usando el SVG como base
  const svgContent = fs.readFileSync(path.join(__dirname, "icon.svg"), "utf8");

  // Para este ejemplo, vamos a crear un archivo PNG simple
  // En un entorno real, usarías una librería como sharp o canvas
  console.log(
    "📝 Para crear los iconos, usa una herramienta online o instala sharp:"
  );
  console.log("npm install sharp");
  console.log("");
  console.log("O usa herramientas online:");
  console.log("- https://convertio.co/svg-png/");
  console.log("- https://cloudconvert.com/svg-to-png");
  console.log("");
  console.log("Formatos necesarios:");
  console.log("- icon.png (512x512) para Linux");
  console.log("- icon.ico (256x256) para Windows");
  console.log("- icon.icns para macOS");
}

// Función para crear un ICO simple
function createICO() {
  console.log("📝 Para crear el archivo .ico, usa:");
  console.log("- https://convertio.co/png-ico/");
  console.log("- https://www.icoconverter.com/");
  console.log("");
  console.log("Tamaño recomendado: 256x256 píxeles");
}

// Función para crear un ICNS simple
function createICNS() {
  console.log("📝 Para crear el archivo .icns, usa:");
  console.log("- https://cloudconvert.com/png-to-icns");
  console.log("- https://www.icoconverter.com/");
  console.log("");
  console.log("Tamaño recomendado: 512x512 píxeles");
}

// Ejecutar conversiones
console.log("🎨 Creando iconos para Rage Calculator...\n");

try {
  createPNGIcon();
  createICO();
  createICNS();

  console.log("\n✅ Configuración completada!");
  console.log("📁 Los archivos deben estar en la carpeta build/");
  console.log(
    '🚀 Ejecuta "npm run electron:build" para crear el ejecutable con el nuevo icono'
  );
} catch (error) {
  console.error("❌ Error:", error.message);
}
