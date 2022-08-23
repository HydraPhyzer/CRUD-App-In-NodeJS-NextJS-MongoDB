import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Router from "next/router"; 

export default function Home() {
  let [Products, setProducts] = useState([{}]);
  let [Person, setPerson] = useState();

  let GetProducts = async () => {
    let API = await fetch("http://localhost:4500/",{headers: {
      authorization: JSON.parse(localStorage.getItem("Token")),
    }})
    .then(async (Res) => {

      let Res1 = await Res.json();
      if (Res1.name == "JsonWebTokenError") {
        Router.push("/SignUp");
      } else {
        {
          setProducts(Res1);
        }
      }

    });
  };

  let Delete = async (id) => {
    let Res = await fetch(`http://localhost:4500/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("Token")),
      },
    });
    GetProducts();
  };

  let User=()=>
  {
    setPerson(JSON.parse(localStorage.getItem("User")));
    console.log(Person)
  }
  useEffect(() => {
    User()
    GetProducts();
  }, []);

  return (
    <>
      <Header />
      
      {Person?.Name?
      <div className="flex justify-center items-center min-h-[80vh] flex-col">
        {Products.length>0 ?
        <table>
          <thead>
            <tr className="flex space-x-2">
              <th className="bg-green-500 p-2 text-white">Product Name</th>
              <th className="bg-green-500 p-2 text-white">Product Price</th>
              <th className="bg-green-500 p-2 text-white">Customization</th>
            </tr>
          </thead>

          <tbody>
            {Products.map((Each) => {
              return (
                <tr className="flex space-x-2 my-2 text-center items-center">
                  <td className="border-2 border-green-500 p-2 text-black w-full">
                    {Each.PName}
                  </td>
                  <td className="border-2 border-green-500 p-2 text-black w-full">
                    {Each.PPrice}
                  </td>
                  <td className="border-2 border-green-500 p-1 text-black w-full">
                    <Link href={`/update/${Each._id}`}>
                      <button className="p-1 m-0 mx-1 rounded-none bg-yellow-500">Edit</button>
                    </Link>
                    <button
                      onClick={() => {
                        Delete(Each._id);
                      }}
                      className="p-1 m-0 mx-1 bg-red-500 rounded-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
          :
          <p>No Products to Display</p>}
      </div>
      :""}
    </>
  );
}
