import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';

export default function ConfigureStorePage() {
  const quizQuestions = [
    {
      question: 'What does configureStore replace from vanilla Redux?',
      options: ['createSlice', 'createStore + combineReducers + applyMiddleware', 'useSelector', 'React.createContext'],
      correct: 1,
      explanation: 'configureStore replaces the old createStore and automatically sets up combineReducers, adds thunk middleware, and enables DevTools — all in one call!',
    },
    {
      question: 'What middleware does configureStore add by default?',
      options: ['Logger middleware', 'Thunk middleware (for async logic)', 'Router middleware', 'No middleware'],
      correct: 1,
      explanation: 'configureStore adds thunk middleware by default, plus serializable check and immutability check in development mode. You don\'t need to install or configure these!',
    },
  ];

  return (
    <TopicPage id="/configure-store" title="configureStore — Setting Up Your Store">
      <section>
        <h2>What is configureStore?</h2>
        <p>
          <code>configureStore</code> is a one-function setup for your entire Redux store. 
          It replaces the old multi-step process and comes with great defaults built in.
        </p>

        <Analogy
          emoji="🏭"
          realWorld={
            <div>
              <p><strong>Think of Building a Car:</strong></p>
              <ul>
                <li>🔧 <strong>Old Redux (createStore)</strong> = Building from parts. Buy engine, transmission, wheels separately. Install each one. Wire them together. Test each connection.</li>
                <li>🚗 <strong>RTK (configureStore)</strong> = Buying a ready-to-drive car. Engine, transmission, GPS, safety features — all pre-installed and tested!</li>
              </ul>
            </div>
          }
          redux={
            <div>
              <p><strong>configureStore gives you FREE:</strong></p>
              <ul>
                <li>✅ Automatically combines all your slice reducers</li>
                <li>✅ Thunk middleware (for async actions)</li>
                <li>✅ Redux DevTools connection</li>
                <li>✅ Development warnings (immutability & serializability checks)</li>
              </ul>
              <p>Zero configuration needed for all of this!</p>
            </div>
          }
        />
      </section>

      <section>
        <h2>Basic Setup (Most Apps)</h2>
        <CodeBlock
          title="src/app/store.js — just list your reducers!"
          code={`import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,  // → state.counter
    todos: todosReducer,      // → state.todos
  },
  // That's it! DevTools, thunk, and checks are all automatic!
});

export default store;`}
        />

        <InfoBox type="success" title="What This Does Automatically">
          <ol>
            <li><strong>Combines reducers</strong> — counter + todos merged into one root reducer</li>
            <li><strong>Adds thunk middleware</strong> — for createAsyncThunk to work</li>
            <li><strong>Enables DevTools</strong> — Redux DevTools browser extension works automatically</li>
            <li><strong>Adds dev checks</strong> — warns you about common mistakes during development</li>
          </ol>
        </InfoBox>
      </section>

      <section>
        <h2>This App's Actual Store</h2>
        <CodeBlock
          title="src/app/store.js — The store powering this guide"
          code={`import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
import postsReducer from '../features/posts/postsSlice';
import uiReducer from '../features/ui/uiSlice';
import { apiSlice } from '../features/api/apiSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,                    // counter slice
    todos: todosReducer,                        // todos slice  
    posts: postsReducer,                        // posts slice
    ui: uiReducer,                              // UI slice
    [apiSlice.reducerPath]: apiSlice.reducer,    // RTK Query slice
  },
  // Add RTK Query middleware for caching/invalidation
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;`}
        />
      </section>

      <section>
        <h2>All configureStore Options</h2>
        <CodeBlock
          title="Every option explained (most are optional!)"
          code={`const store = configureStore({
  // REQUIRED: Your combined reducers
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },

  // OPTIONAL: Customize middleware (rarely needed)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,   // Warns about non-serializable state values
      immutableCheck: true,      // Warns about state mutations outside reducers
      thunk: true,               // Enables async thunk middleware
    }),

  // OPTIONAL: Disable DevTools in production
  devTools: process.env.NODE_ENV !== 'production',

  // OPTIONAL: Pre-loaded state (for SSR or hydration)
  preloadedState: undefined,
});`}
        />

        <InfoBox type="tip" title="For Beginners">
          Just use the basic setup with <code>reducer</code> — that's all you need! 
          The other options are for advanced use cases. You can always add them later.
        </InfoBox>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
