import { useState,useEffect } from "react";
import axios from "axios";

export default function AdminDetails()
{
    const [info,setInfo] = useState([]);

    useEffect (()=>{
        let urladd = "http://localhost:9999/getdata";
        axios.get(urladd)
        .then(res =>{setInfo(res.data)})
        .catch(err =>console.log(err));
    },[]);

    const Delete = (name,email,feedback,rating) =>{
        let urladd = "http://localhost:9999/delete";
        let d = {data:{name,email,feedback,rating}}
        axios.delete(urladd,d)
        .then(res => {
            alert("Record Deleted");
            window.location.reload();
        })
        .catch(err => alert("del issue "+err));
    }

    return(
        <>
        <style>
              {`
                body {
                  background-image:url("https://images.unsplash.com/photo-1589497836818-9ad2fa1df1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzYwOTV8fGVufDB8fHx8fA%3D%3D&w=1000&q=80");
                  background-repeat: no-repeat;
                  background-size: cover;
                }
              `}
            </style>
        <center>
            <br/>
            <h1 id="ad-header">Feedback of Users</h1>
            <table id="ad-table" border="1">
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Feedback</td>
                    <td>Rating</td>
                    <td>Delete</td>
                </tr>
                {
                    info.map((e)=>(
                        <tr style={{"text-align":"center"}}>
                            <td id="ad-tabletop" >{e.name}</td>
                            <td id="ad-tabletop" >{e.email}</td>
                            <td id="ad-tabletop" >{e.feedback}</td>
                            <td id="ad-tabletop" >{e.rating+" star"}</td>

                            <td id="ad-tabletop"><button id="ad-btn" onClick={ ()=>{if(window.confirm("Are u sure???"))Delete(e.name,e.email,e.feedback,e.rating)}}>
                                Delete</button></td>
                        </tr>
                    ))
                }
            </table>
        </center>
        </>
    );
}