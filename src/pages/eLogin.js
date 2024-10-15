import { BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';
import "./login.scss";
import logo from "../assets/logo.png"
import { useState } from 'react';


function ESignin(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  
  
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
    <div className="login" >
      <img id="logo" height={80} src={logo} alt="logo"/>
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
        <Link to="/pLogin"><div className="link">Using Phone Number to Login</div></Link>
      </form>
    </div>
  )
}





export default ESignin;