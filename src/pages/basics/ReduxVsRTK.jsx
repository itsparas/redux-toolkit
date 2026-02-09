import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';

export default function ReduxVsRTK() {
  const quizQuestions = [
    {
      question: 'What does Redux Toolkit auto-generate that you had to write manually in vanilla Redux?',
      options: ['Components', 'CSS styles', 'Action types & action creators', 'Database queries'],
      correct: 2,
      explanation: 'RTK auto-generates action type strings (e.g., "counter/increment") and action creator functions from your createSlice reducers. No more manual boilerplate!',
    },
    {
      question: 'In vanilla Redux, how do you update nested state?',
      options: [
        'Just use state.user.name = "new" directly',
        'Use spread operators at every level (...state, user: { ...state.user })',
        'Call setState()',
        'You cannot update nested state',
      ],
      correct: 1,
      explanation: 'Vanilla Redux requires immutable updates — you must create new objects at every level of nesting using spread operators. RTK + Immer lets you write state.user.name = "new" instead!',
    },
    {
      question: 'Approximately how much less code does RTK require compared to vanilla Redux?',
      options: ['10% less', '30% less', '70% less', 'Same amount'],
      correct: 2,
      explanation: 'Redux Toolkit reduces boilerplate by about 70%! No separate action types, no action creators, no switch statements, no manual spread operators.',
    },
  ];

  return (
    <TopicPage id="/redux-vs-rtk" title="Redux vs Redux Toolkit">
      <section>
        <h2>Why Does Redux Toolkit Exist?</h2>
        <p>
          Original ("vanilla") Redux was powerful but had a big problem: <strong>too much boilerplate code</strong>.
          Developers had to write the same repetitive patterns over and over. Redux Toolkit was created 
          to solve this — it's now the <strong>official, recommended</strong> way to use Redux.
        </p>

        <Analogy
          emoji="🏗️"
          realWorld={
            <div>
              <p><strong>Building a House:</strong></p>
              <ul>
                <li>🪨 <strong>Vanilla Redux</strong> = Building from raw materials. You cut every piece of lumber, mix your own concrete, wire the electricity yourself. It works but takes forever.</li>
                <li>🏠 <strong>Redux Toolkit</strong> = Using pre-fabricated components. The walls come pre-built, wiring is pre-done, plumbing is included. Same house, 70% less work!</li>
              </ul>
            </div>
          }
          redux={
            <div>
              <p><strong>In Code Terms:</strong></p>
              <ul>
                <li>📝 Vanilla Redux: Write action type constants + action creator functions + reducer switch statements + store setup + middleware + DevTools. <strong>50+ lines for a simple counter!</strong></li>
                <li>⚡ Redux Toolkit: Write one <code>createSlice</code> call + one <code>configureStore</code> call. <strong>15 lines for the same counter!</strong></li>
              </ul>
            </div>
          }
        />
      </section>

      <section>
        <h2>Side-by-Side Comparison</h2>
        <p>Let's build the <strong>exact same counter feature</strong> both ways. Count the lines!</p>

        <h3>❌ Vanilla Redux (Old Way) — ~50 lines across multiple files</h3>
        <CodeBlock
          title="Vanilla Redux — So much boilerplate!"
          code={`// 1. Action Types (separate file)
const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const INCREMENT_BY = 'counter/incrementByAmount';

// 2. Action Creators (separate file)
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const incrementByAmount = (amount) => ({
  type: INCREMENT_BY,
  payload: amount,
});

// 3. Reducer (separate file)
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      // Must return NEW object (immutable update)
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT_BY:
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
}

// 4. Store setup (yet another file)
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({ counter: counterReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);`}
        />

        <h3>✅ Redux Toolkit (Modern Way) — ~15 lines, one file!</h3>
        <CodeBlock
          title="Redux Toolkit — Clean and simple!"
          code={`// Everything in ONE file!
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },          // "Mutating" is safe!
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Actions are auto-generated! ✨
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Store setup is one function call — DevTools + middleware included!
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});`}
        />

        <InfoBox type="success" title="What RTK Eliminates">
          <ul>
            <li>❌ <strong>No action type constants</strong> — auto-generated from slice name + reducer name</li>
            <li>❌ <strong>No action creator functions</strong> — auto-generated from reducer definitions</li>
            <li>❌ <strong>No switch statements</strong> — use simple object methods instead</li>
            <li>❌ <strong>No manual spread operators</strong> — Immer handles immutability for you</li>
            <li>❌ <strong>No DevTools setup</strong> — included automatically</li>
            <li>❌ <strong>No middleware config</strong> — thunk middleware included by default</li>
            <li>✅ <strong>~70% less code</strong> for the exact same functionality!</li>
          </ul>
        </InfoBox>
      </section>

      <section>
        <h2>Feature Comparison Table</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Vanilla Redux 😰</th>
              <th>Redux Toolkit 🎉</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Action Types</td>
              <td>Manual string constants</td>
              <td>Auto-generated ✨</td>
            </tr>
            <tr>
              <td>Action Creators</td>
              <td>Manual functions</td>
              <td>Auto-generated ✨</td>
            </tr>
            <tr>
              <td>Immutability</td>
              <td>Manual spread operators everywhere</td>
              <td>Immer (write "mutations" safely)</td>
            </tr>
            <tr>
              <td>Async Logic</td>
              <td>Manual thunk + extra packages</td>
              <td>createAsyncThunk (built-in)</td>
            </tr>
            <tr>
              <td>DevTools</td>
              <td>Manual setup + extra package</td>
              <td>Built-in automatically</td>
            </tr>
            <tr>
              <td>Data Fetching</td>
              <td>Build-it-yourself or external lib</td>
              <td>RTK Query (built-in)</td>
            </tr>
            <tr>
              <td>Packages Needed</td>
              <td>redux + react-redux + redux-thunk + redux-devtools-extension</td>
              <td>@reduxjs/toolkit + react-redux</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
