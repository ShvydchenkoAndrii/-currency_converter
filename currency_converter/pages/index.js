import axios from "axios";
import React from "react";
import { useEffect, useState, useRef } from "react";

const dataUrl =
  "https://v6.exchangerate-api.com/v6/79e091ef1491c2a9b0fb1c92/latest/";

export async function getInfo(currency = " ") {
  let dataUSD = 1;
  let dataUAH = 1;
  let dataEUR = 1;
  let arr = [];
  try {
    await axios
      .get(`${dataUrl}${currency}`)
      .then((res) => {
        if (currency === "USD") {
          dataUAH = res.data.conversion_rates.UAH;
          dataEUR = res.data.conversion_rates.EUR;
          arr.push(dataUAH, dataEUR);
        } else if (currency === "UAH") {
          dataUSD = res.data.conversion_rates.USD;
          dataEUR = res.data.conversion_rates.EUR;
          arr.push(dataUSD, dataEUR);
        } else {
          dataUSD = res.data.conversion_rates.USD;
          dataUAH = res.data.conversion_rates.UAH;
          arr.push(dataUSD, dataUAH);
        }
      })
      .catch((err) => console.log(err));

    if (arr.length > 0) return arr;

    return console.error("Cannot get data");
  } catch (error) {
    throw new Error(error);
  }
}

export default function Home() {
  const [usd, setUsd] = useState([]);
  const [eur, setEur] = useState([]);
  const [uah, setUah] = useState([]);
  
  const [fromCurrencyValue, setFromCurrencyValue] = useState([]);
  const [toCurrencyValue, setToCurrencyValue] = useState([]);

  const fromCurrencyInput = useRef(null);
  const toCurrencyInput = useRef(null);
  const fromCurrency = useRef(null);
  const toCurrency = useRef(null);
 
  const handlerChangingFromCurrency = () => {
    const fromSelector = fromCurrency.current.value;
    const fromCurrencyNum = fromCurrencyInput.current.value;
    const toSelector = toCurrency.current.value;

    if (fromSelector === "usd" && toSelector === "uah") {
      setToCurrencyValue((fromCurrencyNum * usd[0]).toFixed(4));
    } else if (fromSelector === "usd" && toSelector === "eur") {
      setToCurrencyValue((fromCurrencyNum * usd[1]).toFixed(4));
    } else if (fromSelector === "uah" && toSelector === "usd") {
      setToCurrencyValue((fromCurrencyNum * uah[0]).toFixed(4));
    } else if (fromSelector === "uah" && toSelector === "eur") {
      setToCurrencyValue((fromCurrencyNum * uah[1]).toFixed(4));
    } else if (fromSelector === "eur" && toSelector === "usd") {
      setToCurrencyValue((fromCurrencyNum * eur[0]).toFixed(4));
    } else if (fromSelector === "eur" && toSelector === "uah") {
      setToCurrencyValue((fromCurrencyNum * eur[1]).toFixed(4));
    } else {
      setToCurrencyValue(fromCurrencyNum);
    }
  };

  const handlerChangingToCurrency = () => {
    const fromSelector = fromCurrency.current.value;
    const toSelector = toCurrency.current.value;
    const toCurrencyNum = toCurrencyInput.current.value;
    if (fromSelector === "usd" && toSelector === "uah") {
      setFromCurrencyValue((toCurrencyNum * usd[0]).toFixed(4));
    } else if (fromSelector === "usd" && toSelector === "eur") {
      setFromCurrencyValue((toCurrencyNum * usd[1]).toFixed(4));
    } else if (fromSelector === "uah" && toSelector === "usd") {
      setFromCurrencyValue((toCurrencyNum * uah[0]).toFixed(4));
    } else if (fromSelector === "uah" && toSelector === "eur") {
      setFromCurrencyValue((toCurrencyNum * uah[1]).toFixed(4));
    } else if (fromSelector === "eur" && toSelector === "usd") {
      setFromCurrencyValue((toCurrencyNum * eur[0]).toFixed(4));
    } else if (fromSelector === "eur" && toSelector === "uah") {
      setFromCurrencyValue((toCurrencyNum * eur[1]).toFixed(4));
    } else {
      setFromCurrencyValue(toCurrencyNum);
    }
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
    setToCurrencyValue(usd[0]);
  }, []);

  console.log(toCurrencyValue);

  return (
    <>
      <div>
        <div>{usd[0]}</div>
        <div>{eur[1]}</div>
      </div>
      <div>
        <div>
          <input
            type="number"
            value={fromCurrencyValue}
            ref={fromCurrencyInput}
            onChange={() => handlerChangingFromCurrency()}
          ></input>
          <select
            name="fromCurrency"
            id="fromCurrency"
            defaultValue="usd"
            ref={fromCurrency}
            onChange={() => handlerChangingFromCurrency()}
          >
            <option value="uah">UAH</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            ref={toCurrencyInput}
            value={toCurrencyValue}
            onChange={() => handlerChangingToCurrency()}
          />
          <select
            name="toCurrency"
            id="toCurrency"
            defaultValue="uah"
            ref={toCurrency}
            onChange={() => handlerChangingToCurrency()}
          >
            <option value="uah">UAH</option>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
          </select>
        </div>
      </div>
    </>
  );
}
