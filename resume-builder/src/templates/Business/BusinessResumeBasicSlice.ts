import { defaultResumeContent, IBusinessResumeData } from "../../utils/BusinessResumeDefaultContent";
import { createSlice } from "@reduxjs/toolkit";


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


