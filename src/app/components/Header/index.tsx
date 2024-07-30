import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container mx-auto">
      <div className="flex justify-between items-center py-3 px-4">
        <h1 className="text-2xl font-bold">MY TODO APP</h1>
        <Link
          href="/signout"
          className="bg-slate-800 hover:bg-slate-600 inline-block px-3 py-2 rounded text-white text-sm"
        >
          SIGN OUT
        </Link>
      </div>
    </header>
  );
};

export default Header;
