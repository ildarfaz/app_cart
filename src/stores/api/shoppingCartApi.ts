import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/shoppingcart' }),
  endpoints: (builder) => ({
    getBaskedSummary: builder.query({
      query: () => `/baskedsummary`,
    }),
    getProducts: builder.query({
      query: () => `/products`,
    }),
    getHeader: builder.query({
      query: () => `/header`,
    }),
    incProductQuantity: builder.mutation({
      query: ({ ProductId, UserGuid }) => ({
        url: `/quantityinc`,
        method: 'POST',
        body: {
          ProductId,
          UserGuid
        }
      }),
    }),
    decProductQuantity: builder.mutation({
      query: ({ ProductId, UserGuid }) => ({
        url: `/quantitydec`,
        method: 'POST',
        body: {
          ProductId,
          UserGuid
        }
      }),
    }),
    delProductCart: builder.mutation({
      query: ({ ProductId, UserGuid }) => ({
        url: `/product`,
        method: 'DELETE',
        body: {
          ProductId,
          UserGuid
        }
      }),
    }),
    delCart: builder.mutation({
      query: () => ({
        url: `/products`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBaskedSummaryQuery,
  useGetProductsQuery,
  useGetHeaderQuery,
  useIncProductQuantityMutation,
  useDecProductQuantityMutation,
  useDelCartMutation,
  useDelProductCartMutation } = shoppingCartApi;