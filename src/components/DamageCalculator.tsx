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

  const [damageConfig, setDamageConfig] = useState<DamageConfig>({
    damageReduction: 0,
    targetHasAlert: false,
  });

  const [selectedCard, setSelectedCard] = useState<{
    position: "front" | "mid" | "back";
    cardType: "ears" | "horn" | "back" | "tail";
  } | null>(null);

  // Cargar configuración guardada y mostrar log
  useEffect(() => {
    if (savedTeam) {
      // Cargar la configuración en el estado local
      setTeam(savedTeam);
    }
  }, [savedTeam]);

  const handleRageStacksChange = (
    position: "front" | "mid" | "back",
    value: number
  ) => {
    setTeam((prev) => ({
      ...prev,
      [position]: {
        ...prev[position],
        furyState: {
          ...prev[position].furyState,
          rageStacks: Math.max(0, Math.min(10, value)),
          isInFury: value >= 10,
        },
      },
    }));
  };

  const handleCardClick = (
    position: "front" | "mid" | "back",
    cardType: "ears" | "horn" | "back" | "tail"
  ) => {
    setSelectedCard({ position, cardType });
  };

  const getSelectedCardBreakdown = () => {
    if (!selectedCard) return null;

    const axie = team[selectedCard.position];
    const card = axie.cards[selectedCard.cardType];
    const damageCalculation = calculateCardDamage(
      axie,
      selectedCard.cardType,
      damageConfig
    );

    return {
      card,
      damageCalculation,
      position: selectedCard.position,
      cardType: selectedCard.cardType,
    };
  };

  const selectedBreakdown = getSelectedCardBreakdown();

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Controles Globales */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Reducción de Daño Global */}
            <div className="flex items-center justify-center space-x-4">
              <label className="text-xl font-medium">Reducción de Daño:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setDamageConfig((prev) => ({
                      ...prev,
                      damageReduction: Math.max(0, prev.damageReduction - 5),
                    }))
                  }
                  className="w-10 h-10 bg-red-600 text-white rounded flex items-center justify-center text-lg font-bold hover:bg-red-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={damageConfig.damageReduction}
                  onChange={(e) =>
                    setDamageConfig((prev) => ({
                      ...prev,
                      damageReduction: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-center text-white text-lg font-medium"
                />
                <span className="text-lg font-medium">%</span>
                <button
                  onClick={() =>
                    setDamageConfig((prev) => ({
                      ...prev,
                      damageReduction: Math.min(100, prev.damageReduction + 5),
                    }))
                  }
                  className="w-10 h-10 bg-green-600 text-white rounded flex items-center justify-center text-lg font-bold hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Energía Global para RONIN */}
            <div className="flex items-center justify-center space-x-4">
              <label className="text-xl font-medium">Energía:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setTeam((prev) => ({
                      ...prev,
                      front: {
                        ...prev.front,
                        energySpent: Math.max(0, prev.front.energySpent - 1),
                      },
                      mid: {
                        ...prev.mid,
                        energySpent: Math.max(0, prev.mid.energySpent - 1),
                      },
                      back: {
                        ...prev.back,
                        energySpent: Math.max(0, prev.back.energySpent - 1),
                      },
                    }));
                  }}
                  className="w-10 h-10 bg-red-600 text-white rounded flex items-center justify-center text-lg font-bold hover:bg-red-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={team.front.energySpent}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setTeam((prev) => ({
                      ...prev,
                      front: { ...prev.front, energySpent: value },
                      mid: { ...prev.mid, energySpent: value },
                      back: { ...prev.back, energySpent: value },
                    }));
                  }}
                  className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-center text-white text-lg font-medium"
                />
                <button
                  onClick={() => {
                    setTeam((prev) => ({
                      ...prev,
                      front: {
                        ...prev.front,
                        energySpent: Math.min(10, prev.front.energySpent + 1),
                      },
                      mid: {
                        ...prev.mid,
                        energySpent: Math.min(10, prev.mid.energySpent + 1),
                      },
                      back: {
                        ...prev.back,
                        energySpent: Math.min(10, prev.back.energySpent + 1),
                      },
                    }));
                  }}
                  className="w-10 h-10 bg-green-600 text-white rounded flex items-center justify-center text-lg font-bold hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Detallado */}
        {selectedBreakdown && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-yellow-400">
                Breakdown: {selectedBreakdown.card.name} (
                {selectedBreakdown.position.toUpperCase()})
              </h2>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  Cálculo:
                </h3>
                <div className="space-y-1 text-sm">
                  {selectedBreakdown.damageCalculation.breakdown.map(
                    (step, index) => (
                      <div key={index} className="text-gray-300">
                        {step}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Resumen:
                </h3>
                <div className="space-y-1 text-sm">
                  <div>
                    Daño base: {selectedBreakdown.damageCalculation.baseDamage}
                  </div>
                  <div>
                    Amuleto: +{selectedBreakdown.damageCalculation.amuletBonus}
                  </div>
                  <div>
                    Efectos especiales: +
                    {selectedBreakdown.damageCalculation.specialEffects}
                  </div>
                  <div>
                    Furia: +{selectedBreakdown.damageCalculation.furyBonus}
                  </div>
                  <div>
                    Rage: +{selectedBreakdown.damageCalculation.rageBonus}
                  </div>
                  <div>
                    Runa: +{selectedBreakdown.damageCalculation.runeBonus}
                  </div>
                  <div className="text-yellow-400 font-bold">
                    Total: {selectedBreakdown.damageCalculation.totalDamage}
                  </div>
                  <div className="text-red-400 font-bold">
                    Final: {selectedBreakdown.damageCalculation.finalDamage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Equipo Completo */}
        <div className="space-y-4">
          {/* Front */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-blue-400">Front</h2>
              <div className="flex items-center space-x-2">
                {team.front.furyState.isInFury && (
                  <span className="text-red-400 text-sm font-bold animate-pulse">
                    ¡FURIA!
                  </span>
                )}
                <label className="text-sm font-medium">Rage:</label>
                <button
                  onClick={() =>
                    handleRageStacksChange(
                      "front",
                      Math.max(0, team.front.furyState.rageStacks - 1)
                    )
                  }
                  className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center text-xs font-bold hover:bg-red-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={team.front.furyState.rageStacks}
                  onChange={(e) =>
                    handleRageStacksChange(
                      "front",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-12 bg-gray-700 border border-gray-600 rounded px-1 py-1 text-center text-white text-sm"
                />
                <button
                  onClick={() =>
                    handleRageStacksChange(
                      "front",
                      Math.min(10, team.front.furyState.rageStacks + 1)
                    )
                  }
                  className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cartas del Front */}
            <div className="grid grid-cols-4 gap-2">
              {(["ears", "horn", "back", "tail"] as const).map((cardType) => {
                const card = team.front.cards[cardType];
                const damageCalculation = calculateCardDamage(
                  team.front,
                  cardType,
                  damageConfig
                );

                return (
                  <div
                    key={cardType}
                    className="bg-gray-700 rounded p-2 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => handleCardClick("front", cardType)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-400 truncate">
                        {card.name}
                      </span>
                      <span className="text-lg font-bold text-yellow-400">
                        {damageCalculation.finalDamage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mid */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-green-400">Mid</h2>
              <div className="flex items-center space-x-2">
                {team.mid.furyState.isInFury && (
                  <span className="text-red-400 text-sm font-bold animate-pulse">
                    ¡FURIA!
                  </span>
                )}
                <label className="text-sm font-medium">Rage:</label>
                <button
                  onClick={() =>
                    handleRageStacksChange(
                      "mid",
                      Math.max(0, team.mid.furyState.rageStacks - 1)
                    )
                  }
                  className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center text-xs font-bold hover:bg-red-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={team.mid.furyState.rageStacks}
                  onChange={(e) =>
                    handleRageStacksChange("mid", parseInt(e.target.value) || 0)
                  }
                  className="w-12 bg-gray-700 border border-gray-600 rounded px-1 py-1 text-center text-white text-sm"
                />
                <button
                  onClick={() =>
                    handleRageStacksChange(
                      "mid",
                      Math.min(10, team.mid.furyState.rageStacks + 1)
                    )
                  }
                  className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cartas del Mid */}
            <div className="grid grid-cols-4 gap-2">
              {(["ears", "horn", "back", "tail"] as const).map((cardType) => {
                const card = team.mid.cards[cardType];
                const damageCalculation = calculateCardDamage(
                  team.mid,
                  cardType,
                  damageConfig
                );

                return (
                  <div
                    key={cardType}
                    className="bg-gray-700 rounded p-2 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => handleCardClick("mid", cardType)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-400 truncate">
                        {card.name}
                      </span>
                      <span className="text-lg font-bold text-yellow-400">
                        {damageCalculation.finalDamage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Back */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-purple-400">Back</h2>
              <div className="flex items-center space-x-2">
                {team.back.furyState.isInFury && (
                  <span className="text-red-400 text-sm font-bold animate-pulse">
                    ¡FURIA!
                  </span>
                )}
                <label className="text-sm font-medium">Rage:</label>
                <button
                  onClick={() =>
                    handleRageStacksChange(
                      "back",
                      Math.max(0, team.back.furyState.rageStacks - 1)
                    )
                  }
                  className="w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center text-xs font-bold hover:bg-red-700"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={team.back.furyState.rageStacks}
                  onChange={(e) =>
                    handleRageStacksChange(
                      "back",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-12 bg-gray-700 border border-gray-600 rounded px-1 py-1 text-center text-white text-sm"
                />
                <button
                  onClick={() =>
                    handleRageStacksChange(
                      "back",
                      Math.min(10, team.back.furyState.rageStacks + 1)
                    )
                  }
                  className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center text-xs font-bold hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Cartas del Back */}
            <div className="grid grid-cols-4 gap-2">
              {(["ears", "horn", "back", "tail"] as const).map((cardType) => {
                const card = team.back.cards[cardType];
                const damageCalculation = calculateCardDamage(
                  team.back,
                  cardType,
                  damageConfig
                );

                return (
                  <div
                    key={cardType}
                    className="bg-gray-700 rounded p-2 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => handleCardClick("back", cardType)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-400 truncate">
                        {card.name}
                      </span>
                      <span className="text-lg font-bold text-yellow-400">
                        {damageCalculation.finalDamage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
