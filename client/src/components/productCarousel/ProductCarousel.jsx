import React from "react";
import Slider from "react-slick";
import { Container, Row, Col, Tabs, Tab, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import ReactImageMagnify from 'react-image-magnify';

//css
import "./productCarousel.css";

//image svg
import right from './img/right.svg'
import left from './img/left.svg'



function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="nextArrow customArrow"
      onClick={onClick}
    >
      <img src={right} alt="up" />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="prevArrow customArrow"
      onClick={onClick}
    >
      <img src={left} alt="down" />
    </div>
  );
}




class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
      productPics: props.pics,
      data: props.data[0],
      currentUser: props.currentUser,
      productsToBuy: [],
      bought: false
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
    // let pic2s = document.querySelectorAll('.pic2');
    // console.log(pic2s);
    return this.props.pics.map((item, i) => (

      <div key={i} className="pic2">
        <ReactImageMagnify className="ccc" {...{
          smallImage: {
            alt: this.props.data.product_file_name,
            isFluidWidth: true,
            src: "http://localhost:3000/images/products/" + this.props.data[0].product_file_name + "/" + item,
            className: 'aaa'
          },
          largeImage: {
            src: "http://localhost:3000/images/products/" +
              this.props.data[0].product_file_name +
              "/" +
              item,
            width: 1000,
            height: 750
          }
        }} />
      </div>
    ));
  }

  addToCart = () => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      toast.error("請先登入或註冊為會員");

      // window.location = "http://localhost:3000/login";

    }
    else {
      let tripsArray = JSON.parse(localStorage.getItem('tripsToBuy')) || [];
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
      this.setState({ bought: true })
    }
  }

  render() {

    const data = this.props.data;
    let productPics = "";
    let numOfPictures = 0;
    if (data) {
      productPics = JSON.parse(JSON.stringify(data))[0];
      // let {product_pictures} = productPics
      console.log(productPics);
      if (productPics) {
        JSON.parse(productPics.product_pictures).length > 4 ?
          numOfPictures = 4 : numOfPictures = JSON.parse(productPics.product_pictures).length
      }
      else {
        console.log('none');
      }
    }

    const mainSettings = {
      pauseOnHover: true,
      // autoplay: true,
      // autoplaySpeed: 3000,
      infinite: true,
    };

    const thumbSettings = {
      dots: false,
      infinite: true,
      slidesToShow: numOfPictures,
      slidesToScroll: 1,
      // vertical: true,
      // verticalSwiping: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    const { relatedProducts } = this.props;
    // let related = JSON.parse(JSON.stringify(relatedProducts)) 

    return (
      <>
        
          <div className='myBreadCrumb py-1'>
            <a className="ml-3" href="/">首頁</a>
            <span className="mx-3">></span>
            <a className="current" href="/products">戶外用品</a>
          </div>
        
        <Container className="ProductCarousel">
          <Row className="mt-5 carouselsRow">
            <Col md={8} className="double-carousel d-flex flex-column justify-content-start align-items-center">
              {/* <div className=""> */}
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
              {/* </div> */}
              <div className=" sideCarousel">
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
            </Col>

            <Col lg={4} className="border">
              {data.map(item => (
                <div key={item.product_id} className="detailCard">
                  <div>
                    <h4>{item.product_brand}</h4>
                    <h2>{item.product_name}</h2>
                    <h5>NT$ {item.product_price}</h5>
                    <div
                      className="wishBtn"
                      onClick={this.props.addWish}
                    >
                      加入我的收藏
                    </div>
                    {
                      this.state.bought === false ? (
                        <div
                          onClick={this.addToCart}
                          className="addToCartBtn mx-auto"
                        >
                          加入購物車
                      </div>
                      ) : (
                          <a
                            href="/cart"
                            className="addToCartBtn mx-auto"
                            style={{ 'text-decoration': 'none' }}
                          >
                            去結帳
                        </a>
                        )
                    }
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

          <h6 className="text-center" style={{ color: '#96DAF0' }}>為您推薦</h6>
          <h1 className=" mx-auto text-center">相關商品</h1>
          <Row className="recommend  pt-5 d-flex justify-content-center">
            {
              relatedProducts.map((product, i) => (
                <Col key={i} sm={6} md={3} className="cardFrame">
                  <a className="link" href={`/products/${product.product_id}`}>
                    <Card className="product-card">
                      <div className="photoFrame">
                        <Card.Img
                          variant="top"
                          src={"http://localhost:3000/images/products/" + product.product_file_name + "/" + JSON.parse(product.product_pictures)[0]}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>{product.product_name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              ))
            }
          </Row>
        </Container>
      </>
    );
  }
}

export default ProductCarousel;
