export const addDecimal = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed();
};

export const updateCartItems = (state: any) => {
  state.additionalFees.itemsPrice = addDecimal(
    Number(
      state.cartItems.reduce(
        (acc: number, cur: any) => acc + cur.price * cur.qty,
        0
      )
    )
  );
  state.additionalFees.tax = addDecimal(
    Number(state.additionalFees.itemsPrice * 0.15)
  );

  state.additionalFees.shippingFee = addDecimal(
    Number(state.additionalFees.itemsPrice > 1000 ? 0 : 100)
  );
  state.additionalFees.totalPrice = addDecimal(
    Number(state.additionalFees.itemsPrice) +
      Number(state.additionalFees.shippingFee) +
      Number(state.additionalFees.tax)
  );
  typeof window !== 'undefined' ? window.localStorage.setItem("ab_am_ca_rt", JSON.stringify(state)) : ""
};
