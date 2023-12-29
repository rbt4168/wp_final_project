import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ChatView from './ChatView'
import Navbar from './Navbar'

const HomeAA = () => {
  const [user, setUser] = useState({account:"", uid:""})
  const [cid, setCid] = useState("");
  const [oppo, setOppo] = useState("");
  const [oppouid, setOppouid] = useState("");
  
  return (
    <div style={{display: "flex" , padding: "15px"}}>
      <Navbar user={user} setUser={setUser} />
      {user.account===""?(<></>):(<>
        <Sidebar user={user} setCid={setCid} setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid}/>
        <ChatView user={user} cid={cid} oppo={oppo} oppouid={oppouid}/>
      </>)}
    </div>
  )
}

export default HomeAA;