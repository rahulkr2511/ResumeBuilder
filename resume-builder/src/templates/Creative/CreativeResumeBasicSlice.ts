import { createSlice } from "@reduxjs/toolkit";
import { defaultResumeContent, ICreativeResumeData } from "../../utils/CreativeResumeDefaultContent";


const initialState: ICreativeResumeData = defaultResumeContent;

/**
 * This slice is used to manage the state of the creative resume builder.
 * It contains the initial state, reducers, and actions for the resume data.
 * The initial state is set to the default resume content.
 * The reducers are used to set and reset the resume data.
 */

const creativeBasicSlice = createSlice({
    name: 'creativeBasic',
    initialState,
    reducers:{
        setCreativeResumeBasicData: (state: ICreativeResumeData, action :{ payload: ICreativeResumeData})=> {
            return action.payload;
        },
        resetCreativeResumeBasicData: (state, action) => {
            return defaultResumeContent;
        }
    }
});

// Create getters for the slice
export const getCreativeResumeBasicData = (state: { creativeBasic: ICreativeResumeData }) => state.creativeBasic;
// export the action creators
export const { setCreativeResumeBasicData, resetCreativeResumeBasicData } = creativeBasicSlice.actions;
// export the reducer from the slice
export default creativeBasicSlice.reducer;  





