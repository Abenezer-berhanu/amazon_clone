export const getAllProducts = async() => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products`,
            { cache: "no-cache" }
          );
          const result = await res.json();
          return result;
        } catch (error: any) {
          console.log(error);
        }
}