"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";

function Search() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (query.length < 3) {
      toast.warn("search min character is 3");
    } else {
      router.push(`/search/?search=${query}`);
    }
  };
  
  return (
    <form
      className="relative w-full h-full flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full h-[50%] rounded-md indent-3 placeholder:text-amazon_light text-black"
        placeholder="search amazon products.."
        onChange={(e: any) => setQuery(e.target.value)}
      />
      <button
        className="bg-amazon_yellow text-amazon_blue text-2xl flex items-center justify-center h-[50%] p-2 absolute hover:cursor-pointer top-5 right-0 rounded-tr-md rounded-br-md"
        disabled={query.length > 0 ? false : true}
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
}

export default Search;
