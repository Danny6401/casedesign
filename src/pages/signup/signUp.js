import "./signup.scss";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [nickname, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  console.log("SignUp");
  const handleSubmit = (e) => {
    const signupData = {
      username: username,
      nickname: nickname,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      address: address,
      birthday: birthday
    }
    e.preventDefault();
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    }).then(response => response.json()).then((data)=>{
      alert(data.message);
      if (data.result === true)
          navigate("/");
      else
          navigate("/signup");
      console.log("message: ", data.message);
      console.log("result: ", data.result);
    }).catch(err => console.log("Error: ", err));
    /*    }).then(result=>{
            console.log("Result: ", result);
            console.log(result.body.message);
        }).catch(err=>console.log("Error: ", err));*/
  }
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleNickname = (e) => {
    setNickName(e.target.value);
  }

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  }
  return (
    <div className="signup">
      <img id="logo" alt=" " height={60} src={logo} />
      <h4>Sign up</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">*User Name:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            className="text_input"
            required
          />
        </div>
        <div>
          <label htmlFor="nickname">Nick Name:</label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            value={nickname}
            onChange={handleNickname}
            className="text_input"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">*Phone Number:</label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            className="text_input"
            required
          />
        </div>
        <div>
          <label htmlFor="email">*E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="text_input"
            required
          />
        </div>
        <div>
          <label htmlFor="password">*Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="text_input"
            required
          />
        </div>
        <div>
          <label htmlFor="address">*送貨地址:</label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={handleAddress}
            className="text_input"
            required
          />
        </div>
        <div>
          <label htmlFor="birthday">*Birthday:</label>
          <input
            id="birthday"
            type="date"
            name="birthday"
            value={birthday}
            onChange={handleBirthday}
            className="text_input"
            required
          />
        </div>
        <div className="errorText"></div>
        <input type="submit" value="SIGN UP" className="btn" />
      </form>
    </div>
  );
};

export default SignUp;
