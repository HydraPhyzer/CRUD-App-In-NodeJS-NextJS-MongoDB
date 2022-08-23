import React, { useState,useEffect } from "react";
import Header from "../Components/Header";
import Router from "next/router";

const AddProduct = () => {
  let [PName, setPname] = useState();
  let [PPrice, setPPrice] = useState();

  let Add = async () => {
    if (PName && PPrice) {
      let API = await fetch("http://localhost:4500/add-product", {
        method: "post",
        body: JSON.stringify({ PName, PPrice }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("Token")),
        },
      }).then(async (Res) => {
        let Res1 = await Res.json();
        if (Res1.name == "JsonWebTokenError") {
          Router.push("/SignUp");
        } else {
          {
            Router.push("/");
          }
        }
      });
    } else {
      alert("Provide Complete Data");
    }
  };

  useEffect(() => {
    if(!localStorage.getItem('User'))
    {
      Router.push('/Login')
    }
  }, [])
  
  return (
    <>
      <Header />
      <div>
        <div className="flex flex-col sn:min-h-[90vh] min-h-[80vh] w-full justify-center items-center">
          <div className="px-2 flex flex-col w-max justify-center items-center">
            <p className="my-5 bg-[#9b59b6] text-white w-full text-center py-2">
              Add Products
            </p>
            <input
              onChange={(E) => {
                setPname(E.target.value);
              }}
              type="text"
              placeholder="Product Name"
            />
            <input
              onChange={(E) => {
                setPPrice(E.target.value);
              }}
              type="number"
              placeholder="Product Price"
            />
            <button
              onClick={() => {
                Add();
              }}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
