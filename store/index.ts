import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export const fetchSubject =
//     (id: any): AppThunk =>
//         async dispatch => {
//             const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));
//
//             await timeoutPromise(200);
//
//             dispatch(
//                 subjectSlice.actions.setEnt({
//                     [id]: {
//                         id,
//                         name: `Subject ${id}`,
//                     },
//                 }),
//             );
//         };

export const wrapper = createWrapper<AppStore>(makeStore);

//export const selectSubject = (id: any) => (state: AppState) => state?.[playerSlice.name]?.[id];
