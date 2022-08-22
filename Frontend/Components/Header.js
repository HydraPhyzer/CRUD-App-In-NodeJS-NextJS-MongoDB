import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  let [State, setState] = useState(null);
  useEffect(() => {
    setState(localStorage.getItem("User"));
  }, []);

  return (
    <div className="flex justify-between bg-[#34495e] text-[#ecf0f1] p-3">
      <div className="Left flex list-none space-x-3">
        <li>Products</li>
        <Link href="/add-product">
          <li>Add Product</li>
        </Link>
      </div>
      <div className="Right flex list-none space-x-3">
        {!State ? (
          <>
            <Link href="/SignUp">
              <li>Sign Up</li>
            </Link>
            <Link href="/Login">
              <li>Log In</li>
            </Link>
          </>
        ) : (
          <li>{(JSON.parse(State))?.Name}</li>
        )}

        {State ? (
          <>
            <li
              onClick={() => {
                localStorage.clear();
                setState(null);
              }}
            >
              Sign Out
            </li>
          </>
        ) : (
          <li>{(JSON.parse(State))?.Name}</li>
        )}
      </div>
    </div>
  );
};

export default Header;
