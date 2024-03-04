import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null
}


export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.others;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.token = null;
            localStorage.clear();
        }

    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;