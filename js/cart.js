// // lazy load fonts
document.body.onload = (function loadFonts(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
})('https://fonts.googleapis.com/css?family=Dosis:600,300|Playfair+Display:400,400italic|Cutive+Mono');


// cache DOM elements needed throughout

var els = {
  productContainer: document.getElementById('products'),
  cartIcon: document.getElementById('top-cart-count'),
  cartHeader: document.getElementById('cart-header'),
  cartFooter: document.getElementById('cart-footer'),
  cartContainer: document.getElementById('cart-container'),
  toggleCart: document.getElementById('toggle-cart'),
  promoCode: document.getElementById('cart-promoCode'),
  promoBtn: document.getElementById('cart-apply-promo'),
  discounts: document.getElementById('cart-discounts'),
  subtotal: document.getElementById('cart-subtotal'),
  shipping: document.getElementById('cart-shipping'),
  tax: document.getElementById('cart-tax'),
  total: document.getElementById('cart-total'),
  promoInp: document.getElementById('promo-code'),
};


// HELPER FUNCTIONS

// find parent that matches query

function findParent(el, match) {
  var parent = el.parentNode;
  
  while (!parent.matches(match) && parent.nodeType !== 9) {
    parent = parent.parentNode;
  }

  return parent;
}

// find the index of an item in an array
function getIndx(id, list) {
  var i = 0;
  var l = list.length;

  for ( ; i < l; i++) {
    if (list[i].id === id) {
      return i;
    }
  }

  return -1;
} 

function priceToString(price) {
  return '$' + price.toFixed(2);
}

// START OF APP

var products = [
  { 
    id: 'art_vp_001', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462960861/md-projects/product-page/prod001.jpg',
    price: 14.99, 
    sale: null, 
    stock: 12 
  },
  { 
    id: 'art_vp_002', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462963602/md-projects/product-page/prod002.jpg',
    price: 14.99, 
    sale: null, 
    stock: 6 
  },
  { 
    id: 'art_vp_003', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod006.jpg',
    price: 14.99, 
    sale: null, 
    stock: 17 
  },
  { 
    id: 'art_vp_004', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod005.jpg',
    price: 14.99, 
    sale: null, 
    stock: 6 
  },
  { 
    id: 'art_vp_005', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod008.jpg',
    price: 14.99, 
    sale: null, 
    stock: 0 
  },
  { 
    id: 'art_vp_006', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod007.jpg',
    price: 14.99, 
    sale: null, 
    stock: 13 
  },
  { 
    id: 'art_vp_007', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod009.jpg',
    price: 14.99, 
    sale: null, 
    stock: 9 
  },
  { 
    id: 'art_vp_008', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod010.jpg',
    price: 14.99, 
    sale: 12.99, 
    stock: 13 
  },
  { 
    id: 'art_vp_009', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod003.jpg',
    price: 14.99, 
    sale: 9.99, 
    stock: 8 
  },
  { 
    id: 'art_vp_010', 
    name: 'Product Name', 
    longdesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', 
    shortdesc: ['Art Print', '8" x 10", unframed'],
    src: 'http://res.cloudinary.com/meowwwls/image/upload/v1462966223/md-projects/product-page/prod004.jpg',
    price: 14.99, 
    sale: 9.99, 
    stock: 0 
  },
];

var cart = {
  items: [],
  count: 0,
  promo: null,
  subtotal: 0,
  tax: 0.09,
  shipping: 7.99,
  total: 0,
  discounts: 0,
  hidden: true,
};


