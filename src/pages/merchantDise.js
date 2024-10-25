import "./image.scss";
import React from 'react';


function MerchandiseList({addToCart,productList}) {

  const sendoder=(el)=>{
    alert("已加入購物車");
    addToCart(el);
  }

  return (
    <div>
      {productList.map((el) => (
          <div className="card" key={el._id}>
            <div className="name">
              <p>商品名稱: {el.name}</p>
              <p>商品描述: {el.description}</p>
              <p>價格: NT${el.price}</p>
              <div className="image">
                <img src={`/photo/case/${el.filename}`} alt={el.name} />
              </div>
              <button onClick={() => sendoder(el)}>加入購物車</button>
            </div>
          </div>
      ))}
    </div>
  );
}

export default MerchandiseList;