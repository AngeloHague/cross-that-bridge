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
            // delete project
            const projectID = action.payload;
            const updatedProjects = state.projects.filter(
                (project) => project.id !== projectID
            );
            state.projects = updatedProjects;
        },
        // Current Project Handlers
        SET_CURRENT_PROJECT: (state, action) => {
            state.current = action.payload;
        },
        CLEAR_CURRENT_PROJECT: (state) => {
            state.current = null;
        }
    }
});

export const { ADD_PROJECT, SET_PROJECTS, DELETE_PROJECT, SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT } = projectSlice.actions;
export default projectSlice.reducer;