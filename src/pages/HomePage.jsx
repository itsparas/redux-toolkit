import { useSelector } from 'react-redux';
import { selectCompletedTopics } from '../features/ui/uiSlice';
import { useNavigate } from 'react-router-dom';
import { sections } from '../components/Sidebar';

export default function HomePage() {
  const completedTopics = useSelector(selectCompletedTopics);
  const navigate = useNavigate();
  const totalTopics = sections.reduce((acc, s) => acc + s.topics.length, 0);
  const progress = Math.round((completedTopics.length / totalTopics) * 100);

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>⚡ Redux Toolkit Interactive Guide</h1>
        <p className="home-subtitle">
          Learn Redux Toolkit step-by-step with live interactive examples, real API calls, 
          and hands-on code. Track your progress as you go!
        </p>
        <div className="home-progress-card">
          <div className="progress-bar progress-bar--large">
            <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
          </div>
          <p>{completedTopics.length} of {totalTopics} topics completed ({progress}%)</p>
        </div>
        <button className="btn btn--primary btn--large" onClick={() => navigate('/what-is-rtk')}>
          {completedTopics.length === 0 ? '🚀 Start Learning' : '📚 Continue Learning'}
        </button>
      </div>

      <div className="home-sections">
        {sections.map((section) => (
          <div key={section.title} className="home-section-card">
            <h3>{section.title}</h3>
            <ul>
              {section.topics.map((topic) => (
                <li
                  key={topic.path}
                  className="home-topic-item"
                  onClick={() => navigate(topic.path)}
                >
                  <span>{completedTopics.includes(topic.path) ? '✅' : '○'}</span>
                  <span>{topic.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
