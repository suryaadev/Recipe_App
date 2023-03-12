import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex w-full h-[80vh] items-center justify-around">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookie("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Wrong credentials");
    }
  };

  return (
    <Form
      formName={"Login"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Register successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      formName={"Register"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  formName,
  onSubmit,
}) => {
  return (
    <div className="bg-gray-300 w-[30%] p-6 rounded-xl py-12 drop-shadow-2xl">
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
        <h2 className="uppercase text-center text-3xl mb-4">{formName}</h2>
        <div className="flex flex-col space-y-3 text-center">
          <label className="text-lg " htmlFor="username">
            Username
          </label>
          <input
            className="rounded-lg border-2 border-black p-1"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            id="username"
          />

          <label className="text-lg " htmlFor="password">
            Password
          </label>
          <input
            className="rounded-lg border-2 border-black p-1"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
        </div>
        <button
          className="my-6 p-2 w-4/5 rounded-xl text-white uppercase mb-2 bg-red-800"
          type="submit"
        >
          {formName}
        </button>
      </form>
    </div>
  );
};

export default Auth;
