import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Quiz from '../../components/Quiz';

export default function CommonMistakesPage() {
  const quizQuestions = [
    {
      question: 'You call todos.sort() in your component on data from useSelector. What happens?',
      options: [
        'It sorts correctly and re-renders',
        'You accidentally mutate Redux state! React won\'t re-render, and state becomes corrupted',
        'Redux throws an error',
        'The sort is applied in the reducer',
      ],
      correct: 1,
      explanation: '.sort() mutates arrays in place. When you sort data from useSelector, you\'re mutating the Redux state directly. Instead, sort a copy: [...todos].sort() or use a selector.',
    },
    {
      question: 'Should you store "completedCount" in Redux if you already have a todos array?',
      options: [
        'Yes, for faster access',
        'No — calculate it from the todos array using a selector',
        'Yes, but only if there are more than 100 todos',
        'It depends on the framework',
      ],
      correct: 1,
      explanation: 'Never store derived/computed data in state. If you can calculate it from existing state (completedCount = todos.filter(t => t.completed).length), use a selector instead. Storing it creates sync problems.',
    },
    {
      question: 'You want to store a user form\'s input values. Where should they go?',
      options: [
        'Always in Redux',
        'Always in a database',
        'In local component state (useState) — Redux is overkill for single-component form data',
        'In a global CSS variable',
      ],
      correct: 2,
      explanation: 'Form input values that only one component uses should be in local state (useState). Put data in Redux only when multiple components need it or it should persist after unmount.',
    },
  ];

  return (
    <TopicPage id="/common-mistakes" title="Common Mistakes (& How to Avoid Them!)">
      <section>
        <h2>😱 Mistake #1: Mutating State Outside Reducers</h2>
        <p>This is the <strong>#1 most common bug</strong> with Redux. Remember: state from useSelector is <strong>read-only</strong>!</p>
        <CodeBlock
          title="❌ WRONG — Mutating state directly"
          code={`function MyComponent() {
  const todos = useSelector(state => state.todos.items);
  
  const handleSort = () => {
    todos.sort((a, b) => a.title.localeCompare(b.title));  // 💥 MUTATING!
    // This modifies the Redux state directly without dispatching!
    // React won't re-render, and state becomes unpredictable.
  };
}

// ✅ CORRECT — Sort a copy, or use a selector
function MyComponent() {
  const todos = useSelector(state => state.todos.items);
  
  // Option 1: Sort a copy (create new array first)
  const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
  
  // Option 2: Create a memoized selector with createSelector
  const sortedTodos = useSelector(selectSortedTodos);
  
  // Option 3: Dispatch a sort action to let the reducer handle it
  const handleSort = () => dispatch(sortTodos());
}`}
        />
        <InfoBox type="warning" title="Remember!">
          Inside createSlice reducers → "mutations" are safe (Immer handles it).<br/>
          Outside reducers (in components) → <strong>NEVER mutate</strong>. Always create copies!
        </InfoBox>
      </section>

      <section>
        <h2>😱 Mistake #2: Fetching Data Without Redux</h2>
        <CodeBlock
          title="❌ WRONG — Fetching directly in components"
          code={`function UserList() {
  const [users, setUsers] = useState([]);    // Local state only!
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);        // Only THIS component has the data!
        setLoading(false);
      });
  }, []);
  
  // Problems:
  // ❌ Data isn't shared with other components
  // ❌ No caching — re-fetches every mount
  // ❌ Manual loading/error state
}

// ✅ CORRECT — Use RTK Query (best) or createAsyncThunk
function UserList() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  // ✅ Data is cached and shared across all components!
}`}
        />
      </section>

      <section>
        <h2>😱 Mistake #3: Storing Computed/Derived Data</h2>
        <CodeBlock
          title="❌ WRONG — Storing values you can calculate"
          code={`// ❌ Don't store data that can be calculated!
initialState: {
  items: [],
  completedCount: 0,    // ❌ Calculable from items!
  totalCount: 0,        // ❌ Calculable from items!
  percentDone: 0,       // ❌ Calculable from items!
}
// Now you have to manually keep these in sync with items — bug city!

// ✅ CORRECT — Calculate with a selector
import { createSelector } from '@reduxjs/toolkit';

const selectTodoStats = createSelector(
  [(state) => state.todos.items],
  (items) => ({
    total: items.length,
    completed: items.filter(t => t.completed).length,
    percentDone: items.length 
      ? Math.round((items.filter(t => t.completed).length / items.length) * 100) 
      : 0,
  })
);
// Always accurate, always in sync, memoized for performance!`}
        />
      </section>

      <section>
        <h2>😱 Mistake #4: Deeply Nested State</h2>
        <CodeBlock
          title="❌ WRONG — Deeply nested structures"
          code={`// ❌ Even with Immer, this is hard to navigate and maintain
{
  company: {
    departments: {
      engineering: {
        teams: {
          frontend: {
            lead: { name: 'Alice', tasks: [{ id: 1, status: 'done' }] }
          }
        }
      }
    }
  }
}

// ✅ CORRECT — Flatten and normalize
{
  employees: { 1: { id: 1, name: 'Alice', teamId: 'frontend' } },
  tasks:     { 1: { id: 1, status: 'done', assigneeId: 1 } },
  teams:     { frontend: { id: 'frontend', dept: 'engineering' } },
}
// Easy update: state.tasks[1].status = 'in-progress'  ✅`}
        />
      </section>

      <section>
        <h2>Quick Mistakes Cheat Sheet</h2>
        <InfoBox type="error" title="Avoid These!">
          <ul>
            <li>❌ <strong>Non-serializable values in state</strong> — No Date objects, functions, class instances. Use strings instead: <code>new Date().toISOString()</code></li>
            <li>❌ <strong>Selecting entire state</strong> — <code>useSelector(state =&gt; state)</code> re-renders on ANY change. Select only what you need!</li>
            <li>❌ <strong>Forgetting to export actions</strong> — <code>export const {'{ ... }'} = slice.actions</code></li>
            <li>❌ <strong>Putting everything in Redux</strong> — Form inputs, hover states, dropdown toggles → use local useState!</li>
            <li>❌ <strong>Not using .unwrap() with thunks</strong> — Makes error handling in components impossible</li>
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
