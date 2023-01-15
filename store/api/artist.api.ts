import {HYDRATE} from "next-redux-wrapper";
import {IArtist} from "../../types/artist";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['artist'],
    endpoints: (builder) => ({
        getAllArtists: builder.query<IArtist[], void>({
            query: () => `artist/`,
            providesTags: ['artist'],
        }),

        getArtistById: builder.query<IArtist, string>({
            query: (id) => `artist/${id}`,
        }),

        createArtist: builder.mutation<IArtist, FormData>({
            query: (args) => ({
                url: `artist/`,
                method: 'POST',
                body: args
            }),
            invalidatesTags: ['artist'],
        })
    }),
})


export const {useGetAllArtistsQuery, useGetArtistByIdQuery, useCreateArtistMutation} = artistApi

export const {getAllArtists, getArtistById} = artistApi.endpoints