import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "../pages/app/app.css";
import logo from "../assets/logo.png";
import React from "react";
import AdminItems from "./AdminItem";
import AdminUser from "./AdminUser";
import AdminOrder from "./AdminOrder";
import UploadItem from "./UploadItem";

function AdminPage() {
  console.log("AdminPage");
  return (
    <div className="app">
      <header className="header">
        <div className="boxRight">
          <Link to="/">
            <img src={logo} className="titleLogo" alt="Logo" />
          </Link>
          <Link to="AdminItem">商品管理</Link>
          <Link to="AdminUser">使用者管理</Link>
          <Link to="AdminOrder">訂單管理</Link>
          <Link to="UploadItem">上傳商品</Link>
        </div>
      </header>
      <section className="content">
        <Routes>
          <Route path="AdminItem" element={<AdminItems />} />
          <Route path="AdminUser" element={<AdminUser />} />
          <Route path="AdminOrder" element={<AdminOrder />} />
          <Route path="UploadItem" element={<UploadItem />} />
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
