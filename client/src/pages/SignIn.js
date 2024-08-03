import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn(){

    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[info,setInfo] = useState([]);
    const nav = useNavigate();

    const [usernameerror,setUsernameerror] = useState("");
    const[passworderror,setPassworderror] = useState("");

    let check = false;

    const hUsername = (event) =>{
      setUsername(event.target.value.replace(/\s/g, ''))
      if(event.target.value == "")
      {
          setUsernameerror("Invalid Username");
      }
      else{
          setUsernameerror("");
      }
    }
    const hPassword = (event) =>{
      setPassword(event.target.value.replace(/\s/g, ''))
      if(event.target.value == "")
        {
            setPassworderror("Invalid Password");
        }
        else{
            setPassworderror("");
        }
    }

    

    useEffect (()=>{
      let urladd = "http://localhost:9999/user_getdata";
      axios.get(urladd)
      .then(res =>{setInfo(res.data)})
      .catch(err =>console.log(err));
    },[]);

    const SignIn = (event) =>{
      event.preventDefault();
      info.map((e) =>{
      if(username == e.username && password == e.password)
      {
        check = true;
      }
      })
      if(username== "")
      {
        setUsernameerror("Invalid Username");
      }
      if(password == "")
      {
        setPassworderror("Invalid Password");
      }
      if(username != "" && password != "")
      {      
      check ? nav("/fb"):alert("Incorrect Username or Password");setUsername("");setPassword("");
      }
  }

    return(
        <>
        <center>
        <div id="si-container">
        <style>
            {`
              body {
                background-image:url("https://wallpaperaccess.com/full/267434.jpg");
                background-repeat: no-repeat;
                background-size: cover;
              }
            `}
          </style>
            <div id="si-insideof-container">
                <h1 id="si-heading">Sign In</h1>
                <form onSubmit={SignIn}>
                    <input id="si-username-input" type="text" placeholder="Username" value={username} onChange={hUsername} />
                    <br/>
                    <div id = "error">{usernameerror}</div>
                    <input id="si-password-input" type="password" autoComplete="off" placeholder="Password" value={password} onChange={hPassword}/>
                    <br/>
                    <div id = "error">{passworderror}</div>
                    <br/>
                    <input id="si-submit" type="submit" value="Sign In" />
                    <p id="si-paragraph">Dont have an account? <a id="si-anchor" href="/su">Sign up</a></p>
                </form>
            </div>
        </div>
        </center>
        </>
    );
}

 