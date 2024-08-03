import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp(){

    const [username,setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const[confirmpassword,setConfirmpassword] = useState("");
    const[info,setInfo] = useState([]);

    const [usernameerror,setUsernameerror] = useState("");
    const[emailerror,setEmailerror] = useState("");
    const[phoneerror,setPhoneerror] = useState("");
    const [passworderror,setPassworderror] = useState("");
    const[confirmpassworderror,setConfirmpassworderror] = useState("");


    const nav = useNavigate();

    const hUsername = (event) =>{
        setUsername(event.target.value.replace(/\s/g, ''));
        if(event.target.value == "")
        {
            setUsernameerror("Username cannot be empty");
        }
        else{
            setUsernameerror("");
        }
    }
    const hEmail = (event) =>{
        setEmail(event.target.value);
        if (event.target.value === "") {
            setEmailerror("Invalid Email");
          } else if (!isValidEmail(event.target.value)) {
            setEmailerror("Invalid Email Format");
          } else {
            setEmailerror("");
          }
    }
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const hPhone = (event) =>{
        setPhone(event.target.value);
        if(event.target.value == "" || event.target.value.length != 10)
        {
            setPhoneerror("Invalid Phone Number");
        }
        else{
            setPhoneerror("");
        }
    }
    const hPassword = (event) =>{
        setPassword(event.target.value.replace(/\s/g, ''));
        if(event.target.value == "")
        {
            setPassworderror("Invalid Password");
        }
        else{
            setPassworderror("");
        }
    }
    const hConfirmpassword = (event) =>{
        setConfirmpassword(event.target.value.replace(/\s/g, ''));
        if(event.target.value == "")
        {
            setConfirmpassworderror("Invalid Confirm Password");
        }
        else{
            setConfirmpassworderror("");
        }
    }

    useEffect (()=>{
        let urladd = "http://localhost:9999/useremail_getdata";
        axios.get(urladd)
        .then(res =>{setInfo(res.data)})
        .catch(err =>console.log(err));
      },[]);

      useEffect(()=>{
        if(password == confirmpassword && password!="" && confirmpassword!="")
        {
            setConfirmpassworderror("");
            setPassworderror("");
        }
      })


    const Save = (event) =>{
        event.preventDefault();
        if(username=="")
        {
            setUsernameerror("Invalid Username")
        }
        if(email=="")
        {
            setEmailerror("Invalid Email")
        }
        if(phone=="")
        {
            setPhoneerror("Invalid Phone")
        }
        if(password=="")
        {
            setPassworderror("Invalid Password")
        }
        if(confirmpassword=="")
        {
            setConfirmpassworderror("Invalid Confirm Password")
        }
        if(password != confirmpassword)
        {
            setConfirmpassworderror("Confirm Password and Password must be same")
            setPassworderror("Password and Confirm Password must be same")
        }
        let check = false;
        info.map((e) =>{
            if(email == e.email)
            {
                check = true;
            }
        })
        if(check)
        {
            alert("Email already registered")
        }
        if(username!="" && email!="" && phone!="" && password!="" && confirmpassword!="" && usernameerror=="" && emailerror=="" && phoneerror=="" && passworderror=="" && confirmpassworderror=="" && password == confirmpassword)
        {
            alert("Account created")
            let urladd = "http://localhost:9999/user_save";
            let data ={username,email,phone,password,confirmpassword};
            axios.post(urladd,data)
            .then(res =>{
                console.log("Successful")
                setUsername("");
                setEmail("");
                setPhone("");
                setPassword("");
                setConfirmpassword("");
                nav("/si")
            })
            .catch(err => alert("issue" +err))
        }
    }

    return(
        <>
        <center>
        <div id="si-container">
        <style>
            {`
              body {
                background-image:url("https://wallpapers.com/images/hd/nature-background-r7cib0aiunz1z4t4.jpg");
                background-repeat: no-repeat;
                background-size: cover;
              }
            `}
          </style>
            <div id="su-insideof-container">
                <h1 id="su-heading">Sign Up</h1>
                <form onSubmit={Save}>
                    <input className="su-username-input" type="text" value={username} placeholder="Username" onChange={hUsername}/>
                    <div id="error">{usernameerror}</div>
                    <input className="su-other-input" type="text" value={email} placeholder="Email" onChange={hEmail}/>
                    <div id="error">{emailerror}</div>
                    <input className="su-other-input" type="number" value={phone} placeholder="Phone" onChange={hPhone}  />
                    <div id="error">{phoneerror}</div>
                    <input className="su-other-input" type="password" value={password}placeholder="Password" autoComplete="off" onChange={hPassword}/>
                    <div id="error">{passworderror}</div>
                    <input className="su-other-input" type="password" value={confirmpassword}placeholder="Confirm Password" autoComplete="off" onChange={hConfirmpassword}/>
                    <div id="error">{confirmpassworderror}</div>
                    <input className="su-submit" type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
        </center>
        </>
    );
}