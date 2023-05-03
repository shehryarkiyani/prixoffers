import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  min: 0,
  max:0
};

export const PriceFilterSlice = createSlice({
  name: "PriceFilter",
  initialState,
  reducers: {
    setPriceFilter: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPriceFilter } = PriceFilterSlice.actions;

export default PriceFilterSlice.reducer;
