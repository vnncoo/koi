export const MOVEMENT = {
  BASE_TURN_TIME: 3000, // 3 seconds base time before considering a turn
  ADDITIONAL_TURN_TIME: [1000, 2000, 3000], // Additional 1-3 seconds randomly
  IDLE_CHANCE: 0.001,
  MAX_IDLE_DURATION: 1000,
  VELOCITY_DECAY: 0.95,
  MAX_VELOCITY: 5,
  TURN_FACTOR: 0.2
} as const;