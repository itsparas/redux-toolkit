import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import ReduxFlowDiagram from '../../components/ReduxFlowDiagram';
import Quiz from '../../components/Quiz';
import { useSelector } from 'react-redux';

export default function StoreConcept() {
  const storeState = useSelector((state) => state);

  const quizQuestions = [
    {
      question: 'How many stores does a Redux app have?',
      options: ['One per component', 'One per page', 'Exactly ONE for the entire app', 'As many as you want'],
      correct: 2,
      explanation: 'Redux follows the "Single Source of Truth" principle — there is exactly ONE store for the entire application. All state lives in this one central place.',
    },
    {
      question: 'What is the ONLY way to change state in Redux?',
      options: ['Modify the store object directly', 'Call setState()', 'Dispatch an action', 'Use a database query'],
      correct: 2,
      explanation: 'The only way to change state in Redux is by dispatching an action. This makes state changes predictable and traceable.',
    },
    {
      question: 'What does the reducer do?',
      options: [
        'It displays data on screen',
        'It takes current state + action, and returns NEW state',
        'It sends data to the server',
        'It reduces the file size',
      ],
      correct: 1,
      explanation: 'A reducer is a pure function: (currentState, action) → newState. It decides how state should change based on the action received.',
    },
  ];

  return (
    <TopicPage id="/store" title="Store & Single Source of Truth">
      <section>
        <h2>What is the Store?</h2>
        <p>
          Think of the Redux store as <strong>your app's brain</strong> — it's a single JavaScript 
          object that remembers everything your app needs to know.
        </p>

        <Analogy
          emoji="🏦"
          realWorld={
            <div>
              <p><strong>Think of a Bank:</strong></p>
              <ul>
                <li>🏦 <strong>The Bank (Store)</strong> — holds everyone's money in one secure place</li>
                <li>📝 <strong>Deposit/Withdrawal Slip (Action)</strong> — a form saying what you want to do</li>
                <li>👩‍💼 <strong>Teller (Reducer)</strong> — processes your request and updates the records</li>
                <li>💰 <strong>Your Balance (State)</strong> — the current data</li>
              </ul>
              <p>You can't reach behind the counter and grab money. You fill out a slip (action), the teller (reducer) processes it, and your balance (state) gets updated!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In Redux:</strong></p>
              <ul>
                <li>🏪 <strong>Store</strong> = One big JavaScript object holding ALL your app's data</li>
                <li>📝 <strong>Action</strong> = <code>{`{ type: "deposit", payload: 100 }`}</code></li>
                <li>⚙️ <strong>Reducer</strong> = Function that calculates: old balance + deposit = new balance</li>
                <li>💰 <strong>State</strong> = <code>{`{ balance: 500 }`}</code></li>
              </ul>
              <p>You can't modify state directly. You dispatch an action, the reducer processes it, and state updates!</p>
            </div>
          }
        />

        <InfoBox type="info" title="Why 'Single Source of Truth'?">
          <p>
            Imagine if your bank had 10 different copies of your balance in different offices — 
            which one is correct? Chaos! Same with apps. Redux keeps <strong>one copy</strong> of 
            all shared data, so there's never confusion about what the current state is.
          </p>
        </InfoBox>
      </section>

      <section>
        <h2>Three Golden Rules of Redux</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>1️⃣ Single Source of Truth</h3>
            <p>All shared state lives in ONE store. Not scattered, not duplicated.</p>
          </div>
          <div className="feature-card">
            <h3>2️⃣ State is Read-Only</h3>
            <p>You can't change state directly. The ONLY way is to dispatch an action.</p>
          </div>
          <div className="feature-card">
            <h3>3️⃣ Changes via Pure Functions</h3>
            <p>Reducers are pure functions: same input always gives same output. No surprises!</p>
          </div>
        </div>
      </section>

      <section>
        <h2>What Does a Store Look Like?</h2>
        <p>It's just a JavaScript object! Each "key" represents a feature of your app:</p>
        <CodeBlock
          title="This app's store shape — it's just an object!"
          code={`// Think of each key as a "department" in your store
{
  counter: {             // 🔢 Counter feature
    value: 5,
    history: ["Incremented to 1", "Added 4"]
  },
  todos: {               // ✅ Todos feature
    items: [{id: 1, title: "Learn Redux", completed: false}],
    status: "succeeded",
    error: null
  },
  ui: {                  // 🎨 UI settings
    sidebarOpen: true,
    theme: "light",
    completedTopics: ["/what-is-rtk"]
  },
  api: { ... }           // 🌐 RTK Query cache
}

// Any component can read from ANY part of this store!
// const count = useSelector(state => state.counter.value)  // → 5
// const theme = useSelector(state => state.ui.theme)       // → "light"`}
        />
      </section>

      <section>
        <h2>🔴 Live: See This App's Actual Store!</h2>
        <p>
          This is the <strong>real Redux store</strong> powering this guide app right now. 
          Every piece of data below is live!
        </p>
        <div className="live-state-viewer">
          <pre>{JSON.stringify(storeState, null, 2)}</pre>
        </div>

        <InfoBox type="tip" title="Try These Experiments!">
          <ol>
            <li>Go to the <strong>createSlice</strong> page and click the counter buttons, then come back — see <code>counter.value</code> change!</li>
            <li>Check the checkbox at the bottom of this page — see <code>ui.completedTopics</code> update!</li>
            <li>Install the <strong>Redux DevTools</strong> browser extension (press F12 → Redux tab) to see a much better view!</li>
          </ol>
        </InfoBox>
      </section>

      <section>
        <h2>How Data Flows in Redux</h2>
        <p>Click through each step to understand the flow:</p>
        <ReduxFlowDiagram />
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
