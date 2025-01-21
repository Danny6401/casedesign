import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import badgesvg from "../../assets/svg/person-badge.svg"
import cartsvg from "../../assets/svg/cart.svg"
import circlesvg from "../../assets/svg/person-circle.svg"
import phonesvg from "../../assets/svg/phone.svg"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/dropdown';
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
import ItemList from "../merchandise/merchandise";
import Account from "../systemPage/Account";
import Systems from "../systemPage/Systems";
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


  //將登入資料保存到localStorage
  useEffect(() => {
    const storedLoginName = localStorage.getItem("LoginName");
    if (storedLoginName) {
      setLoginName(storedLoginName);
    }
  }, []);

  useEffect(() => {
    if (LoginName !== null) localStorage.setItem("LoginName", LoginName);
    else localStorage.removeItem("LoginName");
  }, [LoginName]);

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
        <header className="header" >
          <Navbar className="bg-body-tertiary" activeKey="/">
            <Container >
              {/* LOGO */}
              <Navbar.Brand>
                <Nav.Link href="/"><img src={logo} className="titleLogo" alt="logo" /></Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              {/* LOGO */}


              <Navbar.Collapse className="justify-content-end" data-bs-theme="#A1887F">
                {/* 客製化選項 */}
                <Nav.Item xs={1}>
                  <Nav.Link href="/customized"><img src={badgesvg} className="svg" alt="pen" title="客製化"/>  </Nav.Link>
                </Nav.Item>
                {/* 商品列表選項 */}
                <Nav.Item>
                  <Nav.Link href="/merchandise"><img src={phonesvg} className="svg" alt="phone" title="商品列表"/></Nav.Link>
                </Nav.Item>
                {/* 登入選項 */}

                <Dropdown>
                  <Dropdown.Toggle split variant="svg" ><img src={circlesvg} className="svg" alt="person" title="登入" /></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/eLogin">登入</Dropdown.Item>
                    {LoginName === null && (
                      <Dropdown.Item to="/eLogin"><div className="hlogin"></div></Dropdown.Item>
                    )}
                    {LoginName === "網站管理員" && (
                      <>
                        <Dropdown.Item href="/systems">
                          <div className="System">
                            系統管理
                            <br />
                          </div>
                        </Dropdown.Item>
                      </>
                    )}
                    {LoginName !== null && (
                      <Dropdown.Item href="/account">
                        {" "}
                        <div className="accounts">帳戶管理</div>
                        <br />
                      </Dropdown.Item>
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
                      > 登出 </div>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item xs={1}>
                  <Nav.Link href="/shoppingCart"><img src={cartsvg} className="svg" alt="cart" title="購物車"/>  </Nav.Link>
                </Nav.Item>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        

        <section className="content">
          <Routes>
            <Route exact path="/" element={<HomePage addToCart={addToCart} productList={productList} />} />
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
            <Route path="/merchandise" element={<ItemList addToCart={addToCart} productList={productList} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/systems/*" element={<Systems />} />
            {/* 上面的/system/*很重要，如果沒有後面的*，連到system的時候每個組件都不會工作 */}
          </Routes>
        </section>


        <footer className="footer">
          <Navbar>
            <Container>
              <Navbar.Brand href="/">
                <Nav.Link href="/"><img src={logo} className="titleLogo" alt="logo" /></Nav.Link>
              </Navbar.Brand>
              <Nav.Item>
                Designed : caseDesign
              </Nav.Item>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Danny, Ajax, Chester</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </footer>
      </div>
    </contextLoginName.Provider >
  );
}


export default App;
//export default withRouter(App);
