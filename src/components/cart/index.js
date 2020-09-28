import React, { Component } from "react";
import "./index.css";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: this.props.fieldsValue,
    };
  }
  render() {
    return (
      <div className="card my-16 mr-25 flex-30">
        <section className="layout-row align-items-center justify-content-center px-16">
          <h4>Your Cart</h4>
        </section>
        <div className="divider" />
        <table>
          <thead>
            <tr>
              <th />
              <th>Item</th>
              <th className="numeric">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productData.map((cartItem, idx) => {
              if (cartItem.cartQuantity > 0) {
                return (
                  <tr
                    data-testid={"cart-item-" + idx}
                    key={idx + 1}
                    className="slide-up-fade-in"
                  >
                    <td>{idx + 1}.</td>
                    <td className="name" data-testid="cart-item-name">
                      {cartItem.name}
                    </td>
                    <td
                      className="numeric quantity"
                      data-testid="cart-item-quantity"
                    >
                      {cartItem.cartQuantity}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    fieldsValue: state.storeValue.products,
  };
}

export default connect(mapStateToProps)(Cart);
