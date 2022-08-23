import React, { useState } from 'react'
import Router from 'next/router'
import Header from '../Components/Header'

const Login = () => {
  let [Email,setEmail]=useState()
  let [Password,setPassword]=useState()

  let Login=async ()=>
  {
    if(Email && Password)
    {
      let API=await fetch('http://localhost:4500/login' , {
        method:'post',
        body:JSON.stringify({Email:Email , Password:Password}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(async(Res)=>
      {
        let Data=await Res.json();
        localStorage.setItem("User" , JSON.stringify(Data.Result))
        localStorage.setItem("Token" ,JSON.stringify(Data.Token))
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
    <div className="flex flex-col sn:min-h-[90vh] min-h-[80vh] w-full justify-center items-center">
      <div className="px-2 flex flex-col w-max justify-center items-center">
        <p className="my-5 bg-[#9b59b6] text-white w-full text-center py-2">Log In</p>
        <input onChange={(E)=>{setEmail(E.target.value)}} type="email" placeholder='Email'/>
        <input onChange={(E)=>{setPassword(E.target.value)}} type="password" placeholder='Password'/>
        <button onClick={()=>{Login()}} >LogIn</button>
      </div>
    </div>
    </>
  )
}

export default Login