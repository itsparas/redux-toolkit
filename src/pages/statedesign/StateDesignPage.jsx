import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';

export default function StateDesignPage() {
  const quizQuestions = [
    {
      question: 'Why should Redux state be flat rather than deeply nested?',
      options: [
        'Flat state uses less memory',
        'Redux doesn\'t support nested objects',
        'Flat state is easier to update and less prone to bugs',
        'Deeply nested state is slower to render',
      ],
      correct: 2,
      explanation: 'Flat state is easy to update (one-level access), easy to find items (by ID), and less error-prone. Even with Immer, deeply nested paths are hard to navigate and maintain.',
    },
    {
      question: 'Should you put a form\'s input values in Redux?',
      options: [
        'Always — everything should be in Redux',
        'Only if other components need the form data; otherwise use local state',
        'Never — forms can\'t use Redux',
        'Only for login forms',
      ],
      correct: 1,
      explanation: 'If only one component uses the form data, use local state (useState). Put data in Redux only when multiple components need access or when the data should persist after unmount.',
    },
  ];

  return (
    <TopicPage id="/state-design" title="State Design Patterns">
      <section>
        <h2>Designing Your State Shape</h2>
        <p>
          How you organize your Redux state matters! Good state design makes your app easy to build 
          and debug. Bad state design leads to confusing bugs.
        </p>

        <Analogy
          emoji="🗃️"
          realWorld={
            <div>
              <p><strong>Think of Organizing Files:</strong></p>
              <ul>
                <li>❌ <strong>Bad</strong> = One giant folder with everything thrown in. Files inside files inside files.</li>
                <li>✅ <strong>Good</strong> = Separate folders for each category. Each file has a clear name and ID. Easy to find anything!</li>
              </ul>
            </div>
          }
          redux={
            <div>
              <p><strong>In Redux:</strong></p>
              <ul>
                <li>❌ Deeply nested state = hard to update, hard to find data, easy to introduce bugs</li>
                <li>✅ Flat, normalized state = easy to update, easy to look up by ID, simple reducer logic</li>
              </ul>
            </div>
          }
        />
      </section>

      <section>
        <h2>Flat vs Nested State</h2>
        <CodeBlock
          title="❌ Deeply nested — Hard to update"
          code={`// BAD: Deeply nested state
{
  departments: {
    engineering: {
      teams: {
        frontend: {
          members: [
            { id: 1, name: 'Alice', tasks: [{ id: 1, title: '...' }] }
          ]
        }
      }
    }
  }
}
// To update Alice's task title, navigate 6 levels deep! 😰`}
        />

        <CodeBlock
          title="✅ Flat & normalized — Easy to update"
          code={`// GOOD: Flat, normalized state — each entity has its own "table"
{
  users: {
    byId: {
      1: { id: 1, name: 'Alice', teamId: 'frontend' },
      2: { id: 2, name: 'Bob', teamId: 'backend' },
    },
    allIds: [1, 2],
  },
  tasks: {
    byId: {
      1: { id: 1, title: 'Build UI', userId: 1, completed: false },
    },
    allIds: [1],
  },
}

// Update a task: state.tasks.byId[1].title = 'New title'
// Simple, one level deep! ✅`}
        />
      </section>

      <section>
        <h2>What Goes Where?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🏪 Redux (Global State)</h3>
            <ul>
              <li>User auth data</li>
              <li>Server data (users, posts)</li>
              <li>App-wide UI (theme, sidebar)</li>
              <li>Data shared by many components</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>📦 useState (Local State)</h3>
            <ul>
              <li>Form input values</li>
              <li>Toggle/expand for one component</li>
              <li>Hover/focus states</li>
              <li>Dropdown open/close</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>🔗 URL State (Router)</h3>
            <ul>
              <li>Current page/route</li>
              <li>Search filters</li>
              <li>Pagination page number</li>
              <li>Shareable state</li>
            </ul>
          </div>
        </div>

        <InfoBox type="tip" title="Rule of Thumb">
          Ask yourself: <strong>"Do multiple components need this data?"</strong> or 
          <strong>"Should it persist when the component unmounts?"</strong><br/>
          If yes → Redux. If no → <code>useState</code>.
        </InfoBox>
      </section>

      <section>
        <h2>createEntityAdapter (Bonus!)</h2>
        <CodeBlock
          title="RTK's built-in normalization helper"
          code={`import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

// Creates a normalized state structure automatically!
const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Auto-generates: { ids: [], entities: {} }
const initialState = usersAdapter.getInitialState({ status: 'idle' });

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,        // Add one entity
    addUsers: usersAdapter.addMany,      // Add many
    updateUser: usersAdapter.updateOne,  // Update one
    removeUser: usersAdapter.removeOne,  // Remove one
  },
});

// Auto-generated selectors!
export const { selectAll, selectById, selectTotal } = 
  usersAdapter.getSelectors(state => state.users);`}
        />
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
