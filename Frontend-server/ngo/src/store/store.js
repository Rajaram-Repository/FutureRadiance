import { configureStore } from "@reduxjs/toolkit";
import userData from "./auth/Auth";
import orgData from "./org/Org";

export default configureStore({
  reducer: {
    userData,
    orgData,
  },
});
