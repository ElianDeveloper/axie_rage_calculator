# Rage Calculator - Calculadora de Daño para Axie Infinity

Una aplicación de escritorio especializada para calcular el daño de cartas en el juego Axie Infinity, construida con Electron, React, TypeScript y Tailwind CSS.

## 🎯 Descripción

Rage Calculator es una herramienta completa que permite a los jugadores de Axie Infinity:

- **Configurar equipos** con cartas, runas y amuletos personalizados
- **Calcular daño preciso** considerando todos los factores del juego
- **Simular estados de furia** y stacks de rage
- **Personalizar runas** con valores específicos de daño y furia
- **Guardar configuraciones** de equipo persistentes

## 🚀 Tecnologías

- **Electron 37.2.4** - Framework para aplicaciones de escritorio
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.8.3** - Tipado estático para JavaScript
- **Vite 7.0.4** - Herramienta de construcción rápida
- **Tailwind CSS 4.1.11** - Framework de CSS utilitario
- **Electron Store** - Persistencia de datos local

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

3. Configura los iconos de la aplicación (opcional):

```bash
npm run setup-icons
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

### Utilidades

```bash
# Configurar iconos de la aplicación
npm run setup-icons
```

## 📁 Estructura del proyecto

```
rage_calculator/
├── build/                    # Archivos de construcción e iconos
│   ├── icon.svg             # Icono vectorial de la aplicación
│   ├── icon.ico             # Icono para Windows
│   ├── icon.icns            # Icono para macOS
│   ├── setup-icons.cjs      # Script de configuración de iconos
│   └── convert-icons.cjs    # Script de conversión de iconos
├── dist/                    # Archivos construidos (generado)
├── dist-electron/           # Ejecutables de Electron (generado)
├── electron/                # Archivos de Electron
│   ├── main.cjs            # Proceso principal de Electron
│   └── preload.js          # Script de precarga
├── public/                  # Archivos públicos estáticos
│   └── vite.svg            # Icono de Vite
├── src/                     # Código fuente de React
│   ├── components/          # Componentes React
│   │   ├── DamageCalculator.tsx    # Calculadora principal de daño
│   │   ├── TeamConfigurator.tsx    # Configurador de equipos
│   │   └── Header.tsx              # Encabezado de la aplicación
│   ├── data/               # Datos del juego
│   │   ├── cards.ts        # Definición de cartas
│   │   └── runes.ts        # Definición de runas
│   ├── hooks/              # Hooks personalizados
│   │   └── useElectronStore.ts     # Hook para persistencia
│   ├── types/              # Definiciones de tipos TypeScript
│   │   ├── axie.ts         # Tipos relacionados con Axies
│   │   └── electron.d.ts   # Tipos de Electron
│   ├── utils/              # Utilidades y lógica de negocio
│   │   └── damageCalculator.ts     # Lógica de cálculo de daño
│   ├── assets/             # Recursos estáticos
│   │   └── react.svg       # Icono de React
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos del componente principal
│   ├── main.tsx            # Punto de entrada
│   ├── index.css           # Estilos globales con Tailwind
│   └── vite-env.d.ts       # Tipos de Vite
├── index.html              # Archivo HTML principal
├── package.json            # Configuración del proyecto
├── package-lock.json       # Lock file de dependencias
├── tailwind.config.ts      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
├── tsconfig.app.json       # Configuración de TypeScript para la app
├── tsconfig.node.json      # Configuración de TypeScript para Node
├── vite.config.ts          # Configuración de Vite
├── eslint.config.js        # Configuración de ESLint
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Este archivo
└── ICON-SETUP-SUMMARY.md   # Resumen de configuración de iconos
```

## 🎮 Funcionalidades

### 📊 Calculadora de Daño

- **Cálculo preciso** siguiendo la mecánica exacta del juego
- **Desglose detallado** de cada paso del cálculo
- **Estados de furia** con consumo de stacks de rage
- **Controles de rage** con botones 0-10 para cada axie
- **Reducción de daño** configurable globalmente

### ⚙️ Configurador de Equipos

- **Gestión de cartas** por posición (orejas, cuerno, espalda, cola)
- **Evolución de cartas** (nivel 1 y 2)
- **Bonus de amuletos** ajustable (0-50)
- **Sistema de runas** con tres opciones:
  - Sin runa
  - Runa predefinida (del juego)
  - Runa personalizada (valores personalizados)

### 💾 Persistencia de Datos

- **Guardado automático** de configuraciones
- **Notificaciones** de éxito/error al guardar
- **Carga automática** de equipos guardados
- **Compatibilidad** con versiones anteriores

### 🎨 Interfaz de Usuario

- **Diseño moderno** con Tailwind CSS
- **Tema oscuro** optimizado para gaming
- **Responsive** y adaptable
- **Iconos personalizados** para la aplicación

## 🔧 Configuración

### Electron

- **main.cjs**: Configuración principal de Electron con persistencia
- **preload.js**: Script de precarga para APIs seguras

### Tailwind CSS

- **tailwind.config.ts**: Configuración de Tailwind con tema personalizado
- **src/index.css**: Importaciones de Tailwind y estilos globales

### Vite

- **vite.config.ts**: Configuración de Vite para React y Electron

### Iconos

- **build/setup-icons.cjs**: Script automatizado para generar iconos
- **build/convert-icons.cjs**: Script manual de conversión de iconos
- **build/icon.svg**: Icono vectorial base de la aplicación

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

Esto creará ejecutables para tu plataforma en la carpeta `dist-electron/`:

- **Windows**: Archivo portable (.exe)
- **macOS**: Aplicación (.app)
- **Linux**: AppImage

## 🎨 Personalización

### Agregar estilos de Tailwind

Los estilos de Tailwind están configurados en `src/index.css`. Puedes agregar clases de Tailwind directamente en tus componentes React.

### Modificar la ventana de Electron

Edita `electron/main.cjs` para cambiar el tamaño, título o comportamiento de la ventana.

### Configurar iconos personalizados

1. Reemplaza `build/icon.svg` con tu diseño
2. Ejecuta `npm run setup-icons`
3. Los iconos se generarán automáticamente para todas las plataformas

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

### Error de iconos en Windows

Si los iconos no se cargan en Windows:

1. Verifica que `build/icon.ico` existe
2. Ejecuta `npm run setup-icons` para regenerar
3. Asegúrate de que `signAndEditExecutable: false` está en `package.json`

## 📝 Versión

**Versión actual**: 1.0.2

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras o reportar bugs.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, por favor abre un issue en el repositorio.
