import { useSelector, useDispatch } from 'react-redux';
import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import InteractiveExample from '../../components/InteractiveExample';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';
import { increment, decrement, selectCount } from '../../features/counter/counterSlice';
import { toggleTheme, selectTheme, selectCompletedTopics } from '../../features/ui/uiSlice';

export default function UseSelectorDispatchPage() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const theme = useSelector(selectTheme);
  const completedTopics = useSelector(selectCompletedTopics);

  const quizQuestions = [
    {
      question: 'What does useSelector do?',
      options: [
        'Dispatches actions to the store',
        'Reads (selects) data FROM the Redux store',
        'Creates a new slice',
        'Selects which component to render',
      ],
      correct: 1,
      explanation: 'useSelector is the "reader" hook — it extracts data from the Redux store. The component re-renders whenever the selected value changes.',
    },
    {
      question: 'What does useDispatch return?',
      options: [
        'The current state',
        'A function to send actions to the store',
        'A list of all actions',
        'The store configuration',
      ],
      correct: 1,
      explanation: 'useDispatch returns the dispatch function. You use it to send (dispatch) actions to the store: dispatch(increment()). The action goes to the reducer, which updates the state.',
    },
    {
      question: 'How do you tell React-Redux which data you want from the store?',
      options: [
        'Pass props from the parent component',
        'Call store.getState() directly',
        'Pass a selector function to useSelector',
        'Write a SQL query',
      ],
      correct: 2,
      explanation: 'You pass a selector function that picks the specific piece of state you need: useSelector(state => state.counter.value). This is like asking "give me just the counter value from the whole store."',
    },
  ];

  return (
    <TopicPage id="/use-selector-dispatch" title="useSelector & useDispatch — Your Two Best Friends">
      <section>
        <h2>The Two Essential Hooks</h2>
        <p>
          Once Provider is set up, you interact with Redux using just <strong>two hooks</strong>. 
          That's it — two hooks for everything!
        </p>

        <Analogy
          emoji="🏧"
          realWorld={
            <div>
              <p><strong>Think of an ATM:</strong></p>
              <ul>
                <li>👀 <strong>Check Balance (useSelector)</strong> — Read data from the store. "How much money do I have?"</li>
                <li>💳 <strong>Make Transaction (useDispatch)</strong> — Tell the store to change. "Deposit $100" or "Withdraw $50"</li>
              </ul>
              <p>That's all you can do at an ATM: check your balance (read) or make a transaction (write). Same with Redux!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In Code:</strong></p>
              <ul>
                <li><code>useSelector(state =&gt; state.counter.value)</code> — "Give me the counter value" (reading)</li>
                <li><code>dispatch(increment())</code> — "Add 1 to the counter" (writing)</li>
              </ul>
              <p>useSelector = read from store. useDispatch = write to store. That's the entire API!</p>
            </div>
          }
        />
      </section>

      <section>
        <h2>useSelector — Reading State</h2>
        <p>
          <code>useSelector</code> takes a function that <strong>picks</strong> what data you want from the store.
          Your component auto-updates whenever that data changes!
        </p>

        <CodeBlock
          title="useSelector patterns — from simple to advanced"
          code={`import { useSelector } from 'react-redux';

function MyComponent() {
  // Pattern 1: Inline selector (quick & simple)
  const count = useSelector(state => state.counter.value);

  // Pattern 2: Named selector (recommended for reuse!)
  const count = useSelector(selectCount);  // Defined in the slice file

  // Pattern 3: Multiple selectors (one per piece of data)
  const name = useSelector(state => state.user.name);
  const theme = useSelector(state => state.ui.theme);
  // ✅ This is BETTER than one selector returning an object

  return <div>Count: {count}</div>;
}`}
        />

        <InfoBox type="warning" title="Beginner Tip">
          Your component <strong>re-renders</strong> whenever the selected value changes. 
          Only select the data you actually need — don't do <code>useSelector(state =&gt; state)</code> 
          or your component will re-render on <em>every</em> state change!
        </InfoBox>
      </section>

      <section>
        <h2>useDispatch — Sending Actions</h2>
        <p>
          <code>useDispatch</code> gives you the <code>dispatch</code> function — your way of 
          telling Redux to change something.
        </p>
        <CodeBlock
          title="useDispatch patterns"
          code={`import { useDispatch } from 'react-redux';
import { increment, incrementByAmount } from '../features/counter/counterSlice';
import { fetchTodos } from '../features/todos/todosSlice';

function MyComponent() {
  const dispatch = useDispatch();   // Get the dispatch function

  return (
    <div>
      {/* Action with no payload */}
      <button onClick={() => dispatch(increment())}>
        +1
      </button>

      {/* Action with payload (data) */}
      <button onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>

      {/* Async action (fetches from API) */}
      <button onClick={() => dispatch(fetchTodos())}>
        Load Todos
      </button>
    </div>
  );
}`}
        />
      </section>

      <section>
        <h2>🧪 Live Demo: useSelector & useDispatch in Action</h2>
        <InteractiveExample
          title="Read & Write Redux State"
          description="All values below are LIVE from the Redux store. Buttons dispatch real actions!"
        >
          <div className="selector-demo">
            <div className="selector-demo__item">
              <h4>🔢 Counter Value <small>(useSelector)</small>:</h4>
              <span className="selector-demo__value">{count}</span>
              <div>
                <button className="btn btn--sm btn--success" onClick={() => dispatch(increment())}>
                  + dispatch(increment())
                </button>
                <button className="btn btn--sm btn--danger" onClick={() => dispatch(decrement())}>
                  − dispatch(decrement())
                </button>
              </div>
            </div>

            <div className="selector-demo__item">
              <h4>🎨 Current Theme <small>(useSelector)</small>:</h4>
              <span className="selector-demo__value">{theme}</span>
              <button className="btn btn--sm btn--primary" onClick={() => dispatch(toggleTheme())}>
                dispatch(toggleTheme())
              </button>
            </div>

            <div className="selector-demo__item">
              <h4>✅ Completed Topics <small>(useSelector)</small>:</h4>
              <span className="selector-demo__value">{completedTopics.length} topic(s)</span>
              <small style={{ color: '#888' }}>Check "Mark as Complete" at the bottom of any page to see this update!</small>
            </div>
          </div>
        </InteractiveExample>

        <InfoBox type="tip" title="Notice the Pattern">
          <strong>Every interaction follows the same pattern:</strong><br/>
          1. <code>useSelector</code> to read the current value<br/>
          2. <code>dispatch(actionCreator())</code> when user clicks<br/>
          3. The reducer updates state → component automatically re-renders with new value!
        </InfoBox>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
