"use client";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/products",
        method: "POST",
        body: data,
      }),
    }),
    getAllProduct: builder.query({
      query: (page) => ({
        url: `/api/products?page=${page}`,
      }),
    }),
    getProductsByQuery: builder.query({
      query: (q) => ({
        url: `/api/products/query?q=${q}`,
      }),
    }),
    getProductById: builder.query<any, any>({
      query: (id: string) => ({
        url: `/api/products/${id}`,
      }),
    }),
    uploadImages: builder.mutation({
      query: (data) => ({
        url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_CLOUD_NAME}/image/upload`,
        method: "POST",
        body: data,
      }),
    }),
    productRating: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUploadImagesMutation,
  useProductRatingMutation,
  useGetProductsByQueryQuery,
} = productApiSlice;
