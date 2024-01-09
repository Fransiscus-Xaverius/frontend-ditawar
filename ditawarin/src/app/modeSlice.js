import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "light",
}

export const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;