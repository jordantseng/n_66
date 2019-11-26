import React from "react";
import Slider from "react-slick";
import { Container, Row, Col, Tabs, Tab, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./productCarousel.css";
// import { object } from "prop-types";

class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      productPics: props.pics,
      data: props.data[0],
      currentUser: props.currentUser,
      productsToBuy: []
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  sliders() {
    return this.props.pics.map(item => (
      <div key={item} className="pic">
        <img
          src={
            "http://localhost:3000/images/products/" +
            this.props.data[0].product_file_name +
            "/" +
            item
          }
          alt={this.props.data.product_file_name}
        />
      </div>
    ));
  }

  sliders2() {
    return this.props.pics.map(item => (
      <div key={item} className="pic2">
        <img
          src={
            "http://localhost:3000/images/products/" +
            this.props.data[0].product_file_name +
            "/" +
            item
          }
          alt={this.props.data.product_file_name}
        />
      </div>
    ));
  }

  addToCart = () => {
    // const currentUser = localStorage.getItem('userId');
    // console.log(currentUser)
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      toast.error("請先登入或註冊為會員");

      window.location = "http://localhost:3000/login";

    }
    else {
      let tripsArray = JSON.parse(localStorage.getItem('tripsToBuy'));
      let aaa = this.props.data[0];
      let product = {};
      product.product_id = aaa.product_id;
      product.product_name = aaa.product_name;
      product.product_brand = aaa.product_brand;
      product.product_file_name = aaa.product_file_name;
      product.product_img = JSON.parse(aaa.product_pictures)[0];
      product.product_size = aaa.product_size;
      product.product_category = aaa.product_category;
      product.product_class = aaa.product_class;
      product.product_weight = aaa.product_weight;
      product.product_price = aaa.product_price;
      product.product_amount = 1;
      product.commented = 0;
      product.code = Date.now();

      if (localStorage.getItem("productsToBuy")) {
        let bbb = JSON.parse(localStorage.getItem("productsToBuy"));
        bbb.push(product);
        this.props.changeNumOfProduct(JSON.stringify(bbb.length + tripsArray.length))
        localStorage.setItem("productsToBuy", JSON.stringify(bbb));
        toast.success("已加入購物車");

      }
      else {
        let ddd = [];
        ddd.push(product);
        // product.pos =
        localStorage.setItem("productsToBuy", JSON.stringify(ddd));
        this.props.changeNumOfProduct(JSON.stringify(ddd.length + tripsArray.length))
        toast.success("已加入購物車");
      }
    }

  }


  render() {

    const data = this.props.data;
    const { numberOfProducts } = this.props;
    const mainSettings = {
    };

    const thumbSettings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      autoplay: true,
      autoplaySpeed: 3000
    };

    return (
      <>
        <Container className="ProductCarousel">
          <Row className="mt-5 carouselsRow">
            <Col md={8} className="d-flex justify-content-center">
              <div className="mr-5 sideCarousel">
                <Slider
                  {...thumbSettings}
                  className="thumbCarousel"
                  asNavFor={this.state.nav2}
                  ref={slider => (this.slider1 = slider)}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {this.sliders()}
                </Slider>
              </div>

              <div className="">
                <Slider
                  {...mainSettings}
                  className="mainCarousel"
                  asNavFor={this.state.nav1}
                  ref={slider => (this.slider2 = slider)}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {this.sliders2()}
                </Slider>
              </div>
            </Col>

            <Col lg={4}>
              {data.map(item => (
                <div key={item.product_id} className="detailCard">
                  <div>
                    <h2>{item.product_name}</h2>
                    <h5>NT$ {item.product_price}</h5>
                    <Button
                      className="wishBtn mx-auto"
                      onClick={this.props.addWish}
                    >
                      加入願望清單
                    </Button>
                    <Button
                      onClick={this.addToCart}
                      className="addToCartBtn mx-auto"
                    >
                      放入購物車
                    </Button>
                    <p>免費快遞送貨 / 免費退貨</p>
                  </div>

                  <div>
                    <h4>規格說明</h4>
                    <Tabs
                      className="text-left"
                      defaultActiveKey="home"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="home" title="材質">
                        <p className="text-left">{item.product_material}</p>
                      </Tab>
                      <Tab eventKey="profile" title="內容">
                        <p className="text-left">
                          {JSON.parse(item.product_intro)[0]}
                        </p>
                      </Tab>
                      <Tab eventKey="contact" title="重量">
                        <p className="text-left">{item.product_weight}</p>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <h1 className=" mx-auto text-center">還可搭配</h1>
          <Row className="recommend  pt-5 d-flex ">
            <Col sm={6} md={4} className="cardFrame">
              <Card className="product-card">
                <div className="photoFrame">
                  <Card.Img
                    variant="top"
                    src="http://localhost:3000/images/products/OrtovoxFreeRider26L/free-ride-free-rider-24-46736-night-blue-blend-hir5da0941bdd2ef_1200x2000.jpg"
                  />
                </div>
                <Card.Body>
                  <Card.Title>Ortovox FreeRider 26L 背包</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} md={4} className="cardFrame">
              <Card className="product-card">
                <div className="photoFrame">
                  <Card.Img
                    variant="top"
                    src="http://localhost:3000/images/products/GrandOfuton/BD-050_BIG.JPG"
                  />
                </div>
                <Card.Body>
                  <Card.Title>日式單人睡墊組</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} md={4} className="cardFrame">
              <Card className="product-card">
                <div className="photoFrame">
                  <Card.Img
                    variant="top"
                    src="http://localhost:3000/images/products/GasGrillBurner\GS-355_BIG.JPG"
                  />
                </div>
                <Card.Body>
                  <Card.Title>瓦斯燒烤爐 雪峰苑</Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} md={4} className="cardFrame">
              <Card className="product-card">
                <div className="photoFrame">
                  <Card.Img
                    variant="top"
                    src="http://localhost:3000/images/products/GigaPowerBFLantern/GL-300A_BIG.JPG"
                  />
                </div>
                <Card.Body>
                  <Card.Title>GP瓦斯營燈</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ProductCarousel;
