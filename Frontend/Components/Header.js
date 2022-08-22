import React from "react";
import Link from "next/link";
import { useEffect,useState } from "react";


const Header = () => {

  let [State,setState]=useState(null)
  useEffect(()=>{
    setState(localStorage.getItem("User"))
  },[State])

  return (
    <div className="flex justify-between bg-[#34495e] text-[#ecf0f1] p-3">
      <div className="Left flex list-none space-x-3">
        <li>Products</li>
        <li>Add Product</li>
      </div>
      <div className="Right flex list-none space-x-3">
        <Link href="/SignUp">
          {!State ? <li>Sign Up</li>:""}
        </Link>

        {State ? <li onClick={()=>{localStorage.clear();setState(null)}}>Sign Out</li>:""}

      </div>
    </div>
  );
};

export default Header;
