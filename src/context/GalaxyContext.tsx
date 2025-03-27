'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GalaxyParams {
  darkMatterMass: number;
  normalMatterMass: number;
  blackHoleMass: number;
  darkMatterRatio: number;
}

interface GalaxyContextType {
  params: GalaxyParams;
  setParams: (params: GalaxyParams) => void;
}

const GalaxyContext = createContext<GalaxyContextType | undefined>(undefined);

export function GalaxyProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useState<GalaxyParams>({
    darkMatterMass: 1e12,
    normalMatterMass: 1e11,
    blackHoleMass: 1e6,
    darkMatterRatio: 0.85
  });

  return (
    <GalaxyContext.Provider value={{ params, setParams }}>
      {children}
    </GalaxyContext.Provider>
  );
}

export function useGalaxy() {
  const context = useContext(GalaxyContext);
  if (context === undefined) {
    throw new Error('useGalaxy must be used within a GalaxyProvider');
  }
  return context;
} 