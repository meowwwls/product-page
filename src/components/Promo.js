import React from 'react';
import Button from './Button';

const Component = React.Component;

class Promo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promo: '',
      msg: ''
    };

    this.applyPromo = this.applyPromo.bind(this);
  }

  applyPromo(e) {
    e.preventDefault();

    const applied = this.state.promo.toLowerCase();

    if (applied === '') return;

    if (this.props.promos.findIndex(promo => promo.code === applied) !== -1) {
      this.props.apply(applied);
      this.setState({ promo: '', msg: '' });
    } else {
      this.setState({
        msg: `${this.state.promo} is not a valid promo code`
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.applyPromo}>
        <label htmlFor="promo" className="promo-label">
          Promo Code
        </label>
        <input
          type="text"
          className="product-total-promo-code"
          id="promo"
          value={this.state.promo}
          onChange={e => this.setState({ promo: e.target.value.trim() })}
        />
        <Button
          handler={null}
          text="Apply Promo"
          classNames="btn promo-apply"
        />
        <p>{this.state.msg}</p>
      </form>
    );
  }
}

export default Promo;
