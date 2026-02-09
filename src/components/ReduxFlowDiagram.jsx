import { useState } from 'react';

/**
 * Interactive diagram that shows the Redux data flow step by step.
 * Users click through each stage to see what happens.
 */
export default function ReduxFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  const flowSteps = [
    {
      label: 'Start Here',
      highlight: 'ui',
      title: '1. Something happens in the UI',
      description: 'A user clicks a button, types in an input, or a page loads. This is where every Redux action begins — from user interaction.',
      example: 'User clicks the "+1" button',
    },
    {
      label: 'Dispatch',
      highlight: 'dispatch',
      title: '2. Component dispatches an action',
      description: 'The component calls dispatch() with an action object. An action is just a plain object with a "type" field describing what happened, and optionally a "payload" with data.',
      example: 'dispatch({ type: "counter/increment" })',
    },
    {
      label: 'Store',
      highlight: 'store',
      title: '3. Store receives the action',
      description: 'The Redux store receives the dispatched action and forwards it to the reducer function. Think of the store as a middleman — it doesn\'t change state itself.',
      example: 'Store says: "Hey reducer, counter/increment happened!"',
    },
    {
      label: 'Reducer',
      highlight: 'reducer',
      title: '4. Reducer calculates new state',
      description: 'The reducer is a pure function that takes the current state + action, and returns the NEW state. With Redux Toolkit\'s createSlice, this is the function you write inside "reducers: {}".',
      example: '(state.value = 0) + increment → (state.value = 1)',
    },
    {
      label: 'Update',
      highlight: 'newstate',
      title: '5. Store saves new state',
      description: 'The store replaces the old state with the new state returned by the reducer. It then notifies all subscribed components that the state has changed.',
      example: 'Store: { counter: { value: 1 } }  ← updated!',
    },
    {
      label: 'Re-render',
      highlight: 'ui',
      title: '6. UI re-renders with new data',
      description: 'Components using useSelector automatically re-render when the part of state they\'re reading changes. The UI now shows the updated value!',
      example: 'Counter display changes from "0" to "1"',
    },
  ];

  const step = flowSteps[activeStep];

  return (
    <div className="redux-flow">
      <div className="redux-flow__diagram">
        <div className={`rf-box rf-box--ui ${step.highlight === 'ui' ? 'rf-box--active' : ''}`}>
          👆 UI Component
        </div>
        <div className={`rf-arrow ${step.highlight === 'dispatch' ? 'rf-arrow--active' : ''}`}>
          ↓ dispatch(action)
        </div>
        <div className={`rf-box rf-box--store ${step.highlight === 'store' ? 'rf-box--active' : ''}`}>
          🏪 Redux Store
        </div>
        <div className={`rf-arrow ${step.highlight === 'reducer' ? 'rf-arrow--active' : ''}`}>
          ↓ calls reducer
        </div>
        <div className={`rf-box rf-box--reducer ${step.highlight === 'reducer' ? 'rf-box--active' : ''}`}>
          ⚙️ Reducer Function
        </div>
        <div className={`rf-arrow ${step.highlight === 'newstate' ? 'rf-arrow--active' : ''}`}>
          ↓ returns new state
        </div>
        <div className={`rf-box rf-box--state ${step.highlight === 'newstate' ? 'rf-box--active' : ''}`}>
          📦 New State
        </div>
        <div className={`rf-arrow-up ${step.highlight === 'ui' && activeStep === 5 ? 'rf-arrow-up--active' : ''}`}>
          ↑ useSelector reads updated state
        </div>
      </div>
      <div className="redux-flow__info">
        <div className="redux-flow__steps">
          {flowSteps.map((s, i) => (
            <button
              key={i}
              className={`rf-step-btn ${i === activeStep ? 'rf-step-btn--active' : ''} ${i < activeStep ? 'rf-step-btn--done' : ''}`}
              onClick={() => setActiveStep(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <h4>{step.title}</h4>
        <p>{step.description}</p>
        <div className="redux-flow__example">
          <strong>Example:</strong> {step.example}
        </div>
        <div className="redux-flow__nav">
          <button
            className="btn btn--secondary btn--sm"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => s - 1)}
          >
            ← Back
          </button>
          <button
            className="btn btn--primary btn--sm"
            disabled={activeStep === flowSteps.length - 1}
            onClick={() => setActiveStep((s) => s + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
