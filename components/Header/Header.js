import { AppContext } from "@/pages";
import React, { useContext } from "react";

const Header = () => {
  const store = useContext(AppContext);
  const { USD, EUR } = store;
  console.log();
  return (
    <div>
      <div>{USD.UAH}</div>
      <div>{EUR.UAH}</div>
    </div>
  );
};

export default Header;
