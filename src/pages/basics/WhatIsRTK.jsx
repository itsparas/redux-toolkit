import TopicPage from '../../components/TopicPage';
import CodeBlock from '../../components/CodeBlock';
import InfoBox from '../../components/InfoBox';
import Analogy from '../../components/Analogy';
import PropDrillingDemo from '../../components/PropDrillingDemo';
import Quiz from '../../components/Quiz';

export default function WhatIsRTK() {
  const quizQuestions = [
    {
      question: 'What is Redux?',
      options: [
        'A CSS framework',
        'A state management library for JavaScript apps',
        'A database for React',
        'A replacement for HTML',
      ],
      correct: 1,
      explanation:
        'Redux is a state management library. It helps you manage data (state) that needs to be shared across many components in your app.',
    },
    {
      question: 'Why was Redux Toolkit created?',
      options: [
        'To replace React completely',
        'To make Redux easier and reduce boilerplate code',
        'To add animations to React apps',
        'To connect React to a database',
      ],
      correct: 1,
      explanation:
        'Redux Toolkit was created because vanilla Redux required too much boilerplate code. RTK simplifies everything — about 70% less code for the same result!',
    },
    {
      question: 'What problem does Redux solve?',
      options: [
        'Making websites look pretty',
        'Sharing state across many components without prop drilling',
        'Making APIs faster',
        'Replacing JavaScript with TypeScript',
      ],
      correct: 1,
      explanation:
        'Redux solves the "prop drilling" problem — where you have to pass data through many layers of components. With Redux, any component can read data from the store directly.',
    },
  ];

  return (
    <TopicPage id="/what-is-rtk" title="What is Redux Toolkit & Why It Exists">
      <section>
        <h2>Wait... What is "State"?</h2>
        <p>
          Before we talk about Redux, let's understand <strong>state</strong>. In React, "state" 
          is simply <strong>data that can change</strong> and affects what the user sees.
        </p>
        <InfoBox type="info" title="Examples of State">
          <ul>
            <li>Is the user logged in? → <code>isLoggedIn: true</code></li>
            <li>What items are in the shopping cart? → <code>cartItems: [...]</code></li>
            <li>Is this dropdown open? → <code>isOpen: false</code></li>
            <li>What's the username? → <code>username: "Alice"</code></li>
          </ul>
          When state changes, React re-renders the component to show the new data!
        </InfoBox>
      </section>

      <section>
        <h2>The Problem: Sharing State is Hard 😩</h2>
        <p>
          In small apps, <code>useState</code> works great. But as your app grows, you'll face 
          the <strong>"prop drilling" problem</strong> — where you have to pass data through 
          many layers of components just so a deeply nested component can use it.
        </p>

        <PropDrillingDemo />

        <p>
          <strong>This is the exact problem Redux solves!</strong> It gives you a central 
          "store" where any component can read or update shared data — no matter how deep it is.
        </p>
      </section>

      <section>
        <h2>So What is Redux Toolkit?</h2>
        <Analogy
          emoji="📬"
          realWorld={
            <div>
              <p><strong>Imagine a company's mail system:</strong></p>
              <ul>
                <li>📋 <strong>Store</strong> = The company's central filing cabinet (holds all information)</li>
                <li>✉️ <strong>Action</strong> = A memo/form you fill out ("Please update employee salary")</li>
                <li>👤 <strong>Reducer</strong> = The office clerk who reads the memo and updates the files</li>
                <li>📢 <strong>Dispatch</strong> = Dropping the memo in the inbox</li>
              </ul>
              <p>You don't edit files yourself — you send a memo, and the clerk handles it!</p>
            </div>
          }
          redux={
            <div>
              <p><strong>In Redux terms:</strong></p>
              <ul>
                <li>📋 <strong>Store</strong> = A JavaScript object holding all your app's data</li>
                <li>✉️ <strong>Action</strong> = An object like <code>{'{type: "increment"}'}</code> describing what happened</li>
                <li>👤 <strong>Reducer</strong> = A function that calculates the new state based on the action</li>
                <li>📢 <strong>dispatch(action)</strong> = Sending the action to the store</li>
              </ul>
              <p>You never modify state directly — you dispatch actions, and reducers handle the updates!</p>
            </div>
          }
        />

        <InfoBox type="success" title="Redux Toolkit = Redux Made Easy">
          <p>
            <strong>Redux Toolkit (RTK)</strong> is the official, modern way to write Redux. 
            Old Redux required tons of boilerplate code. RTK cuts that by ~70%!
          </p>
          <p>
            Think of it like this: <strong>Redux</strong> is like building furniture from raw wood. 
            <strong>Redux Toolkit</strong> is like IKEA — same furniture, but with a kit, instructions, 
            and all the tools included.
          </p>
        </InfoBox>
      </section>

      <section>
        <h2>What Redux Toolkit Includes</h2>
        <p>One <code>npm install</code> gives you everything you need:</p>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📦 configureStore</h3>
            <p>Create your store in 5 lines of code (used to take 20+)</p>
          </div>
          <div className="feature-card">
            <h3>🍰 createSlice</h3>
            <p>Define state + actions + reducers all in ONE place</p>
          </div>
          <div className="feature-card">
            <h3>⚡ createAsyncThunk</h3>
            <p>Fetch data from APIs with automatic loading/error handling</p>
          </div>
          <div className="feature-card">
            <h3>🔄 RTK Query</h3>
            <p>Even easier API calls with auto-caching (like magic!)</p>
          </div>
          <div className="feature-card">
            <h3>✏️ Immer Built-in</h3>
            <p>Write simple state updates — no complex spread operators</p>
          </div>
          <div className="feature-card">
            <h3>🛠️ DevTools</h3>
            <p>Time-travel debugging — see every state change like a replay</p>
          </div>
        </div>
      </section>

      <section>
        <h2>When Should You Use Redux Toolkit?</h2>
        <InfoBox type="tip" title="Use RTK When...">
          <ul>
            <li>✅ Multiple components need the same data (user info, cart, etc.)</li>
            <li>✅ You're fetching data from APIs that many components share</li>
            <li>✅ State logic is getting complex (lots of interconnected updates)</li>
            <li>✅ You need to debug state changes easily</li>
          </ul>
        </InfoBox>
        <InfoBox type="warning" title="DON'T Use RTK When...">
          <ul>
            <li>❌ Building a tiny app (a landing page, a simple form)</li>
            <li>❌ State is only used in one component (use <code>useState</code>!)</li>
            <li>❌ Just learning React (get comfortable with React first)</li>
          </ul>
        </InfoBox>
      </section>

      <section>
        <h2>Installation</h2>
        <CodeBlock
          title="Just 2 packages — that's it!"
          code={`npm install @reduxjs/toolkit react-redux

# @reduxjs/toolkit — the toolkit itself (has Redux + Immer + Thunk + more)
# react-redux — connects Redux to React (Provider, useSelector, useDispatch)`}
        />
      </section>

      <section>
        <h2>Test Your Understanding</h2>
        <Quiz questions={quizQuestions} />
      </section>
    </TopicPage>
  );
}
