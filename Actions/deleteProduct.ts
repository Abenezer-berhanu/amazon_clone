export const handleDelete = async (id: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    {
      method: "DELETE",
    }
  );
  return res;
};
