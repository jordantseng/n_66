import React from "react";
import NavBar from '../../components/NavBar/NavBar';
import CartContent from '../../components/CartContent/CartContent';

class MyCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // ProductsData: [],
            productsToBuy: [],
            posObj: {},
        }
    }

    componentDidMount() {
        const productsToBuy = JSON.parse(localStorage.getItem("productsToBuy"));
        this.setState({ productsToBuy: productsToBuy }, ()=>{
            console.log(this.state.productsToBuy);
        });
    }


    delete = (result) =>{
        this.setState({productsToBuy: result})
    }

    count1 = (aaa)=>{
        this.setState({productsToBuy: aaa})
    } 

    count2 = (aaa)=>{
        this.setState({productsToBuy: aaa})
    } 


    render() {
        return (
            <>
                <NavBar />
                <CartContent 
                    data={this.state.productsToBuy}
                    delete={this.delete}
                    count1={this.count1}
                    count2={this.count2}
                />
            </>
        );
    }
}

export default MyCart;