import { FC } from "react";

interface PageProps {
  params: {
    productId: string;
  };
}

const page: FC<PageProps> = ({ params }) => {
  return <div>{params.productId}</div>;
};

export default page;
