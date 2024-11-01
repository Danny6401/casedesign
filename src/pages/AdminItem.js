import axios from "axios";
import React from "react";
import Defines from "../utils/Defines";
import { redirect } from "react-router-dom";
/*fun'ction adminItem() {
  console.log("adminItem");
  return <h1>label</h1>;
}*/
class AdminItem extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    // const url = "http://localhost:5000/system/AdminItem";
    const url = process.env.REACT_APP_URL + "system/AdminItem";
    console.log("componentDidMount");
    try {
      const result = await axios(url);
      // let dispString = "";
      /**
       * 加入分類~
       */
      if (result && result.data) {
        this.setState({ data: result.data });
        /*result.data.map((item) => {
          const { _id, name, color, description, filename, price, available } =
            item;
          let sell = null;
          available === true ? (sell = "是") : (sell = "否");
          dispString += `
            <div class="card">
             <div class="name">
              <p>商品名稱: ${name}</p>
              <p>商品描述: ${description}</p>
              <p>商品顏色: ${color}</p>
              <div class="image">
                <img src="/photo/${filename}"/>
              </div>
              <p>定價: ${price}</p>
              <p>銷售中: ${sell}</p>
              {
              <button type="button" onClick=()=>{this.deleteItemHandler(_id)}>刪除商品</buttn>}
              <p></p>
            </div>
            </div>`;
        });
        //ToDo::要加入新增物品的功能
        console.log(dispString);
        this.setState({ data: dispString });*/
      }
    } catch (e) {
      console.log("Error:", e);
    }
  }
  async deleteItemHandler(id) {
    console.log("deleteUserHandler");
    //const url = "http://localhost:5000/system/AdminUser";
    const url = process.env.REACT_APP_URL + "system/AdminItem";
    const data = { _id: id, action: "delete" };
    try {
      let result = await axios.post(url, data);
      alert(result.data.message);
      this.componentDidMount();
      redirect("/system/AdminItem");
    } catch (err) {
      console.log("delete Item:", err);
    }
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        {data &&
          data.map((item) => {
            return (
              <div key={item._id} className="card">
                <p>商品名稱: {item.name}</p>
                <p>商品描述: {item.description}</p>
                <p>商品顏色: {item.color}</p>
                <div className="image">
                  <img src={`/photo/case/${item.filename}`} alt={item.name} />
                </div>
                <p>定價: {item.price}</p>
                <p>銷售中: {item.available === true ? "是" : "否"}</p>
                <button
                  type="button"
                  onClick={() => this.deleteItemHandler(item._id)}
                >
                  刪除商品
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}
/*return( result.map((item) => {
      const { _id, name, color, description, filename, price, available } = item;
      let sell = null;
      available === true ? (sell = "是") : (sell = "否");
      <div>
      dispString += `
        <div class="card">
         <div class="name">
          <p>商品名稱: ${name}</p>
          <p>商品描述: ${description}</p>
          <p>商品顏色: ${color}</p>
          <div class="image">
            <img src="/photo/${filename}"/>
          </div>
          <p>定價: ${price}</p>
          <p>銷售中: ${sell}</p>
          {
          <button type="button" onClick=()=>{this.deleteItemHandler(_id)}>刪除商品</buttn>}
          <p></p>
        </div>
        </div>`
        </div>
    });*/
//ToDo::要加入新增物品的功能
//console.log(dispString);
//const { data } = this.state;
// return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
// }
// }

const App = (props) => {
  console.log("AdminItems");
  return (
    <div className="Items">
      <AdminItem />
    </div>
  );
};

export default App;
