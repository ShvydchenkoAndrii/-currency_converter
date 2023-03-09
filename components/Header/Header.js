import { AppContext } from "@/pages";
import React, { useContext } from "react";

const Header = () => {
  const store = useContext(AppContext);
  const { USD, EUR } = store;
  console.log();
  return (
    <div className="flex gap-5 justify-between bg-black text-white items-end p-2 pr-10">
      {USD.Time && (
        <div>Last updat at: {USD.Time.slice(0, -5).concat("GMT +0")}</div>
      )}

      <div className="flex gap-2">
        <div>Actual exchange rate: </div>
        <div>USD: {USD.UAH && USD.UAH.toFixed(2)}</div>
        <div>EUR: {EUR.UAH && EUR.UAH.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Header;
