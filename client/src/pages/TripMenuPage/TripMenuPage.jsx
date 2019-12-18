import React, { Component } from "react";
import { Input, Container } from "@material-ui/core";
import norway from "./images/norway-3840x2160-5k-4k-wallpaper-bridge-sea-lake-water-blue-sky-920.jpg";
import TripLeftMenu from './../../components/TripLeftmenu/TripLeftMenu';
import TripMenu from '../../components/TripMenu/TripMenu'
import TripSort from "../../components/TripSort/TripSort";
import TripFilter from "../../components/TripFilter/TripFilter";
import TripMenuFooter from "../../components/TripMenuFooter/TripMenuFooter";
import Footer from "../../components/Footer/Footer";
import search from "./images/search.svg";
import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import TripPagination from "../../components/TripPagination/TripPagination";
import { Row } from "react-bootstrap";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "./TripMenuPage.scss";

class TripMenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      data2: "",
      buttonTitleName1: null,
      buttonTitleName2: null,
      buttonTitleName3: null,
      buttonTitleName4: null,
      buttonTitleName5: null,
      buttonTitleName6: null,
      priceSort: false,
      sortName: "trip_price",
      page: 1,
      pageTotal: 1,
      HomeSearch: false
    };
  }
  //搜尋
  search = () => {
    fetch(`http://localhost:3001/trips/search`, {
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
        this.setState({ data1: data });
      });
  };
  //畫面第一次渲染
  componentDidMount() {
    document.title = "66°N - 旅遊行程";

    let body = document.querySelector("body");
    body.style.overflowY = "auto";

    const { place, type, month, search, difficulty } = queryString.parse(
      this.props.location.search
    );
    if (place || type || month || difficulty) {
      let obj = JSON.parse(JSON.stringify(this.state));
      obj.place = place;
      obj.type = type;
      obj.month = month;
      obj.search = search;
      obj.difficulty = difficulty;
      fetch(`http://localhost:3001/trips/homeselect`, {
        method: "POST",
        body: JSON.stringify(obj),
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
          this.setState({ data1: data });
        });
    } else {
      fetch("http://localhost:3001/trips/page")
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
          // 計算頁數，每頁5筆，用ceil計算頁數
          const pageTotal = Math.ceil(data.length / 5);
          console.log(pageTotal);
          this.setState({ data1: data, pageTotal: pageTotal });
        });
    }
    // 如果目前網址上沒有頁面的參教(第一次進入時)
    // 讓網址變為第1頁樣子

    if (!this.props.match.params.page) this.props.history.push("trips/page/1");
  }

  //leftMenu place select
  select1 = eventKey => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName1: eventKey });
    obj.buttonTitleName1 = eventKey;
    console.log(eventKey);

    fetch("http://localhost:3001/trips/select", {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //leftMenu month select
  select2 = (eventKey, type) => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName2: eventKey });
    obj.buttonTitleName2 = eventKey;
    console.log(eventKey);

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //leftMenu difficulty select
  select3 = eventKey => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName3: eventKey });
    obj.buttonTitleName3 = eventKey;
    console.log(eventKey);

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //leftMenu type select
  select4 = data => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName4: data });
    obj.buttonTitleName4 = data;
    //   if(obj.buttonTitleName1 !=null){
    // 	  this.setState({count:})
    //   }
    // console.log(data)
    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };

  //select material sliderRange days
  select5 = data => {
    //   console.log(data)
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName5: data });
    obj.buttonTitleName5 = data;

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //select material sliderRange price
  select6 = data => {
    //   console.log(data)
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName6: data });
    obj.buttonTitleName6 = data;

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //依照價錢升降冪排序
  onSort = () => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ priceSort: !this.state.priceSort });
    this.setState({ sortName: "trip_price" });
    obj.priceSort = !this.state.priceSort;
    obj.sortName = "trip_price";

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //依照天數升降冪排序
  onSort2 = () => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ priceSort: !this.state.priceSort });
    this.setState({ sortName: "trip_days" });
    obj.priceSort = !this.state.priceSort;
    obj.sortName = "trip_days";

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //依照難度升降冪排序
  onSort3 = () => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ priceSort: !this.state.priceSort });
    this.setState({ sortName: "trip_difficulty" });
    obj.priceSort = !this.state.priceSort;
    obj.sortName = "trip_difficulty";

    fetch(`http://localhost:3001/trips/select`, {
      method: "POST",
      body: JSON.stringify(obj),
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
        this.setState({ data1: data });
        console.log(data);
      });
  };
  //依照評價升降冪排序
  //  onSort4 = () => {

  // 	let obj = JSON.parse(JSON.stringify(this.state));
  // 		this.setState({ priceSort: !this.state.priceSort})
  // 		this.setState({ sortName:'trip_'})
  // 		obj.priceSort = !this.state.priceSort ;
  // 		obj.sortName = 'trip_price' ;

  //     fetch(`http://localhost:3001/trips/select`, {
  //       method: "POST",
  //       body: JSON.stringify(obj),
  //       headers: {
  //         "content-type": "application/json"
  //       }
  //     })
  //       .then(
  //         response => {
  //           console.log(response);
  //           return response.json();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       )
  //       .then(data => {
  //         this.setState({ data1: data });
  //         console.log(data);
  //       });
  //  };
  render() {
    //   console.log(this.state.data2)
    return (
      <>
        <div className="TripMenuNavBox">
          {/* <N66navbarButton /> */}
          <HomeNavBar
            currentUser={this.props.currentUser}
            numberOfProducts={this.props.numberOfProducts}
            changeNumOfProduct={this.props.changeNumOfProduct}
          />

          <img src={norway} alt="norway" className="norway" />

          <div className="TripMenuNavCover">
            <div className="TripMenuNavInputBox">
              <p>您的旅行</p>
              <h1>搜尋</h1>
              <div className='searchInput1111' style={{ display: "flex" }}>
                <Input
                  className="TripSearchInput"
                  placeholder="搜 尋 您 的 旅 行"
                  onChange={e => this.setState({ data2: e.target.value })}
                />
                <button onClick={this.search}>
                  <img src={search} alt="search" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Breadcrumb />
        <TripFilter
          select1={this.select1}
          select2={this.select2}
          select3={this.select3}
          select4={this.select4}
        />
        <Container className="TripMenuContentBox">
          <TripLeftMenu
            select1={this.select1}
            select2={this.select2}
            select3={this.select3}
            select4={this.select4}
            a={this.state.data2}
            select5={this.select5}
            select6={this.select6}
            data={this.state}
          />
          <div className="TripMenuContentInsideBox">
            <TripSort
              onSort={this.onSort}
              onSort2={this.onSort2}
              onSort3={this.onSort3}
              // onSort4 = {this.onSort4}
              sortName={this.state.sortName}
            />
            <TripMenu data1={this.state.data1} />
            <h2 className={this.state.data1[0] ? "titleYes" : "noResult"}>
              沒有結果
            </h2>
          </div>
        </Container>
        <Row
          className="d-flex justify-content-center"
          style={{ marginTop: "150px" }}
        >
          <TripPagination pageTotal={this.state.pageTotal} />
        </Row>
        <TripMenuFooter />
        <Footer />
      </>
    );
  }
}

export default withRouter(TripMenuPage);
