import { AppContext } from "@/pages";
import React, { useContext } from "react";

const Header = () => {
  const { USD, EUR } = useContext(AppContext);
  return (
    <div className="flex gap-5 justify-between bg-black text-white items-end p-2 pr-10">
      {USD.Time && (
        <div className="ml-4">Last updat at: {USD.Time.slice(0, -5).concat("GMT +0")}</div>
      )}
      <div className="flex gap-5">
        <div>UAH/USD: {USD.UAH && USD.UAH.toFixed(2)}</div>
        <div>UAH/EUR: {EUR.UAH && EUR.UAH.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Header;
