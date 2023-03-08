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
  const [usd, setUsd] = useState({});
  const [eur, setEur] = useState({});
  const [uah, setUah] = useState({});

  const [fromCurrencyValue, setFromCurrencyValue] = useState(undefined);
  const [toCurrencyValue, setToCurrencyValue] = useState(undefined);

  const fromCurrencyInput = useRef(null);
  const toCurrencyInput = useRef(null);
  const fromCurrency = useRef(null);
  const toCurrency = useRef(null);

  const handlerChangingFromCurrency = () => {
    const fromSelector = fromCurrency.current.value;
    const fromCurrencyNum = fromCurrencyInput.current.value;
    const toSelector = toCurrency.current.value;
    const rates = {
      USD: { UAH: usd.UAH, EUR: usd.EUR },
      UAH: { USD: uah.USD, EUR: uah.EUR },
      EUR: { USD: eur.USD, UAH: eur.UAH },
    };
    const rate = rates[fromSelector][toSelector] || 1;
    setToCurrencyValue((fromCurrencyNum * rate).toFixed(4));
  };

  const handlerChangingToCurrency = () => {
    const fromSelector = fromCurrency.current.value;
    const toSelector = toCurrency.current.value;
    const toCurrencyNum = toCurrencyInput.current.value;
    const rates = {
      USD: { UAH: usd.UAH, EUR: usd.EUR },
      UAH: { USD: uah.USD, EUR: uah.EUR },
      EUR: { USD: eur.USD, UAH: eur.UAH },
    };
    const rate = rates[toSelector][fromSelector] || 1;
    setFromCurrencyValue((toCurrencyNum * rate).toFixed(4));
  };

  useEffect(() => {
    getInfo("USD").then((res) => {
      setUsd(res);
    });
    getInfo("UAH").then((res) => {
      setUah(res);
    });
    getInfo("EUR").then((res) => {
      setEur(res);
    });
  }, []);

  return (
    <>
      <div>
        <div>{usd.UAH}</div>
        <div>{eur.UAH}</div>
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
