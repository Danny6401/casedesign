import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // withRouter,
} from "react-router-dom";
import "./login.scss";
import logo from "../../assets/logo.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextLoginName } from "../app/App";
import Defines from "../../utils/Defines";

function ESignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoginName } = useContext(contextLoginName);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 確認是否有抓到 username
    const loginData = {
      username: username,
      password: password,
    };

    // fetch("http://localhost:5000/login", {
    console.log("TURL:", process.env.REACT_APP_URL + "login");
    fetch(process.env.REACT_APP_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.admin) {
          setLoginName(data.username);
          navigate("/system");
        }
        console.log("data:", data);
        if (data.success) {
          console.log("Login successful");
          alert(`登入成功 ${data.username} ，歡迎回來!`);
          setLoginName(data.username);
          navigate("/");
        } else {
          setLoginName(null);
          switch (data.status) {
            case -1: //password error
              alert("密碼錯誤!");
              navigate("/pLogin");
              break;
            case -2: //redirect to login page
              alert("帳號不存在，請先註冊!");
              navigate("/singUp");
              break;
            case -3: //should not exist...
              break;
            default:
              break;
          }
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <img id="logo" height={80} src={logo} alt="logo" />
      <h4>Sign In</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="username"
          name="email"
          value={username}
          onChange={handleUsername}
          placeholder="E-mail"
          className="text_input"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
          className="text_input"
          required
        />
        <div className="errorText"></div>
        <input type="submit" value="SIGN IN" className="btn" />
        <Link to="/signUp">
          <input type="button" value="SIGN UP" className="btn" />
        </Link>
        <Link to="/pLogin">
          <div className="link">Using Phone Number to Login</div>
        </Link>
      </form>
    </div>
  );
}

export default ESignin;
