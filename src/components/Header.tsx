import { useState } from "react";

interface HeaderProps {
  currentView: "equipo" | "juego";
  onViewChange: (view: "equipo" | "juego") => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.maximize();
      setIsMaximized(!isMaximized);
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.close();
    }
  };

  return (
    <div
      className="bg-gray-800 border-b border-gray-700 h-8 flex items-center justify-between px-4 select-none"
      style={{ WebkitAppRegion: "drag" }} // Permite arrastrar la ventana
    >
      {/* Área de arrastre */}
      <div className="flex-1 flex items-center">
        {/* Navegación */}
        <div className="flex space-x-1">
          <button
            onClick={() => onViewChange("equipo")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "equipo"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            style={{ WebkitAppRegion: "no-drag" }} // Evita que los botones arrastren
          >
            Equipo
          </button>
          <button
            onClick={() => onViewChange("juego")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === "juego"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            style={{ WebkitAppRegion: "no-drag" }} // Evita que los botones arrastren
          >
            Juego
          </button>
        </div>
      </div>

      {/* Controles de ventana */}
      <div
        className="flex items-center space-x-2"
        style={{ WebkitAppRegion: "no-drag" }} // Evita que los controles arrastren
      >
        <button
          onClick={handleMinimize}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Minimizar"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>

        <button
          onClick={handleMaximize}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title={isMaximized ? "Restaurar" : "Maximizar"}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMaximized ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            )}
          </svg>
        </button>

        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 rounded transition-colors"
          title="Cerrar"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
