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

  // 1. Daño base de la carta
  const baseDamage = card.isEvolved ? card.evolvedAttack : card.baseAttack;
  breakdown.push(`Daño base: ${baseDamage}`);

  // 2. Bonus de amuleto
  const amuletBonus = card.amuletBonus;
  if (amuletBonus > 0) {
    breakdown.push(`Amuleto: +${amuletBonus}`);
  }

  // 3. Efectos especiales de las cartas
  let specialEffects = 0;

  // Efecto de IMP (bonus en furia)
  if (cardType === "horn" && axie.furyState.isInFury) {
    specialEffects += 35;
    breakdown.push(`IMP en furia: +35`);
  }

  // Efecto de RONIN (bonus por energía gastada) - se calcula sobre el daño base
  if (cardType === "back") {
    const roninBonus = Math.floor(
      (baseDamage + amuletBonus) * 0.5 * axie.energySpent
    );
    specialEffects += roninBonus;
    if (roninBonus > 0) {
      breakdown.push(`RONIN (${axie.energySpent} energía): +${roninBonus}`);
    }
  }

  // Daño después de efectos especiales
  const damageAfterSpecialEffects = baseDamage + amuletBonus + specialEffects;

  // 4. Bonus de runa (Way of Beast, etc.) - ANTES del bonus de furia
  let runeBonus = 0;

  // Usar runa personalizada si está configurada
  if (axie.runeType === "custom" && axie.customRune?.damageBonus) {
    const runeDamageBonus = Math.floor(
      (damageAfterSpecialEffects * axie.customRune.damageBonus) / 100
    );
    runeBonus += runeDamageBonus;
    breakdown.push(`Runa personalizada daño: +${runeDamageBonus}`);
  }
  // Mantener compatibilidad con runas por defecto
  else if (axie.runeType === "defined" && axie.rune) {
    if (axie.rune.damageBonus) {
      const runeDamageBonus = Math.floor(
        (damageAfterSpecialEffects * axie.rune.damageBonus) / 100
      );
      runeBonus += runeDamageBonus;
      breakdown.push(`${axie.rune.name} daño: +${runeDamageBonus}`);
    }

    // Efecto de Blood Beetle (pure damage)
    if (
      axie.rune.name.includes("Blood Beetle") &&
      axie.pureDamageUsed < (axie.rune.pureDamageCount || 0)
    ) {
      const bloodBeetleBonus = Math.floor(
        (damageAfterSpecialEffects * (axie.rune.pureDamageBonus || 0)) / 100
      );
      runeBonus += bloodBeetleBonus;
      breakdown.push(`Blood Beetle pure damage: +${bloodBeetleBonus}`);
    }
  }

  // Daño después de runas (pero antes de furia)
  const damageAfterRunes = damageAfterSpecialEffects + runeBonus;

  // 5. Bonus de furia (50% cuando está en furia, modificado por runas)
  let furyDamageBonus = 0;
  if (axie.furyState.isInFury) {
    let furyPercentage = 50; // Bonus base de furia

    // Modificar el porcentaje de furia según las runas personalizadas
    if (axie.runeType === "custom" && axie.customRune?.furyDamageBonus) {
      furyPercentage += axie.customRune.furyDamageBonus;
      breakdown.push(
        `Furia (${furyPercentage}%): +${Math.floor(
          (damageAfterRunes * furyPercentage) / 100
        )}`
      );
    }
    // Mantener compatibilidad con runas por defecto
    else if (
      axie.runeType === "defined" &&
      axie.rune &&
      axie.rune.furyDamageBonus
    ) {
      furyPercentage += axie.rune.furyDamageBonus;
      breakdown.push(
        `Furia (${furyPercentage}%): +${Math.floor(
          (damageAfterRunes * furyPercentage) / 100
        )}`
      );
    } else {
      breakdown.push(`Furia (50%): +${Math.floor(damageAfterRunes * 0.5)}`);
    }

    furyDamageBonus = Math.floor((damageAfterRunes * furyPercentage) / 100);
  }

  // Daño después de furia
  const damageAfterFury = damageAfterRunes + furyDamageBonus;

  // Bonus de rage (SOLO cuando NO está en modo furia)
  let rageBonus = 0;
  if (!axie.furyState.isInFury && axie.furyState.rageStacks > 0) {
    const ragePerStack = axie.rune?.ragePerStack || 1;
    rageBonus = axie.furyState.rageStacks * ragePerStack;
    breakdown.push(`Rage (${axie.furyState.rageStacks} stacks): +${rageBonus}`);
  }

  // Bonus de furia por Inspirational Hero (solo cuando NO está en furia)
  let furyBonus = 0;
  if (
    !axie.furyState.isInFury &&
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

  // Cálculo final
  const finalTotalDamage = damageAfterFury + rageBonus + furyBonus;

  // 6. Aplicar reducción de daño
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
