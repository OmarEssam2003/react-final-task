import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/counterSlice";
import postsSlice from "../reducers/postsSlice";
export default configureStore({
  reducer: {
    counterData: counterSlice,
    postsData : postsSlice
  },
});
