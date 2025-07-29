import { useState } from "react";
import { Header } from "./components/Header";
import { DamageCalculator } from "./components/DamageCalculator";
import { TeamConfigurator } from "./components/TeamConfigurator";

function App() {
  const [currentView, setCurrentView] = useState<"equipo" | "juego">("equipo");

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 overflow-hidden">
        {currentView === "equipo" ? <TeamConfigurator /> : <DamageCalculator />}
      </div>
    </div>
  );
}

export default App;
