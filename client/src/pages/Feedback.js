import {useState,useEffect} from "react"
import  axios from "axios"
import { FaStar } from "react-icons/fa";

export default function Feedback()
{

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[feedback,setFeedback] = useState("");
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = [0,0,0,0,0]
    const colors = {orange: "#FFBA5A",grey: "#a9a9a9"};
    const[info,setInfo] = useState([]);

    const[nameerror,setNameerror] = useState("");
    const[emailerror,setEmailerror] = useState("");
    const[feedbackerror,setFeedbackerror] = useState("");
    const [currentValueerror, setCurrentValueerror] = useState("");


    const hName = (event) =>{
      setName(event.target.value)
      if(event.target.value == "")
        {
          setNameerror("Name cannot be Empty");
        }
      else if(event.target.value.trim() == ""){
        setNameerror("Name cannot be spaces");
      }
      else if(! event.target.value.match(/^[A-Za-z ]+$/) )
      {
        setNameerror("Name cannot contain numbers or special characters")
      }
        else{
            setNameerror("");
        }
    }
    const hEmail = (event) =>{
      setEmail(event.target.value.replace(/\s/g, ''))
      if (event.target.value === "") {
        setEmailerror("Email cannot be empty");
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

    const hFeedback = (event) =>{
      setFeedback(event.target.value)
      if(event.target.value == "")
        {
            setFeedbackerror("Invalid Feedback");
        }
        else{
            setFeedbackerror("");
        }
    }

    useEffect (()=>{
      let urladd = "http://localhost:9999/getdata";
      axios.get(urladd)
      .then(res =>{setInfo(res.data)})
      .catch(err =>console.log(err));
    },[]);

    const Save = (event) =>{
        event.preventDefault();

        if(name=="")
        {
          setNameerror("Invalid Name")
        }
        if(email=="")
        {
          setEmailerror("Invalid Email")
        }
        if(feedback=="")
        {
          setFeedbackerror("Invalid Feedback")
        }
        if(currentValue==0)
        {
          setCurrentValueerror("Invalid Rating")
        }
        let check = false;
        info.map((e) =>{
            if(name == e.name && email == e.email && feedback == e.feedback && currentValue==e.rating)
            {
                check = true;
            }
        })
        if(check)
        {
          alert("Exactly same response is submitted by using this email.Try editing your current response or try a different email")
        }
        if(nameerror == "" && emailerror=="" && feedbackerror == "" && currentValueerror == 0 && name!="" && email!="" && feedback!="" && currentValue!="" )
        {
            alert("Thanks for your Feedback")
            let urladd = "http://localhost:9999/save";
            let data ={name,email,feedback,currentValue};
            axios.post(urladd,data)
            .then(res =>{
                console.log("Successful")
                setName("");
                setEmail("");
                setFeedback("");
                setCurrentValue(0);
            })
            .catch(err => alert("issue" +err))
        }
    }

    const handleClick = (value) => {
        setCurrentValue(value);
        if(value == 0)
        {
          setCurrentValueerror("Invalid Rating");
        }
        else{
          setCurrentValueerror("");
        }
    }
    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };
    const handleMouseLeave = () => {
        setHoverValue(undefined);
    }

    return(
        <>
        <center>
            <div id="container">
            <style>
              {`
                body {
                  background-image:url("https://img.freepik.com/free-vector/minimalist-background-gradient-colorful-style_698780-826.jpg");
                  background-repeat: no-repeat;
                  background-size: cover;
                }
              `}
            </style>
            <form onSubmit={Save}>
                <h1 id="form_heading"> Feedback Form</h1>
                <h1 id="heading" >Name:</h1>
                <input type="text" id="input" placeholder="Enter Name" value={name} onChange={hName}/>
                <h1 id="f-error">{nameerror}</h1>
                <h1 id="heading" >Email:</h1>
                <input type="text" id="input" placeholder="Enter Email" value={email} onChange={hEmail}/>
                <h1 id="f-error">{emailerror}</h1>
                <h1 id="heading" >Message:</h1>
                <textarea id="feedback" placeholder="Enter Feedback" value={feedback} onChange={hFeedback}></textarea>
                <h1 id="f-error">{feedbackerror}</h1>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                          marginRight: 10,
                          cursor: "pointer"
                        }}
                      />
                    )
                  })}
                <h1 id="f-error">{currentValueerror}</h1>
                <input id="submit"type="submit" value="Submit"/>
            </form>
            </div>
        </center>
        </>
    );
}