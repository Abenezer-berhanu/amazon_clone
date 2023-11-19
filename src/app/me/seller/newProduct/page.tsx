"use client";
import React, { ChangeEvent, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { useCreateProductMutation } from "@/features/slices/productSlice";

interface newProductType {
  title: "";
  description: "";
  price: 0;
  brand: "";
  image: [];
  isNew: false;
  category: "";
  subCategory: "";
  amount: 0;
}

function usePage() {
  const [name, setName] = useState<newProductType>({
    title: "",
    description: "",
    price: 0,
    brand: "",
    image: [],
    isNew: false,
    category: "",
    subCategory: "",
    amount: 0,
  });

  const [
    createProduct,
    { isLoading: loadingProductCreation, error: errorProductCreation },
  ] = useCreateProductMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.files) {
      setName({ ...name, subCategory: e.target.files[0] });
    }
    if (e.target.name === "isNew") {
      setName({ ...name, isNew: e.target.checked });
    } else {
      setName({ ...name, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      console.log(name);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[600px] text-xs md:text-sm md:mx-auto my-5 justify-center items-center border shadow-lg border-slate-300 rounded-md p-3 flex flex-col gap-2">
      <h1 className="font-bold tracking-wider text-lg md:text-xl">
        Post New Product
      </h1>
      <div className="flex w-full justify-between font-semibold p-2 items-center border border-slate-300 rounded-sm">
        <p>Enter New Product Detail.</p>
        <button className="flex items-center justify-center px-2 py-1 text-red-400 scale-90 hover:scale-95 duration-300 bg-red-400 bg-opacity-50 hover:text-red-500 hover:bg-opacity-60 rounded-sm">
          <MdOutlineClear className="text-xl" />
          Cancel
        </button>
      </div>
      <hr />
      <div className=" w-full font-semibold text-amazon_blue border border-t-black p-2">
        <form
          className="grid place-items-start w-full flex-shrink-0 gap-1"
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">
            Product Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="py-2 text-black indent-2 w-full outline-none mb-2"
            required
            placeholder="Enter name"
          />
          <label htmlFor="brand">
            Brand <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="brand"
            onChange={handleChange}
            className="py-2 text-black indent-2 w-full outline-none mb-2"
            required
            placeholder="Enter brand(IPhone)"
          />
          <label htmlFor="price">
            Price <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            className="py-2 text-black indent-2 w-full outline-none mb-2"
            required
            placeholder="Enter Price"
          />
          <label htmlFor="amount">
            Amount(count in stock) <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            className="py-2 text-black bg-white indent-2 w-full outline-none mb-2"
            required
            placeholder="count in stock"
          />
          <span className="flex gap-2 items-center justify-between my-2 border-opacity-10 rounded-sm bg-white border border-slate-800 p-2 w-full">
            <label htmlFor="isNew">Is New ({new Date().getFullYear()})</label>
            <input
              type="checkbox"
              name="isNew"
              onChange={handleChange}
              className="py-2 text-black indent-2 outline-none"
              required
            />
          </span>
          <label htmlFor="category">
            Category <span className="text-red-400">*</span>
          </label>
          <select onChange={handleChange} name="category" required>
            <option value="">select category</option>
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="other">Other</option>
          </select>
          <span className="my-3 w-full">
            <label htmlFor="subCategory">
              Sub Category <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="subCategory"
              onChange={handleChange}
              className="py-2 text-black indent-2 w-full outline-none mb-2"
              required
              placeholder="sub category(Phone, Laptop, Tv...)"
            />
          </span>

          <label htmlFor="image">
            Images <span className="text-red-400">*</span>
          </label>
          <input
            aria-required
            type="file"
            name="image"
            onChange={handleChange}
            className="py-2 text-black bg-white indent-2 w-full outline-none mb-2"
            required
            placeholder="Enter name"
          />
          <label htmlFor="description">
            Description<span className="text-red-400">*</span>
          </label>
          <textarea
            rows={4}
            cols={50}
            name="description"
            onChange={handleChange}
            className="py-2 text-black indent-2 w-full outline-none mb-2"
            required
            placeholder="Enter name"
          />
          <button
            className="bg-green-400 p-2 rounded-sm scale-90 hover:scale-100 text-amazon_light hover:text-black duration-300"
            type="submit"
          >
            Submit/ Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default usePage;
