import React, { Component } from "react";
import { Container } from "react-bootstrap";
import TripDesNav from "../../components/TripDesNav/TripDesNav";
import TripDesCarousel from "../../components/TripDesCarousel/TripDesCarousel";
import TripDes1 from "../../components/TripDes1/TripDes1";
import TripDes2 from "../../components/TripDes2/TripDes2";
import TripDes2Carousel from "../../components/TripDes2Carousel/TripDes2Carousel";
import Footer from "../../components/Footer/Footer";
import "./TripDesPage.scss";
import { ReactComponent as Cart } from "./cart.svg";

class TripDesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
		detailData: [],
		carouselPlace:'',
		carouselData:[],
    };
  }

  async componentDidMount() {
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
		  this.setState({ detailData: data , carouselPlace: data[0].trip_place});
		//   console.log(data[0].trip_place)
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
		  this.setState({ carouselData: data })
		  console.log(data)
		});
  }

  render() {
    return (
      <div>
        <TripDesNav detailData={this.state.detailData} />
        <div className="TripDesCarousel">
          <TripDesCarousel detailData={this.state.detailData} />
        </div>
        <Container>
          <div className="purchaseBtnBox" style={{ marginTop: "100px" }}>
            <div className="purchaseBtn">
              <Cart className="purchaseBtnImg" />
              <p>加到我的最愛</p>
              <div className="purchaseBtnCover"></div>
            </div>
          </div>
          <TripDes1 detailData={this.state.detailData} />
          <TripDes2 detailData={this.state.detailData} />
          <div className="purchaseBtnBox">
            <div className="purchaseBtn">
              <Cart className="purchaseBtnImg" />
              <p>加入購物車</p>
              <div className="purchaseBtnCover"></div>
            </div>
          </div>
        </Container>
		  <TripDes2Carousel carouselData={this.state.carouselData}/>
        <Footer/>
      </div>
    );
  }
}

export default TripDesPage;
