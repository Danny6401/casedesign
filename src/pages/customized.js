import "./customized.scss";
import { useState } from 'react';
import Select from "react-select";


function Customized({addToCart}){
    const phoneColor=[
        {value:"i16pro-gold",label:"沙漠色鈦金屬", color: "#d6c3b6"},
        {value:"i16pro-titanium",label:"原色鈦金屬", className:"i16pro-titanium"},
        {value:"i16pro-black",label:"黑色鈦金屬", className:"i16pro-black"},
        {value:"i16pro-white",label:"白色鈦金屬", className:"i16pro-white"},
    ]
    const lensring=[
        {value:"lensring-titanium",label:"原鈦色"},
        {value:"lensring-gold",label:"沙漠鈦金"},
        {value:"lensring-black",label:"暗黑色"},
        {value:"lensring-blue",label:"鈦藍色"},
        {value:"lensring-iris",label:"薰衣草色"}
    ]
    const sideButton=[
        {value:"button-titanium",label:"原鈦色"},
        {value:"button-gold",label:"沙漠鈦金"},
        {value:"button-black",label:"暗黑色"},
        {value:"button-blue",label:"鈦藍色"},
        {value:"button-purple",label:"薰衣草色"},
        {value:"button-pink",label:"芭比粉色"}
        
    ]
    const magsafe=[
        {value:"00",label:"否"},
        {value:"magsafe",label:"是(+ NT$50)"}
    ]
    const lanyard=[
        {value:"00",label:"否"},
        {value:"lanyard-black",label:"是(黑色 + NT$150)"},
        {value:"lanyard-white",label:"是(白色 + NT$150)"},
    ]
    //以上建立react-select所需選項之值
    const [caseStyle, setCaseStyle] = useState({
        color: "i16pro-gold",
        lensRing: "lensring-gold",
        sideButton: "button-gold",
        magsafe: "00",
        lanyard: "00"
      });//用於抓圖
      const [caseDetail, setCaseDetail] = useState({
        lensRing: "沙漠鈦金",
        sideButton: "沙漠鈦金",
        magsafe: "否",
        lanyard: "否",
        price:1000
      });//用於傳遞商品資訊

    const changePhoneColor=(e)=>{
        setCaseStyle({
            ...caseStyle,
            color:e.value
        })
    }
    const changeLensColor=(e)=>{
        setCaseStyle({
            ...caseStyle,
            lensRing:e.value
        })
        setCaseDetail({
            ...caseDetail,
            lensRing:e.label
        })
    } 
    const changeButtonColor=(e)=>{
        setCaseStyle({
            ...caseStyle,
            sideButton:e.value
        })
        setCaseDetail({
            ...caseDetail,
            sideButton:e.label
        })
    } 
    const withmagsafe=(e)=>{
        setCaseStyle({
            ...caseStyle,
            magsafe:e.value
        })
        const newMagsafe=e.label
        if (newMagsafe!=="否"&&caseDetail.magsafe === "否"){
            setCaseDetail({
                ...caseDetail,
                magsafe:newMagsafe,
                price:caseDetail.price + 50
        })//選擇要磁吸環時金額+50
        }else if(newMagsafe==="否"&&caseDetail.magsafe !== "否"){
            setCaseDetail({
                ...caseDetail,
                magsafe:newMagsafe,
                price:caseDetail.price - 50
        })//取消磁吸還金額修正
        }else{
            setCaseDetail({
                ...caseDetail,
                magsafe:newMagsafe
        }) 
        }
    }
    const withlanyard=(e)=>{
        setCaseStyle({
            ...caseStyle,
            lanyard:e.value
        })
        const newlanyard=e.label
        if (newlanyard!=="否"&&caseDetail.lanyard === "否"){
            setCaseDetail({
                ...caseDetail,
                lanyard:newlanyard,
                price:caseDetail.price + 150
        })
        }else if(newlanyard==="否"&&caseDetail.lanyard !== "否"){
            setCaseDetail({
                ...caseDetail,
                lanyard:newlanyard,
                price:caseDetail.price - 150
        })
        }else{
            setCaseDetail({
                ...caseDetail,
                lanyard:newlanyard
        }) 
        }
    }

//建立product id
    const generateProductId = (details) => {
        return `${details.lensRing}-${details.sideButton}-${details.magsafe}-${details.lanyard}`;
      };
    const product={
        id:generateProductId(caseDetail),
        name:"客製化手機殼",
        price:caseDetail.price,
        detail:caseDetail
    }

//加入購物車並刷新頁面
    const sendoder=()=>{
        console.log(product);
        alert("已加入購物車");
        window.location.reload();
        console.log("sendorder");
        addToCart(product);
        console.log("After addToCard");
    }
  
    return (
        <div >
            <div className="showProduct" >
                <img className="phone" alt="" src={require(`../assets/photo/${caseStyle.color}.png`)}/>
                <img className="case" alt="" src={require('../assets/photo/transparent.png')}/>
                <img className="lensRing" alt="" src={require(`../assets/photo/${caseStyle.lensRing}.png`)}/>
                <img className="sideButton" alt="" src={require(`../assets/photo/${caseStyle.sideButton}.png`)}/>
                <img className="magsafe" alt="" src={require(`../assets/photo/${caseStyle.magsafe}.png`)}/>
                <img className="lanyard" alt="" src={require(`../assets/photo/${caseStyle.lanyard}.png`)}/>
            </div>
            <div className="productSelect">
                <div className="optionTitle">手機顏色:</div>
                {/* <select className="phoneColor" name="phoneColor" label="手機顏色" onChange={changePhoneColor}>
                    <option value=""selected>選擇手機顏色</option>
                    <option className="i16pro-gold" value="i16pro-gold">沙漠色鈦金屬</option>
                    <option className="i16pro-titanium" value="i16pro-titanium" >原色鈦金屬</option>
                    <option className="i16pro-black" value="i16pro-black">黑色鈦金屬</option>
                    <option className="i16pro-white" value="i16pro-white">白色鈦金屬</option>
                </select> */}
                <Select className="select" options={phoneColor} onChange={changePhoneColor} placeholder="選擇手機顏色"/>
                <div className="optionTitle">鏡頭框顏色:</div>
                {/* <select className="lensRing" name="lensRing" onChange={changeLensColor}>
                    <option value="" selected>鏡頭框顏色</option>
                    <option value="lensring-titanium">原鈦色</option>
                    <option value="lensring-gold" >沙漠鈦金</option>
                    <option value="lensring-black">暗黑色</option>
                    <option value="lensring-blue">鈦藍色</option>
                    <option value="lensring-iris">薰衣草色</option>
                </select> */}
                <Select className="select" options={lensring} onChange={changeLensColor} placeholder="選擇鏡頭框顏色"/>
                <div className="optionTitle">側邊按鍵顏色:</div>
                {/* <select className="sideButton" name="sideButton" onChange={changeButtonColor}>
                    <option value="" selected>按鍵顏色</option>
                    <option value="button-titanium">原鈦色</option>
                    <option value="button-gold" >沙漠鈦金</option>
                    <option value="button-black">暗黑色</option>
                    <option value="button-blue">鈦藍色</option>
                    <option value="button-purple">薰衣草色</option>
                    <option value="button-pink">芭比粉色</option>
                </select> */}
                <Select className="select" options={sideButton} onChange={changeButtonColor} placeholder="選擇側邊按鍵顏色"/>
                <div className="optionTitle">是否加購磁吸環:</div>
                {/* <select className="magsafe" name="magsafe" onChange={withmagsafe}>
                    <option value="00" selected>是否加購磁吸環</option>
                    <option value="00">否</option>
                    <option value="magsafe">是(+ NT$50)</option>
                </select> */}
                <Select className="select" options={magsafe} onChange={withmagsafe} placeholder="請選擇"/>
                <div className="optionTitle">是否加購掛繩:</div>
                {/* <select className="lanyard" name="lanyard" onChange={withlanyard}>
                    <option value="00" selected>是否加購掛繩</option>
                    <option value="00">否</option>
                    <option value="lanyard-black">是(黑色 + NT$150)</option>
                    <option value="lanyard-white">是(白色 + NT$150)</option>
                </select> */}
                <Select className="select" options={lanyard} onChange={withlanyard} placeholder="請選擇"/>
                <div className="productDetail">
                    <p>確認商品內容</p>
                    <p>適用品牌型號: Apple - iPhone 16 Pro</p>
                    <p>鏡頭框顏色:{caseDetail.lensRing}</p>
                    <p>側邊按鍵顏色:{caseDetail.sideButton}</p>
                    <p>是否加購磁吸環:{caseDetail.magsafe}</p>
                    <p>是否加購掛繩:{caseDetail.lanyard}</p>
                    <p>商品總價: {caseDetail.price}</p>
                </div>
                <button className="sendToCart" onClick={sendoder}>加入購物車</button>
            </div>
            
        
        </div>
    )
}





export default Customized;