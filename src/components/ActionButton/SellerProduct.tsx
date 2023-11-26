"use client";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { handleDelete } from "../../../Actions/deleteProduct";
import { toast } from "react-toastify";

function SellerProduct({ id }: any) {
  const router = useRouter();

  return (
    <>
      <MdDelete
        onClick={() => {
          if (confirm("Are you sure You want do delete?")) {
            handleDelete(id);
            toast.success("Product Deleted");
            router.refresh();
          }
        }}
      />
    </>
  );
}

export default SellerProduct;
