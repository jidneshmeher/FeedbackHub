import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin()
{
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[info,setInfo] = useState([]);

    const [usernameerror,setUsernameerror] = useState("");
    const[passworderror,setPassworderror] = useState("");

    const nav = useNavigate("");

    let login = false;

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
        let urladd = "http://localhost:9999/getadmindata";
        axios.get(urladd)
        .then(res =>{setInfo(res.data)})
        .catch(err =>console.log(err));
    },[]);


    const Login = (event) =>{
        event.preventDefault();
        info.map((u)=>{
            if(username == u.username && password == u.password)
            {
                login = true;
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
        if(login)
        {
                nav("/ad");
        }
        if(usernameerror == "" && passworderror =="" && !login && username!="" && password!="")
        {
                alert("Incorrect Username or Password")
                setUsername("");
                setPassword(""); 
        }
    }
    return(
        <>
        <center>
            <div id="a-container">
              <style>
              {`
                body {
                  background-image:url("https://www.techrepublic.com/wp-content/uploads/2020/04/ca-9.jpg");
                  background-repeat: no-repeat;
                  background-size: cover;
                }
              `}
            </style>
            <div id="a-insideof-container">
                <h1 id="a-heading">Admin Login</h1>
                <form onSubmit={Login}>
                    <input id="a-username-input" type="text" placeholder="Username" value={username} onChange={hUsername} />
                    <div id="error">{usernameerror}</div>
                    <input id="a-password-input" type="password" autoComplete="off" placeholder="Password" value={password} onChange={hPassword}/>
                    <br/>
                    <div id="error">{passworderror}</div>
                    <br/>
                    <input id="a-submit" type="submit" value="Login" />
                </form>
            </div>
            </div>
        </center>
        </>
    );
}