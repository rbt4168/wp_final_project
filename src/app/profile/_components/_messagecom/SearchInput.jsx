import axios from "axios";
import React, { use, useState } from "react";

const SearchInput = ( {user} ) => {
  const [text, setText] = useState("");
  const [odia, setOdia] = useState(false);
  const [ocConfig, setOc] = useState({});

  const handleSend = async () => {
    axios.post("/api/msg/euser", {account: text}).then((res)=>{
      if (res.data.message === "e") {
        // user exist
        let quid = res.data.uid;
        let qacc = res.data.account;
        
        
        axios.post("/api/msg/echat", {uid: user.uid, name:qacc}).then((res)=>{
          if(res.data.message === "e") {
            alert("Chat already exist")
          } else {
            // open a new chat
            if ( quid !== user.uid) {
              setOc({
                uid1: user.uid, uid2: quid,
                name1: qacc, name2: user.account
              });
              // setOdia(true);
              axios.post("/api/msg/ochat", ocConfig).then((res2)=>{
                alert(res2.data.message);
              }).catch((e)=>{
                console.error(e);
              })
            } else {
              alert("You can't talk with yourself");
            }
          }
        })
      } else if (res.data.message === "n") {
        alert("No such user.");
      }
    }).catch((e)=>{
      console.error(e);
    })
  };

  const handleCreat = async () => {
    console.log(ocConfig)
    axios.post("/api/msg/ochat", ocConfig).then((res2)=>{
      alert(res2.data.message);
    }).catch((e)=>{
      console.error(e);
    })
    setOdia(false);
  }

  return (
    <>
      <div style={{marginBottom:"15px" }}>
        
        <dialog open={odia}>
          是否新增聊天室？
          <div>
            <button onClick={handleCreat}>是</button>
            <button onClick={()=>setOdia(false)}>否</button>
          </div>
        </dialog>
        <input
          type="text"
          placeholder="Search User..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
          style={{ fontSize: 20 , width: "170px" }}
        />
        <button
          style={{ fontSize: 20 , width: "100px", marginLeft:"20px" }}
          onClick={handleSend}>Search</button>
      
      </div>
    </>
  );
};

export default SearchInput;
