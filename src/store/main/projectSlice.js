import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMobileView: false
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setIsMobileView: function (state, action) {
            state.isMobileView = action.payload;
        }
    }
});

export const { setIsMobileView } = projectSlice.actions;
