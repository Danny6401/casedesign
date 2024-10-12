import React, { useContext } from "react";
import logo from "../assets/logo.png";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import ELogin from "./eLogin";
import PLogin from "./pLogin";
import SignUp from "./signUp";
import ItemList from "./merchantDise";
import AdminPage from "./System";
// import AdminItems from "./AdminItem";
// import AdminOrders from "./AdminOrder";
// import AdminUsers from "./AdminUser";

export const dataContext = React.createContext();

function App() {
  const context = useContext(dataContext);

  return (
    <div className="app">
      <header className="header">
        <div className="box">
          <Link to="/">
            <img src={logo} className="titleLogo" alt="Logo" />
          </Link>
          <Link className="boxRight">
            <Link to="/">
              <div className="shoppingCart">購物車</div>
            </Link>
            <Link to="/eLogin">
              <div className="hLogin">Login</div>
            </Link>
            <Link to="/merchantdise">
              <div className="List">商品列表</div>
            </Link>
            <Link to="/system">
              <div className="System">系統管理</div>
            </Link>

          </Link>
        </div>
      </header>
      <section className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eLogin" element={<ELogin />} />
          <Route path="/pLogin" element={<PLogin />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/merchantdise" element={<ItemList />} />
          <Route path="/System/*" element={<AdminPage />} />
          {/* <Route path="/System/AdminItem" element={<AdminItems />} /> */}
        </Routes>
      </section>
      <footer className="footer">
        <div>caseDesign</div>
      </footer>
    </div>
  );
}

export default App;

/*import React from 'react';
import logo from '../assets/logo.png';
import './App.css';
import { Link, Route, withRouter } from 'react-router-dom';
import HomePage from "./homepage"
import eLogin from "./eLogin"
import pLogin from "./pLogin"
import signUp from "./signUp"


function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="box">
          <Link to="/"><img src={logo} className="titleLogo"/></Link>
          <div className="boxRight">
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
      </section>
      <footer className="footer">
        <div>caseDesign</div>
      </footer>
    </div>
  );
}

export default withRouter(App);*/
