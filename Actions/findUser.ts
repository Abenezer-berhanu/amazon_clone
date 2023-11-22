export const getUserInfo = async (id: { id: string | number }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,{cache: "no-cache"}
    );
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};
