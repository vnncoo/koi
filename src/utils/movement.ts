import { Position } from '../types';
import { MOVEMENT } from './constants';

export const calculateNewPosition = (
  currentPosition: Position,
  currentVelocity: Position,
  maxWidth: number,
  maxHeight: number
) => {
  let newVelocity = {
    x: currentVelocity.x + (Math.random() - 0.5) * MOVEMENT.TURN_FACTOR,
    y: currentVelocity.y + (Math.random() - 0.5) * MOVEMENT.TURN_FACTOR,
  };

  // Limit maximum velocity
  const speed = Math.sqrt(newVelocity.x ** 2 + newVelocity.y ** 2);
  if (speed > MOVEMENT.MAX_VELOCITY) {
    newVelocity.x = (newVelocity.x / speed) * MOVEMENT.MAX_VELOCITY;
    newVelocity.y = (newVelocity.y / speed) * MOVEMENT.MAX_VELOCITY;
  }

  let newPosition = {
    x: currentPosition.x + newVelocity.x,
    y: currentPosition.y + newVelocity.y,
  };

  // Bounce off viewport boundaries
  if (newPosition.x < 0 || newPosition.x > maxWidth) {
    newVelocity.x *= -1;
    newPosition.x = Math.max(0, Math.min(newPosition.x, maxWidth));
  }
  if (newPosition.y < 0 || newPosition.y > maxHeight) {
    newVelocity.y *= -1;
    newPosition.y = Math.max(0, Math.min(newPosition.y, maxHeight));
  }

  return { newPosition, newVelocity };
};