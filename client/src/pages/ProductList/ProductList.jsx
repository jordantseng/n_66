import React from "react";
import HomeNavBar from "../../components/HomeNavBar/HomeNavBar";
import ProductLeftMenu from "../../components/ProductLeftMenu/ProductLeftMenu";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      ProductsData: [],
      buttonTitleName1: null,
      buttonTitleName2: null,
      buttonTitleName3: null,
      buttonTitleName6: null
    };
  }

  componentDidMount() {
    let body = document.querySelector("body");
    body.style.overflowY = "auto";
    document.title = "66°N - 戶外用品";

    fetch("http://localhost:3001/products", {
      // body: JSON.stringify({}),
      headers: {
        "content-type": "application/json"
      },
      method: "get"
    })
      .then(response => {
        return response.json();
        // return console.log(response);
      })
      .then(json => {
        // console.log(json);
        this.setState({
          ProductsData: json
        });
      });
  }

  select1 = eventKey => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName1: eventKey });
    obj.buttonTitleName1 = eventKey;
    console.log(eventKey);

    fetch("http://localhost:3001/products/select", {
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
        this.setState({ ProductsData: data });
        console.log(data);
      });
  };

  select2 = eventKey => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName2: eventKey });
    obj.buttonTitleName2 = eventKey;
    console.log(eventKey);

    fetch("http://localhost:3001/products/select", {
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
        this.setState({ ProductsData: data });
        console.log(data);
      });
  };

  select6 = data => {
    //   console.log(data)
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName6: data });
    obj.buttonTitleName6 = data;

    fetch(`http://localhost:3001/products/select`, {
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
        this.setState({ ProductsData: data });
        console.log(data);
      });
  };
  searchProduct = data => {
    //   console.log(data)
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ buttonTitleName3: data });
    obj.buttonTitleName3 = data;

    fetch(`http://localhost:3001/products/select`, {
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
        this.setState({ ProductsData: data });
        console.log(data);
      });
  };

  render() {
    // if(currentUser){
    //     // console.log(currentUser);
    // }
    return (
      <>
        <HomeNavBar
          numberOfProducts={this.props.numberOfProducts}
          currentUser={this.props.currentUser}
          changeNumOfProduct={this.props.changeNumOfProduct}
        />
        <ProductLeftMenu
          data={this.state.ProductsData}
          currentUser={this.props.currentUser}
          select1={this.select1}
          select2={this.select2}
          select6={this.select6}
          searchProduct={this.searchProduct}
        />
      </>
    );
  }
}

export default ProductList;
