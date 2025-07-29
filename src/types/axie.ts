// Tipos para las cartas
export interface Card {
  id: string;
  name: string;
  baseAttack: number;
  evolvedAttack: number;
  isEvolved: boolean;
  amuletBonus: number;
  effect?: string;
}

// Tipos para las runas
export interface Rune {
  id: string;
  name: string;
  level: number;
  effect: string;
  rageBonus?: number;
  damageBonus?: number;
  furyDamageBonus?: number;
  ragePerStack?: number;
  pureDamageBonus?: number;
  pureDamageCount?: number;
}

// Posición del axie en el equipo
export type AxiePosition = "Front" | "Mid" | "Back";

// Estado de furia
export interface FuryState {
  isInFury: boolean;
  rageStacks: number;
  alliesInFury: number;
}

// Configuración de un axie
export interface Axie {
  id: string;
  position: AxiePosition;
  cards: {
    ears: Card;
    horn: Card;
    back: Card;
    tail: Card;
  };
  rune?: Rune;
  furyState: FuryState;
  energySpent: number; // Para el efecto de RONIN
  pureDamageUsed: number; // Para el efecto de Blood Beetle
}

// Equipo completo
export interface Team {
  front: Axie;
  mid: Axie;
  back: Axie;
}

// Configuración de daño
export interface DamageConfig {
  damageReduction: number; // Porcentaje de reducción de daño
  targetHasAlert: boolean; // Para efectos de Blood Beetle
}
