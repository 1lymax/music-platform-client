import jwtDecode from "jwt-decode";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_HYDRATE} from "../index";
import {authApi} from "../api/auth.api";
import {IUser, UserState} from "../../types/user";


export const initialState: UserState = {
    user: {
        _id: '',
        name: '',
        email: '',
        picture: '',
    },
    dialogs: {
        addNewAlbum: false,
        addNewArtist: false,
        addNewGenre: false,
    }
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setDialogAddNewAlbum: (state, action:PayloadAction<boolean>) => {
            state.dialogs.addNewAlbum = action.payload
        },
        setDialogAddNewArtist: (state, action:PayloadAction<boolean>) => {
            state.dialogs.addNewArtist = action.payload
        },
        setDialogAddNewGenre: (state, action:PayloadAction<boolean>) => {
            state.dialogs.addNewGenre = action.payload
        }



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