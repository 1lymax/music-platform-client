import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IArtist} from "../../types/artist";

export const artistApi = createApi({
    reducerPath: 'artistApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: (builder) => ({
        getAllArtists: builder.query<IArtist[], void>({
            query: () => `artist/`,
        }),
        getArtistById: builder.query<IArtist, string>({
            query: (id) => `artist/${id}`,
        }),
    }),
})


export const { useGetAllArtistsQuery, useGetArtistByIdQuery } = artistApi

export const { getAllArtists, getArtistById } = artistApi.endpoints