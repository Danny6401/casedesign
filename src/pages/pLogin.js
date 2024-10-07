import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import "./login.scss";
import logo from "../assets/logo.png"
import { useState } from 'react';


function PSignin(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 阻止送出表單
  const handleSubmit = (e) => {
    e.preventDefault();
    // 確認是否有抓到 username
    alert(username);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <img id="logo" height={80} src={logo}/>
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
            required/>
        <input
            type="password"
            id="password"
            name="password"
            value={password} 
            onChange={handlePassword}
            placeholder="Password"
            className="text_input"
            required/>
        <div className="errorText"></div>
        <input
          type="submit"
          value="SIGN IN"
          className="btn"/>        
        <Link to ="/signUp"><input
          type="button"
          value="SIGN UP"
          className="btn"/>
        </Link>
        <Link to="/eLogin"><div className="link">Using E-mail to Login</div></Link>
      </form>
    </div>
  )
}





export default PSignin;