import { useDispatch, useSelector } from 'react-redux';
import { markTopicComplete, unmarkTopicComplete, selectCompletedTopics } from '../features/ui/uiSlice';

export default function TopicProgress({ topicId, topicTitle }) {
  const dispatch = useDispatch();
  const completedTopics = useSelector(selectCompletedTopics);
  const isCompleted = completedTopics.includes(topicId);

  return (
    <div className={`topic-progress ${isCompleted ? 'topic-progress--done' : ''}`}>
      <label className="topic-progress__label">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() =>
            dispatch(isCompleted ? unmarkTopicComplete(topicId) : markTopicComplete(topicId))
          }
        />
        <span>Mark "{topicTitle}" as completed</span>
      </label>
    </div>
  );
}
