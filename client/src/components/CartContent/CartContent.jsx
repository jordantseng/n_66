import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import $ from 'jquery';

//COMPONENTS
// import CartContentCard from './../CartContentCard/CartContentCard';

//CSS
import "./CartContent.css";


class CartContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsToBuy: props.data,
      
      // posObj: {},

    };
  }

  componentDidMount() {
    // const productsToBuy = JSON.parse(localStorage.getItem("productsToBuy"));
    // this.setState({ productsToBuy: productsToBuy });
    // console.log(productsToBuy);
  }

  showProducts = () => {
    // console.log(this.state.productsToBuy);
    // const products = this.state.productsToBuy;
    // console.log(products);
  }

  deleteRender = async (i) => {
    let productsArray = await JSON.parse(localStorage.getItem('productsToBuy'));
    // console.log(i);
    productsArray.forEach(product => {
      if(product.code === i){
        // console.log(productsArray.indexOf(product));
        productsArray.splice(productsArray.indexOf(product), 1);
      }
    });

    console.log(productsArray)
    this.props.delete(productsArray)

    productsArray = JSON.stringify(productsArray);
    localStorage.setItem('productsToBuy', productsArray);
    // console.log(this.state);
  }



  IncreaseQuantity = async (i) => {
    let productsArray = await JSON.parse(localStorage.getItem('productsToBuy'));
    productsArray.forEach(product => {
      if(product.code === i){
        product.product_amount += 1;
      }
    });
    this.props.count1(productsArray)
    productsArray = JSON.stringify(productsArray);
    localStorage.setItem('productsToBuy', productsArray);
  }

  DecreaseQuantity = async (i) => {
    let productsArray = await JSON.parse(localStorage.getItem('productsToBuy'));
    productsArray.forEach(product => {
      if(product.code === i){
        product.product_amount <= 1 ? product.product_amount = 1 : product.product_amount -= 1;
      }
    });
    this.props.count2(productsArray)
    productsArray = JSON.stringify(productsArray);
    localStorage.setItem('productsToBuy', productsArray);
  }

  render() {
    // console.log(this.state.posObj
    const { data } = this.props;

    return (
      <>
        <Container className="cartSection">
          <Row>
            <Col md={8}>
              {data.map((item, i) => (
                <div key={i} id={i} className="cartItem" >
                  <div className="itemImg">
                    <Card.Img
                      variant="top"
                      src={"http://localhost:3000/images/products/" + item.product_file_name + "/" + JSON.parse(item.product_img)[0]}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex w-100 flex-column align-items-start">
                      <h6>
                        帳篷
                        <div className="price">{item.product_price}</div>

                        <div onClick={() => this.deleteRender(item.code)} className="deleteBtn">
                          <div className="slash leftLine"></div>
                          <div className="slash rightLine"></div>
                        </div>
                      </h6>
                      <div className="title">
                        {item.product_name}
                      </div>
                      <span>
                        尺寸: <span className="size">{item.product_size}</span>
                      </span>

                      <div className="quantity">
                        <span>數量 : </span>
                        <button variant="primary" onClick={() => this.DecreaseQuantity(item.code)} className="qtyBtn minusBtn"><span>-</span></button>
                        <h5 className="counter">{item.product_amount}</h5>
                        <button variant="primary" onClick={() => this.IncreaseQuantity(item.code)} className="qtyBtn plus"><span>+</span></button>
                      </div>
                    </div>
                    <h3>{item.product_amount * item.product_price} 元</h3>
                  </Card.Body>
                </div>
              ))}

            </Col>
            <Col md={4}>
              <div className="userCard">
                <p>@123gmail.com</p>
                <Link className="toList" to="/products">
                  繼續逛逛
                </Link>
                <Link className="checkOut" to="/checkout">
                  進行結帳
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CartContent;
