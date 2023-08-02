import { combineReducers } from "@reduxjs/toolkit";

import profileSlice from "../slices/profileSlice";
import authSlice from "../slices/authSlice";
import cartSlice from "../slices/cartSlice";
import courseSlice from "../slices/courseSlice";

const rootReducer =combineReducers({
auth : authSlice,
profile:profileSlice,
cart:cartSlice,
course:courseSlice
})

export default rootReducer