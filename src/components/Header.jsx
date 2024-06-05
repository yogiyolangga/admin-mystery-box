import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="px-3">
      <div className="w-full tablet:max-w-4xl mx-auto py-1 overflow-hidden bg-opacity-60 rounded-t-md">
        <a href="/">
          <img src={logo} className="mx-auto h-20" alt="AcehBola"></img>
        </a>
      </div>
    </div>
  );
};

export default Header;
