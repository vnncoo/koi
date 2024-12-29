import { Position } from '../types';

interface FishProps {
  position: Position;
  direction: 'left' | 'right';
}

const Fish = ({ position, direction }: FishProps) => {
  return (
    <div
      className="fish"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transform: `translate(${position.x}px, ${position.y}px) scaleX(${direction === 'left' ? -1 : 1})`,
      }}
    >
      🐠
    </div>
  );
}

export default Fish;