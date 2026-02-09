import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import Quiz from '../../components/Quiz';

export default function ProviderPage() {
  const quizQuestions = [
    {
      question: 'What does the <Provider> component do?',
      options: [
        'It creates the Redux store',
        'It makes the Redux store available to ALL components inside it',
        'It renders the UI',
        'It connects to the database',
      ],
      correct: 1,
      explanation: '<Provider> wraps your app and passes the store down via React Context, so any descendant component can access it with useSelector and useDispatch.',
    },
    {
      question: 'What happens if you use useSelector without a <Provider>?',
      options: [
        'It returns undefined silently',
        'It works but is slow',
        'You get an error: "Could not find store in context"',
        'React crashes completely',
      ],
      correct: 2,
      explanation: 'Without a Provider, there\'s no store in React Context. useSelector and useDispatch will throw an error telling you no store was found.',
    },
  ];

  return (
    <TopicPage id="/provider" title="<Provider /> — Connecting Redux to React">
      <section>
        <h2>What is the Provider?</h2>
        <p>
          You've created a store, you've created slices... but how does React <em>know</em> about your Redux store?
          That's where <code>&lt;Provider&gt;</code> comes in!
        </p>

        <Analogy
          emoji="📡"
          realWorld={
            <div>
              <p><strong>Think of WiFi:</strong></p>
              <ul>
                <li>📡 <strong>WiFi Router (Provider)</strong> — broadcasts the internet connection to your whole house</li>
                <li>📱 <strong>Devices (Components)</strong> — can connect to WiFi from ANY room</li>
                <li>🌐 <strong>Internet (Store)</strong> — the shared resource everyone accesses</li>
              </ul>
              <p>Without a router, your devices can't access the internet. Without Provider, your components can't access the store!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In React + Redux:</strong></p>
              <ul>
                <li><code>&lt;Provider store={'{store}'}&gt;</code> wraps your entire <code>&lt;App /&gt;</code></li>
                <li>It uses React Context internally to "broadcast" the store</li>
                <li>Any component inside can use <code>useSelector</code> and <code>useDispatch</code></li>
                <li>Components outside Provider <strong>cannot</strong> access the store</li>
              </ul>
            </div>
          }
        />
      </section>

      <section>
        <h2>How to Set It Up (Just 3 Steps!)</h2>
        <CodeBlock
          title="src/main.jsx — This is ALL you need!"
          code={`import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';    // Step 1: Import Provider
import store from './app/store';             // Step 2: Import your store
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>                  {/* Step 3: Wrap your App! */}
      <App />
    </Provider>
  </React.StrictMode>
);

// ✅ Now EVERY component inside <App> can access the Redux store!
// No prop drilling needed — any component at any depth can read/write state!`}
        />

        <InfoBox type="success" title="You Only Do This Once!">
          Provider setup is a one-time thing at the root of your app. After this, you never 
          need to think about it again — just use <code>useSelector</code> and <code>useDispatch</code> in any component.
        </InfoBox>
      </section>

      <section>
        <h2>Visual: What Provider Makes Possible</h2>
        <div className="provider-diagram">
          <div className="provider-box">
            <strong>📡 &lt;Provider store={'{store}'}&gt;</strong>
            <div className="provider-child">
              <strong>&lt;App&gt;</strong>
              <div className="provider-child">
                <strong>&lt;Header&gt;</strong>
                <span className="provider-access">✅ Can useSelector / useDispatch</span>
              </div>
              <div className="provider-child">
                <strong>&lt;TodoList&gt;</strong>
                <span className="provider-access">✅ Can useSelector / useDispatch</span>
                <div className="provider-child">
                  <strong>&lt;TodoItem&gt;</strong>
                  <span className="provider-access">✅ Can useSelector / useDispatch (even deeply nested!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InfoBox type="info" title="Key Takeaway">
          Provider doesn't add any visible UI — it's invisible "plumbing" that connects React to Redux.
          Every component at any depth inside Provider can directly access the store, without passing props!
        </InfoBox>
      </section>

      <section>
        <h2>Common Mistake: Forgetting the Provider</h2>
        <CodeBlock
          title="❌ This will crash!"
          code={`// If you forget to wrap with Provider...
function App() {
  const count = useSelector(state => state.counter.value);
  // 💥 Error: Could not find "store" in context.
  // Make sure your component is wrapped in <Provider>
}

// ✅ Fix: Always ensure Provider wraps your app in main.jsx
// This is typically the FIRST error beginners encounter!`}
        />
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
