import { configureStore } from '@reduxjs/toolkit'
import {projectSlice} from "./main/projectSlice";

export const store = configureStore({
    reducer: {
        project: projectSlice.reducer
    },
})
