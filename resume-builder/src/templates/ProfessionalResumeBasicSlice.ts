import { defaultResumeContent, ResumeData } from "../utils/ProfessionalResumeDefaultContent";
import { createSlice } from "@reduxjs/toolkit";


/*
    This slice is used to manage the state of the professional resume builder.
    It contains the initial state, reducers, and actions for the resume data.
    The initial state is set to the default resume content.
    The reducers are used to set and reset the resume data.
    The actions are used to dispatch the reducers.
    Entire slice is created using the createSlice function from Redux Toolkit.
*/

const initialState: ResumeData = defaultResumeContent;


const professionalBasicSlice = createSlice({
    name: "professionalBasic",
    initialState,
    reducers: {
        setProfessionalBasicResumeData: (state: ResumeData, action: { payload: ResumeData }) => {
            return {
                ...state,
                ...action.payload
            };
        },
        resetProfessionalBasicResumeData: () => {
            return defaultResumeContent;
        }
    }
});

// Create getters for the slice
export const getProfessionalBasicResumeData = (state: { professionalBasic: ResumeData }) => state.professionalBasic;

// export the action creators
export const { setProfessionalBasicResumeData, resetProfessionalBasicResumeData } = professionalBasicSlice.actions;

// export the reducer from the slice
export default professionalBasicSlice.reducer;




