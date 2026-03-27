'use client';

import { useState, useEffect, useCallback } from 'react';

interface MobileState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  touchSupported: boolean;
}

interface SwipeDirection {
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
}

interface TouchHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
  minSwipeDistance?: number;
  longPressDelay?: number;
}

export function useMobileResponsive() {
  const [mobileState, setMobileState] = useState<MobileState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'landscape',
    touchSupported: false
  });

  const updateMobileState = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const orientation = height > width ? 'portrait' : 'landscape';
    const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    setMobileState({
      isMobile,
      isTablet,
      isDesktop,
      screenWidth: width,
      screenHeight: height,
      orientation,
      touchSupported
    });
  }, []);

  useEffect(() => {
    updateMobileState();
    window.addEventListener('resize', updateMobileState);
    window.addEventListener('orientationchange', updateMobileState);

    return () => {
      window.removeEventListener('resize', updateMobileState);
      window.removeEventListener('orientationchange', updateMobileState);
    };
  }, [updateMobileState]);

  return mobileState;
}

export function useSwipeGestures(handlers: TouchHandlers) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onLongPress,
    minSwipeDistance = 50,
    longPressDelay = 500
  } = handlers;

  const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
    const touch = e.touches[0];
    const startData = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
    setTouchStart(startData);

    // Start long press timer
    if (onLongPress) {
      const timer = setTimeout(() => {
        onLongPress();
        setLongPressTimer(null);
      }, longPressDelay);
      setLongPressTimer(timer);
    }
  }, [onLongPress, longPressDelay]);

  const handleTouchEnd = useCallback((e: React.TouchEvent | TouchEvent) => {
    if (!touchStart) return;

    // Clear long press timer
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const timeDelta = Date.now() - touchStart.time;

    // Handle tap (short touch with minimal movement)
    if (distance < 10 && timeDelta < 200 && onTap) {
      onTap();
      setTouchStart(null);
      return;
    }

    // Handle swipe gestures
    if (distance >= minSwipeDistance) {
      const swipeDirection = getSwipeDirection(deltaX, deltaY);
      
      switch (swipeDirection.direction) {
        case 'left':
          onSwipeLeft?.();
          break;
        case 'right':
          onSwipeRight?.();
          break;
        case 'up':
          onSwipeUp?.();
          break;
        case 'down':
          onSwipeDown?.();
          break;
      }
    }

    setTouchStart(null);
  }, [touchStart, longPressTimer, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, minSwipeDistance]);

  const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
    // Clear long press timer on movement
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  const getSwipeDirection = (deltaX: number, deltaY: number): SwipeDirection => {
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let direction: 'left' | 'right' | 'up' | 'down' | null = null;

    if (absDeltaX > absDeltaY) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    return { deltaX, deltaY, direction, distance };
  };

  const touchEventHandlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove
  };

  return {
    touchEventHandlers,
    touchStart: touchStart !== null
  };
}

export function useMobileNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const navigateNext = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const navigatePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const navigateTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const addToHistory = useCallback((path: string) => {
    setHistory(prev => [...prev.slice(-10), path]); // Keep last 10 items
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      return newHistory[newHistory.length - 1];
    }
    return null;
  }, [history]);

  return {
    currentIndex,
    history,
    navigateNext,
    navigatePrevious,
    navigateTo,
    addToHistory,
    goBack,
    canGoBack: history.length > 1
  };
}

// Hook for mobile-specific animations
export function useMobileAnimations() {
  const mobileState = useMobileResponsive();

  const getAnimationConfig = useCallback((type: 'enter' | 'exit' | 'transition') => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (reducedMotion) {
      return {
        duration: 0,
        ease: 'linear'
      };
    }

    const baseConfig = {
      enter: {
        duration: mobileState.isMobile ? 0.2 : 0.3,
        ease: 'easeOut'
      },
      exit: {
        duration: mobileState.isMobile ? 0.15 : 0.25,
        ease: 'easeIn'
      },
      transition: {
        duration: mobileState.isMobile ? 0.1 : 0.2,
        ease: 'easeInOut'
      }
    };

    return baseConfig[type];
  }, [mobileState.isMobile]);

  return {
    getAnimationConfig,
    shouldReduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isMobile: mobileState.isMobile
  };
} 