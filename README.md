# Rage Calculator - Electron + React + Tailwind CSS

Una aplicación de escritorio construida con Electron, React, TypeScript y Tailwind CSS.

## 🚀 Tecnologías

- **Electron** - Framework para aplicaciones de escritorio
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd rage_calculator
```

2. Instala las dependencias:

```bash
npm install
```

## 🎯 Scripts disponibles

### Desarrollo

```bash
# Ejecutar solo la aplicación React (modo desarrollo)
npm run dev

# Ejecutar la aplicación completa con Electron
npm run electron:dev
```

### Construcción

```bash
# Construir la aplicación React
npm run build

# Vista previa de la aplicación construida
npm run preview

# Construir la aplicación completa con Electron
npm run electron:build
```

## 📁 Estructura del proyecto

```
rage_calculator/
├── electron/           # Archivos de Electron
│   ├── main.mjs       # Proceso principal de Electron
│   └── preload.js     # Script de precarga
├── src/               # Código fuente de React
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Punto de entrada
│   └── index.css      # Estilos globales con Tailwind
├── dist/              # Archivos construidos (generado)
├── dist-electron/     # Ejecutables de Electron (generado)
└── package.json       # Configuración del proyecto
```

## 🔧 Configuración

### Electron

- **main.mjs**: Configuración principal de Electron
- **preload.js**: Script de precarga para APIs seguras

### Tailwind CSS

- **tailwind.config.ts**: Configuración de Tailwind
- **src/index.css**: Importaciones de Tailwind

### Vite

- **vite.config.ts**: Configuración de Vite para React

## 🚀 Ejecutar en desarrollo

1. **Solo React (navegador)**:

   ```bash
   npm run dev
   ```

   Abre http://localhost:5173 en tu navegador

2. **Con Electron**:
   ```bash
   npm run electron:dev
   ```
   Esto iniciará tanto el servidor de desarrollo como la aplicación Electron

## 📦 Construir para producción

```bash
npm run electron:build
```

Esto creará ejecutables para tu plataforma en la carpeta `dist-electron/`.

## 🎨 Personalización

### Agregar estilos de Tailwind

Los estilos de Tailwind están configurados en `src/index.css`. Puedes agregar clases de Tailwind directamente en tus componentes React.

### Modificar la ventana de Electron

Edita `electron/main.mjs` para cambiar el tamaño, título o comportamiento de la ventana.

## 🐛 Solución de problemas

### Error de preload script

Si ves errores relacionados con el preload script, asegúrate de que:

- El archivo `electron/preload.js` existe
- Está usando sintaxis CommonJS (`require` en lugar de `import`)

### Estilos de Tailwind no se cargan

Verifica que:

- `src/index.css` contiene las importaciones de Tailwind
- `tailwind.config.ts` está configurado correctamente
- No hay conflictos con otros archivos CSS

### Error de puerto ocupado

Si el puerto 5173 está ocupado, Vite automáticamente intentará usar otro puerto.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
