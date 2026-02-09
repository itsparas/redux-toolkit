import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import StepByStep from '../../components/StepByStep';
import Quiz from '../../components/Quiz';

export default function AsyncThunkPage() {
  const asyncSteps = [
    {
      title: 'Step 1: The Problem — Reducers Can\'t Do Async!',
      content: (
        <div>
          <p>
            Reducers must be <strong>synchronous</strong> — they get data in and return data out, instantly.
            But what about loading data from an API? That takes time (async).
          </p>
          <p><code>createAsyncThunk</code> bridges the gap between async operations and synchronous reducers.</p>
        </div>
      ),
    },
    {
      title: 'Step 2: Create the Thunk',
      content: (
        <div>
          <p>Define what to fetch and give it a name:</p>
          <CodeBlock code={`const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',           // Name (action type prefix)
  async () => {                  // Async function that fetches
    const response = await fetch('http://localhost:3001/todos');
    return await response.json();  // This becomes action.payload
  }
);`} />
        </div>
      ),
    },
    {
      title: 'Step 3: Three Actions Are Auto-Created!',
      content: (
        <div>
          <p>When you dispatch <code>fetchTodos()</code>, Redux automatically dispatches three actions:</p>
          <ul>
            <li>⏳ <code>todos/fetchTodos/pending</code> — fetch started (show loading spinner)</li>
            <li>✅ <code>todos/fetchTodos/fulfilled</code> — fetch succeeded (show data)</li>
            <li>❌ <code>todos/fetchTodos/rejected</code> — fetch failed (show error)</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Step 4: Handle Each State in extraReducers',
      content: (
        <div>
          <p>In your slice, handle all three states using <code>extraReducers</code>:</p>
          <CodeBlock code={`extraReducers: (builder) => {
  builder
    .addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';     // ⏳ Show spinner
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded';   // ✅ Hide spinner
      state.items = action.payload; // 📦 Save the data!
    })
    .addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';      // ❌ Show error
      state.error = action.payload;
    });
},`} />
        </div>
      ),
    },
    {
      title: 'Step 5: Dispatch It from a Component!',
      content: (
        <div>
          <p>Dispatch the thunk like any other action. The three states update automatically!</p>
          <CodeBlock code={`function TodoList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.todos);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTodos());  // Fetch on mount
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  return items.map(t => <div key={t.id}>{t.title}</div>);
}`} />
        </div>
      ),
    },
  ];

  const quizQuestions = [
    {
      question: 'Why can\'t we put async logic (API calls) directly in a reducer?',
      options: [
        'JavaScript doesn\'t support async functions',
        'Reducers must be pure, synchronous functions',
        'Redux doesn\'t allow fetch() calls',
        'The browser blocks API calls in reducers',
      ],
      correct: 1,
      explanation: 'Reducers must be pure functions: given the same input, they always return the same output, with no side effects. API calls are side effects (they depend on network, time, etc.), so they can\'t go in reducers.',
    },
    {
      question: 'How many action types does createAsyncThunk auto-generate?',
      options: ['1 (fulfilled only)', '2 (pending and fulfilled)', '3 (pending, fulfilled, rejected)', '4'],
      correct: 2,
      explanation: 'createAsyncThunk generates 3 action types: pending (started), fulfilled (success), and rejected (error). This covers the complete lifecycle of an async operation!',
    },
    {
      question: 'Where do you handle the auto-generated async actions in your slice?',
      options: ['In the reducers object', 'In the extraReducers builder', 'In the component', 'In the store configuration'],
      correct: 1,
      explanation: 'extraReducers is for handling actions defined OUTSIDE the slice (like createAsyncThunk actions). Regular reducers are for actions defined INSIDE the slice.',
    },
  ];

  return (
    <TopicPage id="/async-thunk" title="createAsyncThunk — Async Made Easy">
      <section>
        <h2>The Problem: Apps Need Data from Servers!</h2>
        <p>
          Most real apps need to <strong>fetch data from APIs</strong> — load users, save todos, 
          get posts, etc. But there's a problem: Redux reducers can only do synchronous work. 
          They can't wait for an API response!
        </p>

        <Analogy
          emoji="🍔"
          realWorld={
            <div>
              <p><strong>Think of Ordering at a Restaurant:</strong></p>
              <ol>
                <li>📝 <strong>Place Order (dispatch)</strong> — "I'd like a burger please!"</li>
                <li>⏳ <strong>Waiting (pending)</strong> — The kitchen is cooking. Show "preparing..." status</li>
                <li>✅ <strong>Food Arrives (fulfilled)</strong> — Here's your burger! Update the table.</li>
                <li>❌ <strong>Out of Stock (rejected)</strong> — Sorry, no burgers today. Show error.</li>
              </ol>
              <p>createAsyncThunk handles all three states automatically!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In Redux:</strong></p>
              <ol>
                <li><code>dispatch(fetchTodos())</code> — Start the API call</li>
                <li><code>pending</code> action → <code>state.status = 'loading'</code> → Show spinner</li>
                <li><code>fulfilled</code> action → <code>state.items = data</code> → Show data</li>
                <li><code>rejected</code> action → <code>state.error = message</code> → Show error</li>
              </ol>
            </div>
          }
        />
      </section>

      <section>
        <h2>Step-by-Step: How It Works</h2>
        <StepByStep steps={asyncSteps} />
      </section>

      <section>
        <h2>Error Handling with rejectWithValue</h2>
        <p>For better error messages, use <code>rejectWithValue</code>:</p>
        <CodeBlock
          title="Proper error handling"
          code={`export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      
      if (!response.ok) throw new Error('Server error: ' + response.status);
      return await response.json();   // → fulfilled, action.payload = new todo
    } catch (error) {
      return rejectWithValue(error.message);  // → rejected, action.payload = error msg
    }
  }
);`}
        />

        <InfoBox type="tip" title="Key Concept: extraReducers vs reducers">
          <ul>
            <li><code>reducers</code> — for actions <strong>defined inside</strong> this slice (sync)</li>
            <li><code>extraReducers</code> — for actions <strong>from outside</strong> (async thunks, other slices)</li>
          </ul>
          Think of it like: reducers = "my own actions", extraReducers = "actions from elsewhere".
        </InfoBox>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
