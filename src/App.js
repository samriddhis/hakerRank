import React, { Component } from "react";
import "./App.css";
import "h8k-components";
import ProductList from "./components/product-list";
import Cart from "./components/cart";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const title = "HackerShop";
export const PRODUCTS = [
  {
    name: "Cap",
    price: 5,
  },
  {
    name: "HandBag",
    price: 30,
  },
  {
    name: "Shirt",
    price: 35,
  },
  {
    name: "Shoe",
    price: 50,
  },
  {
    name: "Pant",
    price: 35,
  },
  {
    name: "Slipper",
    price: 25,
  },
];

const products = [...PRODUCTS].map((product, index) => {
  product.id = index + 1;
  product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
  product.cartQuantity = 0;
  return product;
});
const initialState = {
  products: products,
  cart: []
};
const storeValue = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VALUE_IN_STORE":
      return {
        ...state,
        products: state.products.map(function(item) {
          if (item.id === action.payload.product.id) {
            item.cartQuantity = item.cartQuantity + 1;
          }
          return item;
        }),
      };
    case "DELETE_VALUE_FROM_STORE":
      return {
        ...state,
        products: state.products.map(function(item) {
          if (item.id === action.payload.product.id) {
            if(item.cartQuantity>0){
              item.cartQuantity = item.cartQuantity - 1;
            }
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  storeValue: storeValue,
});

const store = createStore(reducer);
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {
        items: [],
      },
      products,
    };
  }

  render() {
    return (
      <Provider store={store} className="App">
        <h8k-navbar header={title} />
        <div className="layout-row shop-component">
          <ProductList products={this.state.products} />
          <Cart cart={this.state.cart} />
        </div>
      </Provider>
    );
  }
}

export default App;
