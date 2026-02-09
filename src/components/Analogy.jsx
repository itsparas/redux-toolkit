import { useState } from 'react';

/**
 * A visual analogy component that makes Redux concepts relatable.
 * Shows a real-world comparison alongside the Redux equivalent.
 */
export default function Analogy({ emoji, realWorld, redux, children }) {
  const [showRedux, setShowRedux] = useState(false);

  return (
    <div className="analogy">
      <div className="analogy__header">
        <span className="analogy__emoji">{emoji}</span>
        <span className="analogy__badge">Real-World Analogy</span>
      </div>
      <div className="analogy__tabs">
        <button
          className={`analogy__tab ${!showRedux ? 'analogy__tab--active' : ''}`}
          onClick={() => setShowRedux(false)}
        >
          🌍 Real World
        </button>
        <button
          className={`analogy__tab ${showRedux ? 'analogy__tab--active' : ''}`}
          onClick={() => setShowRedux(true)}
        >
          ⚛️ In Redux
        </button>
      </div>
      <div className="analogy__content">
        {showRedux ? (
          <div className="analogy__panel analogy__panel--redux">{redux}</div>
        ) : (
          <div className="analogy__panel analogy__panel--real">{realWorld}</div>
        )}
      </div>
      {children && <div className="analogy__extra">{children}</div>}
    </div>
  );
}
