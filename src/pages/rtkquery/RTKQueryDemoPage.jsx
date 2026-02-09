import { useState } from 'react';
import TopicPage from '../../components/TopicPage';
import InfoBox from '../../components/InfoBox';
import InteractiveExample from '../../components/InteractiveExample';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../features/api/apiSlice';

export default function RTKQueryDemoPage() {
  const { data: users, isLoading, isFetching, error, refetch } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (newName.trim() && newEmail.trim()) {
      try {
        await addUser({ name: newName.trim(), email: newEmail.trim(), role: 'user' }).unwrap();
        setNewName('');
        setNewEmail('');
      } catch (err) {
        console.error('Failed to add user:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser({ id, name: editName }).unwrap();
      setEditingId(null);
      setEditName('');
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <TopicPage id="/rtk-query-demo" title="Live RTK Query Demo">
      <section>
        <h2>🧪 User Management with RTK Query</h2>
        <p>
          This demo uses RTK Query hooks to manage users via the JSON Server API. 
          Notice how you don't write any reducers, loading states, or error handling — 
          it's all automatic!
        </p>

        <InfoBox type="tip" title="Watch the Magic">
          <ul>
            <li>Add/delete a user and watch the list auto-update (cache invalidation)</li>
            <li>Notice "isFetching" indicator on refetch (stale-while-revalidate)</li>
            <li>Open Redux DevTools to see RTK Query actions like <code>api/executeQuery</code></li>
          </ul>
        </InfoBox>

        <InteractiveExample
          title="Full CRUD with RTK Query"
          description="No thunks, no reducers, no loading states — just hooks!"
        >
          <div className="rtk-demo">
            <div className="rtk-demo__status-bar">
              <span>Status: {isLoading ? '⏳ Loading...' : isFetching ? '🔄 Refreshing...' : '✅ Ready'}</span>
              <button className="btn btn--sm btn--secondary" onClick={refetch}>
                🔄 Refetch
              </button>
            </div>

            <form className="rtk-demo__form" onSubmit={handleAdd}>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                className="rtk-demo__input"
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Email"
                className="rtk-demo__input"
              />
              <button type="submit" className="btn btn--success" disabled={isAdding}>
                {isAdding ? 'Adding...' : '+ Add User'}
              </button>
            </form>

            {error && (
              <div className="rtk-demo__error">
                Error loading users. Make sure JSON Server is running on port 3001.
              </div>
            )}

            {isLoading ? (
              <div className="async-demo__loading">
                <div className="spinner" />
                <span>Loading users...</span>
              </div>
            ) : (
              <div className="rtk-demo__users">
                {users?.map((user) => (
                  <div key={user.id} className="rtk-demo__user-card">
                    {editingId === user.id ? (
                      <div className="rtk-demo__edit-row">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="rtk-demo__input"
                        />
                        <button className="btn btn--sm btn--success" onClick={() => handleUpdate(user.id)}>Save</button>
                        <button className="btn btn--sm btn--secondary" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <div className="rtk-demo__user-info">
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                          <span className={`role-badge role-badge--${user.role}`}>{user.role}</span>
                        </div>
                        <div className="rtk-demo__user-actions">
                          <button
                            className="btn btn--sm btn--primary"
                            onClick={() => {
                              setEditingId(user.id);
                              setEditName(user.name);
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn--sm btn--danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </InteractiveExample>
      </section>
    </TopicPage>
  );
}
