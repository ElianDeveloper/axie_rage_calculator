# 🎨 Resumen: Configuración de Iconos para Rage Calculator

## ✅ Lo que se ha configurado:

### **1. Configuración en package.json**

- ✅ Agregada configuración de iconos para todas las plataformas
- ✅ Agregado script `setup-icons` para facilitar la configuración

### **2. Archivos creados en build/**

- ✅ `icon.svg` - Diseño vectorial del icono (calculadora con rayo)
- ✅ `convert-icons.cjs` - Script de conversión manual
- ✅ `setup-icons.js` - Script automatizado de configuración
- ✅ `README-ICONS.md` - Documentación completa

### **3. Estructura de archivos necesaria:**

```
build/
├── icon.svg          ✅ Creado
├── icon.png          ❌ Necesitas crear (512x512)
├── icon.ico          ❌ Necesitas crear (256x256)
├── icon.icns         ❌ Necesitas crear (512x512)
├── convert-icons.cjs ✅ Creado
├── setup-icons.js    ✅ Creado
└── README-ICONS.md   ✅ Creado
```

## 🚀 Próximos pasos:

### **Opción 1: Automática (Recomendada)**

```bash
npm run setup-icons
```

Este comando te guiará para instalar sharp y convertir automáticamente el SVG a PNG.

### **Opción 2: Manual con herramientas online**

#### **Para crear icon.png (Linux):**

1. Ve a https://convertio.co/svg-png/
2. Sube el archivo `build/icon.svg`
3. Configura tamaño: 512x512 píxeles
4. Descarga y guarda como `build/icon.png`

#### **Para crear icon.ico (Windows):**

1. Ve a https://convertio.co/png-ico/
2. Sube el archivo `build/icon.png` (que creaste en el paso anterior)
3. Configura tamaño: 256x256 píxeles
4. Descarga y guarda como `build/icon.ico`

#### **Para crear icon.icns (macOS):**

1. Ve a https://cloudconvert.com/png-to-icns
2. Sube el archivo `build/icon.png`
3. Configura tamaño: 512x512 píxeles
4. Descarga y guarda como `build/icon.icns`

## 🎯 Resultado final:

Una vez que tengas todos los archivos de icono, ejecuta:

```bash
npm run electron:build
```

Esto creará el ejecutable con tu icono personalizado en lugar del icono por defecto de Electron.

## 🎨 Diseño del icono:

El icono diseñado incluye:

- **Calculadora dorada** con pantalla
- **Símbolo de rayo** para representar "rage"
- **Colores:** Dorado (#f59e0b) y gris oscuro (#1f2937)
- **Estilo:** Moderno y minimalista

## 📝 Notas importantes:

1. **Tamaños recomendados:**

   - PNG: 512x512 píxeles
   - ICO: 256x256 píxeles
   - ICNS: 512x512 píxeles

2. **Si el icono no aparece:**

   - Verifica que los archivos estén en la carpeta `build/`
   - Limpia la carpeta `dist-electron/` y vuelve a compilar
   - Asegúrate de que los formatos sean correctos

3. **Para personalizar el diseño:**
   - Edita el archivo `build/icon.svg`
   - Usa cualquier editor de SVG (Inkscape, Figma, etc.)
   - Mantén el tamaño de 512x512 píxeles

## 🔧 Comandos útiles:

```bash
# Configurar iconos automáticamente
npm run setup-icons

# Crear ejecutable con iconos personalizados
npm run electron:build

# Limpiar y volver a compilar
rm -rf dist-electron && npm run electron:build
```

¡Con esta configuración, tu aplicación tendrá un icono profesional y personalizado en lugar del icono genérico de Electron!
