// src/lib/hooks/useRealTimeData.ts
import { useEffect, useRef } from 'react';
import useDashboardStore from '@/store/dashboard';

export function useRealTimeData(enabled = true, interval = 1000) {
  const { 
    isRealTimeEnabled, 
    generateRealtimeData,
    isDemoMode 
  } = useDashboardStore();
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (enabled && isRealTimeEnabled && !isDemoMode) {
      intervalRef.current = setInterval(() => {
        generateRealtimeData();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, isRealTimeEnabled, isDemoMode, interval, generateRealtimeData]);
}

// Hook for demo scenarios
export function useDemoScenario() {
  const { 
    currentScenario, 
    triggerServiceFailure,
    triggerCascadeFailure,
    resolveAllIncidents,
    addAlert,
    addInsight,
    updateService
  } = useDashboardStore();
  
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!currentScenario) return;

    // Clear any existing timeouts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Execute scenario steps
    currentScenario.steps.forEach(step => {
      const timeout = setTimeout(() => {
        switch (step.action) {
          case 'service-failure':
            if (step.target) triggerServiceFailure(step.target);
            break;
            
          case 'cascade-failure':
            triggerCascadeFailure();
            break;
            
          case 'resolve-all':
            resolveAllIncidents();
            break;
            
          case 'show-alert':
            addAlert(step.data);
            break;
            
          case 'show-insight':
            addInsight(step.data);
            break;
            
          case 'update-service':
            if (step.target) updateService(step.target, step.data);
            break;
        }
      }, step.time * 1000);
      
      timeoutRefs.current.push(timeout);
    });

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [currentScenario]);
}