export const sellerOrders = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/sellerOrders/${id}`, {
      cache: "no-cache",
    });
    const orders = await res.json();
    return orders;
  } catch (error) {
    console.log(error);
  }
};
