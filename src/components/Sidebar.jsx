import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarOpen, selectCompletedTopics, toggleSidebar } from '../features/ui/uiSlice';

const sections = [
  {
    title: 'Core Basics',
    topics: [
      { path: '/what-is-rtk', label: 'What is Redux Toolkit?' },
      { path: '/redux-vs-rtk', label: 'Redux vs Redux Toolkit' },
      { path: '/store', label: 'Store & Single Source of Truth' },
    ],
  },
  {
    title: 'Setup',
    topics: [
      { path: '/configure-store', label: 'configureStore' },
      { path: '/devtools-middleware', label: 'DevTools & Middleware' },
    ],
  },
  {
    title: 'Slices',
    topics: [
      { path: '/create-slice', label: 'createSlice' },
      { path: '/immer', label: 'Immer & Safe Mutations' },
    ],
  },
  {
    title: 'React Integration',
    topics: [
      { path: '/provider', label: '<Provider />' },
      { path: '/use-selector-dispatch', label: 'useSelector & useDispatch' },
    ],
  },
  {
    title: 'Actions & Reducers',
    topics: [
      { path: '/actions-reducers', label: 'Actions & Reducer Logic' },
      { path: '/feature-organization', label: 'Feature-Based Organization' },
    ],
  },
  {
    title: 'Async State',
    topics: [
      { path: '/async-thunk', label: 'createAsyncThunk' },
      { path: '/async-demo', label: 'Live Async Demo' },
    ],
  },
  {
    title: 'RTK Query',
    topics: [
      { path: '/rtk-query-intro', label: 'RTK Query Introduction' },
      { path: '/rtk-query-demo', label: 'Live RTK Query Demo' },
    ],
  },
  {
    title: 'State Design',
    topics: [
      { path: '/state-design', label: 'State Design Patterns' },
    ],
  },
  {
    title: 'Middleware',
    topics: [
      { path: '/middleware', label: 'Middleware Concepts' },
    ],
  },
  {
    title: 'Best Practices',
    topics: [
      { path: '/best-practices', label: 'Performance & Best Practices' },
      { path: '/common-mistakes', label: 'Common Mistakes' },
    ],
  },
];

export { sections };

export default function Sidebar() {
  const isOpen = useSelector(selectSidebarOpen);
  const completedTopics = useSelector(selectCompletedTopics);
  const dispatch = useDispatch();
  const totalTopics = sections.reduce((acc, s) => acc + s.topics.length, 0);
  const progress = Math.round((completedTopics.length / totalTopics) * 100);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => dispatch(toggleSidebar())}>
        {isOpen ? '✕' : '☰'}
      </button>
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
        <div className="sidebar__header">
          <h2>⚡ RTK Guide</h2>
          <div className="sidebar__progress">
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text">{progress}% Complete</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {sections.map((section) => (
            <div key={section.title} className="sidebar__section">
              <h3 className="sidebar__section-title">{section.title}</h3>
              <ul>
                {section.topics.map((topic) => (
                  <li key={topic.path}>
                    <NavLink
                      to={topic.path}
                      className={({ isActive }) =>
                        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                      }
                    >
                      <span className="sidebar__link-check">
                        {completedTopics.includes(topic.path) ? '✅' : '○'}
                      </span>
                      {topic.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
