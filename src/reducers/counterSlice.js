import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counterData",

  initialState: {
    counter: 0,
    userName: "Emad",
    skills: ["html", "css"]
  },

  reducers: {
    increment: (state) => {
      state.counter += 1;
    },

    decrement: (state) => {
      state.counter -= 1;
    },

    changeUserName: (state) => {
      state.userName = "Ahmed";
    },

    updateUserNameFromUser: (state, actions) => {
      state.userName = actions.payload;
    },
  },
});

export const { increment, decrement, changeUserName, updateUserNameFromUser } = counterSlice.actions;
export default counterSlice.reducer;
