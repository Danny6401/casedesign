import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import logo from "../assets/logo.png";
// import { useState } from "react";
// import axios from "axios";
import React from "react";
import AdminItems from "./AdminItem";
import AdminUser from "./AdminUser";
import AdminOrder from "./AdminOrder";
// import AdminUsers from "./AdminUser";

function AdminPage(){
    console.log("AdminPage");
    return (
        <div className="app">
      <header className="header">
        <div className="box">
          <Link to="/">
            <img src={logo} className="titleLogo" alt="Logo" />
          </Link>
          <Link className="boxRight">
            <Link to="/">
                <div className="Home">HomePage</div>
            </Link>
            <Link to="/system/AdminUser">
              <div className="AdminUser">使用者管理</div>
            </Link>
            <Link to="/system/AdminItem">
              <div className="AdminItem">商品管理</div>
            </Link>
            <Link to="/system/AdminOrder">
              <div className="AdminOrder">訂單管理</div>
              </Link>
          </Link>
        </div>
      </header>
      <section className="content">
        <Routes>
          <Route path="/AdminItem" element={<AdminItems />} />
          <Route path="/AdminUser" element={<AdminUser />} />
          <Route path="/AdminOrder" element={<AdminOrder />} />
        </Routes>
        </section>
      <footer className="footer">
        <div>caseDesign</div>
      </footer>
    </div>
    );
    // const url = "http://localhost:5000/system";
    // const result = axios(url);
    // if (result && result.data){
    //     result.data.map(el=>{
    //         const {} = el;

    //     })
    // }

}

export default AdminPage;