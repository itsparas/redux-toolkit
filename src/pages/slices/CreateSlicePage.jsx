import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import InteractiveExample from '../../components/InteractiveExample';
import Analogy from '../../components/Analogy';
import StepByStep from '../../components/StepByStep';
import Quiz from '../../components/Quiz';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCount,
  selectHistory,
} from '../../features/counter/counterSlice';

export default function CreateSlicePage() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const history = useSelector(selectHistory);
  const [amount, setAmount] = useState(5);

  const sliceSteps = [
    {
      title: 'Step 1: Import createSlice',
      content: (
        <div>
          <p>First, import <code>createSlice</code> from Redux Toolkit:</p>
          <CodeBlock code={`import { createSlice } from '@reduxjs/toolkit';`} />
          <p>This one function replaces action types, action creators, and reducers!</p>
        </div>
      ),
    },
    {
      title: 'Step 2: Give it a name',
      content: (
        <div>
          <p>The <code>name</code> is used as a prefix for auto-generated action types:</p>
          <CodeBlock code={`const counterSlice = createSlice({
  name: 'counter',   // → actions will be 'counter/increment', etc.
  // ...
});`} />
          <p>Choose descriptive names like <code>'counter'</code>, <code>'todos'</code>, <code>'auth'</code>.</p>
        </div>
      ),
    },
    {
      title: 'Step 3: Define initial state',
      content: (
        <div>
          <p>What should this feature's data look like when the app first loads?</p>
          <CodeBlock code={`const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,          // Starting count
    history: [],       // Log of changes
  },
  // ...
});`} />
          <p>This is the "default" value — like setting a scoreboard to 0 before the game starts.</p>
        </div>
      ),
    },
    {
      title: 'Step 4: Write reducers',
      content: (
        <div>
          <p>Reducers define <strong>how state can change</strong>. Each one handles a specific action:</p>
          <CodeBlock code={`  reducers: {
    increment: (state) => {
      state.value += 1;      // Add 1 (Immer makes this safe!)
    },
    decrement: (state) => {
      state.value -= 1;      // Subtract 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;   // action.payload = the number you pass in
      state.history.push(\`Added \${action.payload}\`);
    },
    reset: (state) => {
      state.value = 0;
      state.history = [];
    },
  },`} />
          <p><code>state</code> = current data. <code>action.payload</code> = extra data you send with the action.</p>
        </div>
      ),
    },
    {
      title: 'Step 5: Export actions & reducer',
      content: (
        <div>
          <p>RTK auto-generates action creators from your reducer names. Export them for components to use:</p>
          <CodeBlock code={`// Auto-generated action creators — export them!
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// increment()          → { type: 'counter/increment' }
// incrementByAmount(5) → { type: 'counter/incrementByAmount', payload: 5 }

// Export the reducer for the store
export default counterSlice.reducer;`} />
          <p>That's it! One file, one function, everything you need. 🎉</p>
        </div>
      ),
    },
  ];

  const quizQuestions = [
    {
      question: 'What does the "name" property in createSlice do?',
      options: [
        'Names the React component',
        'Sets the CSS class name',
        'Acts as a prefix for auto-generated action types',
        'Names the database table',
      ],
      correct: 2,
      explanation: 'The name becomes the prefix for all action types. So name: "counter" produces actions like "counter/increment", "counter/decrement", etc.',
    },
    {
      question: 'What is action.payload?',
      options: [
        'The name of the action',
        'The extra data you send with an action',
        'The store configuration',
        'The component that dispatched the action',
      ],
      correct: 1,
      explanation: 'payload is the data you pass when dispatching. dispatch(incrementByAmount(5)) → action.payload = 5. It\'s like an envelope carrying data!',
    },
    {
      question: 'Why can you write state.value += 1 even though Redux requires immutability?',
      options: [
        'Redux doesn\'t actually require immutability',
        'React handles the mutation',
        'Immer (built into RTK) converts mutations into safe updates',
        'JavaScript ignores the mutation',
      ],
      correct: 2,
      explanation: 'Immer is a library built into Redux Toolkit. It uses a "proxy" to detect your mutations and automatically produces a brand new state object behind the scenes!',
    },
  ];

  return (
    <TopicPage id="/create-slice" title="createSlice — The Heart of Redux Toolkit">
      <section>
        <h2>What is a Slice?</h2>
        <p>
          A <strong>slice</strong> is a bundle of Redux logic for one feature of your app. 
          It contains the initial state, the reducer functions, and auto-generated actions — 
          all in one place!
        </p>

        <Analogy
          emoji="🍕"
          realWorld={
            <div>
              <p><strong>Think of a Pizza:</strong></p>
              <ul>
                <li>🍕 The whole pizza = your entire Redux store (all app data)</li>
                <li>🍕 One slice = one feature (counter, todos, auth, etc.)</li>
                <li>Each slice has its own toppings (state), cutting instructions (reducers), and label (name)</li>
              </ul>
              <p>Your app is a pizza, and each feature gets its own slice!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>A Slice Contains:</strong></p>
              <ul>
                <li><code>name</code> — Label for this slice (used in action types)</li>
                <li><code>initialState</code> — Default data when app starts</li>
                <li><code>reducers</code> — Functions that define how state changes</li>
                <li>Auto-generated <code>actions</code> — Created from reducer names</li>
              </ul>
              <p><code>createSlice</code> replaces 3 separate files from vanilla Redux with just 1!</p>
            </div>
          }
        />
      </section>

      <section>
        <h2>Build a Slice Step-by-Step</h2>
        <p>Follow these 5 steps to create your first slice:</p>
        <StepByStep steps={sliceSteps} />
      </section>

      <section>
        <h2>Complete Code</h2>
        <CodeBlock
          title="Full counterSlice.jsx — the slice powering the demo below!"
          code={`import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, history: [] },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(\`Added \${action.payload}\`);
    },
    reset: (state) => { state.value = 0; state.history = [] },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectHistory = (state) => state.counter.history;
export default counterSlice.reducer;`}
        />
      </section>

      <section>
        <h2>🧪 Live Interactive Demo</h2>
        <InteractiveExample
          title="Counter Slice in Action"
          description="This counter uses the REAL counterSlice from this app. Every button dispatches a real Redux action!"
        >
          <div className="counter-demo">
            <div className="counter-display">
              <span className="counter-value">{count}</span>
            </div>
            <div className="counter-controls">
              <button className="btn btn--danger" onClick={() => dispatch(decrement())}>
                − Decrement
              </button>
              <button className="btn btn--success" onClick={() => dispatch(increment())}>
                + Increment
              </button>
            </div>
            <div className="counter-controls">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="counter-input"
              />
              <button
                className="btn btn--primary"
                onClick={() => dispatch(incrementByAmount(amount))}
              >
                Add Amount
              </button>
              <button className="btn btn--secondary" onClick={() => dispatch(reset())}>
                Reset
              </button>
            </div>

            {history.length > 0 && (
              <div className="counter-history">
                <h4>Action History (from Redux state):</h4>
                <ul>
                  {history.map((entry, i) => (
                    <li key={i}>{entry}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </InteractiveExample>

        <InfoBox type="tip" title="See It in DevTools!">
          Press <strong>F12 → Redux tab</strong> to see each action dispatched as you click the buttons.
          You'll see action types like <code>counter/increment</code> with their payloads.
        </InfoBox>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
