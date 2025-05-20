

const initialState = {
    resumedata: {}
};

const ACTION_TYPES = {
    SET_RESUME_DATA: "SET_RESUME_DATA",
    RESET_RESUME_DATA: "RESET_RESUME_DATA"
};

const professionalBasicReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.SET_RESUME_DATA:
            return {
                ...state,
                resumedata: action.payload
            };
        case ACTION_TYPES.RESET_RESUME_DATA:
            return {
                ...state,
                resumedata: {}
            };
        default:
            return state;
    }
}

// Create getters and setters for the resume data
export const setProfessionalBasicResumeData = (data: any) => ({
    type: ACTION_TYPES.SET_RESUME_DATA,
    payload: data
});
export const resetProfessionalBasicResumeData = () => ({
    type: ACTION_TYPES.RESET_RESUME_DATA
});

export const getProfessionalBasicResumeData = (state: any) => state.resumedata;

export default professionalBasicReducer;




