import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
//CSS
import "./HomeMainCarousel.css";
// import "../../fontawesome/css/all.min.css"

//HEADER CAROUSEL IMAGES
import sliderImg1 from "./images/aurore-boreale-en-islande-121.jpg";
import sliderImg2 from "./images/photo-1533400986144-1bc90df04d1a.jpeg";
import sliderImg3 from "./images/lac-baikal-siberie-75.jpg";
import sliderImg4 from "./images/photo-1509122696753-d01769640838.jpeg";
import sliderImg5 from "./images/photo-1498243870367-481948a6b82a.jpeg";
// import sliderImg6 from "../../images/images/photo-1498243870367-481948a6b82a.jpeg";
import sliderImg7 from "./images/voyage-dans-les-iles-lofoten-en-norvege-du-nord-72.jpg";
import sliderImg8 from "./images/voyage-ski-pulka-au-spitzberg-2143.jpg";

class HomeMainCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }


  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
    
    let slickPrev = document.querySelector(".slick-prev");
    console.log(slickPrev);
    let slickNext = document.querySelector(".slick-next");
    let blackMask = document.querySelector(".black-mask");

    //左箭頭
    let prevArrow = document.createElement("div");
    prevArrow.setAttribute("class", "left-arrow");
    slickPrev.appendChild(prevArrow);
    //左箭光暈
    let prevArrowRing = document.createElement("div");
    prevArrowRing.setAttribute("class", "left-arrow-ring");
    prevArrow.appendChild(prevArrowRing);

    //左箭身
    let prevStick = document.createElement("div");
    prevStick.setAttribute("class", "left-stick");
    slickPrev.appendChild(prevStick);

    slickPrev.addEventListener("mouseover", () => {
      prevStick.style.left = "0px";
      prevArrow.style.width = "10px";
      prevArrow.style.height = "10px";
      prevArrowRing.style.width = "50px";
      prevArrowRing.style.height = "50px";
      prevArrowRing.style.opacity = "0";
      prevArrowRing.style.transition = ".3s";

      prevArrowRing.addEventListener("transitionend", () => {
        prevArrowRing.style.transition = "none";
        prevArrowRing.style.width = "0px";
        prevArrowRing.style.height = "0px";
        prevArrowRing.style.opacity = "1";
      });
    });

    slickPrev.addEventListener("mouseout", () => {
      prevStick.style.left = "20px";
      prevArrow.style.width = "0px";
      prevArrow.style.height = "0px";
    });

    //右箭身
    let nextStick = document.createElement("div");
    nextStick.setAttribute("class", "right-stick");
    slickNext.appendChild(nextStick);

    //右箭頭
    let nextArrow = document.createElement("div");
    nextArrow.setAttribute("class", "right-arrow");
    slickNext.appendChild(nextArrow);

    //右箭光暈
    let nextArrowRing = document.createElement("div");
    nextArrowRing.setAttribute("class", "right-arrow-ring");
    nextArrow.appendChild(nextArrowRing);

    slickNext.addEventListener("mouseover", () => {
      nextStick.style.right = "0px";
      nextArrow.style.width = "10px";
      nextArrow.style.height = "10px";
      nextArrowRing.style.width = "50px";
      nextArrowRing.style.height = "50px";
      nextArrowRing.style.opacity = "0";
      nextArrowRing.style.transition = ".3s";

      nextArrowRing.addEventListener("transitionend", () => {
        nextArrowRing.style.transition = "none";
        nextArrowRing.style.width = "0px";
        nextArrowRing.style.height = "0px";
        nextArrowRing.style.opacity = "1";
      });
    });

    slickNext.addEventListener("mouseout", () => {
      nextStick.style.right = "20px";
      nextArrow.style.width = "0px";
      nextArrow.style.height = "0px";
    });

    function fadeOpacity() {
      blackMask.style.opacity = "0.6";
      blackMask.addEventListener("transitionend", () => {
        blackMask.style.opacity = "0.4";
      });
    }

    slickPrev.addEventListener("click", fadeOpacity);
    slickNext.addEventListener("click", fadeOpacity);
  }

  render() {
    if (this.props.comments === undefined) return <></>;
    const { length: count } = this.props.comments;
    const { ratingAvg } = this.props;
    return (
      <div className="header-wrapper">
        <Slider
          className="imgSlider"
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          arrows={false}
          fade={true}
          speed={900}
          autoplay={true}
          autoplaySpeed={5000}
        >
          <div className="photo-frame">
            <img src={sliderImg8} alt="sliderImg" />
          </div>
          <div className="photo-frame">
            <img src={sliderImg7} alt="sliderImg" />
          </div>
          <div className="photo-frame">
            <img src={sliderImg2} alt="sliderImg" />
          </div>
          <div className="photo-frame">
            <img src={sliderImg1} alt="sliderImg" />
          </div>
          <div className="photo-frame">
            <img src={sliderImg3} alt="sliderImg" />
          </div>
          <div className="photo-frame">
            <img src={sliderImg4} alt="sliderImg" />
          </div>
          <div className="photo-frame">
            <img src={sliderImg5} alt="sliderImg" />
          </div>
        </Slider>
        <div className="black-mask"></div>
        {/* secendeslider */}
        <Slider
          className="titleSlider"
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={1}
          swipeToSlide={true}
          // focusOnSelect={true}
          speed={900}
          autoplay={true}
          autoplaySpeed={5000}
        >
          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>最專業的</span>
                </div>
                <p className="title-main">探險之旅</p>
              </div>

              <div className="information d-flex justify-content-center align-items-center mt-4">
                <div className="people ">{count} 個人的選擇</div>
                <div className="stars d-flex justify-content-center align-items-center">
                  {/* <div className="star">
                    <img
                      src="http://localhost:3000/images/svg/star.svg"
                      alt="star"
                    />
                  </div>
                  <div className="star">
                    <img
                      src="http://localhost:3000/images/svg/star.svg"
                      alt="star"
                    />
                  </div>
                  <div className="star">
                    <img
                      src="http://localhost:3000/images/svg/star.svg"
                      alt="star"
                    />
                  </div>
                  <div className="star">
                    <img
                      src="http://localhost:3000/images/svg/star.svg"
                      alt="star"
                    />
                  </div>
                  <div className="star">
                    <img
                      src="http://localhost:3000/images/svg/half_star.svg"
                      alt="half_star"
                    />
                  </div> */}
                  <div className="score">{ratingAvg} / 5</div>
                </div>
              </div>
              <Link className="more-btn" to="/comments">
                <div className="button-font">查看所有評論</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>峽灣</span>
                </div>
                <p className="title-main">挪威</p>
              </div>

              <Link
                className="more-btn"
                to="trips/page/1?place=挪威&type=所有活動&month=所有月份"
              >
                <div className="button-font">了解更多</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>在白雪皚皚的針葉林</span>
                </div>
                <p className="title-main">芬蘭</p>
              </div>
              <Link to="trips/page/1?place=芬蘭&type=所有活動&month=所有月份">
                <div className="button-font">了解更多</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>在北極光下</span>
                </div>
                <p className="title-main">冰島</p>
              </div>
              <Link
                to="trips/page/1?place=冰島&type=所有活動&month=所有月份"
                role="button"
              >
                <div className="button-font">了解更多</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>在北極熊的王國</span>
                </div>
                <p className="title-main">斯匹次卑爾根</p>
              </div>
              <Link
                to="trips/page/1?place=斯匹次卑爾根&type=所有活動&month=所有月份"
                role="button"
              >
                <div className="button-font">了解更多</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>在浮冰上</span>
                </div>
                <p className="title-main">格陵蘭</p>
              </div>
              <Link
                to="trips/page/1?place=格陵蘭&type=所有活動&month=所有月份"
                role="button"
              >
                <div className="button-font">了解更多</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>

          <div>
            <div className="slider-inner d-flex flex-column justify-content-center align-items-center">
              <div className="slider-title">
                <div className="slider-title-sub">
                  <span>在大森林裡</span>
                </div>
                <p className="title-main">加拿大</p>
              </div>
              <Link
                to="trips/page/1?place=加拿大&type=所有活動&month=所有月份"
                role="button"
              >
                <div className="button-font">了解更多</div>
                <div className="white-mask"></div>
              </Link>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default HomeMainCarousel;
