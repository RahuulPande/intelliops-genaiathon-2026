/**
 * Utility functions for consistent number formatting across the application
 */

/**
 * Format a number to show at most 2 decimal places, removing unnecessary trailing zeros
 * @param value - The number to format
 * @param maxDecimals - Maximum number of decimal places (default: 2)
 * @returns Formatted number string
 */
export const formatNumber = (value: number, maxDecimals: number = 2): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }
  
  // Round to the specified decimal places
  const factor = Math.pow(10, maxDecimals);
  const rounded = Math.round(value * factor) / factor;
  
  // Format and remove trailing zeros
  return rounded.toFixed(maxDecimals).replace(/\.?0+$/, '');
};

/**
 * Format a percentage value to show at most 2 decimal places
 * @param value - The percentage value (0-100)
 * @param maxDecimals - Maximum number of decimal places (default: 2)
 * @returns Formatted percentage string with % symbol
 */
export const formatPercentage = (value: number, maxDecimals: number = 2): string => {
  const formatted = formatNumber(value, maxDecimals);
  return `${formatted}%`;
};

/**
 * Format a currency value to show at most 2 decimal places
 * @param value - The currency value
 * @param currency - Currency symbol (default: $)
 * @param maxDecimals - Maximum number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = '$', maxDecimals: number = 2): string => {
  const formatted = formatNumber(value, maxDecimals);
  return `${currency}${formatted}`;
};

/**
 * Format large numbers with K, M, B suffixes
 * @param value - The number to format
 * @param maxDecimals - Maximum number of decimal places (default: 1)
 * @returns Formatted string with appropriate suffix
 */
export const formatLargeNumber = (value: number, maxDecimals: number = 1): string => {
  if (value >= 1e9) {
    return `${formatNumber(value / 1e9, maxDecimals)}B`;
  } else if (value >= 1e6) {
    return `${formatNumber(value / 1e6, maxDecimals)}M`;
  } else if (value >= 1e3) {
    return `${formatNumber(value / 1e3, maxDecimals)}K`;
  }
  return formatNumber(value, 0);
};

/**
 * Format duration in hours to a readable format
 * @param hours - Duration in hours
 * @param maxDecimals - Maximum number of decimal places (default: 1)
 * @returns Formatted duration string
 */
export const formatDuration = (hours: number, maxDecimals: number = 1): string => {
  if (hours >= 24) {
    const days = hours / 24;
    return `${formatNumber(days, maxDecimals)}d`;
  }
  return `${formatNumber(hours, maxDecimals)}h`;
};

/**
 * Format uptime percentage to always show appropriate precision
 * @param value - Uptime percentage (0-100)
 * @returns Formatted uptime string
 */
export const formatUptime = (value: number): string => {
  if (value >= 99) {
    return formatPercentage(value, 2);
  } else if (value >= 90) {
    return formatPercentage(value, 1);
  }
  return formatPercentage(value, 0);
};

/**
 * Get the app URL dynamically for production/development
 * @returns The current app URL
 */
export const getAppUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}; 