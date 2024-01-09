import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './modeSlice';
const store = configureStore({
    reducer: {
        mode: modeReducer
    }
})
export default store;