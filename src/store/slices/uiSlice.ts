import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  loginModal: {
    open: boolean;
  };
  signUpModal: {
    open: boolean;
  };
}

const initialState: UIState = {
  loginModal: {
    open: false,
  },
  signUpModal: {
    open: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModal.open = true;
      state.signUpModal.open = false;
    },
    closeLoginModal: (state) => {
      state.loginModal.open = false;
    },
    openSignUpModal: (state) => {
      state.signUpModal.open = true;
      state.loginModal.open = false;
    },
    closeSignUpModal: (state) => {
      state.signUpModal.open = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, openSignUpModal, closeSignUpModal } =
  uiSlice.actions;
export default uiSlice.reducer;
