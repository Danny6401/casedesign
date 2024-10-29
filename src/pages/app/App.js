import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import pensvg from "../../assets/svg/pen.svg"
import cartsvg from "../../assets/svg/cart.svg"
import circlesvg from "../../assets/svg/person-circle.svg"
import basketsvg from "../../assets/svg/basket.svg"

// import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import {
  Link,
  Route,
  Routes,
  useNavigate /*, withRouter*/,
} from "react-router-dom";
import HomePage from "../homepage/homepage";
import ELogin from "../login/eLogin";
import PLogin from "../login/pLogin";
import SignUp from "../signup/signUp";
import Customized from "../customized/customized";
import ShoppingCart from "../shoppingCart/shoppingCart";
import ItemList from "../merchandise/merchantDise";
import Account from "../Account";
import System from "../System";
import Defines from "../../utils/Defines"
import Nav from 'react-bootstrap/Nav';
/*import AdminItems from "./AdminItem";
import AdminUser from "./AdminUser";
import AdminOrder from "./AdminOrder";/*/

export const contextLoginName = React.createContext(null);

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [LoginName, setLoginName] = useState(null);
  const LoginValue = { LoginName, setLoginName };
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]); // 儲存商品資料

  useEffect(() => {
    const fetchMerchandise = async () => {
      //const url = "http://localhost:5000/merchantdise";
      const url = Defines.URL + "merchantdise";
      try {
        const result = await axios.get(url);
        if (result && result.data) {
          setProductList(result.data); // 將資料直接存入 state
        }
      } catch (error) {
        console.error("Error fetching merchandise data:", error);
      }
    };

    fetchMerchandise();
  }, []); // 空依賴陣列確保只在第一次渲染後執行

  // 當應用加載時從 localStorage 中恢復購物車數據
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // 每次購物車更新時保存到 localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //添加至購物車
  const addToCart = (product) => {
    console.log("addToCard");
    const existProduct = cartItems.find((item) => item._id === product._id);
    if (existProduct) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <contextLoginName.Provider value={LoginValue}>
      <div className="app">

        {/* HEADER */}
        <header className="header">
          <div>
            <Link to="/">
              <img src={logo} className="titleLogo" alt="logo" />
            </Link>
            <Nav className="justify-content-end" activeKey="/">
              <Nav.Item>
                <Nav.Link href="/customized"><img src={pensvg} alt="pen"/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/shoppingCart"><img src={cartsvg} alt="cart"/></Nav.Link>
              </Nav.Item>

              {/* 登入選項 */}
              <Nav.Item>
                <Nav.Link href="/eLogin"><img src={circlesvg} alt="person"/></Nav.Link>
                {LoginName === null && (
                  <Nav.Link to="/eLogin">
                    <div className="hlogin"></div>
                  </Nav.Link>
                )}
                {LoginName === "網站管理員" && (
                  <>
                    <Link to="/system">
                      <div className="System">
                        系統管理
                        <br />
                      </div>
                    </Link>
                  </>
                )}
                {LoginName !== null && (
                  <Link to="/account">
                    {" "}
                    <div className="account">帳戶管理</div>
                    <br />
                  </Link>
                )}
                {LoginName !== null && (
                  <div
                    onClick={() => {
                      alert(LoginName + " 您已登出!");
                      setLoginName(null);
                      //const url = "http://localhost:5000/logout";
                      const url = Defines.URL + "logout";
                      const logout = async () => {
                        await axios(url);
                      };
                      logout();
                      navigate("/");
                    }}
                    className="hLogout"
                  >
                    Logout
                    <br />
                  </div>
                )}
                {/* 商品列表選項 */}
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="/List"><img src={basketsvg} alt="List"/></Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </header>

        <section className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/eLogin" element={<ELogin />} />
            <Route path="/pLogin" element={<PLogin />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/shoppingCart"
              element={
                <ShoppingCart
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route
              path="/customized"
              element={<Customized addToCart={addToCart} />}
            />
            <Route path="/merchantdise" element={<ItemList addToCart={addToCart} productList={productList} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/system/*" element={<System />} />
            {/* 幹，上面的/system/*很重要，如果沒有後面的*，連到system的時候每個組件都不會工作 */}
          </Routes>
        </section>


        <footer className="footer">
          <div>caseDesign</div>
        </footer>
      </div>
    </contextLoginName.Provider>
  );
}


export default App;
//export default withRouter(App);
