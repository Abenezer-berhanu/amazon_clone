"use client";
import { useSelector } from "react-redux";
import Cart from "@/components/Cart/Cart";


function useCart() {
  const { cartItems } = useSelector((state: any) => state.cart);
  return (
    <div>
      {cartItems.length > 0 ? (
        <Cart products={cartItems} key={cartItems._id} />
      ) : (
        // <Products productsList={cartItem} key={cartItem._id}/>
        <div className="m-5 border border-slate-900 p-3 rounded-md border-opacity-20 shadow-md">
          <h1 className="font-bold text-center text-2xl">Cart is Empty</h1>
        </div>
      )}
      {/* <video controls src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'} /> */}
    </div>
  );
}

export default useCart;
