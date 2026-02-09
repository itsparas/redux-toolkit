import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';

export default function BestPracticesPage() {
  return (
    <TopicPage id="/best-practices" title="Performance & Best Practices">
      <section>
        <h2>Selector Optimization</h2>
        <p>
          Selectors that create new references (arrays/objects) on every call cause 
          unnecessary re-renders. Use memoized selectors to fix this.
        </p>

        <CodeBlock
          title="Selector optimization patterns"
          code={`import { createSelector } from '@reduxjs/toolkit';

// ❌ BAD: Creates new array on every call → re-renders every time
const selectCompletedTodos = (state) =>
  state.todos.items.filter(t => t.completed);  // New array every call!

// ✅ GOOD: Memoized selector — only recalculates when input changes
const selectCompletedTodos = createSelector(
  [(state) => state.todos.items],   // Input selector
  (items) => items.filter(t => t.completed)  // Output selector (memoized)
);

// ✅ GOOD: Simple value selectors don't need memoization
const selectCount = (state) => state.counter.value;  // Primitive, no issue

// ✅ GOOD: Composing selectors
const selectTodoStats = createSelector(
  [selectAllTodos, selectCompletedTodos],
  (all, completed) => ({
    total: all.length,
    completed: completed.length,
    remaining: all.length - completed.length,
    percentDone: all.length ? Math.round((completed.length / all.length) * 100) : 0,
  })
);`}
        />
      </section>

      <section>
        <h2>Avoid Overusing Redux</h2>
        <InfoBox type="warning" title="Not Everything Belongs in Redux">
          <p>A common mistake is putting ALL state in Redux. Follow these guidelines:</p>
        </InfoBox>

        <CodeBlock
          title="When to use Redux vs local state"
          code={`// ✅ USE REDUX for:
// - Server data shared across multiple components
// - User authentication state
// - Shopping cart
// - App-wide notifications/alerts
// - Theme/language preferences
// - Any state that needs to survive component unmounting

// ✅ USE useState for:
// - Form inputs (controlled components)
// - UI toggles (accordion open/close)
// - Hover/focus states
// - Temporary filter/sort selections
// - Modal open/close (if only one component controls it)
// - Animation state

// ✅ USE useRef for:
// - DOM element references
// - Timers and intervals
// - Previous value tracking
// - Values that don't trigger re-renders

// ✅ USE URL/Router state for:
// - Current page
// - Search query
// - Filters that should be bookmarkable
// - Pagination`}
        />
      </section>

      <section>
        <h2>When NOT to Use Redux Toolkit</h2>
        <CodeBlock
          title="Consider alternatives when..."
          code={`// 1. SMALL APP with minimal shared state
// → Just use useState + useContext + props
// → Redux adds complexity for simple apps

// 2. MOSTLY SERVER STATE (fetching data from APIs)
// → Consider TanStack Query (React Query) or SWR
// → These are purpose-built for server state
// → RTK Query is good too, but lighter alternatives exist

// 3. FORM-HEAVY APPS
// → Use React Hook Form or Formik
// → Form state is almost always local

// 4. REAL-TIME APPS
// → Consider Zustand or Jotai for simpler state
// → Or use RTK Query with websocket support

// 5. SIMPLE GLOBAL STATE (theme, user, language)
// → React Context + useReducer might be enough
// → Redux is overkill if you just need to pass data down`}
        />

        <InfoBox type="tip" title="Decision Framework">
          <ol>
            <li>Start with <code>useState</code> and props</li>
            <li>If prop drilling becomes painful → try Context</li>
            <li>If state logic becomes complex → try <code>useReducer</code></li>
            <li>If you need time-travel debugging, middleware, or complex state shared across many components → use Redux Toolkit</li>
          </ol>
        </InfoBox>
      </section>
    </TopicPage>
  );
}
