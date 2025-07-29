import type { Rune } from "../types/axie";

export const RUNES: Record<string, Rune[]> = {
  wayOfBeast: [
    {
      id: "wayOfBeast1",
      name: "Way of Beast Lv1",
      level: 1,
      effect: "When the battle starts, +2 Rage. Attacks deal +10% DMG",
      rageBonus: 2,
      damageBonus: 10,
    },
    {
      id: "wayOfBeast2",
      name: "Way of Beast Lv2",
      level: 2,
      effect:
        "When the battle starts, +2 Rage. When your turn starts on Round 4, +1 Rage. Attacks deal +12% DMG",
      rageBonus: 2,
      damageBonus: 12,
    },
    {
      id: "wayOfBeast3",
      name: "Way of Beast Lv3",
      level: 3,
      effect:
        "When the battle starts, +2 Rage. When your turn starts on Round 4, +2 Rage. Attacks deal +15% DMG",
      rageBonus: 2,
      damageBonus: 15,
    },
    {
      id: "wayOfBeast4",
      name: "Way of Beast Lv4",
      level: 4,
      effect:
        "When the battle starts, +1 Rage. When your turn starts, +1 Rage. Attacks deal +15% DMG, +5% in Fury form",
      rageBonus: 1,
      damageBonus: 15,
      furyDamageBonus: 5,
    },
  ],
  inspirationalHero: [
    {
      id: "inspirationalHero1",
      name: "Inspirational Hero Lv1",
      level: 1,
      effect:
        "When your turn starts, on even rounds, apply 1 Rage to allied axies. This axie gain +5% card stat when any allies gain Fury",
    },
    {
      id: "inspirationalHero2",
      name: "Inspirational Hero Lv2",
      level: 2,
      effect:
        "When your turn starts, on even rounds, apply 1 Rage to allied axies. This axie gain +10% card stat when any allies gain Fury",
    },
    {
      id: "inspirationalHero3",
      name: "Inspirational Hero Lv3",
      level: 3,
      effect:
        "When your turn starts, on even rounds, apply 1 Rage to allied axies. This axie gain +15% card stat when any allies gain Fury",
    },
  ],
  endlessAnger: [
    {
      id: "endlessAnger1",
      name: "Endless Anger Lv1",
      level: 1,
      effect:
        "When your turn starts, +2 Rage. Rage on this axie now grants +2 DMG per stack. Deal +10% in fury form",
      rageBonus: 2,
      ragePerStack: 2,
      furyDamageBonus: 10,
    },
    {
      id: "endlessAnger2",
      name: "Endless Anger Lv2",
      level: 2,
      effect: "+2 DMG per stack and deal +10% in fury form",
      ragePerStack: 2,
      furyDamageBonus: 10,
    },
    {
      id: "endlessAnger3",
      name: "Endless Anger Lv3",
      level: 3,
      effect: "+2 DMG per stack and deal +15% in fury form",
      ragePerStack: 2,
      furyDamageBonus: 15,
    },
  ],
  bloodBeetle: [
    {
      id: "bloodBeetle1",
      name: "Blood Beetle Lv1",
      level: 1,
      effect:
        "Once per turn, this Axie's first attack deals pure DMG. This axie's pure DMG attack deal +10% DMG and on targets without Alert, Steal 10HP",
      pureDamageBonus: 10,
      pureDamageCount: 1,
    },
    {
      id: "bloodBeetle2",
      name: "Blood Beetle Lv2",
      level: 2,
      effect:
        "Once per turn, this Axie's first attack deals pure DMG. This axie's pure DMG attack deal +12% DMG and on targets without Alert, Steal 12HP",
      pureDamageBonus: 12,
      pureDamageCount: 1,
    },
    {
      id: "bloodBeetle3",
      name: "Blood Beetle Lv3",
      level: 3,
      effect:
        "Twice per turn, this Axie's first attack deals pure DMG. This axie's pure DMG attack deal +10% DMG and on targets without Alert, Steal 10HP",
      pureDamageBonus: 10,
      pureDamageCount: 2,
    },
    {
      id: "bloodBeetle4",
      name: "Blood Beetle Lv4",
      level: 4,
      effect:
        "Twice per turn, this Axie's first attack deals pure DMG. This axie's pure DMG attack deal +15% DMG and on targets without Alert, Steal 16HP",
      pureDamageBonus: 15,
      pureDamageCount: 2,
    },
  ],
  fateMaker: [
    {
      id: "fateMaker1",
      name: "Fate Maker",
      level: 1,
      effect: "Sin efecto en el daño de las cartas",
    },
  ],
  rocketBarrage: [
    {
      id: "rocketBarrage1",
      name: "Rocket Barrage",
      level: 1,
      effect: "Sin efecto en el daño de las cartas",
    },
  ],
};
