import Image from "next/image";
import React from "react";
import loader from "./updatess.gif";

function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-[100px]">
      <Image src={loader} alt="loader" />
    </div>
  );
}

export default Loader;
