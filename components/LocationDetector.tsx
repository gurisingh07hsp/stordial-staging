'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { autoDetectLocation } from '../utils/locationService';

interface LocationDetectorProps {
  onLocationDetected: (location: { latitude: number; longitude: number; city: string; distance: number }) => void;
  onLocationError: (error: string) => void;
}

export default function LocationDetector({ onLocationDetected, onLocationError }: LocationDetectorProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ 
    latitude: number; 
    longitude: number; 
    city: string; 
    distance: number 
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const detectLocation = useCallback(async () => {
    setIsDetecting(true);
    setError(null);

    try {
      // Use auto-detect which handles permissions automatically
      const detectedLocation = await autoDetectLocation();
      const locationWithCity = {
        latitude: detectedLocation.latitude,
        longitude: detectedLocation.longitude,
        city: detectedLocation.nearestCity,
        distance: detectedLocation.distance
      };
      setLocation(locationWithCity);
      onLocationDetected(locationWithCity);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to detect location';
      setError(errorMessage);
      onLocationError(errorMessage);
    } finally {
      setIsDetecting(false);
    }
  }, [onLocationDetected, onLocationError]);

  useEffect(() => {
    // Only run on client side and after component is mounted
    if (isMounted) {
      detectLocation();
    }
  }, [detectLocation, isMounted]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-800">Your Location</h3>
            <p className="text-sm text-gray-600">
              {isDetecting ? 'Automatically detecting your location...' : 
               location ? 'Location detected successfully!' : 
               error ? 'Location detection failed' : 'Ready to detect location'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isDetecting && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Detecting...</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Detected</span>
            </div>
          )}
          
          {error && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Error</span>
            </div>
          )}
        </div>
      </div>
      
      {location && (
        <div className="mt-3 p-3 bg-green-50 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Nearest City:</strong> {location.city.charAt(0).toUpperCase() + location.city.slice(1)}
          </p>
          {location.distance > 0 && (
            <p className="text-sm text-green-800">
              <strong>Distance:</strong> {location.distance.toFixed(1)} km away
            </p>
          )}
          <p className="text-sm text-green-800">
            <strong>Coordinates:</strong> {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
        </div>
      )}
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
          <button
            onClick={detectLocation}
            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}
      
      {!isDetecting && !location && !error && (
        <button
          onClick={detectLocation}
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Detect My Location
        </button>
      )}
    </div>
  );
} 