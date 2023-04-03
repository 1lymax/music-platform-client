import {configureStore, createAction} from "@reduxjs/toolkit";
import {playerSlice} from "./slices/playerSlice";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {trackApi} from "./api/track.api";
import {trackSlice} from "./slices/trackSlice";
import {artistApi} from "./api/artist.api";
import {albumApi} from "./api/album.api";
import {artistSlice} from "./slices/artistSlice";
import {albumSlice} from "./slices/albumSlice";
import {authApi} from "./api/auth.api";
import {userSlice} from "./slices/userSlice";
import {playlistSlice} from "./slices/playlistSlice";
import {playlistApi} from "./api/playlist.api";
import {uploaderSlice} from "./slices/uploaderSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            [playerSlice.name]: playerSlice.reducer,
            [trackSlice.name]: trackSlice.reducer,
            [artistSlice.name]: artistSlice.reducer,
            [albumSlice.name]: albumSlice.reducer,
            [userSlice.name]: userSlice.reducer,
            [playlistSlice.name]: playlistSlice.reducer,
            [uploaderSlice.name]: uploaderSlice.reducer,

            [trackApi.reducerPath]: trackApi.reducer,
            [artistApi.reducerPath]: artistApi.reducer,
            [albumApi.reducerPath]: albumApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [playlistApi.reducerPath]: playlistApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(trackApi.middleware)
                .concat(artistApi.middleware)
                .concat(albumApi.middleware)
                .concat(playlistApi.middleware)
                .concat(authApi.middleware),
        devTools: true,
    });


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore);
export const APP_HYDRATE = createAction<AppState>(HYDRATE);
