import React, { useState } from 'react'
import axios from "axios"

const Navbar = ( {user, setUser} ) => {

  const [acc, setAcc] = useState("");

  function logout() {
    setUser({account:"", uid:""});
  }

  function login() {
    axios.post("/api/msg/user", {test: "test", account:acc}).then((res)=>{
      let iuser = JSON.parse(res.data.message);
      setUser(iuser);
    }).catch((e)=>console.error(e));
  }
  
  return (
    <div className='navbar' style={{ border: "1px solid black", width: "200px", padding:"15px" }}>
      <h1>Chat</h1>
      <div className="user">
        <h2>{user.account===""?"":"User : "+user.account}</h2>
        {user.account!=="" ?
          (<button onClick={logout}>logout</button>) :
          (<>
            <button onClick={login}>login</button>
            <input onChange={(e)=>setAcc(e.target.value)} value={acc}/>
          </>)
        }
      </div>
    </div>
  )
}

export default Navbar