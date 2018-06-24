import React from 'react';
import { render } from 'react-dom';
import TopHeader from './components/TopHeader';
import PageHeader from './components/PageHeader';
import Categories from './components/Categories';
import Products from './components/Products';
import Cart from './components/Cart';
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
      products: [],
      cart: [],
      currentPage: 'Vintage Fashion',
      cartKey: 'vintageprints-react-shopping',
      productKey: 'vintageprings-react-p',
      status: '',
      order: {
        total: 0,
        subtotal: 0,
        tax: 0.09,
        shipping: 7.99,
        appliedPromo: null
      },
      cartShown: false
    };

    this.updateOrder = this.updateOrder.bind(this);
    this.setProdAndCart = this.setProdAndCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateCartFromList = this.updateCartFromList.bind(this);
  }

  updateStatus(status) {
    this.setState({ status });
  }

  setProdAndCart(products) {
    this.setState({ cart: products.filter(item => item.inCart), products });
    setTimeout(this.updateOrder, 5);
  }

  updateOrder() {
    const subtotal = this.state.cart.reduce((sum, product) => {
      const price = product.sale || product.price;
      return sum + price * product.qty;
    }, 0);

    const tax = subtotal * this.state.order.tax;
    const shipping =
      this.state.order.appliedPromo === 'ship4free'
        ? 0
        : this.state.order.shipping;
    const discounts =
      this.state.order.appliedPromo !== 'ship4free' && subtotal >= 50 ? 10 : 0;
    const total = subtotal + tax + shipping - discounts;

    this.setState({
      order: { ...this.state.order, shipping, total, subtotal }
    });
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
    this.updateStatus(`${product.name} added to cart`);
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
    this.updateStatus(`${product.name} removed from cart`);
  }

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
          updateStatus={this.updateStatus}
          products={this.state.products}
          cart={this.state.cart}
          remove={this.removeFromCart}
          updateState={this.setProdAndCart}
          updateOrder={this.updateOrder}
        />
        <p aria-live="polite" role="status">
          {this.state.status}
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('product-page'));
