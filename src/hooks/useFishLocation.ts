import { useEffect, useRef } from 'react';
import { Position } from '../types';

export const useFishLocation = (position: Position) => {
  const locationRef = useRef<Position>(position);

  useEffect(() => {
    // Update the ref whenever position changes
    locationRef.current = position;
    
    // Log location changes (for development purposes)
    console.debug('Fish location:', position);
  }, [position]);

  // Function to get current fish location
  const getFishLocation = (): Position => locationRef.current;

  return { getFishLocation };
};