import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Converter from "@/components/Converter/Converter";
import { getInfo } from "@/services/currency_request";

export const AppContext = React.createContext();

function App() {
  const [USD, setUSD] = useState({});
  const [EUR, setEUR] = useState({});
  const [UAH, setUAH] = useState({});

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

  // const [USD, setUSD] = useState({ UAH: 36.91, EUR: 0.94 });
  // const [EUR, setEUR] = useState({ USD: 1.07, UAH: 39.38 });
  // const [UAH, setUAH] = useState({ USD: 0.027, EUR: 0.025 });

  const store = {
    USD,
    EUR,
    UAH,
  };

  return (
    <AppContext.Provider value={store}>
      <Header />
      <Converter />
    </AppContext.Provider>
  );
}

export default App;
