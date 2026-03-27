# Real-Time Live Simulation Mode — Integration Guide

## Overview

The Live Simulation Mode provides real-time fluctuating metrics and realistic events across all SDLC layers (L0-L5). It enables demo scenarios to show dynamic platform intelligence in action.

### Components

1. **`src/lib/liveSimulation.ts`** — Service layer with metric fluctuation and event generation
2. **`src/context/LiveSimulationContext.tsx`** — React Context provider for global simulation state
3. **`src/components/ui/LiveBadge.tsx`** — Visual indicator showing when simulation is active

## How It Works

### Metric Fluctuation
- Metrics update every 2.5 seconds with realistic volatility
- Each metric has min/max bounds and volatility parameters
- Examples:
  - `activeServices`: 148-155 (±1% volatility)
  - `incidentsPreventedToday`: 45-55 (±2% volatility)
  - `avgResponseTime`: 180-240ms (±3% volatility)
  - `defectMatchAccuracy`: 0.94-0.97 (±0.5% volatility)
  - `releaseRiskScore`: 0.20-0.35 (±2% volatility)
  - `knowledgeBaseEntries`: Slowly increases (~1 per 5 updates)

### Event Generation
- New realistic events generated every 4-8 seconds (~30% chance per update)
- Events are enterprise-focused with cross-layer coverage
- 25+ message templates per event type spanning all layers
- Severity levels: `info`, `warning`, `success`

## Integration Pattern 1: Using Simulation in Components

```tsx
'use client';

import { useLiveSimulation } from '@/context/LiveSimulationContext';

export default function MyDashboard() {
  const { isSimulating, state } = useLiveSimulation();

  return (
    <div>
      {isSimulating && (
        <p>Active Services: {state.metrics.activeServices}</p>
      )}
    </div>
  );
}
```

## Integration Pattern 2: Adding the LIVE Badge to TopStatsBar

In `src/components/ui/TopStatsBar.tsx`:

```tsx
'use client';

import { useLiveSimulation } from '@/context/LiveSimulationContext';
import LiveBadge from './LiveBadge';

export default function TopStatsBar() {
  const { isSimulating } = useLiveSimulation();

  return (
    <motion.div className="...">
      {/* Existing content */}

      {/* Add LIVE badge in top-right corner */}
      <div className="absolute top-3 right-4">
        <LiveBadge isActive={isSimulating} size="sm" />
      </div>
    </motion.div>
  );
}
```

## Integration Pattern 3: Using Real Metrics in TopStatsBar

Replace hardcoded stats with live simulation data:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useLiveSimulation } from '@/context/LiveSimulationContext';

export default function TopStatsBar() {
  const { isSimulating, state } = useLiveSimulation();
  const [stats, setStats] = useState<StatData[]>([
    {
      icon: Activity,
      value: 150,
      suffix: '+',
      label: 'Services',
      color: 'text-blue-500'
    },
    // ... more stats
  ]);

  // Update stats when simulation changes
  useEffect(() => {
    if (isSimulating) {
      setStats(prev => prev.map(stat => {
        if (stat.label === 'Services') {
          return { ...stat, value: Math.round(state.metrics.activeServices) };
        }
        if (stat.label === 'Incidents Prevented Daily') {
          return { ...stat, value: Math.round(state.metrics.incidentsPreventedToday) };
        }
        return stat;
      }));
    }
  }, [isSimulating, state.metrics]);

  return (
    // ... existing component
  );
}
```

## Integration Pattern 4: Displaying Live Events

Create a component to show recent simulation events:

```tsx
'use client';

