import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "./systemPage.scss";
import React from "react";
import AdminItems from "./AdminItem";
import AdminUser from "./AdminUser";
import AdminOrder from "./AdminOrder";
import UploadItem from "./UploadItem";
import archive from "../../assets/svg/archive.svg"
import person from "../../assets/svg/person-check.svg"
import cash from "../../assets/svg/cash.svg"
import bag from "../../assets/svg/bag.svg"

function AdminPage() {
  console.log("AdminPage");
  return (
    <div className="app">
        <div className="topBox">
          <Link to="AdminItem"><img src={archive} alt=""></img>商品管理</Link>
          <Link to="AdminUser"><img src={person} alt=""></img>使用者管理</Link>
          <Link to="AdminOrder"><img src={cash} alt=""></img>訂單管理</Link>
          <Link to="UploadItem"><img src={bag} alt=""></img>上傳商品</Link>
        </div>
      <section className="content">
        <Routes>
          <Route path="AdminItem" element={<AdminItems />} />
          <Route path="AdminUser" element={<AdminUser />} />
          <Route path="AdminOrder" element={<AdminOrder />} />
          <Route path="UploadItem" element={<UploadItem />} />
        </Routes>
      </section>
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
