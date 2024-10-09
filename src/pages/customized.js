import "./customized.scss";
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';


function Customized(){
    const [phoneStyle, setPhoneStyle] = useState({
        color: "i16pro-gold",
        lensRing: "lensring-gold",
        sideButton: "button-gold",
        magsafe: "00",
        lanyard: "00"
      });
    const changePhoneColor=(e)=>{
        setPhoneStyle({
            ...phoneStyle,
            color:e.target.value
        })
    }
    const changeLensColor=(e)=>{
        setPhoneStyle({
            ...phoneStyle,
            lensRing:e.target.value
        })
    } 
    const changeButtonColor=(e)=>{
        setPhoneStyle({
            ...phoneStyle,
            sideButton:e.target.value
        })
    } 
    const withmagsafe=(e)=>{
        setPhoneStyle({
            ...phoneStyle,
            magsafe:e.target.value
        })
    }
    const withlanyard=(e)=>{
        setPhoneStyle({
            ...phoneStyle,
            lanyard:e.target.value
        })
    }
    const sendoder=(e)=>{
        e.preventDefault();
        alert(`您的訂單
            鏡頭框顏色為${phoneStyle.lensRing}`)
    }
  
    return (
        <div >
            <div className="showProduct" >
                <img className="phone" src={require(`../assets/photo/${phoneStyle.color}.png`)}/>
                <img className="case" src={require('../assets/photo/transparent.png')}/>
                <img className="lensRing" src={require(`../assets/photo/${phoneStyle.lensRing}.png`)}/>
                <img className="sideButton" src={require(`../assets/photo/${phoneStyle.sideButton}.png`)}/>
                <img className="magsafe" src={require(`../assets/photo/${phoneStyle.magsafe}.png`)}/>
                <img className="lanyard" src={require(`../assets/photo/${phoneStyle.lanyard}.png`)}/>
            </div>
            <div className="productSelect">
                <div className="optionTitle">手機顏色:</div>
                <select className="phoneColor" name="phoneColor" label="手機顏色" onChange={changePhoneColor}>
                    <option value=""selected>選擇手機顏色</option>
                    <option className="i16pro-gold" value="i16pro-gold">沙漠色鈦金屬</option>
                    <option className="i16pro-titanium" value="i16pro-titanium" >原色鈦金屬</option>
                    <option className="i16pro-black" value="i16pro-black">黑色鈦金屬</option>
                    <option className="i16pro-white" value="i16pro-white">白色鈦金屬</option>
                </select>
                <div className="optionTitle">鏡頭框顏色:</div>
                <select className="lensRing" name="lensRing" onChange={changeLensColor}>
                    <option value="" selected>鏡頭框顏色</option>
                    <option value="lensring-titanium">原鈦色</option>
                    <option value="lensring-gold" >沙漠鈦金</option>
                    <option value="lensring-black">暗黑色</option>
                    <option value="lensring-blue">鈦藍色</option>
                    <option value="lensring-iris">薰衣草色</option>
                </select>
                <div className="optionTitle">側邊按鍵顏色:</div>
                <select className="sideButton" name="sideButton" onChange={changeButtonColor}>
                    <option value="" selected>按鍵顏色</option>
                    <option value="button-titanium">原鈦色</option>
                    <option value="button-gold" >沙漠鈦金</option>
                    <option value="button-black">暗黑色</option>
                    <option value="button-blue">鈦藍色</option>
                    <option value="button-purple">薰衣草色</option>
                    <option value="button-pink">芭比粉色</option>
                </select>
                <div className="optionTitle">是否加購磁吸環:</div>
                <select className="magsafe" name="magsafe" onChange={withmagsafe}>
                    <option value="00" selected>是否加購磁吸環</option>
                    <option value="00">否</option>
                    <option value="magsafe">是(+ NT$50)</option>
                </select>
                <div className="optionTitle">是否加購掛繩:</div>
                <select className="lanyard" name="lanyard" onChange={withlanyard}>
                    <option value="00" selected>是否加購掛繩</option>
                    <option value="00">否</option>
                    <option value="lanyard-black">是(黑色 + NT$50)</option>
                    <option value="lanyard-white">是(白色 + NT$50)</option>
                </select>
                <button className="sendToCart" onClick={sendoder}>加入購物車</button>
            </div>
            
        
        </div>
    )
}





export default Customized;