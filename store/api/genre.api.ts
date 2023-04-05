import {HYDRATE} from "next-redux-wrapper";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGenre} from "../../types/genre";

export const genreApi = createApi({
    reducerPath: 'genreApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_URL}),
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['genre'],
    endpoints: (builder) => ({
        getAllGenres: builder.query<IGenre[], void>({
            query: () => `genre/`,
            providesTags: ['genre'],
        }),

        getGenreById: builder.query<IGenre, string>({
            query: (id) => `genre/${id}`,
        }),

        createGenre: builder.mutation<IGenre, FormData>({
            query: (body) => ({
                url: `genre/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['genre'],
        })
    }),
})


export const {useGetAllGenresQuery, useCreateGenreMutation} = genreApi

export const {} = genreApi.endpoints