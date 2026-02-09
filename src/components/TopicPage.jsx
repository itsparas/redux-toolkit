import TopicProgress from './TopicProgress';
import TopicNavigation from './TopicNavigation';

export default function TopicPage({ id, title, children }) {
  return (
    <article className="topic-page">
      <h1 className="topic-page__title">{title}</h1>
      <div className="topic-page__content">{children}</div>
      <TopicProgress topicId={id} topicTitle={title} />
      <TopicNavigation currentPath={id} />
    </article>
  );
}
