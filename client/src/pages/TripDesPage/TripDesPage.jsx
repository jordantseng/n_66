import React, { Component } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TripDesNav from "../../components/TripDesNav/TripDesNav";
import TripDesCarousel from "../../components/TripDesCarousel/TripDesCarousel";
import TripDes1 from "../../components/TripDes1/TripDes1";
import TripDes2 from "../../components/TripDes2/TripDes2";
import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import TripDes2Carousel from "../../components/TripDes2Carousel/TripDes2Carousel";
import Footer from "../../components/Footer/Footer";
import "./TripDesPage.scss";
import { ReactComponent as Cart } from "./cart.svg";
import { Link } from "react-router-dom";
import GoTop from "../../components/GoTop/GoTop";

class TripDesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: [],
      carouselPlace: "",
      carouselData: [],
      carouselImg: [],
      bought: false,
      days: null
    };
  }

  async componentDidMount() {
    document.title = "66°N - 旅遊詳情";

    // let body = document.querySelector('body');
    // body.style.overflowY ='auto';

    await fetch(`http://localhost:3001/trips/${this.props.match.params.id}`)
      .then(
        response => {
          console.log(response);
          return response.json();
        },
        error => {
          console.log(error);
        }
      )
      .then(data => {
        this.setState({
          carouselImg: JSON.parse(data[0].trip_des2_carousel_img),
          detailData: data,
          carouselPlace: data[0].trip_place,
          days: data[0].trip_days
        });
        //   console.log(JSON.parse(data[0].trip_des2_carousel_img))
      });

    await fetch("http://localhost:3001/trips/place", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(
        response => {
          console.log(response);
          return response.json();
        },
        error => {
          console.log(error);
        }
      )
      .then(data => {
        this.setState({ carouselData: data });
        console.log(data);
      });
  }

  addToCart = () => {
    const isLogin = localStorage.getItem("token");
    let aaa = this.state.detailData[0];
    let productsArray = JSON.parse(localStorage.getItem("productsToBuy")) || [];
    // console.log(aaa)
    // console.log(aaa.trip_type);

    let product = {};
    product.sid = aaa.sid;
    product.trip_name = aaa.trip_name;
    product.trip_angency = aaa.trip_angency;
    product.trip_price = aaa.trip_price;
    product.trip_img = aaa.trip_menu_img;
    product.trip_country = aaa.trip_place;
    product.trip_duration = aaa.trip_days;
    product.trip_start_date = aaa.trip_start;
    product.trip_end_date = aaa.trip_end;
    product.trip_type = aaa.trip_type;
    product.trip_amount = 1;
    product.code = Date.now();

    if (isLogin) {
      if (localStorage.getItem("tripsToBuy")) {
        let bbb = JSON.parse(localStorage.getItem("tripsToBuy"));
        bbb.push(product);
        // console.log(JSON.parse(localStorage.getItem("tripsToBuy")).length);
        localStorage.setItem("tripsToBuy", JSON.stringify(bbb));
        toast.success("已加入購物車");
        this.props.changeNumOfProduct(
          JSON.stringify(bbb.length + productsArray.length)
        );
        this.setState({ bought: true });
      } else {
        let ddd = [];
        ddd.push(product);
        localStorage.setItem("tripsToBuy", JSON.stringify(ddd));
        toast.success("已加入購物車");
        this.props.changeNumOfProduct(
          JSON.stringify(ddd.length + productsArray.length)
        );
        this.setState({ bought: true });
      }
    } else {
      toast.error("請先登入或註冊為會員");
    }
  };

  gotoIndex = () => {
    window.location = "http://localhost:3000/cart";
  };

  handleAddWish = () => {
    const productsDetail = {
      ...this.state.detailData[0]
    };
    const currentUser = { ...this.props.currentUser };
    const user = { ...currentUser.user };
    const isLogin = localStorage.getItem("token");
    const obj = {
      u_id: user.u_id,
      product_label: productsDetail.trip_place,
      product_name: productsDetail.trip_name,
      product_info: productsDetail.trip_days,
      product_img: productsDetail.trip_menu_img,
      product_price: productsDetail.trip_price,
      trip_start_date: productsDetail.trip_start,
      trip_end_date: productsDetail.trip_end,
      trip_angency: productsDetail.trip_angency,
      product_router: productsDetail.trip_router,
      product_id: productsDetail.sid,
      liked: 1
    };
    if (isLogin) {
      axios
        .post("http://localhost:3001/trips/add_wishlist", obj)
        .then(res => {
          this.setState({ feedback: res.data, collected: true });
          if (this.state.feedback.success) {
            toast.success(this.state.feedback.msg.text);
          } else {
            toast.error(this.state.feedback.msg.text);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      toast.error("請先登入或註冊為會員");
    }
  };

  render() {
    let { currentUser } = this.props;
    if (currentUser) {
      let obj = { ...currentUser };
      //解構付值obj
      let { user } = obj;
      //複製user
      let uid = { ...user };
      let user_id = uid.u_id;
      localStorage.setItem("userId", user_id);
    }

    return (
      <div>
        <GoTop />
        <TripDesNav detailData={this.state.detailData} />
        <HomeNavBar currentUser={this.props.currentUser} />
        <div className="TripDesCarousel">
          <TripDesCarousel
            carouselImg={this.state.carouselImg}
            detailData={this.state.detailData}
          />
        </div>
        <Container>
          <div className="BreadcrumbCss">
            <Link to="/">
              <h6>首頁</h6>
            </Link>
            <span className="Breadsticks">/</span>
            <Link to="/trips/page/1">
              <h6>旅遊列表</h6>
            </Link>
            <span className="Breadsticks">/</span>
            <h6 className="BreadActive">旅遊細節</h6>
          </div>

          <div className="purchaseBtnBox" style={{ marginTop: "100px" }}>
            <div className="purchaseBtn" onClick={this.handleAddWish}>
              <Cart className="purchaseBtnImg" />
              <p>加入我的收藏</p>
              <div className="purchaseBtnCover"></div>
            </div>
          </div>
          <TripDes1 detailData={this.state.detailData} />
          <TripDes2 detailData={this.state.detailData} days={this.state.days} />
          <div className="purchaseBtnBox">
            {this.state.bought === false ? (
              <div onClick={this.addToCart} className="purchaseBtn">
                <Cart className="purchaseBtnImg" />
                <p>加入購物車</p>
                <div className="purchaseBtnCover"></div>
              </div>
            ) : (
              <div onClick={this.gotoIndex} className="purchaseBtn">
                <Cart className="purchaseBtnImg" />
                <p>去結帳</p>
                <div className="purchaseBtnCover"></div>
              </div>
            )}
          </div>
        </Container>
        <TripDes2Carousel carouselData={this.state.carouselData} />
        <ToastContainer autoClose={2000} />
        <Footer />
      </div>
    );
  }
}

export default TripDesPage;
