import { useState, useEffect } from "react";
import type { Team } from "../types/axie";
import { TEAM_CARDS } from "../data/cards";
import { RUNES } from "../data/runes";
import { useElectronStore } from "../hooks/useElectronStore";

export function TeamConfigurator() {
  const { team, saveTeam } = useElectronStore();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const [localTeam, setLocalTeam] = useState<Team>({
    front: {
      id: "front",
      position: "Front",
      cards: {
        ears: { ...TEAM_CARDS.zen },
        horn: { ...TEAM_CARDS.imp },
        back: { ...TEAM_CARDS.ronin },
        tail: { ...TEAM_CARDS.shiba },
      },
      furyState: { isInFury: false, rageStacks: 0, alliesInFury: 0 },
      energySpent: 0,
      pureDamageUsed: 0,
    },
    mid: {
      id: "mid",
      position: "Mid",
      cards: {
        ears: { ...TEAM_CARDS.zen },
        horn: { ...TEAM_CARDS.imp },
        back: { ...TEAM_CARDS.ronin },
        tail: { ...TEAM_CARDS.shiba },
      },
      furyState: { isInFury: false, rageStacks: 0, alliesInFury: 0 },
      energySpent: 0,
      pureDamageUsed: 0,
    },
    back: {
      id: "back",
      position: "Back",
      cards: {
        ears: { ...TEAM_CARDS.zen },
        horn: { ...TEAM_CARDS.imp },
        back: { ...TEAM_CARDS.ronin },
        tail: { ...TEAM_CARDS.shiba },
      },
      furyState: { isInFury: false, rageStacks: 0, alliesInFury: 0 },
      energySpent: 0,
      pureDamageUsed: 0,
    },
  });

  // Cargar equipo guardado cuando esté disponible
  useEffect(() => {
    if (team) {
      setLocalTeam(team);
    }
  }, [team]);

  const [selectedAxie, setSelectedAxie] = useState<"front" | "mid" | "back">(
    "front"
  );
  const [selectedCard, setSelectedCard] = useState<
    "ears" | "horn" | "back" | "tail"
  >("ears");

  const currentAxie = localTeam[selectedAxie];

  const handleCardEvolution = (cardType: "ears" | "horn" | "back" | "tail") => {
    const newTeam = {
      ...localTeam,
      [selectedAxie]: {
        ...localTeam[selectedAxie],
        cards: {
          ...localTeam[selectedAxie].cards,
          [cardType]: {
            ...localTeam[selectedAxie].cards[cardType],
            isEvolved: !localTeam[selectedAxie].cards[cardType].isEvolved,
          },
        },
      },
    };
    setLocalTeam(newTeam);
    try {
      saveTeam(newTeam);
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleAmuletChange = (
    cardType: "ears" | "horn" | "back" | "tail",
    value: number
  ) => {
    const newTeam = {
      ...localTeam,
      [selectedAxie]: {
        ...localTeam[selectedAxie],
        cards: {
          ...localTeam[selectedAxie].cards,
          [cardType]: {
            ...localTeam[selectedAxie].cards[cardType],
            amuletBonus: Math.max(0, value),
          },
        },
      },
    };
    setLocalTeam(newTeam);
    try {
      saveTeam(newTeam);
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleRuneChange = (runeKey: string, level: number) => {
    if (!runeKey) {
      const newTeam = {
        ...localTeam,
        [selectedAxie]: {
          ...localTeam[selectedAxie],
          rune: undefined,
        },
      };
      setLocalTeam(newTeam);
      try {
        saveTeam(newTeam);
      } catch (error) {
        console.error("Error saving team:", error);
      }
      return;
    }

    const rune = RUNES[runeKey as keyof typeof RUNES]?.find(
      (r) => r.level === level
    );
    const newTeam = {
      ...localTeam,
      [selectedAxie]: {
        ...localTeam[selectedAxie],
        rune: rune || undefined,
      },
    };
    setLocalTeam(newTeam);
    try {
      saveTeam(newTeam);
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleSaveConfiguration = () => {
    try {
      saveTeam(localTeam);
      console.log("Configuración guardada exitosamente");

      // Mostrar notificación de éxito
      setNotificationType("success");
      setNotificationMessage("¡Configuración guardada exitosamente!");
      setShowNotification(true);

      // Ocultar la notificación después de 3 segundos
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      // Limpiar el timeout si el componente se desmonta
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error saving configuration:", error);

      // Mostrar notificación de error
      setNotificationType("error");
      setNotificationMessage("Error al guardar la configuración");
      setShowNotification(true);

      // Ocultar la notificación después de 3 segundos
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      // Limpiar el timeout si el componente se desmonta
      return () => clearTimeout(timeoutId);
    }
  };

  const getCardDisplayName = (cardType: string) => {
    const names = {
      ears: "Orejas",
      horn: "Cuerno",
      back: "Espalda",
      tail: "Cola",
    };
    return names[cardType as keyof typeof names];
  };

  const getAxieDisplayName = (position: string) => {
    const names = {
      front: "Front",
      mid: "Mid",
      back: "Back",
    };
    return names[position as keyof typeof names];
  };

  // Comentamos el spinner de carga por ahora
  // if (isLoading) {
  //   return (
  //     <div className="h-full bg-gray-900 text-white flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
  //         <p className="text-gray-400">Cargando configuración...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-auto">
      {/* Notificación */}
      {showNotification && (
        <div
          className={`fixed top-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out animate-bounce ${
            notificationType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <div className="flex items-center space-x-2">
            {notificationType === "success" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">
            Configuración del Equipo
          </h1>
          <p className="text-gray-400">
            Configura las cartas, runas y amuletos de cada axie
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de selección de axie */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">
                Seleccionar Axie
              </h2>

              <div className="space-y-4">
                {(["front", "mid", "back"] as const).map((pos) => (
                  <div
                    key={pos}
                    onClick={() => setSelectedAxie(pos)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAxie === pos
                        ? "border-blue-500 bg-blue-900/20"
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {getAxieDisplayName(pos)}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Posición{" "}
                          {pos === "front"
                            ? "delantera"
                            : pos === "mid"
                            ? "media"
                            : "trasera"}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {pos === "front" ? "F" : pos === "mid" ? "M" : "B"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel de configuración de cartas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-400">
                  Configuración - {getAxieDisplayName(selectedAxie)}
                </h2>
                {currentAxie.rune && (
                  <div className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                    {currentAxie.rune.name}
                  </div>
                )}
              </div>

              {/* Selector de cartas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {(["ears", "horn", "back", "tail"] as const).map((cardType) => (
                  <button
                    key={cardType}
                    onClick={() => setSelectedCard(cardType)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCard === cardType
                        ? "border-green-500 bg-green-900/20"
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium text-white">
                        {getCardDisplayName(cardType)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {currentAxie.cards[cardType].name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Configuración de la carta seleccionada */}
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {currentAxie.cards[selectedCard].name} -{" "}
                    {getCardDisplayName(selectedCard)}
                  </h3>
                  <div className="text-sm text-gray-400">
                    Daño:{" "}
                    {currentAxie.cards[selectedCard].isEvolved
                      ? currentAxie.cards[selectedCard].evolvedAttack
                      : currentAxie.cards[selectedCard].baseAttack}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Evolución */}
                  <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                    <div>
                      <label className="text-sm font-medium text-white">
                        Evolución
                      </label>
                      <p className="text-xs text-gray-400">
                        Nivel 2 de la carta
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentAxie.cards[selectedCard].isEvolved}
                        onChange={() => handleCardEvolution(selectedCard)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Amuleto */}
                  <div className="p-3 bg-gray-600 rounded-lg">
                    <label className="block text-sm font-medium text-white mb-2">
                      Bonus de Amuleto: +
                      {currentAxie.cards[selectedCard].amuletBonus}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={currentAxie.cards[selectedCard].amuletBonus}
                      onChange={(e) =>
                        handleAmuletChange(
                          selectedCard,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>+0</span>
                      <span>+50</span>
                    </div>
                  </div>

                  {/* Efecto de la carta */}
                  <div className="p-3 bg-gray-600 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">
                      Efecto
                    </h4>
                    <p className="text-xs text-gray-300">
                      {currentAxie.cards[selectedCard].effect}
                    </p>
                  </div>
                </div>
              </div>

              {/* Configuración de runa */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-purple-400 mb-4">Runa</h3>

                {/* Sin runa */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                  <div
                    onClick={() => handleRuneChange("", 0)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all group relative ${
                      !currentAxie.rune
                        ? "border-purple-500 bg-purple-900/20"
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xs text-white">-</span>
                      </div>
                      <div className="text-xs font-medium text-white">
                        Sin Runa
                      </div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10">
                      <div className="font-medium mb-1 text-sm">Sin Runa</div>
                      <div className="text-gray-300">
                        No aplica efectos especiales
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                  </div>
                </div>

                {/* Runa seleccionada */}
                {currentAxie.rune && (
                  <div className="mb-4 p-3 bg-purple-900/20 border border-purple-600 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-300">
                          {currentAxie.rune.name}
                        </p>
                        <p className="text-xs text-purple-400 mt-1">
                          {currentAxie.rune.effect}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRuneChange("", 0)}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                )}

                {/* Grid de runas */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(RUNES).map(([runeKey, runeLevels]) => (
                    <div key={runeKey} className="space-y-2">
                      <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        {runeKey.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {runeLevels.map((rune) => (
                          <div
                            key={rune.id}
                            onClick={() =>
                              handleRuneChange(runeKey, rune.level)
                            }
                            className={`p-2 rounded-lg border-2 cursor-pointer transition-all group relative ${
                              currentAxie.rune?.id === rune.id
                                ? "border-purple-500 bg-purple-900/20"
                                : "border-gray-600 bg-gray-700 hover:border-purple-400 hover:bg-purple-900/10"
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-xs font-medium text-white mb-1">
                                {rune.name.replace(/Lv\d+/, "").trim()}
                              </div>
                              <div className="text-xs text-gray-400">
                                Lv{rune.level}
                              </div>
                            </div>

                            {/* Tooltip con efecto */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-80 z-10">
                              <div className="font-medium mb-2 text-sm">
                                {rune.name}
                              </div>
                              <div className="text-gray-300 leading-relaxed">
                                {rune.effect}
                              </div>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSaveConfiguration}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
