import "./image.scss";
import React from 'react';


function MerchandiseList({addToCart,productList}) {

  const sendoder=(item)=>{
    alert(`商品:${item.name}  已加入購物車`);
    addToCart(item);
  }

  return (
    <div>
      {productList.map((item) => (
          <div className="card" key={item._id}>
            <div className="name">
              <p>商品名稱: {item.name}</p>
              <p>商品描述: {item.description}</p>
              <p>價格: NT${item.price}</p>
              <div className="image">
                <img src={`/photo/case/${item.filename}`} alt={item.name} />
              </div>
              <button onClick={() => sendoder(item)}>加入購物車</button>
            </div>
          </div>
      ))}
    </div>
  );
}

export default MerchandiseList;