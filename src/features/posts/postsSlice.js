import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/posts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
