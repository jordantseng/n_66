import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  Accordion
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import search from "../../components/TripLeftmenu/images/search.svg";
import SliderPrice from "./SliderPrice";

import $ from "jquery";

//IMAGES
import filterImg from "./img/filter.svg";
import left from "./img/left.svg";
import right from "./img/right.svg";
import brand from "./img/copyright-regular.svg";
import hiking from "./img/hiking.svg";
//CSS
import "./productLeftMenu.css";
import banner from "./img/header22.jpg";

class ProductLeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      todosPerPage: 9,
      productsData: [],
      buttonTitleName1: "選擇類型",
      buttonTitleName2: "選擇品牌"
    };
  }

  componentDidMount() {
    let pages = document.querySelector(".page1");
    console.log(pages);
    let filterBtn = document.querySelector(".product-filter-btn");
    let filterMenu = document.querySelector(".product-filter-menu");
    let filterToggler = document.querySelector(".filterToggler");
    let body = document.querySelector("body");

    filterBtn.addEventListener("click", () => {
      filterMenu.style.left = "0";
      filterBtn.style.right = "100%";
      body.style.overflowY = "hidden";
    });

    filterToggler.addEventListener("click", () => {
      filterMenu.style.left = "100%";
      filterBtn.style.right = "0";
      body.style.overflowY = "scroll";
    });
  }

  handleClick = event => {
    let pageItems = document.querySelectorAll(".page-item");
    // console.log(pageItems)
    for (let i = 0; i < pageItems.length; i++) {
      pageItems[i].classList.remove("active");
    }

    event.target.classList.add("active");

    let currentNumber = parseInt(event.target.id);
    // console.log(currentNumber);
    this.setState({
      currentPage: currentNumber
    });
  };

  goPrev = () => {
    window.scrollTo({
      top: 630,
      behavior: "smooth"
    });

    let { currentPage } = this.state;

    currentPage -= 1;

    if (currentPage < 1) {
      currentPage = 1;
    }

    let pageItems = document.querySelectorAll(".page-item");
    // console.log(pageItems)
    for (let i = 0; i < pageItems.length; i++) {
      pageItems[i].classList.remove("active");
    }

    pageItems[currentPage].classList.add("active");

    // console.log(currentNumber);
    this.setState({
      currentPage: currentPage
    });
  };

  goNext = () => {
    window.scrollTo({
      top: 630,
      behavior: "smooth"
    });
    let { currentPage } = this.state;
    let pageItems = document.querySelectorAll(".page-item");

    currentPage += 1;

    if (currentPage >= pageItems.length - 1) {
      currentPage = pageItems.length - 1;
    }

    // console.log(pageItems)
    for (let i = 0; i < pageItems.length; i++) {
      pageItems[i].classList.remove("active");
    }

    pageItems[currentPage].classList.add("active");

    // console.log(currentNumber);
    this.setState({
      currentPage: currentPage
    });
  };
  //////////leftMenu篩選///////////

  handleSelect1 = eventKey => {
    this.setState({ buttonTitleName1: eventKey });
    this.props.select1(eventKey);
  };
  handleSelect2 = eventKey => {
    this.setState({ buttonTitleName2: eventKey });
    this.props.select2(eventKey);
  };
  search11 = () => {
    this.props.searchProduct(this.state.search);
  };

  handlePrice = value => {
    this.setState({ Price: value });
    this.props.select6(value);
  };

  handleType1 = () => {
    const type1 = $(".typeCard1").text();
    this.setState({ type: type1 });
    this.props.select1(type1);
  };
  handleType2 = () => {
    const type2 = $(".typeCard2").text();
    this.setState({ type: type2 });
    this.props.select1(type2);
  };
  handleType3 = () => {
    const type3 = $(".typeCard3").text();
    this.setState({ type: type3 });
    this.props.select1(type3);
  };
  handleType4 = () => {
    const type4 = $(".typeCard4").text();
    this.setState({ type: type4 });
    this.props.select1(type4);
  };
  handleType5 = () => {
    const type5 = $(".typeCard5").text();
    this.setState({ type: type5 });
    this.props.select1(type5);
  };
  handleType6 = () => {
    const type6 = $(".typeCard6").text();
    this.setState({ type: type6 });
    this.props.select1(type6);
  };
  handleType7 = () => {
    const type7 = $(".typeCard7").text();
    this.setState({ type: type7 });
    this.props.select1(type7);
  };
  handleType8 = () => {
    const type8 = $(".typeCard8").text();
    this.setState({ type: type8 });
    this.props.select1(type8);
  };
  handleType9 = () => {
    const type9 = $(".typeCard9").text();
    this.setState({ type: type9 });
    this.props.select1(type9);
  };
  handleType10 = () => {
    const type10 = $(".typeCard10").text();
    this.setState({ type: type10 });
    this.props.select1(type10);
  };
  handleType11 = () => {
    const type11 = $(".typeCard11").text();
    this.setState({ type: type11 });
    this.props.select1(type11);
  };
  handleType12 = () => {
    const type12 = $(".typeCard12").text();
    this.setState({ type: type12 });
    this.props.select1(type12);
  };
  handleType13 = () => {
    const type13 = $(".typeCard13").text();
    this.setState({ type: type13 });
    this.props.select1(type13);
  };
  handleType14 = () => {
    const type14 = $(".typeCard14").text();
    this.setState({ type: type14 });
    this.props.select1(type14);
  };
  ///////////////////////////////////////////
  handleBrand1 = () => {
    const brand1 = $(".brandCard1").text();
    this.setState({ brand: brand1 });
    this.props.select2(brand1);
  };
  handleBrand2 = () => {
    const brand2 = $(".brandCard2").text();
    this.setState({ brand: brand2 });
    this.props.select2(brand2);
  };
  handleBrand3 = () => {
    const brand3 = $(".brandCard3").text();
    this.setState({ brand: brand3 });
    this.props.select2(brand3);
  };
  render() {
    const { data } = this.props;
    // console.log(data);
    const { currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={number === 1 ? "page-item active" : "page-item"}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    const renderTodos = currentTodos.map((item, i) => {
      return (
        <Col key={i} sm={6} lg={4} className="cardColumn">
          <Link to={`/products/${item.product_id}`}>
            <Card key={item.product_id} className="product-card">
              <div className="photoFrame">
                <Card.Img
                  variant="top"
                  src={
                    "http://localhost:3000/images/products/" +
                    item.product_file_name +
                    "/" +
                    JSON.parse(item.product_pictures)[0]
                  }
                />
              </div>
              <Card.Body>
                <Card.Title className="brand">{item.product_brand}</Card.Title>
                <Card.Title>{item.product_name}</Card.Title>
                <Card.Title>NT$ {item.product_price}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    });

    return (
      <div className="ProductLeftMenuContainer">
        <div className="product-filter-menu">
          <div className="product-filter-btn d-flex justify-content-center align-items-center">
            <div>
              <img src={filterImg} alt="filterImg" />
            </div>
          </div>

          <div className="product-fake-nav">
            <a
              href="#666"
              className="filterToggler ml-auto d-flex justify-content-center align-items-center"
              role="button"
            >
              <div className="toggle-inner ">
                <div className="white-line up-line"></div>
                <div className="white-line down-line"></div>
              </div>
            </a>
          </div>
          <div className="list">
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <div className="svgFrame">
                    <img
                      src="http://localhost:3000/images/svg/northLight.svg"
                      alt="location"
                    />
                  </div>
                  <p>活動與主題</p>
                  <h6 className="ProductTitleName">{this.state.type}</h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <ul>
                      <li className="typeCard1" onClick={this.handleType1}>
                        所有活動
                      </li>
                      <li className="typeCard2" onClick={this.handleType2}>
                        北極光
                      </li>
                      <li className="typeCard3" onClick={this.handleType3}>
                        獨木舟
                      </li>
                      <li className="typeCard4" onClick={this.handleType4}>
                        動物觀察
                      </li>
                      <li className="typeCard5" onClick={this.handleType5}>
                        多活動
                      </li>
                      <li className="typeCard6" onClick={this.handleType6}>
                        駕車遊覽
                      </li>
                      <li className="typeCard7" onClick={this.handleType7}>
                        雪橇犬
                      </li>
                      <li className="typeCard8" onClick={this.handleType8}>
                        郵輪和帆船
                      </li>
                      <li className="typeCard9" onClick={this.handleType9}>
                        家庭
                      </li>
                      <li className="typeCard10" onClick={this.handleType10}>
                        划艇
                      </li>
                      <li className="typeCard11" onClick={this.handleType11}>
                        步行
                      </li>
                      <li className="typeCard12" onClick={this.handleType12}>
                        跨年
                      </li>
                      <li className="typeCard13" onClick={this.handleType13}>
                        雪鞋
                      </li>
                      <li className="typeCard14" onClick={this.handleType14}>
                        攝影
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  <div id="calender" className="svgFrame">
                    <img
                      src="http://localhost:3000/images/svg/boat.svg"
                      alt="location"
                    />
                  </div>
                  <p>選擇品牌</p>
                  <h6 className="ProductTitleName">{this.state.brand}</h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <ul>
                      <li className="brandCard1" onClick={this.handleBrand1}>
                        所有品牌
                      </li>
                      <li className="brandCard2" onClick={this.handleBrand2}>
                        SnowPeak
                      </li>
                      <li className="brandCard3">AquaMarina</li>
                      <li className="brandCard3">The North Face</li>
                      <li className="brandCard3">ColeMan</li>
                      <li className="brandCard3">ITIWIT</li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="6">
                  <div id="duration" className="svgFrame">
                    <img
                      src="http://localhost:3000/images/svg/dollar.svg"
                      alt="dollar"
                    />
                  </div>
                  <p>價格區間</p>
                  <h6 className="ProductTitleName">{this.state.Price}</h6>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="6">
                  <Card.Body id="days-of-stay">
                    <SliderPrice
                      handlePrice={this.handlePrice}
                      select6={this.props.select6}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>

        <Container fluid className="p-0">
          <Row className="bannerArea">
            <img src={banner} alt="banner" />
            <h6 style={{ color: "#96daf0" }}>專業的</h6>
            <h1>戶外用品</h1>
          </Row>
        </Container>
        <Container className="productsSection">
          <Row className="leftMenuRow d-flax justify-content-center">
            <Col
              md={4}
              className="leftMenuContent d-flex justify-content-center"
            >
              <div className="leftMenu">
                <div className="searchBox">
                  <input
                    type="text"
                    placeholder="搜尋"
                    onChange={e => this.setState({ search: e.target.value })}
                  ></input>
                  <div className="searchImg" onClick={this.search11}>
                    <img src={search} alt="search" />
                  </div>
                </div>

                <div className="dropDowns">
                  <div className="buttonTitle">
                    <img src={hiking} alt="hiking" />
                    <p>活動類型</p>
                  </div>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={this.state.buttonTitleName1}
                    onSelect={this.handleSelect1}
                  >
                    <Dropdown.Item eventKey="所有活動" value="1">
                      所有活動
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="北極光" value="1">
                      北極光
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="駕車遊覽" value="2">
                      駕車遊覽
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="獨木舟" value="3">
                      獨木舟
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="雪橇犬" value="3">
                      雪橇犬
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="郵輪和帆船" value="3">
                      郵輪和帆船
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="家庭" value="3">
                      家庭
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="多活動" value="3">
                      多活動
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="動物觀察" value="3">
                      動物觀察
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="攝影" value="3">
                      攝影
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="划艇" value="3">
                      划艇
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="步行" value="3">
                      步行
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="雪鞋" value="3">
                      雪鞋
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="跨年" value="3">
                      跨年
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="遠足" value="3">
                      遠足
                    </Dropdown.Item>
                  </DropdownButton>

                  <div className="buttonTitle">
                    <img src={brand} alt="brand" />
                    <p>品牌</p>
                  </div>

                  <DropdownButton
                    id="dropdown-basic-button"
                    title={this.state.buttonTitleName2}
                    onSelect={this.handleSelect2}
                  >
                    <Dropdown.Item eventKey="所有品牌" value="1">
                      所有品牌
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="snow peak" value="2">
                      snow peak
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="AquaMarina" value="3">
                      AquaMarina
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Sony" value="4">
                      Sony
                    </Dropdown.Item>
                  </DropdownButton>

                  <div
                    className="buttonTitle"
                    style={{ margin: "30px 0 10px 0" }}
                  >
                    <img
                      src="http://localhost:3000/images/svg/dollar.svg"
                      alt="dollar"
                    />
                    <p>價錢</p>
                  </div>
                  <SliderPrice
                    handlePrice={this.handlePrice}
                    select6={this.props.select6}
                  />
                </div>
              </div>
            </Col>
            <Col sm={12} md={8} className="p-0">
              <Container className="p-0 card-container ">
                <Row className="position-relative">{renderTodos}</Row>
                <Row>
                  <Col>
                    <ul id="page-numbers" className="pagination">
                      <li className="page-item" onClick={this.goPrev}>
                        <img src={left} alt="left" />
                      </li>
                      {renderPageNumbers}
                      <li className="page-item" onClick={this.goNext}>
                        <img src={right} alt="right" />
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProductLeftMenu;
