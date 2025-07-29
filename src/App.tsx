import { useState } from "react";
import { Header } from "./components/Header";
import { DamageCalculator } from "./components/DamageCalculator";

function App() {
  const [currentView, setCurrentView] = useState<"equipo" | "juego">("equipo");

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 overflow-hidden">
        {currentView === "juego" ? (
          <DamageCalculator />
        ) : (
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Vista de Juego</h2>
              <p className="text-gray-400">
                Esta vista estará disponible próximamente
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
