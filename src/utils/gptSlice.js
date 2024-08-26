import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: 'gpt',
  initialState : {
    showGPTSearchView : false
  },
  reducers: {
    toggleGPTSearch : (state) => {
      state.showGPTSearchView = !state.showGPTSearchView;
    }
  }
});

export const { toggleGPTSearch } = gptSlice.actions;
export default gptSlice.reducer;