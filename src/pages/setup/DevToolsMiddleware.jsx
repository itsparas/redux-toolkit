import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';

export default function DevToolsMiddleware() {
  return (
    <TopicPage id="/devtools-middleware" title="Redux DevTools & Default Middleware">
      <section>
        <h2>Redux DevTools</h2>
        <p>
          Redux DevTools is a browser extension that lets you inspect every action dispatched, 
          view the state tree, and even "time travel" through state changes.
        </p>

        <InfoBox type="tip" title="How to Install Redux DevTools">
          <ol>
            <li>Install the browser extension:
              <a href="https://chrome.google.com/webstore/detail/redux-devtools" target="_blank" rel="noopener"> Chrome</a> |
              <a href="https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/" target="_blank" rel="noopener"> Firefox</a>
            </li>
            <li>Open your app in the browser</li>
            <li>Press F12 → Go to the "Redux" tab</li>
            <li>See all actions and state changes in real-time!</li>
          </ol>
        </InfoBox>

        <p>With <code>configureStore</code>, DevTools are enabled automatically in development. No extra code needed!</p>

        <CodeBlock
          title="DevTools features you get automatically"
          code={`// In the Redux DevTools tab, you can:

// 1. ACTION LOG — see every action dispatched
// counter/increment   { type: 'counter/increment' }
// counter/incrementByAmount  { type: 'counter/incrementByAmount', payload: 5 }

// 2. STATE TREE — inspect entire store
// { counter: { value: 5 }, todos: { items: [...] } }

// 3. STATE DIFF — see exactly what changed
// counter.value: 0 → 5

// 4. TIME TRAVEL — replay actions step by step
// Click any past action to see state at that point

// 5. EXPORT/IMPORT — save and restore state`}
        />
      </section>

      <section>
        <h2>Default Middleware</h2>
        <p>Redux Toolkit adds these middleware by default:</p>

        <h3>1. Thunk Middleware</h3>
        <p>Allows you to dispatch functions (thunks) instead of just objects. Essential for async logic.</p>
        <CodeBlock
          title="Thunk middleware enables async dispatching"
          code={`// Without thunk: can only dispatch objects
dispatch({ type: 'counter/increment' });

// With thunk: can dispatch functions!
dispatch(async (dispatch, getState) => {
  const response = await fetch('/api/data');
  const data = await response.json();
  dispatch(setData(data));
});

// createAsyncThunk uses this under the hood
const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();  // This becomes action.payload
  }
);`}
        />

        <h3>2. Serializable Check Middleware (Dev Only)</h3>
        <CodeBlock
          title="Catches non-serializable values"
          code={`// ❌ This will show a warning in development:
dispatch(setUser({
  name: 'Alice',
  createdAt: new Date(),      // Not serializable!
  callback: () => {},         // Not serializable!
}));

// ✅ Use serializable alternatives:
dispatch(setUser({
  name: 'Alice',
  createdAt: new Date().toISOString(),  // String is serializable
  // Don't store callbacks in Redux
}));

// Redux state should only contain:
// - strings, numbers, booleans
// - arrays, plain objects
// - null, undefined`}
        />

        <h3>3. Immutability Check Middleware (Dev Only)</h3>
        <CodeBlock
          title="Catches accidental state mutations"
          code={`// ❌ This will show a warning — mutating state outside a reducer!
const state = store.getState();
state.counter.value = 10;  // WRONG! Direct mutation detected!

// ✅ Always use dispatch to change state:
dispatch(increment());
dispatch(incrementByAmount(10));

// Inside createSlice reducers, "mutations" are safe because Immer handles them`}
        />

        <InfoBox type="warning" title="Development Only">
          Serializable and immutability checks only run in development mode. They are 
          automatically removed in production builds for performance.
        </InfoBox>
      </section>
    </TopicPage>
  );
}
