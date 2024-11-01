import axios from "axios";
import React from "react";
// import { useState } from "react";
// import Defines from "../utils/Defines";
import { useState } from "react";
import Defines from "../utils/Defines";

class AdminUser extends React.Component {
  state = {
    data: [],
  };
  async deleteUserHandler(email) {
    console.log("deleteUserHandler");
    //const url = "http://localhost:5000/system/AdminUser";
    const url = process.env.REACT_APP_URL + "system/AdminUser";
    const data = { email: email, action: "delete" };
    try {
      let result = await axios.post(url, data);
      alert(result.data.message);
      this.componentDidMount();
    } catch (err) {
      console.log("delete user:", err);
    }
  }
  async componentDidMount() {
    // const url = "http://localhost:5000/system/AdminUser";
    const url = process.env.REACT_APP_URL + "system/AdminUser";
    try {
      console.log("AdminUser componentDidMount");
      const result = await axios.get(url);
      console.log("get admin user:", result);
      console.log("typeof result.data: ", typeof result.data);
      if (result && result.data) {
        this.setState({ data: result.data });
      } else {
        console.log("result null?");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  render() {
    // console.log("Rendering");
    console.log("Rendering");
    const { data } = this.state;
    if (data.length === 0) {
      return <div>載入中...</div>;
    }
    console.log("typeof data: ", typeof data, " and data: ", data);
    return (
      <div>
        {data.map((item, index) => {
          const { username, email, phonenumber, address, order, admin } = item;
          return (
            <div className="card" key={index}>
              <div className="name">
                <p>使用者名稱: {username}</p>
                <p>EMAIL: {email}</p>
                <p>行動電話: {phonenumber}</p>
                <p>送貨地址: {address}</p>
                {order !== undefined && <p>訂單號碼: {order.join(", ")}</p>}
                <p>管理者: {admin ? "是" : "否"}</p>
                {admin !== true && (
                  <button
                    type="button"
                    onClick={() => this.deleteUserHandler(email)}
                  >
                    刪除使用者
                  </button>
                )}
                <p>
                  ================================================================
                </p>
                <br />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const App = (props) => {
  console.log("Adminusers");
  return (
    <div className="Items">
      <AdminUser />
    </div>
  );
};

export default App;
