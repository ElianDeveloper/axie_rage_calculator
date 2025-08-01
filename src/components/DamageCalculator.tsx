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
      runeType: "none",
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
      runeType: "none",
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
      runeType: "none",
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
      // Verificar que el equipo tenga la estructura correcta
      const validatedTeam = {
        front: {
          ...savedTeam.front,
          runeType: savedTeam.front.runeType || "none",
          customRune: savedTeam.front.customRune || undefined,
        },
        mid: {
          ...savedTeam.mid,
          runeType: savedTeam.mid.runeType || "none",
          customRune: savedTeam.mid.customRune || undefined,
        },
        back: {
          ...savedTeam.back,
          runeType: savedTeam.back.runeType || "none",
          customRune: savedTeam.back.customRune || undefined,
        },
      };

      // Cargar la configuración en el estado local
      setTeam(validatedTeam);
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
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 mb-6 border border-gray-700 shadow-md">
          <div className="flex items-center justify-between">
            {/* Reducción de Daño Global */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-red-300 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Reducción:
              </label>
              <button
                onClick={() =>
                  setDamageConfig((prev) => ({
                    ...prev,
                    damageReduction: Math.max(0, prev.damageReduction - 5),
                  }))
                }
                className="w-7 h-7 bg-red-600 text-white rounded flex items-center justify-center text-sm font-bold hover:bg-red-700 transition-colors"
              >
                -
              </button>
              <div className="relative">
                <input
                  type="text"
                  value={damageConfig.damageReduction}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const numValue = parseInt(value) || 0;
                    setDamageConfig((prev) => ({
                      ...prev,
                      damageReduction: Math.min(100, Math.max(0, numValue)),
                    }));
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setDamageConfig((prev) => ({
                      ...prev,
                      damageReduction: Math.min(100, Math.max(0, value)),
                    }));
                  }}
                  className="w-16 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-center text-white text-sm font-medium focus:border-red-500 focus:outline-none"
                  placeholder="0"
                />
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                  %
                </span>
              </div>
              <button
                onClick={() =>
                  setDamageConfig((prev) => ({
                    ...prev,
                    damageReduction: Math.min(100, prev.damageReduction + 5),
                  }))
                }
                className="w-7 h-7 bg-green-600 text-white rounded flex items-center justify-center text-sm font-bold hover:bg-green-700 transition-colors"
              >
                +
              </button>
            </div>

            {/* Separador */}
            <div className="w-px h-8 bg-gray-600"></div>

            {/* Energía Global para RONIN */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-yellow-300 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Energía:
              </label>
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
                className="w-7 h-7 bg-red-600 text-white rounded flex items-center justify-center text-sm font-bold hover:bg-red-700 transition-colors"
              >
                -
              </button>
              <div className="relative">
                <input
                  type="text"
                  value={team.front.energySpent}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const numValue = parseInt(value) || 0;
                    setTeam((prev) => ({
                      ...prev,
                      front: {
                        ...prev.front,
                        energySpent: Math.min(10, Math.max(0, numValue)),
                      },
                      mid: {
                        ...prev.mid,
                        energySpent: Math.min(10, Math.max(0, numValue)),
                      },
                      back: {
                        ...prev.back,
                        energySpent: Math.min(10, Math.max(0, numValue)),
                      },
                    }));
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setTeam((prev) => ({
                      ...prev,
                      front: {
                        ...prev.front,
                        energySpent: Math.min(10, Math.max(0, value)),
                      },
                      mid: {
                        ...prev.mid,
                        energySpent: Math.min(10, Math.max(0, value)),
                      },
                      back: {
                        ...prev.back,
                        energySpent: Math.min(10, Math.max(0, value)),
                      },
                    }));
                  }}
                  className="w-16 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-center text-white text-sm font-medium focus:border-yellow-500 focus:outline-none"
                  placeholder="0"
                />
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                  ⚡
                </span>
              </div>
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
                className="w-7 h-7 bg-green-600 text-white rounded flex items-center justify-center text-sm font-bold hover:bg-green-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown Detallado */}
        {selectedBreakdown && (
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl p-8 mb-8 border border-gray-700 shadow-2xl">
            {/* Header con efecto de cristal */}
            <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {selectedBreakdown.card.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {selectedBreakdown.card.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {selectedBreakdown.position.toUpperCase()} •{" "}
                    {selectedBreakdown.cardType}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCard(null)}
                className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Columna 1: Proceso de Cálculo */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Proceso de Cálculo
                  </h3>
                  <div className="space-y-3">
                    {selectedBreakdown.damageCalculation.breakdown.map(
                      (step, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gray-800/50 rounded-lg border-l-4 border-blue-500 hover:bg-gray-800/70 transition-all duration-200"
                        >
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                            {index + 1}
                          </div>
                          <span className="text-gray-200 text-sm font-medium">
                            {step}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Columna 2: Resumen Visual */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Resumen
                  </h3>

                  {/* Daño Base */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg border border-blue-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-300 text-sm font-medium">
                        Daño Base
                      </span>
                      <span className="text-blue-200 font-bold">
                        {selectedBreakdown.damageCalculation.baseDamage}
                      </span>
                    </div>
                  </div>

                  {/* Amuleto */}
                  {selectedBreakdown.damageCalculation.amuletBonus > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg border border-purple-500/30">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 text-sm font-medium">
                          Amuleto
                        </span>
                        <span className="text-purple-200 font-bold">
                          +{selectedBreakdown.damageCalculation.amuletBonus}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Efectos Especiales */}
                  {selectedBreakdown.damageCalculation.specialEffects > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-orange-900/30 to-orange-800/30 rounded-lg border border-orange-500/30">
                      <div className="flex justify-between items-center">
                        <span className="text-orange-300 text-sm font-medium">
                          Efectos Especiales
                        </span>
                        <span className="text-orange-200 font-bold">
                          +{selectedBreakdown.damageCalculation.specialEffects}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Furia */}
                  {selectedBreakdown.damageCalculation.furyBonus > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-lg border border-red-500/30">
                      <div className="flex justify-between items-center">
                        <span className="text-red-300 text-sm font-medium">
                          Furia
                        </span>
                        <span className="text-red-200 font-bold">
                          +{selectedBreakdown.damageCalculation.furyBonus}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Rage */}
                  {selectedBreakdown.damageCalculation.rageBonus > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 rounded-lg border border-yellow-500/30">
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-300 text-sm font-medium">
                          Rage
                        </span>
                        <span className="text-yellow-200 font-bold">
                          +{selectedBreakdown.damageCalculation.rageBonus}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Runa */}
                  {selectedBreakdown.damageCalculation.runeBonus > 0 && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg border border-green-500/30">
                      <div className="flex justify-between items-center">
                        <span className="text-green-300 text-sm font-medium">
                          Runa
                        </span>
                        <span className="text-green-200 font-bold">
                          +{selectedBreakdown.damageCalculation.runeBonus}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/50">
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-300 text-sm font-medium">
                        Total
                      </span>
                      <span className="text-yellow-200 font-bold text-lg">
                        {selectedBreakdown.damageCalculation.totalDamage}
                      </span>
                    </div>
                  </div>

                  {/* Final */}
                  <div className="p-4 bg-gradient-to-r from-red-900/40 to-red-800/40 rounded-lg border border-red-500/50 shadow-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-red-300 text-sm font-medium">
                        Daño Final
                      </span>
                      <span className="text-red-200 font-bold text-xl">
                        {selectedBreakdown.damageCalculation.finalDamage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de progreso visual */}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Progresión del Daño
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 w-16">Base</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (selectedBreakdown.damageCalculation.baseDamage /
                            selectedBreakdown.damageCalculation.totalDamage) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 w-12">
                    {selectedBreakdown.damageCalculation.baseDamage}
                  </span>
                </div>

                {selectedBreakdown.damageCalculation.amuletBonus > 0 && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 w-16">Amuleto</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (selectedBreakdown.damageCalculation.amuletBonus /
                              selectedBreakdown.damageCalculation.totalDamage) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-12">
                      +{selectedBreakdown.damageCalculation.amuletBonus}
                    </span>
                  </div>
                )}

                {selectedBreakdown.damageCalculation.specialEffects > 0 && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 w-16">Especial</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (selectedBreakdown.damageCalculation
                              .specialEffects /
                              selectedBreakdown.damageCalculation.totalDamage) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-12">
                      +{selectedBreakdown.damageCalculation.specialEffects}
                    </span>
                  </div>
                )}

                {selectedBreakdown.damageCalculation.furyBonus > 0 && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 w-16">Furia</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (selectedBreakdown.damageCalculation.furyBonus /
                              selectedBreakdown.damageCalculation.totalDamage) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-12">
                      +{selectedBreakdown.damageCalculation.furyBonus}
                    </span>
                  </div>
                )}

                {selectedBreakdown.damageCalculation.rageBonus > 0 && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 w-16">Rage</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (selectedBreakdown.damageCalculation.rageBonus /
                              selectedBreakdown.damageCalculation.totalDamage) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-12">
                      +{selectedBreakdown.damageCalculation.rageBonus}
                    </span>
                  </div>
                )}

                {selectedBreakdown.damageCalculation.runeBonus > 0 && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 w-16">Runa</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (selectedBreakdown.damageCalculation.runeBonus /
                              selectedBreakdown.damageCalculation.totalDamage) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 w-12">
                      +{selectedBreakdown.damageCalculation.runeBonus}
                    </span>
                  </div>
                )}
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
                <label className="text-sm font-medium text-gray-300">
                  Rage:
                </label>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 11 }, (_, i) => i).map((rageValue) => (
                    <button
                      key={rageValue}
                      onClick={() => handleRageStacksChange("front", rageValue)}
                      className={`w-6 h-6 text-white rounded cursor-pointer flex items-center justify-center text-xs font-bold transition-colors ${
                        team.front.furyState.rageStacks === rageValue
                          ? "bg-red-600"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    >
                      {rageValue}
                    </button>
                  ))}
                </div>
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
                <label className="text-sm font-medium text-gray-300">
                  Rage:
                </label>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 11 }, (_, i) => i).map((rageValue) => (
                    <button
                      key={rageValue}
                      onClick={() => handleRageStacksChange("mid", rageValue)}
                      className={`w-6 h-6 text-white rounded cursor-pointer flex items-center justify-center text-xs font-bold transition-colors ${
                        team.mid.furyState.rageStacks === rageValue
                          ? "bg-red-600"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    >
                      {rageValue}
                    </button>
                  ))}
                </div>
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
                <label className="text-sm font-medium text-gray-300">
                  Rage:
                </label>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 11 }, (_, i) => i).map((rageValue) => (
                    <button
                      key={rageValue}
                      onClick={() => handleRageStacksChange("back", rageValue)}
                      className={`w-6 h-6 text-white rounded cursor-pointer flex items-center justify-center text-xs font-bold transition-colors ${
                        team.back.furyState.rageStacks === rageValue
                          ? "bg-red-600"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                    >
                      {rageValue}
                    </button>
                  ))}
                </div>
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
