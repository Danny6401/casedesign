import axios from "axios";
import React from "react";
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
  async componentDidMount() {
    const url = "http://localhost:5000/system/AdminUser";
    console.log("componentDidMount");
    const result = await axios(url);
    let dispString = "";
    // console.log("result: ", result, " result.data: ", result.data);
    if (result && result.data) {
      result.data.map((item) => {
        const { username, email, phonenumber, address, order, admin } = item;
        let administrator = null;
        admin === true ? (administrator = "是") : (administrator = "否");
        //下面的頂單編號應該要有link to...查詢資料庫的功能(也就是查詢的頁面)，search?動態路由，請看node(3)
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
              <p>================================================================</p>
              <br/>
            </div>
            </div>`;
      });
      //ToDo::要加入刪除使用者的功能
      console.log(dispString);
      this.setState({ data: dispString });
    }
  }
  render() {
    const { data } = this.state;
    return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
  }
}

const App = (props) => {
  console.log("AdminItems");
  return (
    <div className="Items">
      <AdminUser />
    </div>
  );
};

export default App;