import { useLiveSimulation } from '@/context/LiveSimulationContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveEventsFeed() {
  const { state } = useLiveSimulation();

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {state.recentEvents.map(event => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-lg text-sm ${
              event.severity === 'warning'
                ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {event.layer}
              </span>
              <p className="flex-1">{event.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
```

## Integration Pattern 5: Control Panel (Settings/Admin)

Create a settings component to start/stop simulation:

```tsx
'use client';

import { useLiveSimulation } from '@/context/LiveSimulationContext';

export default function SimulationControls() {
  const { isSimulating, startSimulation, stopSimulation } = useLiveSimulation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Live Simulation Mode</h3>

      <div className="flex items-center gap-4">
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Start Simulation
        </button>

        <button
          onClick={stopSimulation}
          disabled={!isSimulating}
          className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
        >
          Stop Simulation
        </button>

        <span className="text-sm text-gray-600 dark:text-gray-400">
          Status: {isSimulating ? '🟢 LIVE' : '⚪ STOPPED'}
        </span>
      </div>
    </div>
  );
}
```

## Architecture

### Data Flow
```
LiveSimulationContext (global state)
  ↓
useLiveSimulation() hook (consumed by components)
  ↓
Components (TopStatsBar, LiveBadge, EventsFeed, etc.)
  ↓
UI Updates
```

### Update Cycle
1. **Every 2.5 seconds**: Metrics fluctuate within bounds
2. **Every 4-8 seconds**: New event generated (~30% probability per update)
3. **Knowledge base**: Slowly increases (1 entry per 5 updates)

## Metric Details

### Active Services (148-155)
Simulates the count of monitored services with realistic variance.

### Incidents Prevented Today (45-55)
Demonstrates daily incident detection and prevention capabilities.

### Average Response Time (180-240ms)
Shows fluctuating API response times within healthy bounds.

### Defect Match Accuracy (0.94-0.97)
RAG-based defect matching confidence, showing high accuracy.

### Release Risk Score (0.20-0.35)
ML-based release risk prediction, typically in "acceptable" range.

### Knowledge Base Entries
Counts enterprise knowledge accumulated; starts at 2,147 entries.

## Event Types and Layers

### Event Types
- `defect_matched` — RAG finds similar historical defects
- `risk_scored` — ML assigns risk predictions
- `incident_detected` — L4 identifies production issues
- `knowledge_updated` — L5 learns from incidents
- `release_assessed` — Release readiness evaluation

### Layers
- **L0** — Requirement Intelligence (PLAN)
- **L1** — Build Intelligence (BUILD)
- **L2** — Test Intelligence (TEST)
- **L3** — Release Intelligence (RELEASE)
- **L4** — Operate Intelligence (OPERATE)
- **L5** — Learn Intelligence (LEARN)

## Best Practices

1. **Only start simulation on demand** — Use a toggle or control panel
2. **Visual feedback** — Always show the LIVE badge when active
3. **Real-time metrics** — Connect TopStatsBar to simulation for full effect
4. **Event correlation** — Map simulation events to actual dashboard sections
5. **Performance** — The simulation is lightweight; no performance concerns with active/inactive states

## Customization

### Add Custom Metrics
Edit `src/lib/liveSimulation.ts`:

```typescript
export interface SimulationState {
  metrics: {
    // ... existing metrics
    customMetric: number;  // Add new metric
  };
}
```

### Add Custom Event Messages
Edit `EVENT_MESSAGES` pool in `src/lib/liveSimulation.ts`:

```typescript
const EVENT_MESSAGES = {
  my_custom_type: {
    L0: ['Custom message 1', 'Custom message 2'],
    // ...
  },
};
```

### Adjust Update Frequency
Edit `LiveSimulationProvider`:

```typescript
const interval = setInterval(() => {
  setState((current) => updateSimulationState(current));
}, 2500); // Change interval (ms)
```

## Testing

Test the simulation with:

```bash
# Start dev server
npm run dev

# In browser console:
# 1. Open component that uses useLiveSimulation()
# 2. Click "Start Simulation"
# 3. Watch metrics and events fluctuate in real-time
```

## Files Created

- ✅ `src/lib/liveSimulation.ts` (service, ~250 lines)
- ✅ `src/context/LiveSimulationContext.tsx` (context provider, ~50 lines)
- ✅ `src/components/ui/LiveBadge.tsx` (UI component, ~30 lines)
- ✅ `src/app/layout.tsx` (updated to wrap with provider)

## Next Steps

1. **Add simulation control to Settings page** — Create toggle UI
2. **Connect TopStatsBar** — Replace hardcoded values with live metrics
3. **Link events to navigation** — Click event to jump to relevant section
4. **Performance dashboard** — Show simulation metrics in real-time dashboard
5. **Demo mode indicator** — Show LIVE badge prominently during demos
