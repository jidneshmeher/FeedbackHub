import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { getFeedbacks, saveFeedback } from "../services/api";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = [0, 0, 0, 0, 0];
  const colors = { orange: "#FFBA5A", grey: "#a9a9a9" };
  const [info, setInfo] = useState([]);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [currentValueError, setCurrentValueError] = useState("");

  const hName = (e) => {
    setName(e.target.value);
    if (!e.target.value.trim()) setNameError("Name cannot be empty");
    else if (!/^[A-Za-z ]+$/.test(e.target.value))
      setNameError("Name cannot contain numbers or special characters");
    else setNameError("");
  };

  const hEmail = (e) => {
    setEmail(e.target.value.replace(/\s/g, ""));
    if (!e.target.value) setEmailError("Email cannot be empty");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))
      setEmailError("Invalid email format");
    else setEmailError("");
  };

  const hFeedback = (e) => {
    setFeedback(e.target.value);
    setFeedbackError(e.target.value ? "" : "Feedback cannot be empty");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFeedbacks();
        setInfo(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };
    fetchData();
  }, []);

  const handleClick = (value) => {
    setCurrentValue(value);
    setCurrentValueError(value === 0 ? "Invalid Rating" : "");
  };

  const handleMouseOver = (newHoverValue) => setHoverValue(newHoverValue);
  const handleMouseLeave = () => setHoverValue(undefined);

  const Save = async (e) => {
    e.preventDefault();

    if (!name) setNameError("Invalid Name");
    if (!email) setEmailError("Invalid Email");
    if (!feedback) setFeedbackError("Invalid Feedback");
    if (currentValue === 0) setCurrentValueError("Invalid Rating");

    const duplicate = info.some(
      (e) =>
        e.name === name &&
        e.email === email &&
        e.feedback === feedback &&
        e.rating === currentValue
    );

    if (duplicate) {
      return alert(
        "Exactly same response is submitted with this email. Try editing your current response or use a different email."
      );
    }

    if (
      name &&
      email &&
      feedback &&
      currentValue &&
      !nameError &&
      !emailError &&
      !feedbackError &&
      !currentValueError
    ) {
      try {
        await saveFeedback({ name, email, feedback, currentValue });
        alert("Thanks for your Feedback!");
        setName("");
        setEmail("");
        setFeedback("");
        setCurrentValue(0);
      } catch (err) {
        alert("Issue: " + err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 sm:p-12 transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Feedback Form
        </h1>
        <form className="space-y-5" onSubmit={Save}>
          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={hName}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={hEmail}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Feedback Textarea */}
          <div>
            <textarea
              placeholder="Enter Feedback"
              value={feedback}
              onChange={hFeedback}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition resize-none h-24"
            ></textarea>
            {feedbackError && <p className="text-red-500 text-sm mt-1">{feedbackError}</p>}
          </div>

          {/* Rating Stars */}
          <div className="flex items-center space-x-2">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={28}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                className="hover:scale-125"
              />
            ))}
          </div>
          {currentValueError && <p className="text-red-500 text-sm mt-1">{currentValueError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}