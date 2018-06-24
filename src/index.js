import React from 'react';
import { render } from 'react-dom';
import { Price } from './helpers';

import TopHeader from './components/TopHeader';
import PageHeader from './components/PageHeader';
import Categories from './components/Categories';
import Products from './components/Products';
import Cart from './components/Cart';
import CartSummary from './components/CartSummary';

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
        taxRate: 0.09,
        salesTax: 0,
        shipping: 7.99,
        appliedPromo: null,
        discounts: 0
      },
      cartShown: false
    };

    this.updateOrder = this.updateOrder.bind(this);
    this.applyPromo = this.applyPromo.bind(this);
    this.setProdAndCart = this.setProdAndCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
    this.updateCartFromList = this.updateCartFromList.bind(this);
  }

  updateStatus(status) {
    this.setState({ status });
  }

  updateSummary() {
    const {
      appliedPromo,
      subtotal,
      discounts,
      shipping,
      salesTax,
      total
    } = this.state.order;

    return [
      { label: 'Promo Applied', value: appliedPromo || 'none' },
      { label: 'Subtotal', value: Price(subtotal) },
      { label: 'Discounts', value: Price(discounts) },
      { label: 'Shipping', value: Price(shipping) },
      {
        label: `Sales Tax (${this.state.order.taxRate * 100}%)`,
        value: Price(salesTax)
      },
      { label: 'Total', value: Price(total) }
    ];
  }

  setProdAndCart(products) {
    this.setState({ cart: products.filter(item => item.inCart), products });
    setTimeout(this.updateOrder, 5);
  }

  updateOrder() {
    const { taxRate, appliedPromo, shipping } = this.state.order;

    const subtotal = this.state.cart.reduce((sum, product) => {
      const price = product.sale || product.price;
      return sum + price * product.qty;
    }, 0);

    const salesTax = subtotal * taxRate;
    const shippingCost = appliedPromo === 'ship4free' ? 0 : shipping;
    const discounts =
      appliedPromo === 'ship4free' ? 7.99 : subtotal >= 50 ? 10 : 0;
    const total =
      subtotal + salesTax + (shippingCost === 0 ? 0 : shippingCost - discounts);

    console.log(shippingCost);

    this.setState({
      order: {
        ...this.state.order,
        shipping: shippingCost,
        salesTax,
        total,
        subtotal,
        discounts
      }
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

  applyPromo(promo) {
    console.log('applying');

    this.setState({ order: { ...this.state.order, appliedPromo: promo } });
    setTimeout(this.updateOrder, 5);
  }

  componentDidMount() {
    const randomNumber = Math.floor(Math.random() * this.state.promos.length);

    this.setState({
      products: productData,
      featuredPromo: this.state.promos[randomNumber]
    });
  }

  render() {
    const {
      currentPage: page,
      featuredPromo: promo,
      cart,
      products,
      status,
      promos
    } = this.state;

    return (
      <div>
        <TopHeader promo={promo} cart={cart} />
        <PageHeader page={page} pageTitle={page + ' Prints'} />
        <Categories />
        <main>
          <Products products={products} updateCart={this.updateCartFromList} />
        </main>

        <Cart
          updateStatus={this.updateStatus}
          products={products}
          cart={cart}
          remove={this.removeFromCart}
          updateState={this.setProdAndCart}
          updateOrder={this.updateOrder}
        />
        <p aria-live="polite" role="status">
          {status}
        </p>
        <CartSummary
          items={this.updateSummary()}
          apply={this.applyPromo}
          promos={promos}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('product-page'));
