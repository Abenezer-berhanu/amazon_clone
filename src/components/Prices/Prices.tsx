import PriceRounder from "@/utils/PriceRounder";
import React from "react";

function Prices({ oldPrice, price }: any) {
  return (
    oldPrice ? (
      <div className="flex gap-2 items-center font-semibold">
      <span className="text-sm text-slate-500 line-through">
        <PriceRounder amount={Number(oldPrice)} />
      </span>
      <span>
        <PriceRounder amount={Number(price)} />
      </span>
    </div>
    ) : (
      <div className="flex gap-2 items-center font-semibold">
      <span>
        <PriceRounder amount={Number(price)} />
      </span>
    </div>
    )
  );
}

export default Prices;
