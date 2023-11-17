"use client";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../features/slices/orderSliceApi";
import Button from "@/components/Button/Button";
import { removeAllCart, storeTemp } from "@/features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SetOrder({ clicked }: any) {
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, additionalFees } = useSelector(
    (state: any) => state.cart
  );
  const { userInfo } = useSelector((state: any) => state.auth);
  const [setOrderMutation, { isLoading }] = useCreateOrderMutation();
  const userData = {
    userId: userInfo.msg._id,
    orderItems: cartItems.map((x: any) => {
      return {
        title: x.title,
        qty: x.qty,
        image: x.image,
        price: x.price,
        product: x._id,
      };
    }),
    shippingAddress: {
      country: shippingAddress.userCountry,
      city: shippingAddress.userCity,
      phoneNumber: shippingAddress.userPhone,
      receiverName: shippingAddress.userName,
    },
    paymentMethod: shippingAddress.paymentMethod || "cash",
    itemsPrice: additionalFees.itemsPrice,
    taxPrice: additionalFees.tax,
    shippingPrice: additionalFees.shippingFee,
    totalPrice: additionalFees.totalPrice,
    isPaid:
      shippingAddress.paymentMethod === "chapa" ||
      shippingAddress.paymentMethod === "stripe"
        ? true
        : false,
  };
  async function createOrder() {
    try {
      await setOrderMutation(userData)
      dispatch(removeAllCart())
      toast.success('order have set successfully')
      clicked()
      return redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Button
        click={createOrder}
        text={isLoading ? "Loading..." : "set Order"}
      />
    </>
  );
}

    // setOrderMutation(userData)
    //   .then((x: any) => dispatch(removeAllCart()))
    //   .then((y) => toast.success("order have set successfully"))
    //   .then((z: any) => clicked(z.data.msg._id))
    //   .catch((err) => console.log(err));