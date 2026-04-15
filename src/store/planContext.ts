// src/store/planContext.ts
// Shared context store for the PLAN layer — tracks selected feature across workspaces
import { create } from 'zustand';

interface PlanContextState {
  selectedFeatureId: string;
  setSelectedFeatureId: (id: string) => void;
}

export const usePlanContext = create<PlanContextState>((set) => ({
  selectedFeatureId: 'feat1', // Default to first feature in mockFeatures
  setSelectedFeatureId: (id) => set({ selectedFeatureId: id }),
}));
