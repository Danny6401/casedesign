import "./customized.scss";
import { useState } from 'react';
import Select from "react-select";
import { Form, Card, Button, Container, Row, Col, ListGroup, Image } from 'react-bootstrap';

function Customized({ addToCart }) {
    const phoneColor = [
        { value: "i16pro-gold", label: "沙漠色鈦金屬", color: "#d6c3b6" },
        { value: "i16pro-titanium", label: "原色鈦金屬", className: "i16pro-titanium" },
        { value: "i16pro-black", label: "黑色鈦金屬", className: "i16pro-black" },
        { value: "i16pro-white", label: "白色鈦金屬", className: "i16pro-white" },
    ]
    const lensring = [
        { value: "lensring-titanium", label: "原鈦色" },
        { value: "lensring-gold", label: "沙漠鈦金" },
        { value: "lensring-black", label: "暗黑色" },
        { value: "lensring-blue", label: "鈦藍色" },
        { value: "lensring-iris", label: "薰衣草色" }
    ]
    const sideButton = [
        { value: "button-titanium", label: "原鈦色" },
        { value: "button-gold", label: "沙漠鈦金" },
        { value: "button-black", label: "暗黑色" },
        { value: "button-blue", label: "鈦藍色" },
        { value: "button-purple", label: "薰衣草色" },
        { value: "button-pink", label: "芭比粉色" }

    ]
    const magsafe = [
        { value: "00", label: "否" },
        { value: "magsafe", label: "是(+ NT$50)" }
    ]
    const lanyard = [
        { value: "00", label: "否" },
        { value: "lanyard-black", label: "是(黑色 + NT$150)" },
        { value: "lanyard-white", label: "是(白色 + NT$150)" },
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
        price: 1000
    });//用於傳遞商品資訊

    const changePhoneColor = (e) => {
        setCaseStyle({ ...caseStyle, color: e.target.value })
    }
    const changeLensColor = (e) => {
        setCaseStyle({ ...caseStyle, lensRing: e.target.value })
        setCaseDetail({ ...caseDetail, lensRing: e.target.label })
    }
    const changeButtonColor = (e) => {
        setCaseStyle({ ...caseStyle, sideButton: e.target.value })
        setCaseDetail({ ...caseDetail, sideButton: e.target.label })
    }
    const withmagsafe = (e) => {
        setCaseStyle({ ...caseStyle, magsafe: e.target.value })
        const newMagsafe = e.target.label
        if (newMagsafe !== "否" && caseDetail.magsafe === "否") {
            setCaseDetail({
                ...caseDetail,
                magsafe: newMagsafe,
                price: caseDetail.price + 50
            })//選擇要磁吸環時金額+50
        } else if (newMagsafe === "否" && caseDetail.magsafe !== "否") {
            setCaseDetail({
                ...caseDetail,
                magsafe: newMagsafe,
                price: caseDetail.price - 50
            })//取消磁吸還金額修正
        } else {
            setCaseDetail({ ...caseDetail, magsafe: newMagsafe })
        }
    }
    const withlanyard = (e) => {
        setCaseStyle({ ...caseStyle, lanyard: e.target.value })
        const newlanyard = e.target.label
        if (newlanyard !== "否" && caseDetail.lanyard === "否") {
            setCaseDetail({
                ...caseDetail,
                lanyard: newlanyard,
                price: caseDetail.price + 150
            })
        } else if (newlanyard === "否" && caseDetail.lanyard !== "否") {
            setCaseDetail({
                ...caseDetail,
                lanyard: newlanyard,
                price: caseDetail.price - 150
            })
        } else {
            setCaseDetail({ ...caseDetail, lanyard: newlanyard })
        }
    }

    //建立product id
    const generateProductId = (details) => {
        return `${details.lensRing}-${details.sideButton}-${details.magsafe}-${details.lanyard}`;
    };
    const product = {
        _id: generateProductId(caseDetail),
        name: "客製化手機殼",
        price: caseDetail.price,
        detail: caseDetail
    }

    //加入購物車並刷新頁面
    const sendoder = () => {
        console.log(product);
        alert("已加入購物車");
        window.location.reload();
        console.log("sendorder");
        addToCart(product);
        console.log("After addToCard");
    }

    return (
        <Container>
            <Col>
                <Card className="showProduct" >
                    <Image className="phone" alt="" src={require(`../../assets/photo/${caseStyle.color}.png`)} />
                    <Image className="case" alt="" src={require('../../assets/photo/transparent.png')} />
                    <Image className="lensRing" alt="" src={require(`../../assets/photo/${caseStyle.lensRing}.png`)} />
                    <Image className="sideButton" alt="" src={require(`../../assets/photo/${caseStyle.sideButton}.png`)} />
                    <Image className="magsafe" alt="" src={require(`../../assets/photo/${caseStyle.magsafe}.png`)} />
                    <Image className="lanyard" alt="" src={require(`../../assets/photo/${caseStyle.lanyard}.png`)} />
                </Card>
            </Col>
            <Col>
                <Card className="productSelect">
                    <Form.Group controlId="custom-select">
                    </Form.Group>
                    <Card.Body>
                        <Form.Label className="optionTitle">手機顏色:</Form.Label>
                        <Form.Control as="select" onChange={changePhoneColor} >
                            <option className="d-none" value="">選擇手機顏色</option>
                            {phoneColor.map((option) => (
                                <option value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Label className="optionTitle">鏡頭框顏色:</Form.Label>
                        <Form.Control as="select" onChange={changeLensColor}>
                            <option className="d-none" value="" >選擇鏡頭框顏色</option>
                            {lensring.map((option) => (<option value={option.value}>{option.label}</option>))}
                        </Form.Control>
                        <Form.Label className="optionTitle">側邊按鍵顏色:</Form.Label>
                        <Form.Control as="select" onChange={changeButtonColor}>
                            <option className="d-none" value="">選擇側邊按鍵顏色</option>
                            {sideButton.map((option) => (<option value={option.value}>{option.label}</option> ))}
                        </Form.Control>
                        <Form.Label className="optionTitle">是否加購磁吸環:</Form.Label>
                        <Form.Control as="select" onChange={withmagsafe}>
                            <option className="d-none" value="">請選擇</option>
                            {magsafe.map((option) => (<option value={option.value}>{option.label}</option>))}
                        </Form.Control>
                        <Form.Label className="optionTitle">是否加購掛繩:</Form.Label>
                        <Form.Control as="select" onChange={withlanyard} >
                            <option className="d-none" value="">請選擇</option>
                            {lanyard.map((option) => (<option value={option.value}>{option.label}</option>))}
                        </Form.Control>
                    </Card.Body >
                    <Card.Body className="productSelect" style={{ width: '18rem' }}>
                        <Card className="productDetail">
                            <Card.Header as="h5">確認商品內容</Card.Header>
                            <ListGroup>
                                <ListGroup.Item> 適用品牌型號: Apple - iPhone 16 Pro </ListGroup.Item>
                                <ListGroup.Item> 鏡頭框顏色:{caseDetail.lensRing} </ListGroup.Item>
                                <ListGroup.Item> 側邊按鍵顏色:{caseDetail.sideButton} </ListGroup.Item>
                                <ListGroup.Item> 是否加購磁吸環:{caseDetail.magsafe} </ListGroup.Item>
                                <ListGroup.Item> 是否加購掛繩:{caseDetail.lanyard} </ListGroup.Item>
                                <ListGroup.Item> 商品總價: {caseDetail.price} </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Button className="sendToCart" onClick={sendoder}>加入購物車</Button>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}





export default Customized;