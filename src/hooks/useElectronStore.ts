import { useState, useEffect, useCallback } from "react";
import type { Team } from "../types/axie";

interface Settings {
  theme: "dark" | "light";
  language: "es" | "en";
}

export function useElectronStore() {
  const [team, setTeamState] = useState<Team | null>(null);
  const [settings, setSettingsState] = useState<Settings>({
    theme: "dark",
    language: "es",
  });
  const [isLoading] = useState(false); // Cambiado a false por defecto

  // Cargar datos iniciales de manera más segura
  useEffect(() => {
    const loadData = () => {
      try {
        // Verificar que estamos en un entorno de Electron
        if (typeof window !== "undefined" && window.electronAPI?.store) {
          const savedTeam = window.electronAPI.store.getTeam();
          const savedSettings = window.electronAPI.store.getSettings();

          if (savedTeam && typeof savedTeam === "object") {
            setTeamState(savedTeam as Team);
          }

          if (savedSettings && typeof savedSettings === "object") {
            setSettingsState(savedSettings as Settings);
          }
        }
      } catch (error) {
        console.error("Error loading data from electron store:", error);
      }
    };

    // Cargar inmediatamente si electronAPI está disponible
    if (typeof window !== "undefined" && window.electronAPI?.store) {
      loadData();
    } else {
      // Si no está disponible, intentar después de un breve delay
      const timer = setTimeout(loadData, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Guardar equipo
  const saveTeam = useCallback((newTeam: Team) => {
    try {
      if (typeof window !== "undefined" && window.electronAPI?.store) {
        window.electronAPI.store.setTeam(newTeam);
        setTeamState(newTeam);
      }
    } catch (error) {
      console.error("Error saving team to electron store:", error);
    }
  }, []);

  // Guardar configuración
  const saveSettings = useCallback((newSettings: Settings) => {
    try {
      if (typeof window !== "undefined" && window.electronAPI?.store) {
        window.electronAPI.store.setSettings(newSettings);
        setSettingsState(newSettings);
      }
    } catch (error) {
      console.error("Error saving settings to electron store:", error);
    }
  }, []);

  // Guardar cualquier valor
  const saveValue = useCallback((key: string, value: unknown) => {
    try {
      if (typeof window !== "undefined" && window.electronAPI?.store) {
        window.electronAPI.store.set(key, value);
      }
    } catch (error) {
      console.error(`Error saving ${key} to electron store:`, error);
    }
  }, []);

  // Obtener cualquier valor
  const getValue = useCallback((key: string) => {
    try {
      if (typeof window !== "undefined" && window.electronAPI?.store) {
        return window.electronAPI.store.get(key);
      }
    } catch (error) {
      console.error(`Error getting ${key} from electron store:`, error);
    }
    return null;
  }, []);

  // Eliminar valor
  const deleteValue = useCallback((key: string) => {
    try {
      if (typeof window !== "undefined" && window.electronAPI?.store) {
        window.electronAPI.store.delete(key);
      }
    } catch (error) {
      console.error(`Error deleting ${key} from electron store:`, error);
    }
  }, []);

  return {
    team,
    settings,
    isLoading,
    saveTeam,
    saveSettings,
    saveValue,
    getValue,
    deleteValue,
  };
}
