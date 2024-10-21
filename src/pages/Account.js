/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";*/
import "./login.scss";
import logo from "../assets/logo.png";
import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { contextLoginName } from "./App";
import { Link } from "react-router-dom";
// import { loginStatus } from './App';

function Account() {
  const [address, setAddress] = useState("");
  const [respData, setrespData] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setselectedOrder] = useState(null);
  const { LoginName } = useContext(contextLoginName);
  let LinkAddress = "http://localhost:5000/account/";
  const url = "http://localhost:5000/account/" + LoginName;

  useEffect(() => {
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setrespData(data);
        LinkAddress += data.username + "/";
        const temp = data.order.map((item) => ({
          id: item,
          url: `${LinkAddress}${item}`,
        }));
        console.log("temp:", temp);
        setOrders(temp);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [url]);

  const fetchOrderDetails = (localurl) => {
    fetch(localurl, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setselectedOrder(data); // 把訂單詳細資料存入 selectedOrder
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };
  const uploadAddress = () => {
    console.log("Address:", address);
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  return (
    <div className="account">
      <img id="logo" height={80} src={logo} alt="logo" />
      <h4>使用者資訊</h4>
      <form onSubmit={handleAddress}>
        <h5>
          <label>
            使用者名稱: {respData.username}
            <br />
          </label>
          <label>
            Email: {respData.email}
            <br />
          </label>
          <label>
            手機號碼: {respData.phonenumber}
            <br />
          </label>
          <label htmlFor="address">
            送貨地址: {respData.address}
            <br />
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={respData.address}
            onChange={handleAddress}
            placeholder="送貨地址"
            className="text_input"
            required
          />
          <br />
          <label>
            暱稱: {respData.nickname}
            <br />
          </label>
          <label>
            訂單列表:
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <button
                    type="button"
                    onClick={() => fetchOrderDetails(order.url)}
                    className="link-button"
                  >
                    {order.id}
                  </button>
                </li>
              ))}
            </ul>
          </label>
        </h5>
        {selectedOrder && (
          <div className="order-details">
            <h5>訂單詳細資料</h5>
            <p>訂單編號: {selectedOrder.orderid}</p>
            {selectedOrder.items &&
              selectedOrder.items.map((item, index) => (
                <div key={index}>
                  <p>商品名稱: {item.name}</p>
                  <p>價格: {item.price}</p>
                  <p>數量: {item.quantity}</p>
                  <p>詳細: {JSON.stringify(item.detail)}</p>
                </div>
              ))}
          </div>
        )}
        <button type="button" onClick={uploadAddress}>
          修改資料
        </button>
      </form>
    </div>
  );
}

export default Account;
