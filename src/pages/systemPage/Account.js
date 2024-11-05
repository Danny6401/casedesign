/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";*/
import "./Account.scss";
import logo from "../../assets/logo.png";
import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { contextLoginName } from "../app/App";
import { Link } from "react-router-dom";
import Defines from "../../utils/Defines";
// import { loginStatus } from './App';

function Account() {
  const [address, setAddress] = useState("");
  const [respData, setrespData] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setselectedOrder] = useState(null);
  const { LoginName } = useContext(contextLoginName);
  let LinkAddress = process.env.REACT_APP_URL + "account/";
  // const url = "http://localhost:5000/account/" + LoginName;
  const url = LinkAddress + LoginName;

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
        console.log("fetched data: ", data);
        const orderid = data[0];
        console.log("orderid: ", orderid);
        const items = data.slice(1);
        // setselectedOrder(data); // 把訂單詳細資料存入 selectedOrder
        setselectedOrder({ ...orderid, items });
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
        <div>
          <label>
            使用者名稱: {respData.username}
          </label>
          <br/>
          <label>
            Email: {respData.email}
          </label>
          <br/>
          <label>
            手機號碼: {respData.phonenumber}
          </label>
          <br/>
          <label htmlFor="address">
            送貨地址: {respData.address}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={respData.address}
            onChange={handleAddress}
            placeholder="送貨地址"
            className="address_input"
            required
          />
          <br/>
          <label>
            暱稱: {respData.nickname}
          </label>
          <br/>
          <label>
            訂單列表(點擊編號查看詳細內容):
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <div
                    // type="button"
                    onClick={() => fetchOrderDetails(order.url)}
                    className="link-button"
                  >
                    {order.id}
                  </div>
                </li>
              ))}
            </ul>
          </label>
        </div>
        {selectedOrder && (
          <div className="order-details">
            <h4>訂單詳細資料</h4>
            <p>訂單編號: {selectedOrder.orderid}</p>
            {selectedOrder.items &&
              selectedOrder.items.map((item, index) => (
                <div key={index}>
                  <p>商品名稱: {item.name}</p>
                  <p>價格: {item.price}</p>
                  <p>數量: {item.quantity}</p>
                  {item.detail !== undefined && (
                    <p>
                      品項:{" "}
                      {JSON.stringify(item.detail)
                        .replace("lensRing", "鏡頭框")
                        .replaceAll("sideButton", "側邊按鈕")
                        .replaceAll("magsafe", "磁吸環")
                        .replaceAll("lanyard", "掛繩")
                        .replaceAll("price", "總價")
                        .slice(1, -1)}
                    </p>
                  )}
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
