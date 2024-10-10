import "./signup.scss";
import logo from "../assets/logo.png";

const signUp = () => {
  return (
    <div className="signup">
      <img id="logo" alt=" " height={60} src={logo} />
      <h4>Sign up</h4>
      <form>
        <div>
          <label htmlFor="username">*User Name:</label>
          <input
            id="username"
            type="text"
            name="username"
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
            className="text_input"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">*Phone Number:</label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
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

export default signUp;
