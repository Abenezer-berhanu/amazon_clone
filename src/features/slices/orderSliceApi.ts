"use client";
import { apiSlice } from "./apiSlice";

export const orderSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/api/order",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderSliceApi;
