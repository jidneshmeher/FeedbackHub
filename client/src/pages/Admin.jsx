import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const nav = useNavigate();

  const hUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError(e.target.value ? "" : "Invalid Username");
  };
  
  const hPassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.value ? "" : "Invalid Password");
  };

  const Login = async (e) => {
    e.preventDefault();
  
    if (!username) setUsernameError("Invalid Username");
    if (!password) setPasswordError("Invalid Password");
    if (!username || !password) return;
  
    try {
      const res = await adminLogin({ username, password });
      if (res.data.success) nav("/ad");
      else alert(res.data.message);
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-12 transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Admin Login
        </h1>
        <form className="space-y-4" onSubmit={Login}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={hUsername}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={hPassword}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
