"use client";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   registerUser : builder.mutation({
    query: (data) => ({
        url: "/api/products",
        method: "POST",
        body: data,
    }),
    invalidatesTags: ['Users']
   })
  }),
});

export const {useRegisterUserMutation} = productApiSlice
