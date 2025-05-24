import {  applyMiddleware, createStore } from "@reduxjs/toolkit";
import appReducer from "./rootReducer";
import { loggerMiddleware } from "./loggerMiddleware";

/**
 * This file creates the Redux store for the application.
 * It applies the logger middleware to the store.
 * The logger middleware logs actions and state changes to the console.
 * The store is created using the root reducer which combines all slice reducers.
 */


const store = createStore(appReducer, applyMiddleware(loggerMiddleware));
export default store;



