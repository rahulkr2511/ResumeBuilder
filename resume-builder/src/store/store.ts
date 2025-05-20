import {  applyMiddleware, createStore } from "@reduxjs/toolkit";
import appReducer from "./rootReducer";
import { loggerMiddleware } from "./loggerMiddleware";

// create store and apply middleware to log actions and state changes
const store = createStore(appReducer, applyMiddleware(loggerMiddleware));
export default store;



