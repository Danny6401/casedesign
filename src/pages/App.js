import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
// import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import {
  Link,
  Route,
  Routes,
  useNavigate /*, withRouter*/,
} from "react-router-dom";
import HomePage from "./homepage";
import ELogin from "./eLogin";
import PLogin from "./pLogin";
import SignUp from "./signUp";
import Customized from "./customized";
import ShoppingCart from "./shoppingCart";
import ItemList from "./merchantDise";
import Account from "./Account";
import System from "./System";
/*import AdminItems from "./AdminItem";
import AdminUser from "./AdminUser";
import AdminOrder from "./AdminOrder";/*/

export const contextLoginName = React.createContext(null);

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [LoginName, setLoginName] = useState(null);
  const LoginValue = { LoginName, setLoginName };
  const navigate = useNavigate();
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
    const existProduct = cartItems.find((item) => item.id === product.id);
    if (existProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
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
        <header className="header">
          <div className="box">
            <Link to="/">
              <img src={logo} className="titleLogo" alt="logo" />
            </Link>
            <div className="boxRight">
              <Link to="/customized">
                <div className="customized">客製化手機殼 </div>
                <br />
              </Link>
              <Link to="/shoppingCart">
                <div className="shoppingCart">購物車 </div>
                <br />
              </Link>
              {LoginName === null && (
                <Link to="/eLogin">
                  <div className="hlogin">Login</div>
                  <br />
                </Link>
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
                    const url = "http://localhost:5000/logout";
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

              <Link to="/merchantdise">
                <div className="List">商品列表</div>
              </Link>
            </div>
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
            <Route path="/merchantdise" element={<ItemList />} />
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
