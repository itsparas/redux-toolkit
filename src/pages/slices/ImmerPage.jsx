import { useState } from 'react';
import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import InteractiveExample from '../../components/InteractiveExample';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';

export default function ImmerPage() {
  const [demoState, setDemoState] = useState({
    user: { name: 'Alice', address: { city: 'New York', zip: '10001' } },
    items: ['apple', 'banana'],
  });
  const [showImmer, setShowImmer] = useState(false);

  const updateCityVanilla = () => {
    setDemoState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        address: {
          ...prev.user.address,
          city: 'Los Angeles',
        },
      },
    }));
  };

  const addItem = () => {
    setDemoState((prev) => ({
      ...prev,
      items: [...prev.items, 'cherry'],
    }));
  };

  const resetDemo = () => {
    setDemoState({
      user: { name: 'Alice', address: { city: 'New York', zip: '10001' } },
      items: ['apple', 'banana'],
    });
  };

  const quizQuestions = [
    {
      question: 'Why can you write "state.value += 1" inside createSlice reducers?',
      options: [
        'JavaScript allows mutable state',
        'React handles it automatically',
        'Immer intercepts the mutation and creates a new immutable object',
        'Redux doesn\'t require immutability',
      ],
      correct: 2,
      explanation: 'Immer creates a "draft" proxy of the state. When you "mutate" the draft, Immer records the changes and produces a brand new immutable state object. Your mutations are never applied directly!',
    },
    {
      question: 'What should you NOT do inside a createSlice reducer?',
      options: [
        'Use state.items.push()',
        'Use state.value = newValue',
        'Both mutate AND return a new value in the same reducer',
        'Use state.items.splice()',
      ],
      correct: 2,
      explanation: 'Immer has one important rule: either mutate the draft state OR return a new value — never both in the same reducer. Doing both confuses Immer about your intentions.',
    },
  ];

  return (
    <TopicPage id="/immer" title="Immer & Safe Mutations">
      <section>
        <h2>What is Immutability and Why Does Redux Need It?</h2>
        <p>
          <strong>Immutability</strong> means you never change existing data — you always create a <em>new copy</em> with your changes.
          Redux needs this so it can tell when something changed (by comparing old vs new references) and re-render the right components.
        </p>

        <Analogy
          emoji="📋"
          realWorld={
            <div>
              <p><strong>Think of a Filled-Out Form:</strong></p>
              <ul>
                <li>❌ <strong>Mutating</strong> = Using white-out on the original form. Now nobody knows what the original said!</li>
                <li>✅ <strong>Immutable update</strong> = Making a photocopy, writing changes on the copy, and keeping the original for records.</li>
              </ul>
              <p>Redux needs to compare the "before" and "after" forms. If you white-out the original, it can't tell what changed!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In Code:</strong></p>
              <ul>
                <li>❌ <code>state.user.name = "Bob"</code> — Mutating the original object. Redux can't detect the change!</li>
                <li>✅ <code>{`return { ...state, user: { ...state.user, name: "Bob" } }`}</code> — New object with changes. Redux sees it and re-renders!</li>
                <li>✅ With Immer: <code>state.user.name = "Bob"</code> — Looks like mutation, but Immer secretly creates a new object for you!</li>
              </ul>
            </div>
          }
        />
      </section>

      <section>
        <h2>The Nested Update Nightmare (Without Immer)</h2>
        <p>
          Updating deeply nested data <em>without</em> Immer requires spreading at every level. 
          This is the #1 reason people find Redux painful:
        </p>

        <CodeBlock
          title="❌ Vanilla Redux — Painful nested updates"
          code={`// Want to change city from "New York" to "LA"?
// State: { user: { name: "Alice", address: { city: "New York", zip: "10001" } } }

function userReducer(state, action) {
  return {
    ...state,                              // 1. Copy top level
    user: {
      ...state.user,                       // 2. Copy user level
      address: {
        ...state.user.address,             // 3. Copy address level
        city: action.payload,              // 4. FINALLY update the value!
      },
    },
  };
}
// 😰 That's 4 levels of spreading just to change ONE value!`}
        />
      </section>

      <section>
        <h2>Immer to the Rescue! ✨</h2>
        <p>
          With Immer (built into Redux Toolkit), the same update becomes one line:
        </p>

        <CodeBlock
          title="✅ Redux Toolkit with Immer — Clean and simple!"
          code={`const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { name: 'Alice', address: { city: 'New York', zip: '10001' } },
    items: ['apple', 'banana'],
  },
  reducers: {
    // ONE LINE instead of 4 levels of spread!
    updateCity: (state, action) => {
      state.user.address.city = action.payload;  // ✅ So clean!
    },

    addItem: (state, action) => {
      state.items.push(action.payload);  // ✅ push() works!
    },

    removeItem: (state, action) => {
      const index = state.items.indexOf(action.payload);
      if (index !== -1) state.items.splice(index, 1);  // ✅ splice() works!
    },
  },
});`}
        />

        <InfoBox type="warning" title="⚠️ The One Rule of Immer">
          <p>Inside a reducer, you must do <strong>ONE of these</strong> — never both:</p>
          <ul>
            <li>✅ <strong>Mutate</strong> the draft state: <code>state.value = 5</code></li>
            <li>✅ <strong>Return</strong> a new state: <code>return {'{ ...state, value: 5 }'}</code></li>
            <li>❌ <strong>NEVER</strong> both mutate AND return in the same reducer!</li>
          </ul>
        </InfoBox>
      </section>

      <section>
        <h2>🧪 See the Difference</h2>
        <InteractiveExample
          title="Nested State Update Demo"
          description="Click the buttons to see how state changes. The vanilla way requires complex spread logic!"
        >
          <div className="immer-demo">
            <div className="immer-state">
              <h4>Current State:</h4>
              <pre>{JSON.stringify(demoState, null, 2)}</pre>
            </div>
            <div className="immer-controls">
              <button className="btn btn--primary" onClick={updateCityVanilla}>
                Change City to "LA"
              </button>
              <button className="btn btn--success" onClick={addItem}>
                Add "cherry"
              </button>
              <button className="btn btn--secondary" onClick={resetDemo}>
                Reset
              </button>
            </div>
            <div className="immer-toggle">
              <button
                className={`btn ${showImmer ? 'btn--success' : 'btn--danger'}`}
                onClick={() => setShowImmer(!showImmer)}
              >
                {showImmer ? '✅ Show Immer Way (Clean!)' : '❌ Show Vanilla Way (Messy!)'}
              </button>
              <CodeBlock
                title={showImmer ? 'With Immer (Redux Toolkit)' : 'Without Immer (Vanilla Redux)'}
                code={
                  showImmer
                    ? `// With Immer — ONE line!
updateCity: (state, action) => {
  state.user.address.city = action.payload;
}`
                    : `// Without Immer — 4 levels of spread!
return {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: action.payload,
    },
  },
};`
                }
              />
            </div>
          </div>
        </InteractiveExample>
      </section>

      <section>
        <h2>Common Immer Patterns Cheat Sheet</h2>
        <CodeBlock
          title="Patterns you'll use every day"
          code={`reducers: {
  // TOGGLE a boolean
  toggleActive: (state) => {
    state.isActive = !state.isActive;
  },

  // SET a value from payload
  setUsername: (state, action) => {
    state.username = action.payload;
  },

  // ADD to an array
  addNotification: (state, action) => {
    state.notifications.push(action.payload);     // push() is safe!
  },

  // REMOVE from array by ID
  removeNotification: (state, action) => {
    state.notifications = state.notifications.filter(
      n => n.id !== action.payload
    );  // filter() returns a new array — that's fine too!
  },

  // UPDATE an item in array by ID
  markAsRead: (state, action) => {
    const notification = state.notifications.find(
      n => n.id === action.payload
    );
    if (notification) notification.read = true;   // Direct mutation — Immer safe!
  },

  // REPLACE entire state
  resetState: () => initialState,   // Return a new value to replace everything
}`}
        />
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
