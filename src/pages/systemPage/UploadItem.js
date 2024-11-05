import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadItem.scss";

function Form(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [sell, setSell] = useState(false);
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate(); // 使用 useNavigate 來跳轉頁面

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price <= 0) {
      alert("請再確認商品金額!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("price", price);
    formData.append("sell", sell);
    if (picture) formData.append("picture", picture);

    try {
      const URL = process.env.REACT_APP_URL + "system/AdminItem/UploadItem";
      const result = await axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // 不管有沒有成功都要跳轉頁面
      //      if (result.data.status === 200) {
      alert(result.data.message);
      //      }
    } catch (err) {
      console.log("上傳錯誤:", err);
      alert("上傳錯誤");
    }
    navigate("/system/AdminItem/UploadItem"); //Back to Original page~
  };

  return (
    <form className="formUpload" onSubmit={handleSubmit}>
      <label htmlFor="name">商品名稱: </label>
      <input
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <label htmlFor="description">商品描述: </label>
      <input
        name="description"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <br />
      <label htmlFor="color">商品顏色: </label>
      <input
        name="color"
        type="text"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
      <br />
      <label htmlFor="price">商品價格: </label>
      <input
        name="price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <label htmlFor="sell">是否銷售?: </label>
      <input
        name="sell"
        type="checkbox"
        onChange={(e) => setSell(e.target.checked)}
        checked={sell}
      />
      <br />
      <label htmlFor="picture">圖片檔案: </label>
      <input
        className="file"
        type="file"
        name="picture"
        accept="image/*"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      <br />
      <input type="submit" value="送出" />
    </form>
  );
}

export default Form;

/*import React, { useEffect, useState } from "react";
import axios from "axios";

function Form (props){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [sell, setSell] = useState("");
  const [picture, setPicture] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.setFormDone(true);
    const upLoadData = {
      name: name,
      description: description,
      color: color,
      price: price,
      sell: sell,
      picture: picture,
    };
    if (upLoadData.price <= 0) {
      alert("請再確認商品金額!");
      return;
    }
    const URL = process.env.REACT_APP_URL + "system/AdminItem/UploadItem";
    console.log("Upload URL: ", URL);
    const upload = async (e) => {
      try {
        const result = await axios.post(URL, e);
        console.log("post result: " + result);
      } catch (err) {
        console.log("Upload Error: " + err);
      }
    };
    console.log("Ready to Submit");
    upload(upLoadData);
  };

  return (
    <form
      class="formUpload"
      encType="multipart/form-data"
      method="POST"
      action="/system/AdminItem/UploadItem"
      // onSubmit={handleSubmit}
    >
      <label for="name">商品名稱: </label>
      <input
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <label for="description">商品描述: </label>
      <input
        name="description"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <br />
      <label for="color">商品顏色: </label>
      <input
        name="color"
        type="text"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
      <br />
      <label for="price">商品價格: </label>
      <input
        name="price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <br />
      <label for="sell">是否銷售?: </label>
      <input
        name="sell"
        type="checkbox"
        onChange={(e) => setSell(e.target.value)}
        value={sell}
      />
      <br />
      <label for="picture">圖片檔案: </label>
      <input
        type="file"
        name="picture"
        accept="image/*"
        // onChange={(e) => setPicture(e.target.value)}
      />
      <br />
      <input type="submit" value="submit" />
    </form>
  );
};

export default Form;*/
