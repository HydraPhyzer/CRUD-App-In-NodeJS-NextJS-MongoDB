import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Router from "next/router";

const Update = () => {
  let [PName, setPname] = useState();
  let [PPrice, setPPrice] = useState();

  let GetProducts = async () => {
    let API = await fetch(`http://localhost:4500/single/${Router.query.id}` , {
      method:'get',
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("Token")),
        },
    })
    .then(async(Res)=>
    {
      let Res1=await Res.json()
      setPPrice(Res1.PPrice);
      setPname(Res1.PName);
    });
  };

  let Update=async()=>
  {
    let API = await fetch(`http://localhost:4500/update/${Router.query.id}`,{
      method: "put",
        body: JSON.stringify({ PName, PPrice }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("Token")),
        },
    })
    .then(async(Res)=>
    {
      let Res1 = await Res.json();
      if (Res1.name == "JsonWebTokenError") {
        Router.push("/SignUp");
      } else {
        {
          Router.push("/")
        }
      }
    })
  }

  useEffect(() => {GetProducts()}, []);
  return (
    <>
      <Header />
      <div>
        <div className="flex flex-col sn:min-h-[90vh] min-h-[80vh] w-full justify-center items-center">
          <div className="px-2 flex flex-col w-max justify-center items-center">
            <p className="my-5 bg-[#9b59b6] text-white w-full text-center py-2">
              Update Products
            </p>
            <input
              onChange={(E) => {
                setPname(E.target.value);
              }}
              value={PName}
              type="text"
              placeholder="Product Name"
            />
            <input
              onChange={(E) => {
                setPPrice(E.target.value);
              }}
              value={PPrice}
              type="email"
              placeholder="Product Price"
            />
            <button
              onClick={() => {
                Update();
              }}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
