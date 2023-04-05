import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {configureStore, createAction} from "@reduxjs/toolkit";
import {authApi} from "./api/auth.api";
import {trackApi} from "./api/track.api";
import {albumApi} from "./api/album.api";
import {artistApi} from "./api/artist.api";
import {userSlice} from "./slices/userSlice";
import {trackSlice} from "./slices/trackSlice";
import {playlistApi} from "./api/playlist.api";
import {albumSlice} from "./slices/albumSlice";
import {playerSlice} from "./slices/playerSlice";
import {artistSlice} from "./slices/artistSlice";
import {playlistSlice} from "./slices/playlistSlice";
import {uploaderSlice} from "./slices/uploaderSlice";
import {genreSlice} from "./slices/genreSlice";
import {genreApi} from "./api/genre.api";

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
            [genreSlice.name]: genreSlice.reducer,

            [trackApi.reducerPath]: trackApi.reducer,
            [artistApi.reducerPath]: artistApi.reducer,
            [albumApi.reducerPath]: albumApi.reducer,
            [authApi.reducerPath]: authApi.reducer,
            [playlistApi.reducerPath]: playlistApi.reducer,
            [genreApi.reducerPath]: genreApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(trackApi.middleware)
                .concat(artistApi.middleware)
                .concat(albumApi.middleware)
                .concat(playlistApi.middleware)
                .concat(authApi.middleware)
                .concat(genreApi.middleware),
        devTools: true,
    });


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore, {debug: false});
export const APP_HYDRATE = createAction<AppState>(HYDRATE);