export const getOrderDetail = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/orderDetail/${id}`
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
