import type { Card } from "../types/axie";

export const TEAM_CARDS: Record<string, Card> = {
  zen: {
    id: "zen",
    name: "ZEN",
    baseAttack: 65,
    evolvedAttack: 75,
    isEvolved: false,
    amuletBonus: 0,
    effect: "Sin efecto especial",
  },
  imp: {
    id: "imp",
    name: "IMP",
    baseAttack: 65,
    evolvedAttack: 75,
    isEvolved: false,
    amuletBonus: 0,
    effect: "Cuando el axie entra en modo furia, obtiene +35 de ataque",
  },
  ronin: {
    id: "ronin",
    name: "RONIN",
    baseAttack: 45,
    evolvedAttack: 50,
    isEvolved: false,
    amuletBonus: 0,
    effect:
      "Por cada energía gastada antes de jugar esta carta, hace 50% de daño del ataque como bono",
  },
  shiba: {
    id: "shiba",
    name: "SHIBA",
    baseAttack: 140,
    evolvedAttack: 160,
    isEvolved: false,
    amuletBonus: 0,
    effect: "Sin efecto especial",
  },
};
