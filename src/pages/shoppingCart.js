import React from 'react';

function ShoppingCart({cartItems}){
    return (
        <div>
          <h1>購物車</h1>
          {cartItems.length === 0 ? (
            <p>購物車是空的</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}
export default ShoppingCart;