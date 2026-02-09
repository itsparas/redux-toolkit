import { useNavigate } from 'react-router-dom';
import { sections } from './Sidebar';

export default function TopicNavigation({ currentPath }) {
  const navigate = useNavigate();
  const allTopics = sections.flatMap((s) => s.topics);
  const currentIndex = allTopics.findIndex((t) => t.path === currentPath);
  const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const next = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return (
    <div className="topic-navigation">
      {prev ? (
        <button className="topic-nav-btn topic-nav-btn--prev" onClick={() => navigate(prev.path)}>
          ← {prev.label}
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button className="topic-nav-btn topic-nav-btn--next" onClick={() => navigate(next.path)}>
          {next.label} →
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}
