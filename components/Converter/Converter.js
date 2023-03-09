import { AppContext } from "@/pages";
import React, { useContext, useState, useRef } from "react";

function Converter() {
  const store = useContext(AppContext);
  const { USD, EUR, UAH } = store;
  const currencies = ["USD", "UAH", "EUR"];
  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");

  const fromCurrencyInput = useRef(null);
  const toCurrencyInput = useRef(null);
  const fromCurrency = useRef(null);
  const toCurrency = useRef(null);

  const handleCurrencyChange = (side) => {
    const fromSelector = fromCurrency.current.value;
    const toSelector = toCurrency.current.value;
    const rates = {
      USD: { UAH: USD.UAH, EUR: USD.EUR },
      UAH: { USD: UAH.USD, EUR: UAH.EUR },
      EUR: { USD: EUR.USD, UAH: EUR.UAH },
    };
    const fromCurrencyNum = fromCurrencyInput.current.value;
    const toCurrencyNum = toCurrencyInput.current.value;
    if (side === "from") {
      if (fromCurrencyNum >= 0) {
        const rate = rates[fromSelector][toSelector] || 1;
        setFromCurrencyValue(fromCurrencyNum);
        setToCurrencyValue((fromCurrencyNum * rate).toFixed(4));
      }
    }
    if (side === "to") {
      if (toCurrencyNum >= 0) {
        const rate = rates[toSelector][fromSelector] || 1;
        setFromCurrencyValue((toCurrencyNum * rate).toFixed(4));
        setToCurrencyValue(toCurrencyNum);
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          value={fromCurrencyValue}
          ref={fromCurrencyInput}
          onChange={() => handleCurrencyChange("from")}
        ></input>
        <select
          name="fromCurrency"
          id="fromCurrency"
          defaultValue="USD"
          ref={fromCurrency}
          onChange={() => handleCurrencyChange("from")}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="number"
          ref={toCurrencyInput}
          value={toCurrencyValue}
          onChange={() => handleCurrencyChange("to")}
        />
        <select
          name="toCurrency"
          id="toCurrency"
          defaultValue="UAH"
          ref={toCurrency}
          onChange={() => handleCurrencyChange("to")}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Converter;
