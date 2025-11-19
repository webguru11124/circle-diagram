import { useState } from 'react';
import { CircleDiagram } from './components/CircleDiagram';
import type { DiagramItem } from './types';
import './App.css';

const shortLabels = [
  'Renewable energies',
  'Digital Transformation',
  'Robotics',
  'Bio technology',
  'Future mobility',
  'Artificial Intelligence',
  'Quantum Computing',
  'Space Exploration',
  'Nanotechnology'
];

const longLabels = [
  'Renewable energies and charging infrastructure',
  'Digital Transformation and Industry 4.0',
  'Robotics and automation systems',
  'Bio technology and genetic engineering',
  'Future mobility and autonomous driving',
  'Artificial Intelligence and machine learning',
  'Quantum Computing and cryptography',
  'Space Exploration and satellite technology',
  'Nanotechnology and advanced materials'
];

function App() {
  const [numCircles, setNumCircles] = useState(5);
  const [useLongLabels, setUseLongLabels] = useState(false);

  const items: DiagramItem[] = Array.from({ length: numCircles }, (_, index) => ({
    id: index + 1,
    label: useLongLabels ? longLabels[index] : shortLabels[index]
  }));

  return (
    <div className="app">
      <header className="header">
        <h1>Circle Diagram - Zapdeck Case Study</h1>
        <p>Interactive circular diagram with intelligent text placement</p>
      </header>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="numCircles">
            Number of Circles: <strong>{numCircles}</strong>
          </label>
          <input
            id="numCircles"
            type="range"
            min="2"
            max="9"
            value={numCircles}
            onChange={(e) => setNumCircles(parseInt(e.target.value))}
            className="slider"
          />
        </div>

        <button
          onClick={() => setUseLongLabels(!useLongLabels)}
          className="toggle-button"
        >
          {useLongLabels ? 'Use Short Labels' : 'Use Long Labels'}
        </button>
      </div>

      <div className="diagram-container">
        <CircleDiagram items={items} />
      </div>

      <footer className="footer">
        <p>
          Built with React + TypeScript + SVG | Fixed canvas: 1920 x 1080px
        </p>
      </footer>
    </div>
  );
}

export default App;
