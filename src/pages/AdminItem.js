import axios from "axios";
import React from "react";

class AdminItem extends React.Component {

  state = {
    data: [],
  };
  async componentDidMount() {
    const url = "http://localhost:5000/system/AdminItem";
    console.log("componentDidMount");
    const result = await axios(url);
    let dispString = "";
    /**
     * 加入分類~
     */
    if (result && result.data) {
      result.data.map(item => {
        const { name, color, description, filename, price, available } = item;
        let sell = null;
        available === true ? sell = "是" : sell = "否";
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
              <p></p>
            </div>
            </div>`
      })
      //ToDo::要加入新增物品的功能
      console.log(dispString);
      this.setState({ data: dispString });
    }
  }
  render() {
    const { data } = this.state
    return (
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    );
  }
}

const App = (props) => {
  console.log("AdminItems");
  return (
    <div className="Items">
      <AdminItem />
    </div>
  );
};

export default App;
