import { useState, useEffect, useCallback, useRef } from 'react';
import { Position } from '../types';
import { calculateNewPosition } from '../utils/movement';
import { MOVEMENT } from '../utils/constants';

export const useFishMovement = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isIdle, setIsIdle] = useState(false);
  const [velocity, setVelocity] = useState<Position>({ x: 5, y: 0 });
  const lastTurnTime = useRef(Date.now());
  const nextTurnTime = useRef(Date.now() + MOVEMENT.BASE_TURN_TIME);
  const currentVelocity = useRef(velocity);

  const scheduleTurn = useCallback(() => {
    const additionalTime = MOVEMENT.ADDITIONAL_TURN_TIME[
      Math.floor(Math.random() * MOVEMENT.ADDITIONAL_TURN_TIME.length)
    ];
    nextTurnTime.current = Date.now() + MOVEMENT.BASE_TURN_TIME + additionalTime;
  }, []);

  const performTurn = useCallback(() => {
    currentVelocity.current = {
      x: -currentVelocity.current.x,
      y: currentVelocity.current.y
    };
    setVelocity(currentVelocity.current);
    lastTurnTime.current = Date.now();
    scheduleTurn();
  }, [scheduleTurn]);

  const startIdlePeriod = useCallback(() => {
    setIsIdle(true);
    const slowDown = () => {
      currentVelocity.current = {
        x: currentVelocity.current.x * MOVEMENT.VELOCITY_DECAY,
        y: currentVelocity.current.y * MOVEMENT.VELOCITY_DECAY
      };
      setVelocity(currentVelocity.current);

      if (Math.abs(currentVelocity.current.x) > 0.1) {
        requestAnimationFrame(slowDown);
      }
    };
    slowDown();

    setTimeout(() => {
      setIsIdle(false);
      currentVelocity.current = velocity;
    }, Math.random() * MOVEMENT.MAX_IDLE_DURATION);
  }, [velocity]);

  useEffect(() => {
    if (isIdle) return;

    const updatePosition = () => {
      const now = Date.now();
      
      if (now >= nextTurnTime.current) {
        performTurn();
      }

      const { newPosition, newVelocity } = calculateNewPosition(
        position,
        currentVelocity.current,
        window.innerWidth,
        window.innerHeight
      );

      if (newVelocity.x !== currentVelocity.current.x) {
        setDirection(newVelocity.x > 0 ? 'right' : 'left');
      }

      currentVelocity.current = newVelocity;
      setPosition(newPosition);
      setVelocity(newVelocity);

      if (Math.random() < MOVEMENT.IDLE_CHANCE) {
        startIdlePeriod();
      }
    };

    const animationFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, isIdle, startIdlePeriod, performTurn]);

  // Initialize first turn schedule
  useEffect(() => {
    scheduleTurn();
  }, [scheduleTurn]);

  return { position, direction };
};