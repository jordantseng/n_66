import React from "react";

//Routers
import { Link } from "react-router-dom";

//Components
import HomeNavBarRightMenu from "../HomeNavBarRightMenu/HomeNavBarRightMenu";

//CSS
import "./HomeNavBar.css";

//SIGNAL
import Logo from "./images/logo.svg";
// import email from "./images/email.svg";
import user from "./images/user.svg";

import signIn from "./images/sign-in-alt-solid.svg";
import cart from "./images/cart.svg";

class HomeNavBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    let navbar = document.querySelector(".n66navbar");
    let toggler = document.querySelector(".n66toggler");
    let rightMenu = document.querySelector(".right-menu");
    let rightMenuIsShow = false;
    let body = document.querySelector("body");
    let upLine = document.querySelector(".up-line");
    let middleLine = document.querySelector(".middle-line");
    let downLine = document.querySelector(".down-line");

    window.onresize = () => {
      if (window.innerWidth >= 850) {
        rightMenu.style.left = "100%";
        toggler.style.backgroundColor = "transparent";
        navbar.style.backgroundColor = "transparent";
        toggler.style.borderLeftColor = "rgba(255,255,255,0.4)";
        upLine.style.transform = "rotate(0)";
        downLine.style.transform = "rotate(0)";
        middleLine.style.opacity = "1";
      }
    };

    toggler.onclick = () => {
      rightMenuIsShow = !rightMenuIsShow;
      console.log(rightMenuIsShow);
      if (rightMenuIsShow) {
        toggler.style.backgroundColor = "#96daf0";
        toggler.style.borderLeftColor = "#96daf0";
        rightMenu.style.left = "0";
        body.style.overflowY = "hidden";
        navbar.style.backgroundColor = "#242a3a";
        upLine.style.transform = "rotate(45deg)";
        downLine.style.transform = "rotate(-45deg)";
        middleLine.style.opacity = "0";
      } else {
        rightMenu.style.left = "100%";
        toggler.style.backgroundColor = "transparent";
        toggler.style.borderLeftColor = "rgba(255,255,255,0.4)";
        navbar.style.backgroundColor = "transparent";
        body.style.overflowY = "scroll";
        upLine.style.transform = "rotate(0)";
        downLine.style.transform = "rotate(0)";
        middleLine.style.opacity = "1";
      }
    };
  }

  render() {
    const { currentUser } = this.props;
    return (
      <>
        <div className="n66navbar d-flex">
          <Link to="/">
            <div className="Brand">
              <img src={Logo} alt="N66" />
            </div>
          </Link>
          <div className="n66Collapse " id="responsive-navbar-nav ">
            <div className="ml-auto d-flex  justify-content-end align-items-center navTop">
              <Link
                to="/account"
                className=" d-flex align-items-center nav_top_item"
              >
                <img className="user" src={user} alt="user" />
                客戶專區
              </Link>
              {!currentUser && (
                <>
                  <Link
                    to="/login"
                    className=" d-flex align-items-center nav_top_item"
                  >
                    <img className="phone" src={signIn} alt="phone" />
                    會員登入
                  </Link>
                </>
              )}
              {currentUser && (
                <>
                  <Link
                    to="/logout"
                    className=" d-flex align-items-center nav_top_item"
                  >
                    <img className="phone" src={signIn} alt="phone" />
                    會員登出
                  </Link>
                </>
              )}
              
              {currentUser && (
                <Link to="/cart" className=" d-flex align-items-center nav_top_item">
                <img className="phone" src={cart} alt="phone" />
                購物車
                {/* <div>{numberOfProducts || ''}</div> */}
              </Link>
              )}
            </div>

            <div className="ml-auto d-flex nav-bottom">
              <Link to="/trips/page/1" className="navItem">
                <h6>旅程目的地</h6>
                <h6>探險的開始</h6>
                <div className="blue-line"></div>
              </Link>
              <Link to="/products" className="navItem">
                <h6>裝備與器具</h6>
                <h6>戶外用品</h6>
                <div className="blue-line"></div>
              </Link>
              <Link to="/comments" className="navItem">
                <h6>意見與反饋</h6>
                <h6>客戶評論</h6>
                <div className="blue-line"></div>
              </Link>

              <Link to="#" className="navItem">
                <h6>關於66°N</h6>
                <h6>我們的理念</h6>
                <div className="blue-line"></div>
              </Link>
            </div>
          </div>

          <Link
            className="n66-login-btn ml-auto d-flex justify-content-center align-items-center"
            to="/account"
            role="button"
          >
            <div className="login-btn-inner d-flex flex-column justify-content-between align-items-center">
              <img src={user} alt="user" />
            </div>
          </Link>
          {currentUser && (
            <Link
              className="n66-login-btn d-flex justify-content-center align-items-center"
              to="/cart"
              role="button"
            >
              <div className="login-btn-inner d-flex flex-column justify-content-between align-items-center">
                <img src={cart} alt="cart" />
              </div>
            </Link>
          )}
          <Link
            className="n66toggler d-flex justify-content-center align-items-center"
            to="#57"
            role="button"
          >
            <div className="toggle-inner d-flex flex-column justify-content-between align-items-center">
              <div className="white-line up-line"></div>
              <div className="white-line middle-line"></div>
              <div className="white-line down-line"></div>
            </div>
          </Link>
        </div>
        <HomeNavBarRightMenu currentUser={this.props.currentUser} />
      </>
    );
  }
}

export default HomeNavBar;
