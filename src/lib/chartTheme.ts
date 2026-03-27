/**
 * Chart color theme for admin (DESIGN.md v2.0) vs demo mode.
 *
 * Admin mode uses a single-hue coral family (brand coral).
 * Demo mode retains the existing multi-color palette.
 */

export const adminChartColors = {
  primary: '#E8553A',
  secondary: '#F0A898',
  tertiary: '#F8D4CC',
  grid: '#F0F0F0',
  axis: '#999999',
  tooltip: {
    bg: '#FFFFFF',
    border: '#E5E5E5',
    text: '#404040',
  },
} as const;

/**
 * Returns an array of chart series colors for admin mode.
 * Use this to replace rainbow palettes in Recharts components.
 */
export function getAdminChartPalette(count: number = 3): string[] {
  const palette = [
    adminChartColors.primary,
    adminChartColors.secondary,
    adminChartColors.tertiary,
    '#F4B8AA',   // extra mid-tone
    '#FBECE7',   // extra light
  ];
  return palette.slice(0, count);
}
