"use client";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
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
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/api/signin",
        method: "POST",
        body: data,
      }),
    }),
    loginOut: builder.mutation({
      query: () => ({
        url: "/api/logout",
        method: 'POST'
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUserExistMutation,
  useLoginUserMutation,
  useLoginOutMutation
} = productApiSlice;
