import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';

export default function ActionsReducersPage() {
  const quizQuestions = [
    {
      question: 'What is an "action" in Redux?',
      options: [
        'A React component',
        'A plain object with a type field that describes what happened',
        'A database query',
        'A CSS animation',
      ],
      correct: 1,
      explanation: 'An action is a plain JavaScript object with a "type" property (like "counter/increment") and optionally a "payload" property with extra data.',
    },
    {
      question: 'What is action.payload used for?',
      options: [
        'Naming the action',
        'Carrying extra data the reducer needs (like a value to add)',
        'Setting the CSS color',
        'Connecting to the database',
      ],
      correct: 1,
      explanation: 'payload carries data. For example, incrementByAmount(5) creates { type: "counter/incrementByAmount", payload: 5 }. The reducer uses payload to know how much to add!',
    },
    {
      question: 'What is a "prepare" callback in createSlice?',
      options: [
        'A function that prepares the UI for rendering',
        'A function that customizes the action before it reaches the reducer',
        'A function that connects to the API',
        'A function that creates a new React component',
      ],
      correct: 1,
      explanation: 'A prepare callback lets you transform the input before the action is created. It\'s useful for adding IDs, timestamps, or restructuring the payload.',
    },
  ];

  return (
    <TopicPage id="/actions-reducers" title="Actions & Reducer Logic">
      <section>
        <h2>What are Actions?</h2>
        <p>
          Actions are plain objects that describe <strong>what happened</strong>. Think of them 
          as <em>messages</em> sent to the store.
        </p>

        <Analogy
          emoji="📮"
          realWorld={
            <div>
              <p><strong>Think of Sending a Letter:</strong></p>
              <ul>
                <li>✉️ <strong>Action</strong> = The letter itself</li>
                <li>📝 <strong>type</strong> = The subject line ("Please add money to my account")</li>
                <li>📦 <strong>payload</strong> = What's inside the envelope (the $100 check)</li>
              </ul>
              <p>An action says WHAT should happen. The reducer decides HOW to do it.</p>
            </div>
          }
          redux={
            <div>
              <p><strong>Action format:</strong></p>
              <ul>
                <li><code>{`{ type: "counter/increment" }`}</code> — action with no extra data</li>
                <li><code>{`{ type: "counter/incrementByAmount", payload: 5 }`}</code> — action carrying data</li>
                <li><code>type</code> = what happened. <code>payload</code> = extra info.</li>
              </ul>
              <p>In RTK, action creators like <code>increment()</code> build these objects for you!</p>
            </div>
          }
        />

        <CodeBlock
          title="Auto-generated actions from createSlice"
          code={`// Your reducers in createSlice:
reducers: {
  increment: (state) => { state.value += 1 },
  incrementByAmount: (state, action) => { state.value += action.payload },
}

// RTK auto-generates these action creators:
increment()          → { type: 'counter/increment' }
incrementByAmount(5) → { type: 'counter/incrementByAmount', payload: 5 }

// Async thunk actions (auto-generated too):
'todos/fetchTodos/pending'     // Started fetching
'todos/fetchTodos/fulfilled'   // Fetch succeeded
'todos/fetchTodos/rejected'    // Fetch failed`}
        />
      </section>

      <section>
        <h2>Working with Payloads</h2>
        <CodeBlock
          title="Different payload patterns"
          code={`reducers: {
  // No payload needed
  clearAll: (state) => {
    state.items = [];
  },

  // Simple payload (string, number, etc.)
  addTodo: (state, action) => {
    // dispatch(addTodo("Buy groceries"))
    // action.payload = "Buy groceries"
    state.items.push({ id: Date.now(), title: action.payload, done: false });
  },

  // Object payload (multiple values)
  updateTodo: (state, action) => {
    // dispatch(updateTodo({ id: 1, title: "Updated title" }))
    // action.payload = { id: 1, title: "Updated title" }
    const { id, title } = action.payload;
    const todo = state.items.find(t => t.id === id);
    if (todo) todo.title = title;
  },
}`}
        />
      </section>

      <section>
        <h2>Common Reducer Patterns Cheat Sheet</h2>
        <CodeBlock
          title="Patterns you'll use in every project"
          code={`reducers: {
  // TOGGLE — flip a boolean
  toggleDarkMode: (state) => {
    state.darkMode = !state.darkMode;
  },

  // SET — replace a value
  setUsername: (state, action) => {
    state.username = action.payload;
  },

  // ADD — push to array
  addNotification: (state, action) => {
    state.notifications.push(action.payload);
  },

  // REMOVE — filter from array
  removeNotification: (state, action) => {
    state.notifications = state.notifications.filter(
      n => n.id !== action.payload
    );
  },

  // UPDATE — find and modify in array
  markAsRead: (state, action) => {
    const notification = state.notifications.find(
      n => n.id === action.payload
    );
    if (notification) notification.read = true;
  },

  // RESET — return initial state
  resetState: () => initialState,

  // CONDITIONAL — only change if condition met
  incrementIfOdd: (state) => {
    if (state.value % 2 !== 0) state.value += 1;
  },
}`}
        />

        <InfoBox type="tip" title="Naming Convention">
          <ul>
            <li><code>set___</code> — for replacing a value (<code>setUsername</code>)</li>
            <li><code>toggle___</code> — for boolean flips (<code>toggleTheme</code>)</li>
            <li><code>add___</code> — for adding to collections (<code>addTodo</code>)</li>
            <li><code>remove___</code> — for removing from collections (<code>removeTodo</code>)</li>
            <li><code>update___</code> — for modifying an item (<code>updateTodo</code>)</li>
            <li><code>reset___</code> — for resetting to initial (<code>resetFilters</code>)</li>
          </ul>
        </InfoBox>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
