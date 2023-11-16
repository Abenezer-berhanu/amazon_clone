import React from "react";

function Button({click}:any) {
  return (
    <button className="bg-amazon_blue hover:bg-amazon_yellow duration-300 mt-2 rounded-md w-fit text-md flex-grow-0 text-white px-2 py-1 hover:text-black"
    onClick={click}
    >
      Checkout
    </button>
  );
}

export default Button;