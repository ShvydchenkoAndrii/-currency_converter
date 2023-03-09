import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Converter from "@/components/Converter/Converter";
import { getExchangeRate } from "@/pages/api/currency_request";

export const AppContext = React.createContext();

function App() {
  const [USD, setUSD] = useState({});
  const [EUR, setEUR] = useState({});
  const [UAH, setUAH] = useState({});

  useEffect(() => {
    getExchangeRate("USD").then((res) => {
      setUSD(res);
    });
    getExchangeRate("UAH").then((res) => {
      setUAH(res);
    });
    getExchangeRate("EUR").then((res) => {
      setEUR(res);
    });
  }, []);

  const store = {
    USD,
    EUR,
    UAH,
  };

  return (
    <AppContext.Provider value={store}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Currency converter</title>
      </Head>
      <Header />
      <Converter />
    </AppContext.Provider>
  );
}

export default App;
