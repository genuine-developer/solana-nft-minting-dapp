/*eslint-disable*/
import React from "react";

export default function Navbar({ WalletButton }) {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div>
            <WalletButton />
          </div>
        </div>
      </nav>
    </>
  );
}
