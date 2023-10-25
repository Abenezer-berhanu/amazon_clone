'use client'
import Products from "@/components/Products/Products";
import { useSelector } from "react-redux"
import { ProductProps } from "../../../type";

function useCart() {
  const { cartItems } = useSelector((state: any) => state.cart);
  return (
    <div>
      {cartItems.length > 0 ?  (
        <Products productsList={cartItems} key={cartItems._id}/>
        // <Products productsList={cartItem} key={cartItem._id}/>
      ) : <div className="m-5">
        <h1 className="font-bold text-center text-2xl">Cart is Empty</h1>
        </div>}
    </div>
  )
}

export default useCart