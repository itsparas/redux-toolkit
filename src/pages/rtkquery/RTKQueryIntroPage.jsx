import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import StepByStep from '../../components/StepByStep';
import Quiz from '../../components/Quiz';

export default function RTKQueryIntroPage() {
  const rtkSteps = [
    {
      title: 'Step 1: Define Your API with createApi',
      content: (
        <div>
          <p>Tell RTK Query about your server and what data you want:</p>
          <CodeBlock code={`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['User'],          // For cache invalidation
  endpoints: (builder) => ({
    getUsers: builder.query({   // GET /users
      query: () => '/users',
      providesTags: ['User'],
    }),
    addUser: builder.mutation({  // POST /users
      query: (newUser) => ({ url: '/users', method: 'POST', body: newUser }),
      invalidatesTags: ['User'], // Refetch users after adding!
    }),
  }),
});

// Auto-generated hooks! 🎉
export const { useGetUsersQuery, useAddUserMutation } = apiSlice;`} />
        </div>
      ),
    },
    {
      title: 'Step 2: Add to Store (one-time setup)',
      content: (
        <div>
          <p>Add the API slice's reducer and middleware to your store:</p>
          <CodeBlock code={`const store = configureStore({
  reducer: {
    // ... other reducers
    [apiSlice.reducerPath]: apiSlice.reducer,     // API cache reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(apiSlice.middleware),      // API middleware
});`} />
          <p>This lets RTK Query manage its internal cache in the Redux store.</p>
        </div>
      ),
    },
    {
      title: 'Step 3: Use the Auto-Generated Hooks!',
      content: (
        <div>
          <p>This is the magic part — your component is done in just 3 lines:</p>
          <CodeBlock code={`function UserList() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return users.map(u => <p key={u.id}>{u.name}</p>);
}
// That's it! No useEffect, no useState, no dispatch! 🎉`} />
          <p>Compare this to the 20+ lines needed with createAsyncThunk!</p>
        </div>
      ),
    },
  ];

  const quizQuestions = [
    {
      question: 'What is the main advantage of RTK Query over createAsyncThunk?',
      options: [
        'It\'s faster',
        'It automatically handles caching, loading states, and refetching',
        'It supports more programming languages',
        'It doesn\'t need Redux',
      ],
      correct: 1,
      explanation: 'RTK Query eliminates the need to write reducers, loading/error states, useEffect hooks, and cache logic. You define endpoints, and it generates React hooks that handle everything!',
    },
    {
      question: 'What does "invalidatesTags" do in a mutation?',
      options: [
        'Deletes the cached data',
        'Triggers a refetch of queries that provide those tags',
        'Removes the tags from HTML',
        'Validates the form data',
      ],
      correct: 1,
      explanation: 'When a mutation invalidates a tag (e.g., "User"), ALL queries that provide that tag will automatically refetch. So after adding a user, the user list refreshes automatically!',
    },
  ];

  return (
    <TopicPage id="/rtk-query-intro" title="RTK Query — Data Fetching Superpower">
      <section>
        <h2>What Problem Does RTK Query Solve?</h2>
        <p>
          We learned <code>createAsyncThunk</code> for API calls — but it still requires writing 
          a lot of code: thunks, reducers, loading states, error handling, useEffect...
        </p>
        <p>
          <strong>RTK Query</strong> does ALL of that for you in just a few lines!
        </p>

        <Analogy
          emoji="🛒"
          realWorld={
            <div>
              <p><strong>Think of Grocery Shopping:</strong></p>
              <ul>
                <li>🏃 <strong>createAsyncThunk</strong> = Shopping yourself. You drive to the store, find items, wait in line, drive back, unload. You handle every step.</li>
                <li>📦 <strong>RTK Query</strong> = Grocery delivery service. You say "I want milk and eggs." They handle shopping, delivery, and even know when to restock!</li>
              </ul>
              <p>Both get groceries. One is WAY less work!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In Code:</strong></p>
              <ul>
                <li><strong>createAsyncThunk</strong>: Write async function + 3 reducer cases (pending/fulfilled/rejected) + useEffect + dispatch + selectors = 30+ lines</li>
                <li><strong>RTK Query</strong>: Define endpoint + use auto-generated hook = 5 lines!</li>
              </ul>
              <p>Plus RTK Query adds caching, deduplication, and auto-refetching for FREE!</p>
            </div>
          }
        />

        <InfoBox type="info" title="When to Use Which?">
          <ul>
            <li><strong>RTK Query</strong> — For data fetching (GET, POST, PUT, DELETE to APIs). Use this 90% of the time!</li>
            <li><strong>createAsyncThunk</strong> — For non-fetching async logic (timers, complex workflows, multi-step processes)</li>
          </ul>
        </InfoBox>
      </section>

      <section>
        <h2>Step-by-Step Setup</h2>
        <StepByStep steps={rtkSteps} />
      </section>

      <section>
        <h2>Queries vs Mutations</h2>
        <CodeBlock
          title="The two types of endpoints"
          code={`// QUERIES — for READING data (auto-fetch when component mounts)
function UserList() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  //       ↑ data       ↑ loading?     ↑ error?
  // All three states handled automatically!

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  return users.map(user => <div key={user.id}>{user.name}</div>);
}

// MUTATIONS — for WRITING data (triggered by user action)
function AddUserButton() {
  const [addUser, { isLoading }] = useAddUserMutation();
  //     ↑ trigger   ↑ mutation state

  const handleClick = async () => {
    try {
      await addUser({ name: 'Charlie' }).unwrap();
      alert('User added!');
      // The user list auto-refetches because of invalidatesTags!
    } catch (err) {
      alert('Failed!');
    }
  };

  return <button onClick={handleClick} disabled={isLoading}>Add User</button>;
}`}
        />
      </section>

      <section>
        <h2>RTK Query Superpowers</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🗄️ Auto Caching</h3>
            <p>Same query returns cached data instantly. No duplicate API calls!</p>
          </div>
          <div className="feature-card">
            <h3>🔄 Auto Refetching</h3>
            <p>Mutations invalidate tags → related queries refetch automatically.</p>
          </div>
          <div className="feature-card">
            <h3>🚫 Deduplication</h3>
            <p>10 components using the same query? Only ONE network request!</p>
          </div>
          <div className="feature-card">
            <h3>⏳ Loading States</h3>
            <p>isLoading, isFetching, isSuccess, isError — all provided free!</p>
          </div>
          <div className="feature-card">
            <h3>⏱️ Polling</h3>
            <p>Auto-refetch every N seconds with one prop: pollingInterval: 5000</p>
          </div>
          <div className="feature-card">
            <h3>🚀 Prefetching</h3>
            <p>Load data before the user navigates for instant page loads.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
