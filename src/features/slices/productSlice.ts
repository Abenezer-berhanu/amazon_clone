"use client";
import { ProductProps } from "../../../type";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProduct: builder.query<any, void>({
      query: () => ({
        url: "/api/products",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductQuery } =
  productApiSlice;
