"use client";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../features/slices/orderSliceApi";
import Button from "@/components/Button/Button";
import { removeAllCart } from "@/features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
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
    setOrderMutation(userData)
      .then((x) => dispatch(removeAllCart()))
      .then((x) => toast.success("order have set successfully"))
      .then((res) => clicked())
      .catch((err) => console.log(err));
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
