// Iteration 1: updateSubtotal
function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  var priceElement = product.querySelector('.price span');
  var quantityElement = product.querySelector('.quantity input');
  var subtotalElement = product.querySelector('.subtotal span');

  var price = parseFloat(priceElement.innerHTML);
  var quantity = parseInt(quantityElement.value, 10);

  var subtotal = price * quantity;

  subtotalElement.innerHTML = subtotal.toFixed(2);

  return subtotal;
}

// Iteration 2: calculateAll()
function calculateAll() {
  console.log('Calculating total for all products.');

  var allProducts = document.getElementsByClassName('product');
  var total = 0;

  for (var i = 0; i < allProducts.length; i++) {
    total += updateSubtotal(allProducts[i]);
  }

  // Iteration 3: Total
  var totalPriceElement = document.querySelector('#total-value span');
  totalPriceElement.innerHTML = total.toFixed(2);

  console.log('Total calculated:', total.toFixed(2));
}

// BONUS Iterations
// Iteration 4: Removing a product
function removeProduct(event) {
  var target = event.currentTarget;
  console.log('The target in remove is:', target);
  var productRow = target.closest('.product');
  productRow.remove();
  calculateAll();
}

// Iteration 5: Creating new products
function createProduct() {
  var nameInput = document.querySelector('.create-product input[type="text"]');
  var priceInput = document.querySelector('.create-product input[type="number"]');

  var name = nameInput.value;
  var price = parseFloat(priceInput.value).toFixed(2);

  if (!name || price <= 0) {
    alert('Please enter valid product name and price.');
    return;
  }

  var newRow = document.createElement('tr');
  newRow.classList.add('product');
  newRow.innerHTML = `
    <td class="name"><span>${name}</span></td>
    <td class="price">$<span>${price}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;

  var tbody = document.querySelector('#cart tbody');
  tbody.appendChild(newRow);

  var removeButton = newRow.querySelector('.btn-remove');
  removeButton.addEventListener('click', removeProduct);

  nameInput.value = '';
  priceInput.value = 0;
}

window.addEventListener('load', function() {
  var calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  var removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach(function(button) {
    button.addEventListener('click', removeProduct);
  });

  var createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);
});
