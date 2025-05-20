import {  createStore } from "@reduxjs/toolkit";
import appReducer from "./rootReducer";


const store = createStore(appReducer);
export default store;



