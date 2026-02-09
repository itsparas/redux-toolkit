import { createSlice } from '@reduxjs/toolkit';

// UI state slice — demonstrates separating UI state from data state
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    activeSection: null,
    theme: 'light',
    completedTopics: [],
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    markTopicComplete: (state, action) => {
      if (!state.completedTopics.includes(action.payload)) {
        state.completedTopics.push(action.payload);
      }
    },
    unmarkTopicComplete: (state, action) => {
      state.completedTopics = state.completedTopics.filter((t) => t !== action.payload);
    },
  },
});

export const {
  toggleSidebar,
  setActiveSection,
  toggleTheme,
  markTopicComplete,
  unmarkTopicComplete,
} = uiSlice.actions;

export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectActiveSection = (state) => state.ui.activeSection;
export const selectTheme = (state) => state.ui.theme;
export const selectCompletedTopics = (state) => state.ui.completedTopics;

export default uiSlice.reducer;
