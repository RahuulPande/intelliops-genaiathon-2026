'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  SimulationState,
  initializeSimulationState,
  updateSimulationState,
} from '@/lib/liveSimulation';

interface LiveSimulationContextType {
  isSimulating: boolean;
  state: SimulationState;
  startSimulation: () => void;
  stopSimulation: () => void;
}

const LiveSimulationContext = createContext<LiveSimulationContextType>({
  isSimulating: false,
  state: initializeSimulationState(),
  startSimulation: () => {},
  stopSimulation: () => {},
});

export function LiveSimulationProvider({ children }: { children: ReactNode }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [state, setState] = useState<SimulationState>(initializeSimulationState());

  // Start simulation — runs until explicitly stopped
  const startSimulation = useCallback(() => {
    setIsSimulating(true);
  }, []);

  // Stop simulation
  const stopSimulation = useCallback(() => {
    setIsSimulating(false);
  }, []);

  // Update loop: every 2.5 seconds (alternates with event generation every 5-8 seconds)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setState((current) => updateSimulationState(current));
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Activate simulation on mount (optional — depends on use case)
  // For now, simulation is manual via startSimulation()

  const contextValue: LiveSimulationContextType = {
    isSimulating,
    state: { ...state, isActive: isSimulating },
    startSimulation,
    stopSimulation,
  };

  return (
    <LiveSimulationContext.Provider value={contextValue}>
      {children}
    </LiveSimulationContext.Provider>
  );
}

export function useLiveSimulation() {
  return useContext(LiveSimulationContext);
}

export default LiveSimulationContext;
