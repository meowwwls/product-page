import React from 'react';
import { render } from 'react-dom';
import TopHeader from './components/TopHeader';
import PageHeader from './components/PageHeader';
import Categories from './components/Categories';
import Products from './components/Products';
import Cart from './components/Cart';
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
    this.setProdAndCart = this.setProdAndCart.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateCartFromList = this.updateCartFromList.bind(this);
  }

  setProdAndCart(products) {
    this.setState({ cart: products.filter(item => item.inCart), products });
  }

  increment(id) {
    const products = [...this.state.products];
    let product = products.find(item => item.id === id);
    const index = products.findIndex(item => item.id === product.id);

    if (product.stock > 0) {
      const updatedProduct = {
        ...product,
        qty: product.qty + 1,
        stock: product.stock - 1
      };

      products[index] = updatedProduct;
    }

    this.setProdAndCart(products);
  }

  decrement(id) {
    const products = [...this.state.products];
    let product = products.find(item => item.id === id);
    const index = products.findIndex(item => item.id === product.id);

    const updatedProduct = {
      ...product,
      qty: product.qty - 1,
      stock: product.stock + 1
    };

    products[index] = updatedProduct;

    if (updatedProduct.qty === 0) {
      this.removeFromCart(id);
    } else {
      this.setProdAndCart(products);
    }
  }

  updateQuantity(id, value) {
    const products = [...this.state.products];
    const index = products.findIndex(item => item.id === id);
    const product = products[index];
    let stock;

    if (value <= 0) {
      this.removeFromCart(id);
      return;
    } else if (value > product.stock) {
      value = product.stock + product.qty;
      stock = 0;
    }

    const updatedProduct = {
      ...product,
      qty: value,
      stock
    };

    products[index] = updatedProduct;

    this.setProdAndCart(products);
  }

  updateCartFromList(inCart, id) {
    if (inCart) {
      this.removeFromCart(id);
    } else {
      this.addToCart(id);
    }
  }

  addToCart(id) {
    const products = [...this.state.products];
    const index = products.findIndex(item => item.id === id);
    const product = products[index];

    if (product.stock) {
      const updatedProduct = {
        ...product,
        stock: product.stock - 1,
        inCart: true,
        qty: product.qty + 1 || 1
      };

      products[index] = updatedProduct;
    }

    this.setProdAndCart(products);
  }

  removeFromCart(id) {
    const products = [...this.state.products];
    const index = products.findIndex(item => item.id === id);
    const product = products[index];

    const updatedProduct = {
      ...product,
      stock: product.stock + product.qty,
      inCart: false,
      qty: 0
    };

    products[index] = updatedProduct;

    this.setProdAndCart(products);
    // this.setState({ cart: products.filter(item => item.inCart), products });
  }

  componentDidUpdate() {}

  componentDidMount() {
    const randomNumber = Math.floor(Math.random() * this.state.promos.length);

    this.setState({
      products: productData,
      featuredPromo: this.state.promos[randomNumber]
    });
  }

  render() {
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
        <Cart
          products={this.state.cart}
          inc={this.increment}
          dec={this.decrement}
          updateQty={this.updateQuantity}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('product-page'));
