import { defaultResumeContent, IBusinessResumeData } from "../../utils/BusinessResumeDefaultContent";
import { createSlice } from "@reduxjs/toolkit";

/**
 * 
 * This file defines a Redux slice for managing the business resume data.   
 * It includes the initial state, reducers for setting and resetting the resume data,
 * and selectors for accessing the resume data from the state.
 * * The initial state is set to the default resume content defined in BusinessResumeDefaultContent.ts.
 * * The slice includes two reducers:
 *  - `setBusinessBasicResumeData`: Updates the resume data with the provided payload.
 *  *  - `resetBusinessBasicResumeData`: Resets the resume data to the default content.
 *  * The slice exports the action creators for these reducers and the reducer itself.
 * * The `getBusinessBasicResumeData` selector is used to access the business resume data from the state.
 * * @file BusinessResumeBasicSlice.ts
 * * @module BusinessResumeBasicSlice
 * * @author rahul.kr
 * 
 */
const initialState = defaultResumeContent


const businessBasicSlice = createSlice({
    name: "businessBasic",
    initialState,
    reducers: {
        setBusinessBasicResumeData: (state: IBusinessResumeData, action :{ payload: IBusinessResumeData}) => {  
            return action.payload;
        }
        ,
        resetBusinessBasicResumeData: () => {
            return defaultResumeContent;
        }
    }
}); 

// Create getters for the slice
export const getBusinessBasicResumeData = (state: { businessBasic: IBusinessResumeData }) => state.businessBasic;
// export the action creators
export const { setBusinessBasicResumeData, resetBusinessBasicResumeData } = businessBasicSlice.actions;
// export the reducer from the slice
export default businessBasicSlice.reducer;


