"use client";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   registerUser : builder.mutation({
    query: (data) => ({
        url: "/api/signup",
        method: "POST",
        body: data,
    }),
   }),
   userExist: builder.mutation({
    query: (data) => ({
        url: "/api/userExists",
        method: "POST",
        body: data,
    })
   }),
   
  }),
});

export const {useRegisterUserMutation, useUserExistMutation} = productApiSlice

