import axios from "axios";
import { useEffect, useState, useRef } from "react";

const dataUrl =
  "https://v6.exchangerate-api.com/v6/25db39558041378c50ec0774/latest/";

export async function getInfo(currency = null) {
  try {
    const res = await axios.get(`${dataUrl}${currency}`);
    let obj = {};
    if (currency === "USD") {
      obj = {
        UAH: res.data.conversion_rates.UAH,
        EUR: res.data.conversion_rates.EUR,
      };
    } else if (currency === "UAH") {
      obj = {
        USD: res.data.conversion_rates.USD,
        EUR: res.data.conversion_rates.EUR,
      };
    } else {
      obj = {
        USD: res.data.conversion_rates.USD,
        UAH: res.data.conversion_rates.UAH,
      };
    }

    if (Object.keys(obj).length > 0) return obj;

    console.error("Cannot get data");
    return null;
  } catch (error) {
    throw new Error(error);
  }
}

export default function Home() {
  const currencies = ["USD", "UAH", "EUR"];
  const [USD, setUSD] = useState({});
  const [EUR, setEUR] = useState({});
  const [UAH, setUAH] = useState({});

  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");

  const fromCurrencyInput = useRef(null);
  const toCurrencyInput = useRef(null);
  const fromCurrency = useRef(null);
  const toCurrency = useRef(null);

  const handlerChangingFromCurrency = () => {
    const fromSelector = fromCurrency.current.value;
    const fromCurrencyNum = fromCurrencyInput.current.value;
    const toSelector = toCurrency.current.value;

    const rates = {
      USD: { UAH: USD.UAH, EUR: USD.EUR },
      UAH: { USD: UAH.USD, EUR: UAH.EUR },
      EUR: { USD: EUR.USD, UAH: EUR.UAH },
    };
    const rate = rates[fromSelector][toSelector] || 1;
    setToCurrencyValue((fromCurrencyNum * rate).toFixed(4));
  };

  const handlerChangingToCurrency = () => {
    const fromSelector = fromCurrency.current.value;
    const toSelector = toCurrency.current.value;
    const toCurrencyNum = toCurrencyInput.current.value;

    const rates = {
      USD: { UAH: USD.UAH, EUR: USD.EUR },
      UAH: { USD: UAH.USD, EUR: UAH.EUR },
      EUR: { USD: EUR.USD, UAH: EUR.UAH },
    };
    const rate = rates[toSelector][fromSelector] || 1;
    setFromCurrencyValue((toCurrencyNum * rate).toFixed(4));
  };

  useEffect(() => {
    getInfo("USD").then((res) => {
      setUSD(res);
    });
    getInfo("UAH").then((res) => {
      setUAH(res);
    });
    getInfo("EUR").then((res) => {
      setEUR(res);
    });
  }, []);

  return (
    <>
      <div>
        <div>{USD.UAH}</div>
        <div>{EUR.UAH}</div>
      </div>
      <div>
        <div>
          <input
            type="number"
            defaultValue={fromCurrencyValue}
            ref={fromCurrencyInput}
            onChange={() => handlerChangingFromCurrency()}
          ></input>
          <select
            name="fromCurrency"
            id="fromCurrency"
            defaultValue="USD"
            ref={fromCurrency}
            onChange={() => handlerChangingFromCurrency()}
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
            defaultValue={toCurrencyValue}
            onChange={() => handlerChangingToCurrency()}
          />
          <select
            name="toCurrency"
            id="toCurrency"
            defaultValue="UAH"
            ref={toCurrency}
            onChange={() => handlerChangingToCurrency()}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
