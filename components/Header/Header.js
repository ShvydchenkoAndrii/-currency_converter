import { AppContext } from "@/pages";
import React, { useContext } from "react";

const Header = () => {
  const store = useContext(AppContext);
  const { USD, EUR } = store;
  console.log();
  return (
    <div className="flex gap-5 justify-end bg-slate-300 items-end p-2 pr-10">
      <div>USD: {USD.UAH}</div>
      <div>EUR: {EUR.UAH}</div>
    </div>
  );
};

export default Header;
