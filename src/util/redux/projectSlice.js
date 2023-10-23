import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        current: null,
        projects: []
    },
    reducers: {
        // Projects Array Handlers
        ADD_PROJECT: (state, action) => {
            state.projects = [...state.projects, action.payload];
        },
        SET_PROJECTS: (state, action) => {
            state.projects = action.payload;
        },
        DELETE_PROJECT: (state, action) => {
            state.projects = [action.payload];
        },
        // Current Project Handlers
        SET_CURRENT_PROJECT: (state, action) => {
            state.project = action.payload;
        },
        CLEAR_CURRENT_PROJECT: (state) => {
            state.project = null;
        }
    }
});

export const { ADD_PROJECT, SET_PROJECTS, DELETE_PROJECT, SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT } = projectSlice.actions;
export default projectSlice.reducer;