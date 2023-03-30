import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [zid, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const set = async () => {
    await Axios.get("http://localhost:5000/getUsers").then((res)=>{setUsers(res.data)})
    console.log("set worked")
  };

  const deleteUser = async (id) => {
    await Axios.post(`http://localhost:5000/deleteUser/${id}`);
    set();
  };

  const gonder = async () => {
    await Axios.post("http://localhost:5000/createUser", {
      name: name,
      email: email,
    });
    set();
  };

  const updateUser = async () => {
    await Axios.post(`http://localhost:5000/updateUser/${zid}`,{
      name: name,
      email: email,
    });
    set();
  };

  const deletea =  (user) => {
    deleteUser(user._id)
  };

  const setUserUpdate =  (user) => {
    setId(user._id)
  };

  useEffect(()=>{
    set()
  },[])


  return (
    <div className="App">
      {users.map((user,key) => (
        <div className="users">
          <div>name:{user.name}</div>
          <div>email:{user.email}</div>
          <div>date:{user.date}</div>
          <button onClick={()=>{deletea(user)}}>delete</button>
          <button onClick={()=>{setUserUpdate(user)}}>set</button>
        </div>
      ))}

      <div className="input">
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
        <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
        <button onClick={gonder}>GÖNDER</button>
        <button onClick={updateUser}>update {zid}</button>
      </div>
    </div>
  );
}

export default App;
