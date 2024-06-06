import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Cocktail } from "./cocktails.types";

export const cocktailsApi = createApi({
  reducerPath: "cocktailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://www.thecocktaildb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    getCocktails: builder.query<Cocktail[], string>({
      query: (search) => `search.php?s=${search}`,
      transformResponse: ({ drinks }) => drinks,
    }),
    getCocktailById: builder.query<Cocktail, number>({
      query: (id) => `/lookup.php?i=${id}`,
      transformResponse: ({ drinks }) => drinks[0],
    }),
  }),
});

export const { useGetCocktailsQuery, useLazyGetCocktailByIdQuery } =
  cocktailsApi;
