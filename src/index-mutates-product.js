import React from 'react';
import { render } from 'react-dom';
import TopHeader from './components/TopHeader';
import PageHeader from './components/PageHeader';
import Categories from './components/Categories';
import Products from './components/Products';
import CartItem from './components/CartItem';
import productData from './product-list.js';

const Component = React.Component;

class App extends Component {
  constructor() {
    super();
    this.state = {
      promos: [
        { code: 'ship4free', onOrder: 'all orders', promo: 'free shipping' },
        { code: '10off50', onOrder: 'all orders over $50', promo: 'Save $10' }
      ],
      featuredPromo: {},
      appliedPromo: null,
      products: [],
      cart: [],
      currentPage: 'Vintage Fashion',
      cartKey: 'vintageprints-react-shopping',
      productKey: 'vintageprings-react-p'
    };
    // subTotal: 0,
    // tax: 0,
    // shipping: 7.99,
    // total: 0
    this.decrement = this.decrement.bind(this);

    this.increment = this.increment.bind(this);
    this.updateCartFromList = this.updateCartFromList.bind(this);
  }

  increment(cartItem) {
    const products = [...this.state.products];
    const product = products.find(item => item.id === cartItem.id);

    if (product.stock > 0) {
      product.qty++;
      product.stock--;
      this.setState({ products });
    }
  }

  decrement(cartItem) {
    const products = [...this.state.products];
    const product = products.find(item => item.id === cartItem.id);

    product.stock++;
    product.qty--;
    this.setState({ products });

    if (product.qty === 0) {
      product.inCart = false;
      this.removeFromCart(product);
    }
  }
  updateCartFromList(inCart, id) {
    if (inCart) {
      this.removeFromCart(id);
    } else {
      this.addToCart(id);
    }
  }

  addToCart(id) {
    const cart = [...this.state.cart];
    const products = [...this.state.products];
    const index = products.findIndex(item => item.id === id);
    const product = products[index];

    if (product.stock) {
      products[index].stock -= 1;
      products[index].inCart = true;
      products[index].qty = products[index].qty + 1 || 1;
      cart.push(products[index]);
      this.setState({ cart, products });
    }
  }

  removeFromCart(product) {
    const cart = [...this.state.cart].filter(item => product.id !== item.id);
    product.inCart = false;
    product.stock += product.qty;
    product.qty = 0;

    this.setState({ cart });
  }

  componentDidMount() {
    const randomNumber = Math.floor(Math.random() * this.state.promos.length);

    this.setState({
      products: productData,
      featuredPromo: this.state.promos[randomNumber]
    });
  }

  render() {
    const tempCart = this.state.cart.map(product => (
      <CartItem
        key={`${product.id}-cart`}
        product={product}
        inc={this.increment}
        dec={this.decrement}
      />
    ));

    return (
      <div>
        <TopHeader promo={this.state.featuredPromo} cart={this.state.cart} />
        <PageHeader
          page={this.state.currentPage}
          pageTitle={this.state.currentPage + ' Prints'}
        />
        <Categories />
        <main>
          <Products
            products={this.state.products}
            updateCart={this.updateCartFromList}
          />
        </main>

        {tempCart}
        {/* <div>Cart: {JSON.stringify(this.state.cart)}</div> */}
      </div>
    );
  }
}

render(<App />, document.getElementById('product-page'));
