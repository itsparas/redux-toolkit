import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';

export default function MiddlewarePage() {
  return (
    <TopicPage id="/middleware" title="Middleware Concepts">
      <section>
        <h2>What is Middleware?</h2>
        <p>
          Middleware sits between <strong>dispatching an action</strong> and the <strong>reducer 
          receiving it</strong>. It can intercept, modify, delay, or replace actions.
        </p>

        <div className="flow-diagram">
          <div className="flow-step">
            <div className="flow-box flow-box--blue">dispatch(action)</div>
            <div className="flow-arrow">↓</div>
          </div>
          <div className="flow-step">
            <div className="flow-box flow-box--purple">Middleware 1 (Logger)</div>
            <div className="flow-arrow">↓</div>
          </div>
          <div className="flow-step">
            <div className="flow-box flow-box--purple">Middleware 2 (Thunk)</div>
            <div className="flow-arrow">↓</div>
          </div>
          <div className="flow-step">
            <div className="flow-box flow-box--green">Reducer</div>
            <div className="flow-arrow">↓</div>
          </div>
          <div className="flow-step">
            <div className="flow-box flow-box--orange">New State</div>
          </div>
        </div>
      </section>

      <section>
        <h2>Thunk Middleware (Built-in)</h2>
        <p>
          The thunk middleware is included by default. It allows you to dispatch 
          <strong>functions</strong> instead of just action objects.
        </p>

        <CodeBlock
          title="How thunk middleware works"
          code={`// Normal action — an object
dispatch({ type: 'counter/increment' });

// Thunk action — a function!
// The thunk middleware intercepts this and calls it with (dispatch, getState)
dispatch((dispatch, getState) => {
  const currentValue = getState().counter.value;
  if (currentValue < 10) {
    dispatch(increment());
  }
});

// createAsyncThunk uses thunks internally:
dispatch(fetchTodos());
// This dispatches a function that:
// 1. Dispatches 'todos/fetchTodos/pending'
// 2. Runs the async fetch
// 3. Dispatches 'todos/fetchTodos/fulfilled' or 'todos/fetchTodos/rejected'`}
        />
      </section>

      <section>
        <h2>Custom Middleware (Basic Idea)</h2>
        <CodeBlock
          title="Writing a simple logger middleware"
          code={`// Middleware signature: store => next => action
const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('Previous state:', store.getState());
  console.log('Action:', action);
  
  const result = next(action);  // Pass action to next middleware/reducer
  
  console.log('Next state:', store.getState());
  console.groupEnd();
  
  return result;
};

// Add to store:
const store = configureStore({
  reducer: { counter: counterReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});`}
        />

        <CodeBlock
          title="Analytics middleware example"
          code={`const analyticsMiddleware = (store) => (next) => (action) => {
  // Track specific actions
  if (action.type === 'cart/checkout') {
    analytics.track('checkout', {
      itemCount: store.getState().cart.items.length,
      total: store.getState().cart.total,
    });
  }

  // Track all async errors
  if (action.type.endsWith('/rejected')) {
    analytics.track('api_error', {
      action: action.type,
      error: action.payload,
    });
  }

  return next(action);
};`}
        />

        <InfoBox type="warning" title="When to Write Custom Middleware">
          Custom middleware is rarely needed in most apps. Common use cases:
          <ul>
            <li>Logging / analytics tracking</li>
            <li>Error reporting to services like Sentry</li>
            <li>Syncing state to localStorage</li>
            <li>WebSocket connection management</li>
          </ul>
          For most other cases, createAsyncThunk or RTK Query is the better choice.
        </InfoBox>
      </section>
    </TopicPage>
  );
}
