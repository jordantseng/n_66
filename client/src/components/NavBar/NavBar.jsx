import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// Components
import { ReactComponent as Logo } from "./images/logo.svg";
import { ReactComponent as User } from "./images/user.svg";
import { ReactComponent as Cart } from "./images/cart.svg";
import { ReactComponent as Logout } from "./images/logout.svg";

import "./NavBar.css";

class NavBar extends React.Component {
  componentDidMount() {
    // let navbar = document.querySelector(".navbar-container");
    let toggler = document.querySelector(".navBtn");
    let rightMenu = document.querySelector(".right-menu");
    let rightMenuIsShow = false;
    let body = document.querySelector("body");
    let upLine = document.querySelector(".up-line");
    let middleLine = document.querySelector(".middle-line");
    let downLine = document.querySelector(".down-line");

    window.onresize = () => {
      if (window.innerWidth >= 850) {
        rightMenu.style.left = "100%";
      }
    };

    toggler.onclick = () => {
      rightMenuIsShow = !rightMenuIsShow;
      console.log(rightMenuIsShow);

      if (rightMenuIsShow) {
        toggler.style.backgroundColor = "#96daf0";
        // toggler.style.borderLeftColor = '#96daf0';
        rightMenu.style.left = "0";
        body.style.overflowY = "hidden";
        // navbar.style.backgroundColor = '#242a3a';
        upLine.style.transform = "rotate(45deg)";
        downLine.style.transform = "rotate(-45deg)";
        middleLine.style.opacity = "0";
        body.style.overflowY = "hidden";
      } else {
        rightMenu.style.left = "100%";
        toggler.style.backgroundColor = "transparent";
        body.style.overflowY = "scroll";
        upLine.style.transform = "rotate(0)";
        downLine.style.transform = "rotate(0)";
        middleLine.style.opacity = "1";
        body.style.overflowY = "scroll";
      }
    };
  }

  render() {
    const { currentUser, numberOfProducts } = this.props;
    // let numberOfProduct = JSON.parse( localStorage.getItem('productsToBuy')).length;

    return (
      <>
        <div className="navbar-container d-flex align-items-center ">
          <Link to="/" role="button" className="navbar-logo mr-auto">
            <Logo height="60" width="60" />
          </Link>

          <a
            className="navBtn ml-auto d-flex justify-content-center align-items-center"
            role="button"
            href="#2e"
          >
            <div className="toggle-inner d-flex flex-column justify-content-between align-items-center">
              <div className="darkblue-line up-line"></div>
              <div className="darkblue-line middle-line"></div>
              <div className="darkblue-line down-line"></div>
            </div>
          </a>

          <div id="basic-navbar-nav" className="navCollapse">
            <Nav className="ml-auto ">
              <Link to="/trips/page/1" className="navbar-item nav-link">
                <span>旅遊行程</span>
                <div className="blue-line"></div>
              </Link>
              <Link to="/products" className="navbar-item nav-link">
                <span>戶外用品</span>
                <div className="blue-line"></div>
              </Link>
              <Link
                to="/comments"
                className="navbar-item nav-link"
                style={{ marginRight: "2rem" }}
              >
                <span>旅遊評價</span>
                <div className="blue-line"></div>
              </Link>
              {currentUser && (
                <>
                  <Link to="/logout" className="navbar-link icon-container">
                    <Logout height="20" width="20" className="logout-icon" />
                  </Link>
                </>
              )}
              <Link to="/account" className="navbar-link icon-container">
                <User height="20" width="20" className="user-icon" />
              </Link>
              {!!currentUser ? (
                <Nav.Link className="icon-container cart" href="/cart">
                  <Cart height="20" width="20" className="cart-icon" />
                  {!!numberOfProducts === false || !currentUser ? (
                    <p></p>
                  ) : (
                    <div>{numberOfProducts}</div>
                  )}
                </Nav.Link>
              ) : (
                <p></p>
              )}
            </Nav>
          </div>

          <ul className="right-menu">
            <li>
              <Link to="/trips/page/1">
                <h5>旅程目的地</h5>
                <h6>探險的開始</h6>
              </Link>
            </li>
            <li>
              <Link to="/products">
                <h5>裝備與器具</h5>
                <h6>戶外用品</h6>
              </Link>
            </li>
            <li>
              <Link to="/comments">
                <h5>意見與反饋</h5>
                <h6>客戶評論</h6>
              </Link>
            </li>
            <li>
              <Link to="#">
                <h5>關於66°N</h5>
                <h6>我們的理念</h6>
              </Link>
            </li>
            {currentUser ? (
              <li>
                <Link to="/cart">
                  <h5>我的購物車</h5>
                </Link>
              </li>
            ) : null}
            {!currentUser ? (
              <li>
                <Link to="/login">
                  <h5>會員登入</h5>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/logout">
                  <h5>會員登出</h5>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default NavBar;
