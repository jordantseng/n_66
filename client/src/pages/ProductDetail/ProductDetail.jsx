import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProductCarousel from "./../../components/ProductCarousel/ProductCarousel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductsDetail: [],
      Pictures: [],
      numberOfProducts: "",
      relatedProducts: []
    };
  }

  componentDidMount() {
    let body = document.querySelector("body");
    body.style.overflowY = "auto";

    // console.log(`http://localhost:3001/products/${this.props.match.params.id}`)
    fetch(`http://localhost:3001/products/${this.props.match.params.id}`)
      .then(response => {
        return response.json();
        // return console.log(response);
      })
      .then(json => {
        // console.log(json);
        let picsJsonString = json.results[0].product_pictures;
        // console.log(picsJsonString);
        let picArray = JSON.parse(picsJsonString);
        // console.log(picArray)
        let relatedProducts = json.relatedProducts;
        console.log(relatedProducts);
        this.setState(
          {
            ProductsDetail: json.results,
            Pictures: picArray,
            relatedProducts: relatedProducts
          },
          function() {
            // console.log(this.state);
          }
        );
      });
    // console.log(this.props.currentUser);
  }

  handleAddWish = async () => {
    const productsDetail = { ...this.state.ProductsDetail[0] };
    const currentUser = { ...this.props.currentUser };
    const user = { ...currentUser.user };
    const isLogin = localStorage.getItem("token");
    const obj = {
      u_id: user.u_id,
      product_label: productsDetail.product_brand,
      product_name: productsDetail.product_name,
      product_info: productsDetail.product_size,
      product_img: this.state.Pictures[0],
      product_price: productsDetail.product_price,
      trip_start_date: productsDetail.product_weight,
      trip_end_date: "",
      trip_angency: "",
      product_router: productsDetail.product_router,
      product_id: productsDetail.product_id,
      liked: 1
    };
    console.log(productsDetail.product_router);
    if (isLogin) {
      axios
        .post("http://localhost:3001/products/add_wishlist", obj)
        .then(res => {
          console.log(res.data);
          this.setState({ feedback: res.data });
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
      //解構賦值obj
      let { user } = obj;
      //複製user
      let uid = { ...user };
      let user_id = uid.u_id;
      localStorage.setItem("userId", user_id);
    }

    return (
      <>
        <NavBar
          currentUser={this.props.currentUser}
          numberOfProducts={this.props.numberOfProducts}
          changeNumOfProduct={this.changeNumOfProduct}
        />
        <ProductCarousel
          currentUser={this.props.currentUser}
          data={this.state.ProductsDetail}
          pics={this.state.Pictures}
          relatedProducts={this.state.relatedProducts}
          numberOfProducts={this.props.numberOfProducts}
          changeNumOfProduct={this.props.changeNumOfProduct}
          addWish={this.handleAddWish}
        />
        {/* <h1>{this.state.Pictures}</h1> */}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

export default ProductDetail;
