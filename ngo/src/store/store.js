import { configureStore } from "@reduxjs/toolkit";
import userData from "./auth/Auth";

export default configureStore({
  reducer: {
    userData
  },
});
