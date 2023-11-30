"use client";
import { Country, City } from "country-state-city";
import React, { useEffect, useState } from "react";
import { addShippingInfo } from "@/features/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import SetOrder from "@/utils/SetOrder";


function usePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userCountryInfo, setUserCountryInfo]: any = useState("Ethiopia");
  const [userCountry, setUserCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCity, setUserCity] = useState("");
  const [cities, setCities]: any = useState([]);

  const { cartItems, shippingAddress } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);

  const userId = userInfo?.msg?._id;
  const shippingInfo = {
    userCountry,
    userName,
    userPhone,
    userCity,
    paymentMethod,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paymentChoise = shippingAddress?.paymentMethod
    if (paymentChoise === "chapa") {
      router.push("/cart/shipping/payment/chapaPay");
    } else if (paymentChoise === "stripe") {
      router.push("/cart/shipping/payment/stripePay");
    }
  };

  useEffect(() => {
    dispatch(addShippingInfo(shippingInfo));
  }, [userCountry, paymentMethod, userName, userPhone, userCity]);

  useEffect(() => {
    setUserCountry(userCountryInfo.name);
  }, [userCountryInfo]);

  return (
    <>
      {cartItems?.length > 0 && userInfo?.msg.role === 'buyer' ? (
        <div className="flex flex-col justify-center gap-4 p-5 items-center">
          <div className="max-w-[900px]">
            {/* payment method */}
            <div className="grid gap-1 mb-3">
              <p className="text-lg font-bold tracking-wide">
                Payment Method:{" "}
              </p>
              <select
                className="border-none outline-none text-sm font-semibold tracking-wider text-amazon_light"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option
                  value=""
                  className="text-xs font-semibold tracking-wider"
                >
                  select payment method
                </option>
                <option
                  value="chapa"
                  className="text-xs font-semibold tracking-wider"
                  disabled
                >
                  Chapa
                </option>
                <option
                  value="stripe"
                  className="text-xs font-semibold tracking-wider"
                  disabled
                >
                  Stripe
                </option>
                <option
                  value="cash"
                  className="text-xs font-semibold tracking-wider"
                >
                  After receive
                </option>
              </select>
            </div>

            {/* shipping address */}
            <div className="border-t-2 border-black">
              <p className="text-lg font-bold tracking-wide">
                Delivery Address:{" "}
              </p>
              <div className="py-2 text-black text-sm">
                <form onSubmit={handleSubmit}>
                  <label className="font-semibold">country: </label>
                  <select
                    onChange={(e) => {
                      setUserCountryInfo(
                        Country.getCountryByCode(e.target.value)
                      );
                      setCities(City.getCitiesOfCountry(e.target.value));
                    }}
                    required
                    className="w-full outline-none"
                  >
                    <option value="">select Country</option>
                    {Country.getAllCountries().map((country, index) => {
                      return (
                        <option key={index} value={country.isoCode}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>

                  <p className="font-semibold pt-3">City: </p>
                  <select
                    className="w-full outline-none"
                    onChange={(e) => setUserCity(e.target.value)}
                    required
                  >
                    <option value="">select City</option>
                    {cities.map((city: any, index: number) => {
                      return (
                        <option key={index} value={city.name}>
                          {city.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="font-semibold pt-3">Phone Number: </p>
                  <div className="relative">
                    <p className="text-xs px-1 py-1 absolute left-0 top-0 border-r-2 border-slate-600 min-w-[40px] bg-slate-600 bg-opacity-30 h-full">
                      <small>+{userCountryInfo.phonecode}</small>
                    </p>
                    <input
                      type="tel"
                      required
                      className="w-full outline-none px-2 py-1 indent-11 text-xs"
                      placeholder="123-45-678-9"
                      onChange={(e) => setUserPhone(e.target.value)}
                    />
                  </div>
                  <small className="text-green-700 font-semibold pt-2 mb-3">
                    <i>
                      <p>Format: 9xxxxxxxxxx</p>
                    </i>
                  </small>
                  <p className="font-semibold pt-3">Receiver ID Name:</p>
                  <input
                    type="text"
                    required
                    placeholder="Receiver ID Name"
                    className="outline-none px-2 py-1 indent-1 text-xs w-full "
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {userCountry &&
                  userCity &&
                  paymentMethod &&
                  userName &&
                  userPhone ? (
                    paymentMethod !== "cash" ? (
                      <Button text={"Pay"} />
                    ) : (
                      <SetOrder
                        clicked={() => router.push(`/user/profile/${userId}`)}
                      />
                    )
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center w-full text-2xl font-bold ">
          Please check your profile!
        </div>
      )}
    </>
  );
}

export default usePage;
