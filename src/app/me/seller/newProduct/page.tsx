"use client";
import React, { ChangeEvent, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import {
  useCreateProductMutation,
  useUploadImagesMutation,
} from "@/features/slices/productSlice";
import Images from "@/components/ChoosenImages/Images";
import { toast } from "react-toastify";
import DisplayLoader from "@/components/Loader/DisplayLoader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import NotFound from "@/app/not-found";

interface newProductType {
  title: string;
  description: string;
  price: number;
  brand: string;
  isNew: boolean;
  category: string;
  subCategory: string;
  amount: number;
}

function usePage() {
  const [name, setName] = useState<newProductType>({
    title: "",
    description: "",
    price: 0,
    brand: "",
    isNew: false,
    category: "",
    subCategory: "",
    amount: 0,
  });
  const [images, setImages]: any = useState([]);
  const [thumbnail, setThumbnail] = useState<string>("");
  const imagesURL: any = [];
  const { userInfo } = useSelector((state: any) => state.auth);
  const router = useRouter();

  const handleImagesUpload = (e: any) => {
    if (e.target.name === "images") {
      const files = e.target.files;
      const newFiles = [...files].filter((file: any) => {
        if (file.size <= 2042 * 1024) {
          setImages((prev: any) => [...prev, file]);
        }
      });
    }
    if (e.target.name === "thumbnail") {
      const file = e.target.files[0];
      setThumbnail(file);
    }
  };

  const handleRemoveOneImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    setImages(newImages);
  };

  const [createProduct, { isLoading: loadingProductCreation }] =
    useCreateProductMutation();

  const [uploadImageMutation, { isLoading: uploadIsLoading }] =
    useUploadImagesMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.name === "isNew") {
      setName({ ...name, isNew: e.target.checked });
    } else {
      setName({ ...name, [e.target.name]: e.target.value });
    }
  };

  const handleUploadImage = async (imagesList: any, location: string) => {
    for (let i = 0; i < imagesList.length; i++) {
      const formData = new FormData();
      const file = imagesList[i];
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
      const res: any = await uploadImageMutation(formData);
      if (location === "images") {
        imagesURL.push(res.data.secure_url);
      }
      if (location === "thumbnail") {
        setThumbnail(res.data.secure_url);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (images.length > 5) {
      toast.error("Maximum file to upload is 5");
    }
    try {
      if (window.confirm("You Sure Creating?")) {
      await handleUploadImage(images, "images");
      const formData = new FormData();
      formData.append("file", thumbnail);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
      const res: any = await uploadImageMutation(formData);
      const productInformations = {
        title: name.title,
        description: name.description,
        price: name.price,
        brand: name.brand,
        isNew: name.isNew,
        category: name.category,
        subCategory: name.subCategory,
        amount: name.amount,
        imagesURlList: imagesURL,
        thumbnail: res.data.secure_url,
        owner: userInfo.msg._id,
      };
        const { data }: any = await createProduct(productInformations);
        toast.success("product created");
        router.push(`/me/seller/myProducts/${userInfo?.msg?._id}`);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {userInfo.msg.role === "seller" ? (
        <div className="relative max-w-[600px] text-xs md:text-sm md:mx-auto my-5 justify-center items-center border shadow-lg border-slate-300 rounded-md p-3 flex flex-col gap-2">
          {loadingProductCreation || (uploadIsLoading && <DisplayLoader />)}
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
                <label htmlFor="isNew">
                  Is New ({new Date().getFullYear()})
                </label>
                <input
                  type="checkbox"
                  name="isNew"
                  onChange={handleChange}
                  className="py-2 text-black indent-2 outline-none"
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

              <label htmlFor="description">
                Description
                <span className="text-red-400">*</span>
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
              <label htmlFor="image">
                Thumbnail <span className="text-red-400">*</span>
                <small>
                  <i>only one and image file is supported</i>
                </small>
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleImagesUpload}
                accept="image/*"
                required
              />
              <label htmlFor="image">
                Images <span className="text-red-400">*</span>
                <small>
                  <i>
                    only image file is supported, only files under 2mb will be
                    included,max 5 images
                  </i>
                </small>
              </label>
              <input
                type="file"
                maxLength={5}
                name="images"
                onChange={handleImagesUpload}
                multiple
                accept="image/*"
                required
              />
              <div className="w-full flex gap-2 overflow-x-auto shadow-md rounded-md p-2 my-3 bg-slate-950 bg-opacity-0 no-scrollbar">
                {images.map((image: any, index: number) => (
                  <Images
                    key={index}     
                    url={URL.createObjectURL(image)}
                    width={200}
                    height={300}
                    click={() => handleRemoveOneImage(index)}
                    className="h-12 w-20"
                  />
                ))}
              </div>
              <button
                className="bg-green-400 p-2 rounded-sm scale-90 hover:scale-100 text-amazon_light hover:text-black duration-300"
                type="submit"
              >
                Submit/ Add
              </button>
            </form>
          </div>
        </div>
      ): <NotFound />}
    </>
  );
}
export default usePage;
