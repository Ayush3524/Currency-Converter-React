/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { convertCurrency } from "../../api/apiData";
import { useQuery } from "@tanstack/react-query";

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const currencies = ["USD", "INR", "EUR", "GBP", "AUD"];

  const {
    data: convertedAmmount,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: () => convertCurrency(fromCurrency, toCurrency, amount),
    enabled: false,
  });

  const handleCurrencyConversion = (e) => {
    e.preventDefault();

    if (amount > 0) {
      refetch();
    }
  };

  return (
    <div className="p-4 h-lvh flex justify-center items-center">
      <div className="p-10 text-2xl flex flex-col gap-5 bg-white rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl capitalize font-bold">Convert Currency</h2>
        </div>
        <form
          onSubmit={handleCurrencyConversion}
          className="flex flex-col gap-5"
        >
          <div>
            <label htmlFor="input"></label>
            <input
              type="number"
              className="p-2 rounded-lg border border-gray-600"
              placeholder="Enter ammount to convert"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label htmlFor="fromCurrency" className="text-gray-600">
                From:
              </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map((currency, index) => {
                  return (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="toCurrency" className="text-gray-600">
                To:
              </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map((currency, index) => {
                  return (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <button
              disabled={amount <= 0}
              className="py-2 px-4 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              Convert
            </button>
          </div>
          <hr />
          {isLoading ? (
            <div className="text-center">Converting..</div>
          ) : (
            convertedAmmount && (
              <div className="text-center">
                {amount} {fromCurrency} ={" "}
                <span className="text-red-500">{convertedAmmount}</span>{" "}
                {toCurrency}
              </div>
            )
          )}
          {error && <div className="text-center">{error.message}</div>}
        </form>
      </div>
    </div>
  );
};
