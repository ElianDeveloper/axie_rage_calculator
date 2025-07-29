import { useState, useEffect } from "react";
import type { Team, DamageConfig } from "../types/axie";
import { TEAM_CARDS } from "../data/cards";
import { calculateCardDamage } from "../utils/damageCalculator";
import { useElectronStore } from "../hooks/useElectronStore";

export function DamageCalculator() {
  const { team: savedTeam } = useElectronStore();

  const [team, setTeam] = useState<Team>({
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

  const [selectedAxie, setSelectedAxie] = useState<"front" | "mid" | "back">(
    "front"
  );

  const [damageConfig, setDamageConfig] = useState<DamageConfig>({
    damageReduction: 0,
    targetHasAlert: false,
  });

  // Cargar configuración guardada y mostrar log
  useEffect(() => {
    if (savedTeam) {
      // Cargar la configuración en el estado local
      setTeam(savedTeam);
    }
  }, [savedTeam]);

  const currentAxie = team[selectedAxie];

  const handleRageStacksChange = (value: number) => {
    setTeam((prev) => ({
      ...prev,
      [selectedAxie]: {
        ...prev[selectedAxie],
        furyState: {
          ...prev[selectedAxie].furyState,
          rageStacks: Math.max(0, Math.min(10, value)),
          isInFury: value >= 10,
        },
      },
    }));
  };

  const handleEnergySpentChange = (value: number) => {
    setTeam((prev) => ({
      ...prev,
      [selectedAxie]: {
        ...prev[selectedAxie],
        energySpent: Math.max(0, Math.min(10, value)),
      },
    }));
  };

  const getAxieDisplayName = (position: string) => {
    const names = {
      front: "Front",
      mid: "Mid",
      back: "Back",
    };
    return names[position as keyof typeof names];
  };

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Selector de axie */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {(["front", "mid", "back"] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedAxie(pos)}
                className={`px-8 py-4 rounded-lg text-lg font-bold transition-all ${
                  selectedAxie === pos
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {getAxieDisplayName(pos)}
              </button>
            ))}
          </div>
        </div>

        {/* Información del axie seleccionado */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-400">
              {getAxieDisplayName(selectedAxie)}
            </h2>
            {currentAxie.rune && (
              <div className="bg-purple-600 px-4 py-2 rounded-full text-sm font-medium">
                {currentAxie.rune.name}
              </div>
            )}
          </div>

          {/* Control de Rage y Reducción de Daño */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-medium">
                  Rage Stacks: {currentAxie.furyState.rageStacks}
                </label>
                {currentAxie.furyState.isInFury && (
                  <span className="text-red-400 text-lg font-bold animate-pulse">
                    ¡EN FURIA!
                  </span>
                )}
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={currentAxie.furyState.rageStacks}
                onChange={(e) =>
                  handleRageStacksChange(parseInt(e.target.value))
                }
                className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>0</span>
                <span>5</span>
                <span>10 (Furia)</span>
              </div>
            </div>

            <div>
              <label className="text-lg font-medium mb-2 block">
                Reducción de Daño: {damageConfig.damageReduction}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={damageConfig.damageReduction}
                onChange={(e) =>
                  setDamageConfig((prev) => ({
                    ...prev,
                    damageReduction: parseInt(e.target.value),
                  }))
                }
                className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cartas del axie */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(["ears", "horn", "back", "tail"] as const).map((cardType) => {
            const card = currentAxie.cards[cardType];
            const damageCalculation = calculateCardDamage(
              currentAxie,
              cardType,
              damageConfig
            );

            return (
              <div
                key={cardType}
                className="bg-gray-800 rounded-lg p-6 relative"
              >
                {/* Control de energía para RONIN */}
                {cardType === "back" && (
                  <div className="absolute top-3 right-3 flex items-center space-x-2 bg-gray-700 px-2 py-1 rounded">
                    <button
                      onClick={() =>
                        handleEnergySpentChange(
                          Math.max(0, currentAxie.energySpent - 1)
                        )
                      }
                      className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-700"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium text-white min-w-[20px] text-center">
                      {currentAxie.energySpent}
                    </span>
                    <button
                      onClick={() =>
                        handleEnergySpentChange(
                          Math.min(10, currentAxie.energySpent + 1)
                        )
                      }
                      className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-green-700"
                    >
                      +
                    </button>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    {card.name}
                  </h3>
                  <div className="text-sm text-gray-400">
                    Daño base:{" "}
                    {card.isEvolved ? card.evolvedAttack : card.baseAttack}
                  </div>
                  {card.amuletBonus > 0 && (
                    <div className="text-sm text-yellow-400">
                      +{card.amuletBonus} amuleto
                    </div>
                  )}
                </div>

                {/* Estado de evolución */}
                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        card.isEvolved
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                    >
                      {card.isEvolved ? "Evolucionada" : "Nivel 1"}
                    </div>
                  </div>
                </div>

                {/* Efecto de la carta */}
                <div className="mb-4">
                  <div className="text-xs text-gray-300 bg-gray-700 p-3 rounded">
                    {card.effect}
                  </div>
                </div>

                {/* Daño calculado */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {damageCalculation.finalDamage}
                  </div>
                  <div className="text-sm text-gray-400">Daño Final</div>
                </div>

                {/* Desglose del daño */}
                <div className="mt-4 bg-gray-700 p-3 rounded text-xs">
                  <div className="font-medium text-purple-300 mb-2">
                    Desglose:
                  </div>
                  {damageCalculation.breakdown.map((item, index) => (
                    <div key={index} className="text-gray-300 mb-1">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
