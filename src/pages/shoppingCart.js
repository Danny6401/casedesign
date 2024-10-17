import React from 'react';
import demo from "../assets/photo/cartdemo.jpg";
import "./shoppingcart.scss";

function ShoppingCart({cartItems,setCartItems}){

  //更新數量
  const updateQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

//移除購物車項目
  const removeCart =(productId)=>{
    setCartItems(cartItems.filter(item=>item.id!==productId))
  }
//計算總金額
  const totalPrice = () => {
    return cartItems
        .reduce((total, item) => 
                    total + item.price * item.quantity, 0);
  };

  return (
      <div className="cart">
        <h1>購物車</h1>
        {cartItems.length === 0 ? (
          <p>購物車是空的</p>
        ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cartItem">
              <div className="itemImage">
                <img src={demo} alt="custdemo"/>
                <div className="itemDetail">
                  <p>鏡頭框顏色:{item.detail.lensRing}</p>
                  <p>側邊按鍵顏色:{item.detail.sideButton}</p>
                  <p>加購磁吸環:{item.detail.magsafe}</p>
                  <p>加購掛繩:{item.detail.lanyard}</p>
                </div>
              </div>
              <div className="itemName">
                <h3>{item.name}</h3>
                <p>單價: NT${item.price}</p>
              </div>
              <div className="buttons">
                <button className="remove" onClick={() => removeCart(item.id)}>
                  移除
                </button>
                <div className="quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                   - </button>
                  <p className='quant'> {item.quantity} </p>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        )}
        <div>
        <div className="totalPrice">
            <p className="total">總計: NT${totalPrice()}</p>
        </div>
        <button
            className="sendOrder"
            disabled={cartItems.length === 0 || totalPrice() === 0}>
            送出訂單
        </button>
        </div>
      </div>
    );
}
export default ShoppingCart;