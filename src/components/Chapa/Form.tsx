"use client";
import { useState } from "react";
import {useSelector} from 'react-redux'

const publicKey = process.env.NEXT_PUBLIC_CHAPA_PUBLIC_KEY;
const randomRef = Math.random() + Date.now();
function Form() {
  const {additionalFees} = useSelector((state:any)=> state.cart)
  let paymentAmount: number = additionalFees?.totalPrice

  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(paymentAmount);

  const handleOrder = () => {
    console.log("put order here")
  }


  return (
    <form method="POST" action="https://api.chapa.co/v1/hosted/pay" onSubmit={handleOrder}>
      <div className="grid gap-2 w-full place-items-center m-auto border border-t-2 shadow-md p-2">
        <h2 className="text-xl mdl:text-3xl text-slate-700 font-bold tracking-wider font-sans text-center m-2">
          Pay
        </h2>
        <span>
          <small className="flex flex-col gap-1">
            <label className="tex-xs font-semibold text-amazon_light">
              First Name:
            </label>
            <input
              type="text"
              required
              value={Fname}
              onChange={(e) => setFname(e.target.value)}
              className="px-2 py-1 shadow-sm rounded-sm outline-none border border-slate-600 w-full"
              placeholder="john.."
            />
          </small>
        </span>
        <span>
          <small className="flex flex-col gap-1">
            <label className="tex-xs font-semibold text-amazon_light">
              Last Name:
            </label>
            <input
              type="text"
              required
              value={Lname}
              onChange={(e) => setLname(e.target.value)}
              className="px-2 py-1 shadow-sm rounded-sm outline-none border border-slate-600 w-full"
              placeholder="dow.."
            />
          </small>
        </span>
        <span>
          <small className="flex flex-col gap-1">
            <label className="tex-xs font-semibold text-amazon_light">
              Email:{" "}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-1 shadow-sm rounded-sm outline-none border border-slate-600 w-full"
              placeholder="example@...com"
            />
          </small>
        </span>
      </div>
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="public_key"
        value={publicKey}
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="tx_ref"
        value={randomRef}
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="amount"
        value={amount}
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="currency"
        value="ETB"
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="email"
        value={email}
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="first_name"
        value={Fname}
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="last_name"
        value={Lname}
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="title"
        value="Payment"
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="description"
        value="Paying with Confidence with cha"
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="logo"
        value="https://chapa.link/asset/images/chapa_swirl.svg"
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="callback_url"
        value="https://example.com/callbackurl"
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="return_url"
        value="http://localhost:3000/cart"
      />
      <input
        type="hidden"
        className="border-4 border-slate-800 rounded-sm mb-2"
        name="meta[title]"
        value="test"
      />
      <button
        type="submit"
        className="text-white font-semibold px-2 py-1 hover:bg-green-500 active:bg-green-600 shadow-sm text-lg rounded-sm bg-green-600 m-2"
      >
        Pay Now
      </button>
    </form>
  );
}

export default Form;
