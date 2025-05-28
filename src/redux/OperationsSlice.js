import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  crud: localStorage.getItem("crud")
    ? JSON.parse(localStorage.getItem("crud"))
    : [],
};

export const OpsSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const notes = action.payload;
      state.crud.push(notes);
      localStorage.setItem("crud", JSON.stringify(state.crud));
      // console.log(a)
      toast.success("Notes Added!!");
    },
    deleteFromNotes: (state, action) => {
      const notes = action.payload;
      const index = state.crud.findIndex((i) => i._id === notes);
      if (index >= 0) {
        state.crud.splice(index, 1);
        localStorage.setItem("crud", JSON.stringify(state.crud));
      }
      toast("❌ Note removed!!");
    },
    updateNotes: (state, action) => {
      const notes = action.payload;
      const index = state.crud.findIndex((i) => i._id === notes._id);
      if (index >= 0) {
        state.crud[index] = notes;
        localStorage.setItem("crud", JSON.stringify(state.crud));
      }
      toast.success("Notes Updated!!");
    },
    resetNotes: (state, action) => {
      state.crud = [];
      localStorage.removeItem("crud");
    },
  },
});

export const { addToNotes, deleteFromNotes, updateNotes } = OpsSlice.actions;
export default OpsSlice.reducer;
