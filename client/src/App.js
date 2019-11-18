import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Route, Switch, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; // 這個位置不能動!!

//Components
import Comment from "./pages/Comment/Comment";
import DashBoard from "./pages/DashBoard/DashBoard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Logout from "./components/Logout/Logout";
// import TripDesPage from "./pages/TripDesPage/TripDesPage";
// import TripMenuPage from "./pages/TripMenuPage/TripMenuPage";

//ProductPages
// import ProductList from "./pages/ProductList/ProductList";
// import ProductDetail from "./pages/ProductDetail/ProductDetail";
// import MyCart from "./pages/MyCart/MyCart";
// import CheckOut from "./pages/CheckOut/CheckOut";

class App extends Component {
  constructor(props) {
    super(props);
    props.history.listen(location => {
      //在這裡監聽location对象
      console.log(location.pathname);
      switch (
        location.pathname //根據路徑不同切换不同的瀏覽器title
      ) {
        case "/":
          document.title = "N66";
          break;
        case "/trips":
          document.title = "N66 旅遊列表";
          break;
        case "./trips/:id":
          document.title = "N66 旅遊細節";
          break;
        default:
          break;
      }
    });
  }
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const currentUser = jwtDecode(jwt);
      console.log(currentUser);
      this.setState({ currentUser });
    } catch (error) {}
  }

  render() {
    return (
      <Switch>
        {/* <Route path="/products" exact component={ProductList} /> */}
        {/* <Route path="/products/:id" exact component={ProductDetail} /> */}
        {/* <Route
          path="/cart"
          exact
          render={props => (
            <MyCart {...props} currentUser={this.state.currentUser} />
          )}
        /> */}
        {/* <Route
          path="/checkout"
          exact
          render={props => (
            <CheckOut {...props} currentUser={this.state.currentUser} />
          )}
        /> */}
        <Route
          path="/comments"
          render={props => <Comment currentUser={this.state.currentUser} />}
        />
        <Route path="/logout" component={Logout} />
        <Route
          path="/login"
          render={props => (
            <Login {...props} currentUser={this.state.currentUser} />
          )}
        />
        <Route
          path="/account"
          render={props => (
            <DashBoard {...props} currentUser={this.state.currentUser} />
          )}
        />
        {/* <Route path="/trips/page/:page" exact component={TripMenuPage} /> */}
        {/* <Route path="/trips/page" exact component={TripMenuPage} /> */}
        {/* <Route path="/trips/:id" exact component={TripDesPage} /> */}
        <Route
          path="/"
          exact
          render={props => (
            <Home {...props} currentUser={this.state.currentUser} />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
