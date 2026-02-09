import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
import postsReducer from '../features/posts/postsSlice';
import uiReducer from '../features/ui/uiSlice';
import { apiSlice } from '../features/api/apiSlice';

// configureStore wraps createStore with good defaults:
// - automatically sets up Redux DevTools
// - adds thunk middleware by default
// - adds serializable check middleware in development
// - combines your slice reducers automatically
const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    posts: postsReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // RTK Query middleware enables caching, polling, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
