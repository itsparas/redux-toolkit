import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';

export default function FeatureOrganizationPage() {
  return (
    <TopicPage id="/feature-organization" title="Feature-Based State Organization">
      <section>
        <h2>Organize by Feature, Not by Type</h2>
        <p>
          Redux Toolkit encourages organizing your code by <strong>feature</strong> rather than 
          by file type. Each feature gets its own folder with its slice, components, and related files.
        </p>

        <CodeBlock
          title="❌ Bad: Organized by type"
          code={`src/
├── actions/
│   ├── counterActions.js
│   ├── todoActions.js
│   └── userActions.js
├── reducers/
│   ├── counterReducer.js
│   ├── todoReducer.js
│   └── userReducer.js
├── constants/
│   ├── counterConstants.js
│   └── todoConstants.js
└── components/
    ├── Counter.jsx
    ├── TodoList.jsx
    └── UserProfile.jsx

// Problem: Related code is scattered across many folders
// Changing one feature requires editing files in 3-4 directories`}
        />

        <CodeBlock
          title="✅ Good: Organized by feature (Redux Toolkit way)"
          code={`src/
├── app/
│   └── store.js                 # Configure store (import all slices)
├── features/
│   ├── counter/
│   │   ├── counterSlice.js      # Slice: state + reducers + actions
│   │   └── Counter.jsx          # Component using this slice
│   ├── todos/
│   │   ├── todosSlice.js
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   ├── posts/
│   │   ├── postsSlice.js
│   │   └── PostsList.jsx
│   └── api/
│       └── apiSlice.js          # RTK Query API definition
├── components/
│   ├── Sidebar.jsx              # Shared components
│   └── CodeBlock.jsx
└── pages/
    └── ...                      # Page-level components

// Benefits:
// - All related code in one folder
// - Easy to find and modify features
// - Features can be moved/deleted easily
// - Clear ownership of each piece of state`}
        />

        <InfoBox type="success" title="This App's Structure">
          This guide app follows the feature-based pattern! Check out the <code>src/features/</code> folder 
          to see how counter, todos, posts, ui, and api slices are organized.
        </InfoBox>
      </section>

      <section>
        <h2>Slice File Pattern</h2>
        <CodeBlock
          title="Standard slice file template"
          code={`// features/todos/todosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Async thunks (if needed)
export const fetchTodos = createAsyncThunk(...);

// 2. Slice definition
const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [], status: 'idle', error: null },
  reducers: { /* sync reducers */ },
  extraReducers: (builder) => { /* async action handlers */ },
});

// 3. Export actions
export const { addTodo, removeTodo } = todosSlice.actions;

// 4. Export selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectTodosStatus = (state) => state.todos.status;

// 5. Export reducer (default export)
export default todosSlice.reducer;`}
        />
      </section>

      <section>
        <h2>When to Create a New Slice</h2>
        <InfoBox type="tip" title="Rule of Thumb">
          <ul>
            <li>Each <strong>major feature</strong> gets its own slice (user, auth, cart, etc.)</li>
            <li>Group <strong>related state</strong> together (all cart items + cart total in one slice)</li>
            <li>Keep a <strong>UI slice</strong> for global UI state (sidebar, modals, theme)</li>
            <li>Don't create a slice for <strong>local component state</strong> — use <code>useState</code> instead</li>
            <li>Don't create a slice if only <strong>one component</strong> needs the data</li>
          </ul>
        </InfoBox>
      </section>
    </TopicPage>
  );
}
