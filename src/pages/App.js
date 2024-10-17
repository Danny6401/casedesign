import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './App.css';
import { Link, Route, withRouter } from 'react-router-dom';
import HomePage from "./homepage"
import eLogin from "./eLogin"
import pLogin from "./pLogin"
import signUp from "./signUp"
import Customized from "./customized"
import ShoppingCart from "./shoppingCart"


function App() {
  const [cartItems, setCartItems] = useState([]);

  // 當應用加載時從 localStorage 中恢復購物車數據
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // 每次購物車更新時保存到 localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

//添加至購物車  
  const addToCart = (product) => {
    const existProduct=cartItems.find(item=>item.id===product.id);
    if(existProduct){
      setCartItems(cartItems.map(item=>
        item.id===product.id?{ ...item, quantity: item.quantity + 1 } : item
      )); 
    }else {
      setCartItems([...cartItems,{...product, quantity:1}]);
    };
  }




  return (
    <div className="app">
      <header className="header">
        <div className="box">
          <Link to="/"><img src={logo} className="titleLogo" alt="logo"/></Link>
          <div className="boxRight">
            <Link to="/customized"><div className="customized">客製化手機殼 </div></Link>
            <Link to="/shoppingCart"><div className="shoppingCart">購物車 </div></Link>
            <Link to="/elogin"><div className="hlogin" >Login</div></Link>
          </div>
        </div>
      </header>
      <section className="content">
        <Route exact path="/" component={HomePage} />
        <Route path="/elogin" component={eLogin} />
        <Route path="/pLogin" component={pLogin} />
        <Route path="/signUp" component={signUp} />
        <Route path="/shoppingCart" component={()=><ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/customized" component={()=><Customized addToCart={addToCart}/>}/>
      </section>
      <footer className="footer">
        <div>caseDesign</div>
      </footer>
    </div>
  );
}

export default withRouter(App);
