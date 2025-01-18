import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  navBarList: [],
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNavBarList: (state, action) => {
      state.navBarList = action.payload;
    },
  },
});

export const { setLoading, setNavBarList } = userSlice.actions;

export default userSlice.reducer;
