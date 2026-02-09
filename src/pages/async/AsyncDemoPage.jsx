import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopicPage from '../../components/TopicPage';
import InfoBox from '../../components/InfoBox';
import InteractiveExample from '../../components/InteractiveExample';
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  selectAllTodos,
  selectTodosStatus,
  selectTodosError,
} from '../../features/todos/todosSlice';

export default function AsyncDemoPage() {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const status = useSelector(selectTodosStatus);
  const error = useSelector(selectTodosError);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      dispatch(addTodo(newTitle.trim()));
      setNewTitle('');
    }
  };

  return (
    <TopicPage id="/async-demo" title="Live Async Demo — createAsyncThunk">
      <section>
        <h2>🧪 Live Todo App with JSON Server</h2>
        <p>
          This is a fully working CRUD app powered by <code>createAsyncThunk</code> and a 
          JSON Server API running at <code>http://localhost:3001</code>.
        </p>

        <InfoBox type="info" title="What's Happening Behind the Scenes">
          <ul>
            <li><strong>fetchTodos</strong> — GET request to <code>/todos</code></li>
            <li><strong>addTodo</strong> — POST request to <code>/todos</code></li>
            <li><strong>toggleTodo</strong> — PATCH request to <code>/todos/:id</code></li>
            <li><strong>deleteTodo</strong> — DELETE request to <code>/todos/:id</code></li>
          </ul>
          Open Redux DevTools (F12 → Redux) to watch every action dispatch!
        </InfoBox>

        <InteractiveExample
          title="CRUD Todos — All API Calls via createAsyncThunk"
          description="Every action hits the real JSON Server. Data persists across page reloads!"
        >
          <div className="async-demo">
            <div className="async-demo__status">
              <strong>Status: </strong>
              <span className={`status-badge status-badge--${status}`}>{status}</span>
              {error && <span className="status-error">Error: {error}</span>}
            </div>

            <form className="async-demo__form" onSubmit={handleAdd}>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add a new todo..."
                className="async-demo__input"
              />
              <button type="submit" className="btn btn--success">
                + Add Todo
              </button>
            </form>

            {status === 'loading' && (
              <div className="async-demo__loading">
                <div className="spinner" />
                <span>Fetching from JSON Server...</span>
              </div>
            )}

            {status === 'succeeded' && (
              <ul className="async-demo__list">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`async-demo__item ${todo.completed ? 'async-demo__item--done' : ''}`}
                  >
                    <label className="async-demo__checkbox">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodo({ id: todo.id, completed: todo.completed }))}
                      />
                      <span>{todo.title}</span>
                    </label>
                    <button
                      className="btn btn--sm btn--danger"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {status === 'succeeded' && todos.length === 0 && (
              <p className="async-demo__empty">No todos yet! Add one above.</p>
            )}

            <button
              className="btn btn--secondary"
              onClick={() => dispatch(fetchTodos())}
              style={{ marginTop: '1rem' }}
            >
              🔄 Refetch Todos
            </button>
          </div>
        </InteractiveExample>
      </section>
    </TopicPage>
  );
}
