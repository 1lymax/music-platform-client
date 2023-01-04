import {configureStore} from "@reduxjs/toolkit";
import {playerSlice} from "./slices/playerSlice";
import {createWrapper} from "next-redux-wrapper";
import {trackApi} from "./api/track";
import {trackSlice} from "./slices/trackSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            [playerSlice.name]: playerSlice.reducer,
            [trackSlice.name]: trackSlice.reducer,
            [trackApi.reducerPath]: trackApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(trackApi.middleware),
        devTools: true,
    });



export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore);

//export const selectSubject = (id: any) => (state: AppState) => state?.[playerSlice.name]?.[id];
