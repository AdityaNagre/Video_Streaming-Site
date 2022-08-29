import React, {useContext, useState} from "react";
import { login } from "../../context/authC/apiCalls";
import "./login.scss";
import { AuthContext } from "../../context/authC/AuthContext";

export default function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {dispatch}= useContext(AuthContext)

  const handleLogin=(e)=>{
    e.preventDefault();
    login({email, password}, dispatch);
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input onChange={(e)=>{
            setemail(e.target.value)
          }} type="email" placeholder="Email or phone number" />
          <input onChange={(e)=>{
            setpassword(e.target.value)
          }}  type="password" placeholder="Password" />
          <button onClick={handleLogin} className="loginButton">Sign In</button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
