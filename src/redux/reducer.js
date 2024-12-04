    import { createSlice } from '@reduxjs/toolkit';

    
    const initialState = {
    columns: {
        Preparation: [],
        'Day of the Event': [],
        'Event Closing': [],
    },
    };

    
    const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
        const { column, task } = action.payload;
        state.columns[column].push(task);
        },
        updateTask: (state, action) => {
        const { column, taskId, updatedTask } = action.payload;
        const taskIndex = state.columns[column].findIndex((task) => task.id === taskId);
        if (taskIndex >= 0) state.columns[column][taskIndex] = { ...updatedTask, id: taskId };
        },
        deleteTask: (state, action) => {
        const { column, taskId } = action.payload;
        state.columns[column] = state.columns[column].filter((task) => task.id !== taskId);
        },
        moveTask: (state, action) => {
        const { fromColumn, toColumn, taskId } = action.payload;
        const task = state.columns[fromColumn].find((task) => task.id === taskId);
        if (task) {
            state.columns[fromColumn] = state.columns[fromColumn].filter((task) => task.id !== taskId);
            state.columns[toColumn].push(task);
        }
        },
    },
    });

    
    export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;
    export default tasksSlice.reducer;
