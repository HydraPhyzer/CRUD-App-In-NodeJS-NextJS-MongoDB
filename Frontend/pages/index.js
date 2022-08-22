import { useEffect, useState } from "react";
import Header from "../Components/Header";
export default function Home() {
  let [Products, setProducts] = useState([{}]);

  let GetProducts = async () => {
    let API = await fetch("http://localhost:4500/");
    setProducts(await API.json());
  };

  let Delete = async (id) => {
    let Res = await fetch(`http://localhost:4500/delete/${id}`, {
      method: "delete",
    });
    GetProducts();
  };
  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[80vh] flex-col">
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
                    <button className="p-1 m-0 mx-1 bg-yellow-500">Edit</button>
                    <button
                      onClick={() => {
                        Delete(Each._id);
                      }}
                      className="p-1 m-0 mx-1 bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
