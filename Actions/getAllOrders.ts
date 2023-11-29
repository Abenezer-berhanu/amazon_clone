export const getAllOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders`,
        { cache: "no-cache" }
      );
      const result = await res.json();
      return result;
    } catch (error: any) {
      console.log(error);
    }
  };
  