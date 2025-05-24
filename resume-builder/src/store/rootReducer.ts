import { combineReducers } from "@reduxjs/toolkit";
import professionalBasicReducer from "../templates/Professional/ProfessionalResumeBasicSlice";
 /**
  * * This file combines all the reducers from different slices of the application.
  * * It uses Redux Toolkit's combineReducers function to create a single root reducer.
  * * This root reducer will be used to create the Redux store.
  * * Each slice reducer is responsible for managing a specific part of the application state.
  */

const appReducer = combineReducers({
    /**
     * Add other reducers from all slcices here
     *  */ 
    professionalBasic: professionalBasicReducer
});

export default appReducer;

