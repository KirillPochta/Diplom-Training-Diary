import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: '',
    exercise: [],
    error: '',
};

export const exerciseSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        addExercise(state, action) {
            state.exercise.push(action.payload);
        },
    },
});

export const { addExercise } = exerciseSlice.actions;

export default exerciseSlice.reducer;