var promos = (function promoHandler(promo) {
  // currently available promotions
  var promos = {
    'ship4free': 7.99,
    '15offall': 0.15,
    '20offmax': 0.20,
  };

  function getDiscount(promo, update) {
    var _promo = promo.toLowerCase().trim();
    // get most expensive item in cart, if needed
    var max;
    var discount;
    var products;

    if (_promo === 'ship4free') {
      discount = promos.ship4free;
    } else if (_promo === '15offall') {
      discount = cart.subtotal * promos['15offall'];
    } else if (_promo === '20offmax') {
      products = cart.items.map(function(item) {
        // if item is on sale, return the sale price; otherwise return the reg price
        return item.sale ? item.sale : item.price;
      });
      max = Math.max.apply(null, products);
      discount = Math.round(((max * promos['20offmax']) + 0.00001) * 100) / 100;
    }

    // only apply the discount if it's greater than the current discount
    if (discount > cart.discounts || update) { 
      applyPromo(discount, _promo);
    }

  }

  function applyPromo(discount, promo) {
    cart.discounts = discount;
    cart.promo = promo;
  }

  function removePromo() {
    // cart sub total and total need to be reset (handled differently for each promo)
    // let user know promo has been removed
    cart.promo = null;
    cart.discounts = 0;
    update.total();
  }

  return {
    getDiscount: getDiscount,
    removePromo: removePromo,
  };
  
})();

var add = (function addHandler(item) {

  // gets all relevant information about a product in order to create it in the cart
  function getProductInfo(item) {
    var productsIndx = getIndx(item.getAttribute('data-product-id'), products);
    var product = {
      id: products[productsIndx].id,
      name: products[productsIndx].name,
      img: products[productsIndx].src,
      desc: products[productsIndx].shortdesc,
      price: products[productsIndx].sale ||  products[productsIndx].price,
      qty: 1,
    };

    return product;
  }

  // creates item in cart if it does not exist
  function createCartItem(item) {
    var product = getProductInfo(item);
    // add item to cart
    cart.items.push(product);
    // create row element to edit so cart's innerHTML is not directly edited
    var row = document.createElement('tr');
    
    // html string to build up
    var html;

    row.setAttribute('tabindex', '0');
    row.setAttribute('data-product-id', product.id);

    html = '<td><a href="#" class="cart-img-wrap" tabindex="-1">';
    html += '<img src="' + product.img + '" alt=""></a>';
    html += '<div class="product-page-cart-item"><span class="product-page-cart-itemname">';
    html += '<a href="#"><strong>' + product.name + '</strong></a></span>';
    html += '<span class="product-page-cart-itemdesc">' + product.desc.join('</span></span>') + '</span>';
    html += '</div></td><td>' + priceToString(product.price) + '</td><td><button aria-label="decrease quantity" class="qty-decrease btn" title="decrease quantity" data-qty="dec">-</button>';
    html += '<input aria-label="item quantity" type="text" name="item-qty" class="product-page-item-qty" id="" size="2" value="1">';
    html += '<button aria-label="increase quantity" class="qty-increase btn" title="increase quantity" data-qty="inc">+</button></td><td data-cart-item="total">';
    html += priceToString(product.qty * product.price);
    html += '</td><td><button aria-label="remove item from cart" class="product-page-remove btn" title="remove from cart" data-qty="remove"></button></td>';

    row.innerHTML = html;
    els.cartContainer.appendChild(row);

    update.total();
  }

  // when 'add to cart' is clicked, either create cart item or update item qty
  function handleAdd(el, item) {
    var id = item.getAttribute('data-product-id');
    var cartIndx = getIndx(id, cart.items);
    var productsIndx = getIndx(id, products);

    // if this is the first item in the cart, show the cart if it's hidden
    if (cart.items.length === 0 && cart.hidden) {
      cartState();
    }

    // if item is not in cart, add to cart and build html for the item
    if (cartIndx === -1) {
      createCartItem(item);
      toggleAdded(el, item, id, 'add');
    } 

    else {
      toggleAdded(el, item, id, 'remove');
    }

  }

  function toggleAdded(el, item, id, state) {
    var cartIndx = getIndx(id, cart.items);

    if (state === 'add') {
      el.classList.add('added');
      el.textContent = 'Remove from Cart';
    } else {
      el.classList.remove('added');
      remove.item(item);
    }

  }

  return {
    add: handleAdd,
  };
})();

