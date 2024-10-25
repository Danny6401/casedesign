import React from "react";
import demo from "../assets/photo/cartdemo.jpg";
import "./shoppingcart.scss";
import { useNavigate } from "react-router-dom";

function ShoppingCart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    console.log("event~ ", e);
    // cartItems.map((item)=>{console.log("item:", item);})
    for (let item of cartItems) console.log("item: ", item);
    try {
      let result = await fetch("http://localhost:5000/uploadorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItems),
      });
      let message = await result.json();

      if (message.status === 200) {
        alert(
          "訂單號碼: " +
            message.orderid +
            " " +
            message.responseMsg +
            ", 訂單成立!"
        );
        setCartItems([]);
        navigate("/");
      } else if (message.status === 302) {
        alert(message.responseMsg);
        navigate("/eLogin");
      } else if (message.status !== undefined)
        alert(message.responseMsg + ", 訂單失敗!");
    } catch (err) {
      console.log("Err: ", err);
      alert("網路連線問題, 訂單失敗!");
    }
  };
  //更新數量
  const updateQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  //移除購物車項目
  const removeCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
  };
  //計算總金額
  const totalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart">
      <h1>購物車</h1>
      {cartItems.length === 0 ? (
        <p>購物車是空的</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="cartItem">
                {typeof(item._id)=="number"?(
                  <div className="itemImage">
                    <img src={item.filename} alt="custdemo"/>
                    <div className="itemDetail">
                      <p>產品介紹:{item.description
                      }</p>
                    </div>
                  </div>
                ):(
                  <div className="itemImage">
                    <img src={demo} alt="custdemo"/>
                    <div className="itemDetail">
                      <p>鏡頭框顏色:{item.detail.lensRing}</p>
                      <p>側邊按鍵顏色:{item.detail.sideButton}</p>
                      <p>加購磁吸環:{item.detail.magsafe}</p>
                      <p>加購掛繩:{item.detail.lanyard}</p>
                    </div>
                  </div>
                )}
              <div className="itemName">
                <h3>{item.name}</h3>
                <p>單價: NT${item.price}</p>
              </div>
              <div className="buttons">
                <button className="remove" onClick={() => removeCart(item._id)}>
                  移除
                </button>
                <div className="quantity">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -{" "}
                  </button>
                  <p className="quant"> {item.quantity} </p>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
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
          onClick={handleClick}
          // type='submit'
          disabled={cartItems.length === 0 || totalPrice() === 0}
        >
          送出訂單
        </button>
      </div>
    </div>
  );
}
export default ShoppingCart;
