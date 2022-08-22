import React, { useState } from 'react'
import Header from '../Components/Header'
import Router from 'next/router'

const AddProduct = () => {
    let [PName,setPname]=useState()
    let [PPrice,setPPrice]=useState()
    let Add=async()=>
    {
        if(PName && PPrice)
    {
      let API=await fetch('http://localhost:4500/add-product' , {
        method:'post',
        body:JSON.stringify({PName,PPrice}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(()=>
      {
        Router.push('/')
      })
    }
    else
    {
      alert("Provide Complete Data")
    }
    }
  return (
    <>
        <Header/>
        <div>
        <div className="flex flex-col sn:min-h-[90vh] min-h-[80vh] w-full justify-center items-center">
      <div className="px-2 flex flex-col w-max justify-center items-center">
        <p className="my-5 bg-[#9b59b6] text-white w-full text-center py-2">Add Products</p>
        <input onChange={(E)=>{setPname(E.target.value)}} type="text" placeholder='Product Name'/>
        <input onChange={(E)=>{setPPrice(E.target.value)}} type="email" placeholder='Product Price'/>
        <button onClick={()=>{Add()}} >Add Product</button>
      </div>
    </div>
        </div>
    </>
  )
}

export default AddProduct