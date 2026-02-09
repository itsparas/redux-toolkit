import { createSlice } from '@reduxjs/toolkit';

// createSlice generates action creators and action types automatically
// It uses Immer internally, so you can write "mutating" logic safely
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    history: [],
  },
  reducers: {
    // Each reducer function receives (state, action)
    // Thanks to Immer, we can "mutate" state directly
    increment: (state) => {
      state.value += 1;
      state.history.push(`Incremented to ${state.value}`);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(`Decremented to ${state.value}`);
    },
    // action.payload contains the data passed with the action
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(`Added ${action.payload}, now ${state.value}`);
    },
    reset: (state) => {
      state.value = 0;
      state.history = [];
    },
  },
});

// Auto-generated action creators
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Selector functions for useSelector
export const selectCount = (state) => state.counter.value;
export const selectHistory = (state) => state.counter.history;

// Export the reducer to be used in store
export default counterSlice.reducer;
