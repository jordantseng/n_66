import React from "react";
// import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./CartContentCard.css";

class CartContentCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
      // pos: props.pos,
      // name: props.name,
      // fileName: props.fileName,
      // pictures: JSON.parse(props.pictures)[0],
      // price: props.price,
      // size: props.size,
      // amount: props.amount,
      // deleteRender: props.deleteRender
    }
  }


  IncreaseQuantity = async (value) => {
    await this.setState({ amount: this.state.amount + value });
    let aaa = await JSON.parse(localStorage.getItem('productsToBuy'));
    aaa[this.state.pos].product_amount = await this.state.amount;
    aaa = await JSON.stringify(aaa)
    await localStorage.setItem('productsToBuy', aaa);
  }

  DecreaseQuantity = async (value) => {
    await this.setState(
      { amount: (this.state.amount === 0) ? this.state.amount = 0 : this.state.amount + value }
    );
    let aaa = await JSON.parse(localStorage.getItem('productsToBuy'));
    aaa[this.state.pos].product_amount = await this.state.amount;
    aaa = await JSON.stringify(aaa)
    await localStorage.setItem('productsToBuy', aaa);
  }

  // DeleteItem = async ()=>{
  //   let aaa = await JSON.parse( localStorage.getItem('productsToBuy'));
  //   await aaa.splice(this.state.pos, 1);
  //   aaa = await JSON.stringify(aaa)
  //   await localStorage.setItem('productsToBuy',aaa);
  // }



  render() {
    
    
    return (
      <>
        {this.state.data.map(item => (
        //   <div className="cartItem" >
        //     <div className="itemImg">
        //       <Card.Img
        //         variant="top"
        //         src={"http://localhost:3000/images/products/" + item.fileName + "/" + item.pictures}
        //       />
        //     </div>
        //     <Card.Body>
        //       <div className="d-flex w-100 flex-column align-items-start">
        //         <h6>
        //           帳篷
        // <div className="price">{item.price}</div>

        //           <div onClick={() => this.props.deleteRender(item.pos)} className="deleteBtn">
        //             <div className="slash leftLine"></div>
        //             <div className="slash rightLine"></div>
        //           </div>
        //         </h6>
        //         <div className="title">
        //           {item.name}
        //         </div>
        //         <span>
        //           尺寸: <span className="size">{item.size}</span>
        //         </span>

        //         <div className="quantity">
        //           <span>數量 : </span>
        //           <button variant="primary" onClick={() => this.DecreaseQuantity(-1)} className="qtyBtn minusBtn"><span>-</span></button>
        //           <h5 className="counter">{item.amount}</h5>
        //           <button variant="primary" onClick={() => this.IncreaseQuantity(1)} className="qtyBtn plus"><span>+</span></button>
        //         </div>
        //       </div>
        //       <h3>{item.amount * item.price} 元</h3>
        //       <h3>{item.pos}</h3>
        //     </Card.Body>
        //   </div>
        ))}

      </>
    );
  }
}

export default CartContentCard;