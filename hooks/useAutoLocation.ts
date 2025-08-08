import { useState, useEffect } from 'react';
import { autoDetectLocation } from '../utils/locationService';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  distance: number;
}

interface UseAutoLocationReturn {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  setLocation: React.Dispatch<React.SetStateAction<LocationData | null>>;
}

export function useAutoLocation(): UseAutoLocationReturn {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const detectedLocation = await autoDetectLocation();
      const locationWithCity = {
        latitude: detectedLocation.latitude,
        longitude: detectedLocation.longitude,
        city: detectedLocation.nearestCity,
        distance: detectedLocation.distance
      };
      setLocation(locationWithCity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect location');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only detect location after component is mounted to prevent hydration issues
    if (isMounted) {
      detectLocation();
    }
  }, [isMounted]);

  const refetch = () => {
    detectLocation();
  };

  return {
    location,
    isLoading,
    error,
    refetch,
    setLocation
  };
} 