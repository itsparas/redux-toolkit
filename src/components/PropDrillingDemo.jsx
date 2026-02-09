import { useState } from 'react';

/**
 * Demonstrates the "prop drilling" problem that Redux solves.
 * Users can toggle showing/hiding the prop chain visually.
 */
export default function PropDrillingDemo() {
  const [username, setUsername] = useState('Alice');
  const [showProblem, setShowProblem] = useState(true);

  return (
    <div className="drill-demo">
      <div className="drill-demo__controls">
        <label>
          Change username:&nbsp;
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="drill-demo__input"
          />
        </label>
        <div className="drill-demo__tabs">
          <button
            className={`btn btn--sm ${showProblem ? 'btn--danger' : 'btn--secondary'}`}
            onClick={() => setShowProblem(true)}
          >
            ❌ Without Redux (Problem)
          </button>
          <button
            className={`btn btn--sm ${!showProblem ? 'btn--success' : 'btn--secondary'}`}
            onClick={() => setShowProblem(false)}
          >
            ✅ With Redux (Solution)
          </button>
        </div>
      </div>

      {showProblem ? (
        <div className="drill-demo__tree">
          <div className="drill-node drill-node--root">
            <span className="drill-node__name">App</span>
            <span className="drill-node__prop">username="{username}" ↓</span>
            <div className="drill-node drill-node--l1">
              <span className="drill-node__name">Dashboard</span>
              <span className="drill-node__prop">username="{username}" ↓</span>
              <span className="drill-node__note">⚠️ Doesn't use it, just passes it down!</span>
              <div className="drill-node drill-node--l2">
                <span className="drill-node__name">Sidebar</span>
                <span className="drill-node__prop">username="{username}" ↓</span>
                <span className="drill-node__note">⚠️ Doesn't use it either!</span>
                <div className="drill-node drill-node--l3">
                  <span className="drill-node__name">UserAvatar</span>
                  <span className="drill-node__prop">✅ Finally uses username="{username}"</span>
                </div>
              </div>
            </div>
          </div>
          <div className="drill-demo__verdict drill-demo__verdict--bad">
            <strong>Problem:</strong> Every component in the chain must receive and pass down props it doesn't even use. Add more data? Every component in between must be updated! 😩
          </div>
        </div>
      ) : (
        <div className="drill-demo__tree">
          <div className="drill-node drill-node--root drill-node--redux">
            <span className="drill-node__name">🏪 Redux Store</span>
            <span className="drill-node__prop">{'{ user: { name: "'}{username}{'" } }'}</span>
          </div>
          <div className="drill-demo__redux-arrows">
            <span>↙️</span>
            <span>⬇️</span>
            <span>↘️</span>
          </div>
          <div className="drill-demo__redux-row">
            <div className="drill-node drill-node--l1 drill-node--happy">
              <span className="drill-node__name">App</span>
              <span className="drill-node__note">No props needed!</span>
            </div>
            <div className="drill-node drill-node--l1 drill-node--happy">
              <span className="drill-node__name">Dashboard</span>
              <span className="drill-node__note">No props needed!</span>
            </div>
            <div className="drill-node drill-node--l1 drill-node--happy">
              <span className="drill-node__name">UserAvatar</span>
              <span className="drill-node__prop">
                const name = useSelector(state =&gt; state.user.name)
              </span>
              <span className="drill-node__note">✅ Reads directly from store!</span>
            </div>
          </div>
          <div className="drill-demo__verdict drill-demo__verdict--good">
            <strong>Solution:</strong> Any component can read from the store directly. No prop drilling! Add new data? Only update the component that needs it! 🎉
          </div>
        </div>
      )}
    </div>
  );
}
