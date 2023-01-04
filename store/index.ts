import {configureStore} from "@reduxjs/toolkit";
import {playerSlice} from "./slices/playerSlice";
import {createWrapper} from "next-redux-wrapper";
import {trackApi} from "./api/track";
import {trackSlice} from "./slices/trackSlice";
import {artistApi} from "./api/artist";
import {albumApi} from "./api/album";
import {artistSlice} from "./slices/artistSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [playerSlice.name]: playerSlice.reducer,
            [trackSlice.name]: trackSlice.reducer,
            [artistSlice.name]: artistSlice.reducer,

            [trackApi.reducerPath]: trackApi.reducer,
            [artistApi.reducerPath]: artistApi.reducer,
            [albumApi.reducerPath]: albumApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(trackApi.middleware)
                .concat(artistApi.middleware)
                .concat(albumApi.middleware),
        devTools: true,
    });



export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore);

//export const selectSubject = (id: any) => (state: AppState) => state?.[playerSlice.name]?.[id];
