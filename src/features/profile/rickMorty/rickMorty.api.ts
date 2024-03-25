import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RickMortyDataType } from './rickMorty.types'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://rickandmortyapi.com/api',
})

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: build => {
    return {
      getAvatars: build.query<RickMortyDataType, number>({
        query: (page) => {
          console.log(page)
          return {
            method: 'GET',
            url: `character/?page=${page}`
          }
        }
      })
    }
  },
})

export const {
  useGetAvatarsQuery,
} = rickMortyApi