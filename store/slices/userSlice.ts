import {createSlice} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {IUser, UserState} from "../../types/user";
import {authApi} from "../api/auth.api";
import jwtDecode from "jwt-decode";


export const initialState: UserState = {
    user: {
        _id: '',
        name: '',
        email: '',
        picture: '',
    }
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                APP_HYDRATE, (state, action) => {
                    return {
                        ...state,
                        ...action.payload.user,
                    };
                })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.user = jwtDecode<IUser>(action.payload.access_token)
            })
    },
})

export const { setUser } = userSlice.actions
export const userActionCreators = userSlice.actions

export default userSlice.reducer