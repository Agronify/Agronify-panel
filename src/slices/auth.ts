import {User} from "../service/types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface AuthState {
    user: User | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true
}

export const authSlice = createSlice({
    "name": "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {setUser, setIsLoading} = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer