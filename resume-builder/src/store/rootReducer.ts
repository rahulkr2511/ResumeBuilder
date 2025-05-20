import { combineReducers } from "@reduxjs/toolkit";
import professionalBasicReducer from "../templates/ProfessionalResumeBasicSlice";


const appReducer = combineReducers({
    // Add other reducers from all slcices here
    professionalBasicReducer
});

export default appReducer;

