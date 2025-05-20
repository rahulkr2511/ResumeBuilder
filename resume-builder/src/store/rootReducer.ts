import { combineReducers } from "@reduxjs/toolkit";
import professionalBasicReducer from "../templates/ProfessionalResumeBasicSlice";


const appReducer = combineReducers({
    // Add other reducers from all slcices here
    professionalBasic: professionalBasicReducer
});

export default appReducer;

