import React from 'react';
import logo from '../assets/logo.png';
import './App.css';
import { Link, Route, withRouter } from 'react-router-dom';
import HomePage from "./homepage"
import eLogin from "./eLogin"
import pLogin from "./pLogin"
import signUp from "./signUp"
import Customized from "./customized"


function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="box">
          <Link to="/"><img src={logo} className="titleLogo"/></Link>
          <div className="boxRight">
            <Link to="/customized"><div className="customized">客製化手機殼 </div></Link>
            <Link to="/"><div className="shoppingCart">購物車 </div></Link>
            <Link to="/elogin"><div className="hlogin" >Login</div></Link>
          </div>
        </div>
      </header>
      <section className="content">
        <Route path="/" exact component={HomePage} />
        <Route path="/elogin" exact component={eLogin} />
        <Route path="/pLogin" exact component={pLogin} />
        <Route path="/signUp" exact component={signUp} />
        <Route path="/customized" exact component={Customized}/>
      </section>
      <footer className="footer">
        <div>caseDesign</div>
      </footer>
    </div>
  );
}

export default withRouter(App);
