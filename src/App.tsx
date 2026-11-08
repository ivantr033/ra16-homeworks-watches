import { useState } from 'react';
import WorldClockForm from './components/WorldClockForm';
import WorldClock from './components/WorldClock';
import './App.css';

interface ClockItem {
  id: string;
  name: string;
  timezone: number;
}

function App() {
  // Initialize with two example cities
  const [clocks, setClocks] = useState<ClockItem[]>([
    { id: '1', name: 'Moscow', timezone: 3 },
    { id: '2', name: 'London', timezone: 0 },
  ]);

  const handleAddClock = (name: string, timezone: number) => {
    setClocks((prev) => [...prev, { id: crypto.randomUUID(), name, timezone }]);
  };

  const handleRemoveClock = (idToRemove: string) => {
    setClocks((prev) => prev.filter((clock) => clock.id !== idToRemove));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>Мировые часы</h2>

      <WorldClockForm onAddClock={handleAddClock} />

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {clocks.map((clock) => (
          <WorldClock
            key={clock.id}
            name={clock.name}
            timezone={clock.timezone}
            onRemove={() => handleRemoveClock(clock.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
