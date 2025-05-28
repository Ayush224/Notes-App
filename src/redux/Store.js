import { configureStore } from "@reduxjs/toolkit";
import OpsSlice from "./OperationsSlice";

const Store = configureStore({
  reducer: {
    notes: OpsSlice,
  },
});

export default Store;
