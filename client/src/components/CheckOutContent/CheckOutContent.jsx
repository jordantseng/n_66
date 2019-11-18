import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
// import { Link } from "react-router-dom";

import './CheckOutContent.css'

class CheckOutContent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {

      return (
        <>
            <Container className="checkOutSection">
                    <Row>
                        <Col md={8}>
                            <div className="cartItem">
                                <div className="itemImg">
                                    <Card.Img variant="top" src="http://localhost:3000/images/products/AquaMarinaBettaHM/AquaMarinaBettaHM.jpg" />
                                </div>
                                <Card.Body>
                                    <div className="d-flex w-100 flex-column align-items-start">
                                        <h6>
                                            獨木舟
                                            <div className="price">
                                                12,800
                                            </div>

                                            <div className="deleteBtn">
                                                <div className="slash leftLine"></div>
                                                <div className="slash rightLine"></div>
                                            </div>
                                        </h6>
                                        <div className="title">Aqua Marina Betta HM-K0 雙人充氣皮艇</div>
                                        <span>尺寸:  <span className="size">412 X 83cm</span></span>

                                        <div className="quantity">
                                            <span>
                                                數量 :
                                            </span>
                                            <a href="#minus" className="qtyBtn minusBtn" role="button">-</a>
                                            <input defaultValue="1" className="counter" type="text" />
                                            <a href="#plus" className="qtyBtn plus" role="button">+</a>
                                        </div>
                                    </div>
                                </Card.Body>
                            </div>


                           
                        </Col>
                        <Col md={4} className="orderRight">
                           <div className="orderDetail">
                                <div>
                                    <div>
                                        <h5>送貨地址</h5>
                                        <h6>曾益盛</h6>
                                        <h6>台灣</h6>
                                        <h6>台北市</h6>
                                        <h6>民生北路1段 26巷 8號 13-1</h6>
                                        <a href="#7">改變收穫地址</a>
                                        <h5>郵寄方式</h5>
                                        <Form>
                                        {['checkbox'].map(type => (
                                            <div key={`custom-${type}`} className="mb-3">
                                                <Form.Check 
                                                    custom
                                                    type={type}
                                                    id={`custom-${type}`}
                                                    label={`Check this custom ${type}`}
                                                />
                                            </div>
                                        ))}
                                        </Form>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                           </div>
                        </Col>
                    </Row>
                </Container>
        </>
      );
    }
  }
  
  export default CheckOutContent;