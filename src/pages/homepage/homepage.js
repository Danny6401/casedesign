
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import Ad01 from "../../assets/ads/ad01.png";
import Ad02 from "../../assets/ads/ad02.png";
import Ad03 from "../../assets/ads/ad03.png";
import Ad04 from "../../assets/ads/ad04.png";
import Ad05 from "../../assets/ads/ad05.png";
import logo from "../../assets/logo.png";

function HomePage({addToCart, productList}) {
    const randomProduct=[...productList].sort(() => 0.5 - Math.random());
    const randomThreeProduct=randomProduct.slice(0,3);

    const sendoder=(item)=>{
        alert(`商品:${item.name}  已加入購物車`);
        addToCart(item);
      };

    return (
        // 輪轉圖片廣告
        <Container>
            <Row>
                <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Ad01}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            {/* <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Ad02}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            {/* <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Ad03}
                            alt="Third slide"
                        />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Ad04}
                            alt="Third slide"
                        />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Ad05}
                            alt="Third slide"
                        />
                        <Carousel.Caption>

                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
            {/* 輪轉圖片廣告 */}

            <Row>
                {randomThreeProduct.map((item)=>(
                    <Col key={item._id}>    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`/photo/case/${item.filename}`} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>價格: NT${item.price}</Card.Text>
                                <Button variant="primary" onClick={() => sendoder(item)}>加入購物車</Button>
                            </Card.Body>
                        </Card>
                    </Col>     
                ))}
                
            </Row>
            {/* 插版 */}
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col key={idx}>
                        {/* <Card>
                            <Card.Img variant="top" src={logo} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card> */}
                    </Col>
                ))}
            </Row>

            {/* BLOG */}
            {/* <Row>
                <CardGroup>
                    <Card>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to
                                additional content.{' '}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in
                                to additional content. This card has even longer content than the
                                first to show that equal height action.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardGroup>
            </Row> */}
        </Container>



    );
}

export default HomePage;