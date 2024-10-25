import "./merchantDise.scss";
import React, { useState } from 'react';


function MerchandiseList({addToCart,productList}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const sendoder=(item)=>{
    alert(`商品:${item.name}  已加入購物車`);
    addToCart(item);
  }

  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const currentProducts = productList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {currentProducts.map((item) => (
          <div className="card" key={item._id}>
            <div className="name">
              <div className="image">
                <p className="title">商品名稱: {item.name}</p>
                <p>商品描述: {item.description}</p>
                <p>價格: NT${item.price}</p>
                <img src={`/photo/case/${item.filename}`} alt={item.name} />
              </div>
              <button onClick={() => sendoder(item)}>加入購物車</button>
            </div>
          </div>
      ))}
      <div className="pageChange">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          上一頁
        </button>
        <span>頁數 {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          下一頁
        </button>
      </div>
    </div>
  );
}

export default MerchandiseList;