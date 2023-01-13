import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAuth} from "../../types/auth";
import {IUser} from "../../types/user";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        login: builder.mutation<IUser, IAuth>({
            query: (args) => ({
                url: `auth/login/`,
                method: 'POST',
                body: args
            }),

        }),
        googleOauth: builder.mutation<IUser, void>({
            query: () => ({
                url: `auth/google/`,
                method: 'GET',
            }),

        }),
        // getTrackById: builder.query<ITrack, string>({
        //     query: (id) => `track/${id}`,
        // }),
        // createTrack: builder.mutation<ITrack, FormData>({
        //     query: (args) => ({
        //         url: `track/`,
        //         method: 'POST',
        //         body: args
        //     }),
        //
        // })

    }),
})


export const {useLoginMutation, useGoogleOauthMutation} = authApi

export const {login} = authApi.endpoints