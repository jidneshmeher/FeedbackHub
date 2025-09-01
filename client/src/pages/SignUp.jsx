import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/api";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const validate = () => {
    const errs = {};
    if (!username) errs.username = "Invalid Username";
    if (!email) errs.email = "Invalid Email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email format";
    if (!phone || phone.length !== 10) errs.phone = "Invalid Phone";
    if (!password) errs.password = "Invalid Password";
    if (!confirmpassword) errs.confirmpassword = "Invalid Confirm Password";
    if (password !== confirmpassword) {
      errs.password = "Passwords must match";
      errs.confirmpassword = "Passwords must match";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await signUpUser({ username, email, phone, password, confirmpassword });
      if (res.data.success) {
        alert(res.data.message);
        nav("/si");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Signup failed: " + err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-12 transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
          {errors.confirmpassword && <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/si" className="text-indigo-500 hover:underline font-medium">Sign In</a>
        </p>
      </div>
    </div>
  );
}