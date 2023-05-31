import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadProgress: 0,
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      return {
        ...state,
        uploadProgress: action.payload,
      };
    },
  },
});

export const { setUploadProgress } = globalSlice.actions;

export default globalSlice.reducer;
