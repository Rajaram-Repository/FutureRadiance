import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = userSlice.actions;

export default userSlice.reducer;
