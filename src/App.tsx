import { useEffect } from 'react';
import Fish from './components/Fish';
import { useFishMovement } from './hooks/useFishMovement';
import { useFishLocation } from './hooks/useFishLocation';
import './styles/main.css';

function App() {
  const { position, direction } = useFishMovement();
  const { getFishLocation } = useFishLocation(position);

  return (
    <div className="ocean">
      <Fish position={position} direction={direction} />
    </div>
  );
}

export default App;