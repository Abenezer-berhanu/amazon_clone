import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  return (
    <>
      <input
        type="text"
        className="w-full h-[50%] rounded-md indent-3 placeholder:text-amazon_light text-black"
        placeholder="search amazon products.."
      />
      <div className="bg-amazon_yellow text-amazon_blue text-2xl flex items-center justify-center h-[50%] p-2 absolute right-0 rounded-tr-md rounded-br-md">
        <AiOutlineSearch />
      </div>
    </>
  );
}

export default Search;
