import axios from "axios";
import React from "react";
import Defines from "../utils/Defines";
/**
    username: "網站管理員",
    email: "root@caseDesign.com",
    password: "123456",
    mobile: "0912345678",
    address: "台北市信義區市民大道六段288號5樓",
    order: [],
    admin: true,

 */
class AdminOrder extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    // const url = "http://localhost:5000/system/AdminOrder";
    const url = Defines.URL + "system/AdminOrder";
    console.log("componentDidMount");
    const result = await axios.get(url);
    let dispString = "";
    console.log("Order Result: ", result, " result.data: ", result.data);
    if (result && result.data) {
      if (result.data.length === 0){
        console.log("result.data.length === 0");
        dispString = '<div class="order"><p>目前尚無訂單</p></div>';
      }
      else
        result.data.map((order) => {
          /*const { _id, itemnames, status, amount } = order;
        let statusstring = "";
        switch (status) {
          case 0:
            statusstring = "已完成";
            break;
          case 1:
            statusstring = "處理中";
            break;
          case 2:
            statusstring = "運送中";
            break;
          case 3:
            statusstring = "已送達";
            break;
          case 4:
            statusstring = "退貨取件中";
            break;
          default:
            statusstring = "未知";
            break;
        }
        console.log("itemnames: ", itemnames);
        let items = "";
        for (const item of itemnames) {
          // const {name, color} = item;
          const { name } = item;
          items += name;
          // items += color;
          // items += "\n" ;
          items += "<br/>";
        }*/
          //下面訂單內的應該要有link to...查詢資料庫的功能(也就是查詢的頁面)，search?動態路由，請看node(3)
          //Original One
          /*        dispString += `
            <div class="order">
             <div class="name">
              <p>訂單編號: ${_id}</p>
              <p>品項: ${items}</p>
              <p>訂單狀況: ${statusstring}</p>
              <p>訂單金額: ${amount}</p>
              <p>================================================================</p>
              <br/>
            </div>
            </div>`;*/
          dispString += `
            <div class="order">
             <div class="name">
              <p>${order[0]}</p>
              <p>${order[1]}</p>
              <p>================================================================</p>
              <br/>
            </div>
            </div>`;
        });
      //ToDo::要加入刪除訂單的功能
      console.log("dispString:", dispString);
      this.setState({ data: dispString });
    }
  }
  render() {
    const { data } = this.state;
    return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
  }
}

const App = (props) => {
  console.log("AdminOrder");
  return (
    <div className="Items">
      <AdminOrder />
    </div>
  );
};

export default App;
