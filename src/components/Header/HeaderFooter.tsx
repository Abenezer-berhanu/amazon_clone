import { AiOutlineMenu } from "react-icons/ai";

function HeaderFooter() {
  return (
    <div className="flex p-3 text-sm items-center gap-3 text-white bg-amazon_light sticky top-20 z-50">
      <p className="justify-center flex items-center gap-1 border border-transparent hover:border-white cursor-pointer duration300">
        <AiOutlineMenu />
        All
      </p>
      <p className="hidden md:inline-flex  hover:border-white">Todays Deals</p>
      <p className="hidden md:inline-flex hover:border-white">
        Customer Service
      </p>
      <p className="hidden md:inline-flex hover:border-white">Registry</p>
      <p className="hidden md:inline-flex hover:border-white">Gift Cards</p>
      <p className="hidden md:inline-flex hover:border-white">Sell</p>
      <p className="font-bold text-amazon_yellow hidden md:inline-flex border border-transparent hover:border-white cursor-pointer duration300">
        Sign Out
      </p>
    </div>
  );
}

export default HeaderFooter;
