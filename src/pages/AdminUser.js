import axios from "axios";
import React from "react";
import { useState } from "react";
/**
    username: "網站管理員",
    email: "root@caseDesign.com",
    password: "123456",
    mobile: "0912345678",
    address: "台北市信義區市民大道六段288號5樓",
    order: [],
    admin: true,

 */
class AdminUser extends React.Component {
  state = {
    data: [],
  };
  async deleteUser(user) {
    const url = "http://localhost:5000/system/AdminUser";
    const data = { email: "test@example.com" };
    try {
      let result = await axios.post(url, data);
    } catch (err) {}
  }
  async componentDidMount() {
    const url = "http://localhost:5000/system/AdminUser";
    try {
      console.log("AdminUser componentDidMount");
      const result = await axios(url);
      console.log("get admin user:" + result);
      let dispString = "";
      // console.log("result: ", result, " result.data: ", result.data);
      if (result && result.data) {
        result.data.map((item) => {
          const { username, email, phonenumber, address, order, admin } = item;
          let administrator = null;
          admin === true ? (administrator = "是") : (administrator = "否");
          //下面的訂單編號應該要有link to...查詢資料庫的功能(也就是查詢的頁面)，search?動態路由，請看node(3)
          dispString += `
            <div class="card">
             <div class="name">
              <p>使用者名稱: ${username}</p>
              <p>EMAIL: ${email}</p>
              <p>行動電話: ${phonenumber}</p>
              <p>送貨地址: ${address}</p>
              <p>訂單號碼: ${order}</p> 
              <p>管理者: ${administrator}</p>
              <label for "deleteuser">刪除使用者</label>
              <input type="checkbox" id="deleteuser" name="deleteuser"/>
              <button type="button" onclick="deleteUserHandler('${email}')">
              刪除使用者
              </button>
              <p>================================================================</p>
              <br/>
            </div>
            </div>`;
        });
        //ToDo::要加入刪除使用者的功能
        console.log(dispString);
        this.setState({ data: dispString });
      } else {
        console.log("result null?");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  render() {
    console.log("Rendering AdminUser Component");
    const { data } = this.state;
    return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
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
/*
class AdminUser extends React.Component {
  state = {
    data: [],
  };

  // 定義刪除使用者的方法，接收使用者 email
  async deleteUser(email) {
    const url = "http://localhost:5000/system/AdminUser";
    const data = { email };
    try {
      let result = await axios.post(url, data);
      console.log("User deleted successfully:", result);
      // 更新狀態或重新載入使用者列表
      this.componentDidMount(); // 刪除後重新載入使用者列表
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:5000/system/AdminUser";
    try {
      console.log("AdminUser componentDidMount");
      const result = await axios(url);
      console.log("get admin user:", result);
      let dispString = "";

      // 檢查結果並組建要顯示的使用者資料
      if (result && result.data) {
        result.data.forEach((item) => {
          const { username, email, phonenumber, address, order, admin } = item;
          let administrator = admin === true ? "是" : "否";

          dispString += `
            <div class="card">
              <div class="name">
                <p>使用者名稱: ${username}</p>
                <p>EMAIL: ${email}</p>
                <p>行動電話: ${phonenumber}</p>
                <p>送貨地址: ${address}</p>
                <p>訂單號碼: ${order}</p>
                <p>管理者: ${administrator}</p>
                <button type="button" onclick="deleteUserHandler('${email}')">
                  刪除使用者
                </button>
                <p>================================================================</p>
                <br/>
              </div>
            </div>`;
        });

        // 設定顯示的資料
        this.setState({ data: dispString });
      } else {
        console.log("result null?");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  // 使用 dangerouslySetInnerHTML 會使我們需要用下面的方式傳遞事件處理器
  componentDidUpdate() {
    document.querySelectorAll('button[onclick^="deleteUserHandler"]').forEach(button => {
      const email = button.getAttribute('onclick').match(/'(.+?)'/)[1];
      button.onclick = () => this.deleteUser(email);
    });
  }

  render() {
    console.log("Rendering AdminUser Component");
    const { data } = this.state;
    return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
  }
}
*/
