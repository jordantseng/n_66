import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

//images svg
import cross from "./img/cross.svg";
import cart from "./img/shopping-cart-empty-side-view.svg";
//CSS
import "./CartContent.css";

class CartContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsToBuy: props.data,
      tripsToBuy: props.tripData,
      costArray: [],
      totalCost: props.totalCost
    };
  }

  componentDidMount() {
    // const productsToBuy = JSON.parse(localStorage.getItem("productsToBuy"));
    // this.setState({ productsToBuy: productsToBuy });
    // console.log(productsToBuy);
  }

  deleteProduct = async i => {
    let productsArray = JSON.parse(localStorage.getItem("productsToBuy")) || [];
    let tripsArray = JSON.parse(localStorage.getItem("tripsToBuy")) || [];

    let totalCost = 0;

    if (productsArray) {
      productsArray.forEach(item => {
        if (item.code === i) {
          // console.log(productsArray.indexOf(product));
          productsArray.splice(productsArray.indexOf(item), 1);
        }

        // let subCost = item.product_amount * item.product_price;
        // totalCost += subCost;
      });

      productsArray.forEach(item => {
        let subCost = item.product_amount * item.product_price;
        totalCost += subCost;
      });
    }

    if (tripsArray) {
      tripsArray.forEach(trip => {
        let subCost = trip.trip_amount * trip.trip_price;
        totalCost += subCost;
      });
    }

    this.props.countProducts(productsArray);
    this.props.changeNumOfProduct(
      JSON.stringify(productsArray.length + tripsArray.length)
    );

    console.log(totalCost);
    this.props.countTotalCost(totalCost);

    totalCost = JSON.stringify(totalCost);
    localStorage.setItem("totalCost", totalCost);

    productsArray = JSON.stringify(productsArray);
    localStorage.setItem("productsToBuy", productsArray);
    // console.log(this.state);
  };

  IncreaseQuantity = async i => {
    let productsArray = await JSON.parse(localStorage.getItem("productsToBuy"));
    productsArray.forEach(product => {
      if (product.code === i) {
        product.product_amount += 1;
      }
    });

    this.props.countProducts(productsArray);

    let tripsArray = await JSON.parse(localStorage.getItem("tripsToBuy"));
    let totalCost = 0;

    if (productsArray) {
      productsArray.forEach(item => {
        let subCost = item.product_amount * item.product_price;
        totalCost += subCost;
      });
    }

    if (tripsArray) {
      tripsArray.forEach(trip => {
        let subCost = trip.trip_amount * trip.trip_price;
        totalCost += subCost;
      });
    }

    totalCost = JSON.stringify(totalCost);
    localStorage.setItem("totalCost", totalCost);
    this.props.countTotalCost(totalCost);

    productsArray = JSON.stringify(productsArray);
    localStorage.setItem("productsToBuy", productsArray);
  };

  DecreaseQuantity = async i => {
    let productsArray = await JSON.parse(localStorage.getItem("productsToBuy"));

    productsArray.forEach(product => {
      if (product.code === i) {
        product.product_amount <= 1
          ? (product.product_amount = 1)
          : (product.product_amount -= 1);
      }
    });

    // const { countProducts } = this.props
    this.props.countProducts(productsArray);

    let tripsArray = await JSON.parse(localStorage.getItem("tripsToBuy"));
    let totalCost = 0;

    if (productsArray) {
      productsArray.forEach(item => {
        let subCost = item.product_amount * item.product_price;
        totalCost += subCost;
      });
    }

    if (tripsArray) {
      tripsArray.forEach(trip => {
        let subCost = trip.trip_amount * trip.trip_price;
        totalCost += subCost;
      });
    }

    totalCost = JSON.stringify(totalCost);
    localStorage.setItem("totalCost", totalCost);

    this.props.countTotalCost(totalCost);

    productsArray = JSON.stringify(productsArray);
    localStorage.setItem("productsToBuy", productsArray);
  };

  deleteTrip = async i => {
    let productsArray =
      (await JSON.parse(localStorage.getItem("productsToBuy"))) || [];
    let tripsArray =
      (await JSON.parse(localStorage.getItem("tripsToBuy"))) || [];
    // console.log(i);
    tripsArray.forEach(trip => {
      if (trip.code === i) {
        // console.log(productsArray.indexOf(product));
        tripsArray.splice(tripsArray.indexOf(trip), 1);
      }
    });

    // console.log(tripsArray)
    this.props.countTrips(tripsArray);
    this.props.changeNumOfProduct(
      JSON.stringify(productsArray.length + tripsArray.length)
    );

    let totalCost = 0;

    if (productsArray) {
      productsArray.forEach(item => {
        let subCost = item.product_amount * item.product_price;
        totalCost += subCost;
      });
    }

    if (tripsArray) {
      tripsArray.forEach(trip => {
        let subCost = trip.trip_amount * trip.trip_price;
        totalCost += subCost;
      });
    }

    totalCost = JSON.stringify(totalCost);
    localStorage.setItem("totalCost", totalCost);

    this.props.countTotalCost(totalCost);

    tripsArray = JSON.stringify(tripsArray);
    localStorage.setItem("tripsToBuy", tripsArray);
    // console.log(this.state);
  };

  IncreaseTrip = async i => {
    let tripsArray = await JSON.parse(localStorage.getItem("tripsToBuy"));

    tripsArray.forEach(trip => {
      if (trip.code === i) {
        trip.trip_amount += 1;
      }
    });

    this.props.countTrips(tripsArray);

    let productsArray = await JSON.parse(localStorage.getItem("productsToBuy"));
    let totalCost = 0;

    if (productsArray) {
      productsArray.forEach(item => {
        let subCost = item.product_amount * item.product_price;
        totalCost += subCost;
      });
    }

    if (tripsArray) {
      tripsArray.forEach(item => {
        let subCost = item.trip_amount * item.trip_price;
        totalCost += subCost;
      });
    }

    totalCost = JSON.stringify(totalCost);
    localStorage.setItem("totalCost", totalCost);

    this.props.countTotalCost(totalCost);

    tripsArray = JSON.stringify(tripsArray);
    localStorage.setItem("tripsToBuy", tripsArray);
  };

  DecreaseTrip = async i => {
    let tripsArray = await JSON.parse(localStorage.getItem("tripsToBuy"));

    tripsArray.forEach(trip => {
      if (trip.code === i) {
        trip.trip_amount <= 1
          ? (trip.trip_amount = 1)
          : (trip.trip_amount -= 1);
      }
    });

    this.props.countTrips(tripsArray);

    let productsArray = await JSON.parse(localStorage.getItem("productsToBuy"));
    let totalCost = 0;

    if (productsArray) {
      productsArray.forEach(item => {
        let subCost = item.product_amount * item.product_price;
        totalCost += subCost;
      });
    }

    if (tripsArray) {
      tripsArray.forEach(item => {
        let subCost = item.trip_amount * item.trip_price;
        totalCost += subCost;
      });
    }

    totalCost = JSON.stringify(totalCost);
    localStorage.setItem("totalCost", totalCost);

    this.props.countTotalCost(totalCost);

    tripsArray = JSON.stringify(tripsArray);
    localStorage.setItem("tripsToBuy", tripsArray);
  };

  toCheckOut = () => {
    let { userInfo } = this.props;
    console.log(userInfo);
    if (this.props.userInfo === false) {
      toast.error("請先至客戶專區完成聯絡資訊");
    } else {
      window.location = "/checkout";
    }
  };

  render() {
    const { data, tripData, numberOfProducts } = this.props;
    if (!numberOfProducts || numberOfProducts === "0") {
      return (
        <>
          <div className="myBreadCrumb py-1">
            <a className="ml-3" href="/">
              首頁
            </a>
            <span className="mx-3">></span>
            <a className="current" href="/cart">
              我的購物車
            </a>
          </div>
          <Container fluid className="p-0 cartBanner">
            <Row className="cartBannerRow">
              {/* <img src={cart} alt="banner"/> */}
              <div
                className=" cartBG d-flex mx-auto"
                style={{ width: "150px", height: "150px" }}
              >
                <img src={cart} alt="banner" />
              </div>
              <h1 className="bannerTitle">購物車尚無商品</h1>
              <Link to="/">
                <div className="Tohome">回到首頁</div>
              </Link>
            </Row>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <div className="myBreadCrumb py-1">
            <a className="ml-3" href="/">
              首頁
            </a>
            <span className="mx-3">></span>
            <a className="current" href="/cart">
              我的購物車
            </a>
          </div>
          <Container className="cartSection">
            <Row>
              <Col md={8}>
                {data === null ? (
                  <div></div>
                ) : (
                  data.map((item, i) => (
                    <div key={i} id={i} className="cartItem">
                      <div className="itemImg">
                        <Card.Img
                          variant="top"
                          src={
                            "http://localhost:3000/images/products/" +
                            item.product_file_name +
                            "/" +
                            item.product_img
                          }
                        />
                      </div>
                      <Card.Body>
                        <div className="d-flex w-100 flex-column align-items-start">
                          <h6>
                            {item.product_class}
                            <div
                              onClick={() => this.deleteProduct(item.code)}
                              className="deleteBtn"
                            >
                              <img src={cross} alt={cross} />
                            </div>
                          </h6>
                          <div className="title">{item.product_name}</div>
                          <span className="size">
                            尺寸: <span>{item.product_size}</span>
                          </span>

                          <div className="quantity">
                            <span>數量 : </span>
                            <button
                              variant="primary"
                              onClick={() => this.DecreaseQuantity(item.code)}
                              className="qtyBtn minusBtn"
                            >
                              <span>-</span>
                            </button>
                            <h5 className="counter">{item.product_amount}</h5>
                            <button
                              variant="primary"
                              onClick={() => this.IncreaseQuantity(item.code)}
                              className="qtyBtn plus"
                            >
                              <span>+</span>
                            </button>
                            <span className="x"> X </span>
                            <h6 className="price">{item.product_price}</h6>
                            <div className="subPrice ml-auto">
                              NT$ {item.product_amount * item.product_price}{" "}
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </div>
                  ))
                )}
                {tripData === null ? (
                  <div></div>
                ) : (
                  tripData.map((item, i) => (
                    <div key={i} id={i} className="cartItem">
                      <div className="tripImg">
                        <Card.Img
                          variant="top"
                          src={"http://localhost:3000/images/" + item.trip_img}
                        />
                      </div>
                      <Card.Body>
                        <div className="d-flex w-100 flex-column align-items-start">
                          <h6>
                            <div className="">{item.trip_country}</div>
                            <div className="ml-5">{item.trip_type}</div>
                            {/* <div className="price">{item.trip_price}</div> */}
                            <div
                              onClick={() => this.deleteTrip(item.code)}
                              className="deleteBtn"
                            >
                              <img src={cross} alt={cross} />
                            </div>
                          </h6>
                          <div className="title">{item.trip_name}</div>
                          <span className="d-flex">
                            <span className=" mr-3">
                              {item.trip_duration} 天
                            </span>
                            <span>{item.trip_start_date}</span>
                            <span className="mx-2">~</span>
                            <span className="">{item.trip_end_date}</span>
                          </span>

                          <div className="quantity">
                            <span>數量: </span>
                            <button
                              variant="primary"
                              onClick={() => this.DecreaseTrip(item.code)}
                              className="qtyBtn minusBtn"
                            >
                              <span>-</span>
                            </button>
                            <h5 className="counter">{item.trip_amount}</h5>
                            <button
                              variant="primary"
                              onClick={() => this.IncreaseTrip(item.code)}
                              className="qtyBtn plus"
                            >
                              <span>+</span>
                            </button>
                            <span className="x">X</span>
                            <h6 className="tripPrice">{item.trip_price}</h6>
                            <div className="subPrice ml-auto">
                              NT$ {item.trip_amount * item.trip_price}
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </div>
                  ))
                )}

                {data === null && tripData == null ? (
                  <div></div>
                ) : (
                  <h5 className="text-right mt-3">
                    總價: NT$ {this.props.totalCost}
                  </h5>
                )}
              </Col>
              <Col md={4}>
                <div className="userCard">
                  {/* <p>@123gmail.com</p> */}
                  <Link className="toList" to="/products">
                    <div className="mask"></div>
                    <div className="font">繼續逛逛</div>
                  </Link>
                  <div onClick={this.toCheckOut} className="checkOut">
                    <div className="mask"></div>
                    <div className="font">我要結帳</div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row></Row>
          </Container>
          <ToastContainer autoClose={2000} />
        </>
      );
    }
  }
}

export default CartContent;
