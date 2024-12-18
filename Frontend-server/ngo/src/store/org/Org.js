import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orgLoading: false,
  orgList: [],
};

const orgSlice = createSlice({
  name: "orgData",
  initialState,
  reducers: {
    setOrgLoading: (state, action) => {
      state.orgLoading = action.payload;
    },
    setOrgList: (state, action) => {
      state.orgList = action.payload;
    },
  },
});

export const { setOrgLoading, setOrgList } = orgSlice.actions;

export default orgSlice.reducer;
