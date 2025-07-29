import { useState } from "react";
import type { Team, DamageConfig } from "../types/axie";
import { TEAM_CARDS } from "../data/cards";
import { RUNES } from "../data/runes";
import { calculateCardDamage } from "../utils/damageCalculator";

export function DamageCalculator() {
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

  const [selectedAxie, setSelectedAxie] = useState<"front" | "mid" | "back">(
    "front"
  );
  const [selectedCard, setSelectedCard] = useState<
    "ears" | "horn" | "back" | "tail"
  >("ears");

  const currentAxie = team[selectedAxie];

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
          rageStacks: Math.max(0, Math.min(20, value)),
          isInFury: value >= 10,
        },
      },
    }));
  };

  const handleEnergySpentChange = (
    position: "front" | "mid" | "back",
    value: number
  ) => {
    setTeam((prev) => ({
      ...prev,
      [position]: {
        ...prev[position],
        energySpent: Math.max(0, value),
      },
    }));
  };

  const handleAmuletChange = (
    position: "front" | "mid" | "back",
    cardType: "ears" | "horn" | "back" | "tail",
    value: number
  ) => {
    setTeam((prev) => ({
      ...prev,
      [position]: {
        ...prev[position],
        cards: {
          ...prev[position].cards,
          [cardType]: {
            ...prev[position].cards[cardType],
            amuletBonus: Math.max(0, value),
          },
        },
      },
    }));
  };

  const handleCardEvolution = (
    position: "front" | "mid" | "back",
    cardType: "ears" | "horn" | "back" | "tail"
  ) => {
    setTeam((prev) => ({
      ...prev,
      [position]: {
        ...prev[position],
        cards: {
          ...prev[position].cards,
          [cardType]: {
            ...prev[position].cards[cardType],
            isEvolved: !prev[position].cards[cardType].isEvolved,
          },
        },
      },
    }));
  };

  const handleRuneChange = (
    position: "front" | "mid" | "back",
    runeKey: string,
    level: number
  ) => {
    const rune = RUNES[runeKey as keyof typeof RUNES]?.find(
      (r) => r.level === level
    );
    setTeam((prev) => ({
      ...prev,
      [position]: {
        ...prev[position],
        rune: rune || undefined,
      },
    }));
  };

  const damageCalculation = calculateCardDamage(
    currentAxie,
    selectedCard,
    damageConfig
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">
          Calculadora de Daño - Axie Infinity Origin
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de configuración del equipo */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Configuración del Equipo
            </h2>

            {/* Selector de axie */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Seleccionar Axie:
              </label>
              <div className="flex space-x-2">
                {(["front", "mid", "back"] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setSelectedAxie(pos)}
                    className={`px-4 py-2 rounded ${
                      selectedAxie === pos
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {pos === "front" ? "Front" : pos === "mid" ? "Mid" : "Back"}
                  </button>
                ))}
              </div>
            </div>

            {/* Configuración del axie seleccionado */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Rage Stacks: {currentAxie.furyState.rageStacks}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={currentAxie.furyState.rageStacks}
                  onChange={(e) =>
                    handleRageStacksChange(
                      selectedAxie,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full"
                />
                {currentAxie.furyState.isInFury && (
                  <span className="text-red-400 text-sm">¡EN FURIA!</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Energía Gastada: {currentAxie.energySpent}
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={currentAxie.energySpent}
                  onChange={(e) =>
                    handleEnergySpentChange(
                      selectedAxie,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                />
              </div>

              {/* Configuración de runa */}
              <div>
                <label className="block text-sm font-medium mb-2">Runa:</label>
                <select
                  value={currentAxie.rune?.id || ""}
                  onChange={(e) => {
                    const [runeKey, level] = e.target.value.split("-");
                    if (runeKey && level) {
                      handleRuneChange(selectedAxie, runeKey, parseInt(level));
                    }
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  <option value="">Sin runa</option>
                  {Object.entries(RUNES).map(([runeKey, runeLevels]) => (
                    <optgroup
                      key={runeKey}
                      label={runeKey.replace(/([A-Z])/g, " $1").trim()}
                    >
                      {runeLevels.map((rune) => (
                        <option
                          key={rune.id}
                          value={`${runeKey}-${rune.level}`}
                        >
                          {rune.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Panel de configuración de cartas */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Configuración de Cartas
            </h2>

            {/* Selector de carta */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Seleccionar Carta:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["ears", "horn", "back", "tail"] as const).map((cardType) => (
                  <button
                    key={cardType}
                    onClick={() => setSelectedCard(cardType)}
                    className={`px-3 py-2 rounded text-sm ${
                      selectedCard === cardType
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {currentAxie.cards[cardType].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Configuración de la carta seleccionada */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {currentAxie.cards[selectedCard].name}
                </label>
                <div className="text-sm text-gray-300 mb-2">
                  Daño:{" "}
                  {currentAxie.cards[selectedCard].isEvolved
                    ? currentAxie.cards[selectedCard].evolvedAttack
                    : currentAxie.cards[selectedCard].baseAttack}
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  {currentAxie.cards[selectedCard].effect}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    id="evolved"
                    checked={currentAxie.cards[selectedCard].isEvolved}
                    onChange={() =>
                      handleCardEvolution(selectedAxie, selectedCard)
                    }
                    className="rounded"
                  />
                  <label htmlFor="evolved" className="text-sm">
                    Evolucionada (Lv2)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bonus de Amuleto:{" "}
                    {currentAxie.cards[selectedCard].amuletBonus}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={currentAxie.cards[selectedCard].amuletBonus}
                    onChange={(e) =>
                      handleAmuletChange(
                        selectedAxie,
                        selectedCard,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel de resultados */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Resultado del Daño
            </h2>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-400 mb-2">
                  {damageCalculation.finalDamage}
                </div>
                <div className="text-sm text-gray-400">Daño Final</div>
              </div>

              <div className="bg-gray-700 p-4 rounded">
                <h3 className="font-bold mb-2 text-purple-300">
                  Desglose del Daño:
                </h3>
                <div className="space-y-1 text-sm">
                  {damageCalculation.breakdown.map((item, index) => (
                    <div key={index} className="text-gray-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuración de reducción de daño */}
              <div>
                <label className="block text-sm font-medium mb-2">
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
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="alert"
                  checked={damageConfig.targetHasAlert}
                  onChange={(e) =>
                    setDamageConfig((prev) => ({
                      ...prev,
                      targetHasAlert: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <label htmlFor="alert" className="text-sm">
                  Objetivo tiene Alert
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
