declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      store: {
        getTeam: () => unknown;
        setTeam: (team: unknown) => void;
        getSettings: () => unknown;
        setSettings: (settings: unknown) => void;
        get: (key: string) => unknown;
        set: (key: string, value: unknown) => void;
        delete: (key: string) => void;
        has: (key: string) => boolean;
      };
    };
  }

  namespace React {
    interface CSSProperties {
      WebkitAppRegion?: "drag" | "no-drag";
    }
  }
}

export {};
