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
    getAllProduct: builder.query<any, void>({
      query: () => ({
        url: "/api/products",
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
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUploadImagesMutation,
} = productApiSlice;
