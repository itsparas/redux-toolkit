import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// createAsyncThunk handles async operations
// It automatically dispatches pending/fulfilled/rejected actions
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!response.ok) throw new Error('Failed to toggle todo');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  // extraReducers handles actions from createAsyncThunk
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // addTodo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // toggleTodo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // deleteTodo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearError } = todosSlice.actions;

export const selectAllTodos = (state) => state.todos.items;
export const selectTodosStatus = (state) => state.todos.status;
export const selectTodosError = (state) => state.todos.error;

export default todosSlice.reducer;
