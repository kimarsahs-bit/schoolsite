import { useState, useEffect } from 'react';

interface DeviceCapability {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  supportsHover: boolean;
  isMobile: boolean;
}

export const useDeviceCapability = (): DeviceCapability => {
  const [capability, setCapability] = useState<DeviceCapability>({
    isLowEnd: false,
    prefersReducedMotion: false,
    supportsHover: false,
    isMobile: false,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth < 768;
    
    // Check for hover support (desktop typically supports hover)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    // Detect low-end device based on hardware concurrency and device memory
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const isLowEnd = hardwareConcurrency <= 2 || deviceMemory <= 2 || isMobile;

    setCapability({
      isLowEnd,
      prefersReducedMotion,
      supportsHover,
      isMobile,
    });
  }, []);

  return capability;
};