var update = (function handleUpdates() {

  function qty(item, dir) {
    var qtyField = item.querySelector('.product-page-item-qty');
    var totalEl = item.querySelector('[data-cart-item="total"]');
    var q = parseInt(qtyField.value);
    var id = item.getAttribute('data-product-id');
    var cartIndx = getIndx(id, cart.items);
    var price = cart.items[cartIndx].sale ? cart.items[cartIndx].sale : cart.items[cartIndx].price;

    if (dir === 'inc') {
      q++;
    } else if (dir === 'dec') {
      q--;
    }

    if (q < 1) {
      remove.item(item);
    }

    qtyField.value = q;
    totalEl.textContent = priceToString(price * q);

    // update qty in cart
    cart.items[cartIndx].qty = q;
    totalData();
  }

  function totalData() {
    var subtotal = 0;
    var item; 
    var itemPrice;
    var total;
    var itemCount = 0;

    for (var i = 0; i < cart.items.length; i++) {
      item = cart.items[i];
      itemCount += item.qty;
      itemPrice = item.sale ||  item.price;
      subtotal += itemPrice * item.qty;
    }

    cart.count = itemCount;
    cart.subtotal = subtotal;
    cart.total = cart.subtotal;
    // if there is a promo being used, update the discounts
    if (cart.promo) {
      promos.getDiscount(cart.promo, true);
    }
    cart.total -= cart.discounts;
    cart.total += cart.total * cart.tax;
    cart.total += cart.shipping;
    totalDOM();
  }

  function totalDOM() {
    els.cartIcon.textContent = cart.count === 1 ? '(1 item)' : '(' + cart.count + ' items)';
    els.promoCode.textContent = cart.promo || 'none';
    els.discounts.textContent = priceToString(cart.discounts);
    els.subtotal.textContent = priceToString(cart.subtotal);
    els.tax.textContent = priceToString(cart.tax * (cart.subtotal - cart.discounts));
    els.shipping.textContent = cart.promo === 'ship4free' ? '$0' : priceToString(cart.shipping);
    els.total.textContent = priceToString(cart.total);
  }

  return {
    qty: qty,
    total: totalData
  }
})();

var remove = (function removeHandler() {

  function removeRow(item) {
    var id = item.getAttribute('data-product-id');
    var cartIndx = getIndx(id, cart.items);
    var productBtn = els.productContainer.querySelector('[data-product-id="' + id + '"] .btn');
    cart.items.splice(cartIndx, 1);
    item.classList.add('removing-item');
    item.addEventListener('animationend', function() {
      els.cartContainer.removeChild(els.cartContainer.querySelector('[data-product-id="' + id + '"]'));
      // update product button text
      productBtn.textContent = 'Add to Cart';
      productBtn.classList.remove('added');
    });

    update.total();
  }

  return {
    item: removeRow,
  }
})();

// handles showing and hiding the cart 
function cartState() {
  if (cart.hidden) {
    els.toggleCart.textContent = 'Hide Cart'; 
  } else {
    els.toggleCart.textContent = 'Show Cart';
  }
  cart.hidden = !cart.hidden;
  els.cartHeader.classList.toggle('hide-cart');
  els.cartFooter.classList.toggle('hide-cart');
}


// add items to cart
els.productContainer.addEventListener('click', function(e) {
  if (e.target.nodeName === 'BUTTON') {
    parent = findParent(e.target, '[data-product-id]')
    add.add(e.target, parent);
  }
});

// update qty with buttons or remove item
els.cartContainer.addEventListener('click', function(e) {
  var parent;
  var dataFunc;
  
  if (e.target.nodeName === 'BUTTON') {
    parent = findParent(e.target, '[data-product-id]');
    dataFunc = e.target.hasAttribute('data-qty') ? e.target.getAttribute('data-qty') : null;

    if (dataFunc === 'inc') {
      update.qty(parent, 'inc');
    } else if (dataFunc === 'dec') {
      update.qty(parent, 'dec');
    } else if (dataFunc === 'remove') {
      remove.item(parent);
    }
  }
});

// show / hide the cart
els.toggleCart.addEventListener('click', cartState);

// add promo code
els.promoBtn.addEventListener('click', function() {
  var val = els.promoInp.value;
  
  if (val) {
    promos.getDiscount();
    update.total();
    els.promoInp.value = '';
  }
});