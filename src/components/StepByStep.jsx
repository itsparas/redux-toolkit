import { useState } from 'react';

export default function StepByStep({ steps }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="step-by-step">
      <div className="step-by-step__header">
        <span className="step-by-step__badge">📖 Step-by-Step Walkthrough</span>
      </div>
      <div className="step-by-step__tracker">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`step-by-step__dot ${i === current ? 'step-by-step__dot--active' : ''} ${i < current ? 'step-by-step__dot--done' : ''}`}
            onClick={() => setCurrent(i)}
          >
            {i < current ? '✓' : i + 1}
          </div>
        ))}
      </div>
      <div className="step-by-step__content">
        <h4 className="step-by-step__title">
          Step {current + 1}: {steps[current].title}
        </h4>
        <div className="step-by-step__body">{steps[current].content}</div>
      </div>
      <div className="step-by-step__nav">
        <button
          className="btn btn--secondary"
          onClick={() => setCurrent((c) => c - 1)}
          disabled={current === 0}
        >
          ← Previous
        </button>
        <button
          className="btn btn--primary"
          onClick={() => setCurrent((c) => c + 1)}
          disabled={current === steps.length - 1}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
