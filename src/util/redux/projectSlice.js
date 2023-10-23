import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: []
    },
    reducers: {
        ADD_PROJECT: (state, action) => {
            state.projects = [...state.projects, action.payload];
        },
        SET_PROJECTS: (state, action) => {
            state.projects = action.payload;
        },
        DELETE_PROJECT: (state, action) => {
            state.projects = [action.payload];
        },
    }
});

export const { ADD_PROJECT, SET_PROJECTS, DELETE_PROJECT } = projectSlice.actions;
export default projectSlice.reducer;