import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // withRouter,
} from "react-router-dom";
import "./login.scss";
import logo from "../assets/logo.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "./App";

function PSignin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserRole, setuserhasLogin } = useContext(dataContext);
  // const context = useContext(dataContext);
  // console.log("context: ", context);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 確認是否有抓到 username
    alert(username);

    const loginData = {
      phoneNumber: username,
      password: password,
    };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.admin === "admin") {
          setUserRole(data.admin);
          setuserhasLogin(true);
          // navigate("/system");
        }
        if (data.success) {
          console.log("Login successful");
          alert(`登入成功 ${data.username} ，歡迎回來!`);
          setuserhasLogin(true);
          navigate("/");
        } else {
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
      <img id="logo" alt="" height={80} src={logo} />
      <h4>Sign In</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
          name="phoneNumber"
          placeholder="Phone Number"
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
        <Link to="/eLogin">
          <div className="link">Using E-mail to Login</div>
        </Link>
      </form>
    </div>
  );
}

export default PSignin;
