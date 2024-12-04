    import { configureStore } from '@reduxjs/toolkit';
    import tasksReducer from './reducer';

    const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    });

    export default store;
