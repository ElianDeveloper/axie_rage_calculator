import type { Axie, DamageConfig } from "../types/axie";

export interface DamageCalculation {
  baseDamage: number;
  rageBonus: number;
  furyBonus: number;
  runeBonus: number;
  amuletBonus: number;
  specialEffects: number;
  totalDamage: number;
  finalDamage: number; // Después de reducción de daño
  breakdown: string[];
}

export function calculateCardDamage(
  axie: Axie,
  cardType: "ears" | "horn" | "back" | "tail",
  damageConfig: DamageConfig
): DamageCalculation {
  const card = axie.cards[cardType];
  const breakdown: string[] = [];

  // Daño base de la carta
  const baseDamage = card.isEvolved ? card.evolvedAttack : card.baseAttack;
  breakdown.push(`Daño base: ${baseDamage}`);

  // Bonus de amuleto
  const amuletBonus = card.amuletBonus;
  if (amuletBonus > 0) {
    breakdown.push(`Amuleto: +${amuletBonus}`);
  }

  // Bonus de furia por Inspirational Hero
  let furyBonus = 0;
  if (
    axie.rune?.name.includes("Inspirational Hero") &&
    axie.furyState.alliesInFury > 0
  ) {
    const heroLevel = axie.rune.level;
    const heroBonus = heroLevel * 5; // +5% por nivel
    furyBonus = Math.floor(((baseDamage + amuletBonus) * heroBonus) / 100);
    breakdown.push(
      `Inspirational Hero (${axie.furyState.alliesInFury} aliados en furia): +${furyBonus}`
    );
  }

  // Daño total antes de efectos especiales
  let totalDamage = baseDamage + amuletBonus + furyBonus;

  // Efectos especiales de las cartas
  let specialEffects = 0;

  // Efecto de IMP (bonus en furia)
  if (cardType === "horn" && axie.furyState.isInFury) {
    specialEffects += 35;
    breakdown.push(`IMP en furia: +35`);
  }

  // Efecto de RONIN (bonus por energía gastada)
  if (cardType === "back") {
    const roninBonus = Math.floor(totalDamage * 0.5 * axie.energySpent);
    specialEffects += roninBonus;
    if (roninBonus > 0) {
      breakdown.push(`RONIN (${axie.energySpent} energía): +${roninBonus}`);
    }
  }

  totalDamage += specialEffects;

  // Bonus de rage
  const ragePerStack = axie.rune?.ragePerStack || 1;
  const rageBonus = axie.furyState.rageStacks * ragePerStack;
  if (rageBonus > 0) {
    breakdown.push(`Rage (${axie.furyState.rageStacks} stacks): +${rageBonus}`);
  }

  // Bonus de runa (Way of Beast, etc.)
  let runeBonus = 0;
  if (axie.rune) {
    if (axie.rune.damageBonus) {
      const runeDamageBonus = Math.floor(
        (totalDamage * axie.rune.damageBonus) / 100
      );
      runeBonus += runeDamageBonus;
      breakdown.push(`${axie.rune.name} daño: +${runeDamageBonus}`);
    }

    if (axie.rune.furyDamageBonus && axie.furyState.isInFury) {
      const furyRuneBonus = Math.floor(
        (totalDamage * axie.rune.furyDamageBonus) / 100
      );
      runeBonus += furyRuneBonus;
      breakdown.push(`${axie.rune.name} furia: +${furyRuneBonus}`);
    }

    // Efecto de Blood Beetle (pure damage)
    if (
      axie.rune.name.includes("Blood Beetle") &&
      axie.pureDamageUsed < (axie.rune.pureDamageCount || 0)
    ) {
      const bloodBeetleBonus = Math.floor(
        (totalDamage * (axie.rune.pureDamageBonus || 0)) / 100
      );
      runeBonus += bloodBeetleBonus;
      breakdown.push(`Blood Beetle pure damage: +${bloodBeetleBonus}`);
    }
  }

  // Bonus de furia (50% cuando está en furia)
  let furyDamageBonus = 0;
  if (axie.furyState.isInFury) {
    furyDamageBonus = Math.floor(totalDamage * 0.5);
    breakdown.push(`Furia (50%): +${furyDamageBonus}`);
  }

  // Cálculo final
  const finalTotalDamage =
    totalDamage + rageBonus + runeBonus + furyDamageBonus;

  // Aplicar reducción de daño
  const damageReduction = damageConfig.damageReduction;
  const finalDamage = Math.max(
    1,
    Math.floor((finalTotalDamage * (100 - damageReduction)) / 100)
  );

  if (damageReduction > 0) {
    breakdown.push(
      `Reducción de daño (${damageReduction}%): ${finalTotalDamage} → ${finalDamage}`
    );
  }

  return {
    baseDamage,
    rageBonus,
    furyBonus,
    runeBonus,
    amuletBonus,
    specialEffects,
    totalDamage: finalTotalDamage,
    finalDamage,
    breakdown,
  };
}
