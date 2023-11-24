// Fetch cart data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    calculateTotalAmount();
});

// Function to load cart items from local storage
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    cartItems.forEach(cartItem => {
        const cartItemDiv = createCartItemDiv(cartItem);
        cartItemsContainer.appendChild(cartItemDiv);
    });
}

// Function to create a cart item div
function createCartItemDiv(cartItem) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item', 'mb-3');

    const title = document.createElement('h5');
    title.textContent = cartItem.title;
    cartItemDiv.appendChild(title);

    const quantityLabel = document.createElement('label');
    quantityLabel.textContent = 'Quantity:';
    cartItemDiv.appendChild(quantityLabel);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = cartItem.quantity;
    quantityInput.min = 1;
    quantityInput.addEventListener('input', () => updateCartItemQuantity(cartItem.id, quantityInput.value));
    cartItemDiv.appendChild(quantityInput);

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'ml-2');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeCartItem(cartItem.id));
    cartItemDiv.appendChild(removeButton);

    return cartItemDiv;
}

// Function to update cart item quantity
function updateCartItemQuantity(bookId, newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem.id === bookId) {
            return { ...cartItem, quantity: parseInt(newQuantity) };
        }
        return cartItem;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    loadCartItems();
    calculateTotalAmount();
}

// Function to remove a cart item
function removeCartItem(bookId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== bookId);

    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    loadCartItems();
    calculateTotalAmount();
}

// Function to calculate the total amount
function calculateTotalAmount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmountElement = document.getElementById('totalAmount');

    const totalAmount = cartItems.reduce((total, cartItem) => {
        const book = getBookDetails(cartItem.id);
        return total + (book.price * cartItem.quantity);
    }, 0);

    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to get book details based on bookId
function getBookDetails(bookId) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find(book => book.id === bookId);
}

// Function to proceed to the payment page
function proceedToPayment() {
    // Implement logic to navigate to the payment page
    alert('Proceeding to Payment');
    // Add navigation logic here
}
// Fetch cart data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    displayReceipt();
  });
  
  // Function to display payment receipt
  function displayReceipt() {
    const receiptBody = document.getElementById('receiptBody');
    const totalAmountElement = document.getElementById('totalAmount');
    
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    receiptBody.innerHTML = ''; // Clear existing receipt items
  
    // Display each book's title and price in the table
    cartItems.forEach(cartItem => {
        const book = getBookDetails(cartItem.id);
  
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const priceCell = document.createElement('td');
  
        titleCell.textContent = book.title;
        priceCell.textContent = `$${book.price}`;
  
        row.appendChild(titleCell);
        row.appendChild(priceCell);
  
        receiptBody.appendChild(row);
    });
  
    // Calculate and display the total amount
    const totalAmount = cartItems.reduce((total, cartItem) => {
        const book = getBookDetails(cartItem.id);
        return total + (book.price * cartItem.quantity);
    }, 0);
  
    totalAmountElement.textContent = totalAmount.toFixed(2);
  }
  
  // Function to get book details based on bookId
  function getBookDetails(bookId) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books.find(book => book.id === bookId);
  }
  let cart = [];

  // Fetch books from JSON file
  fetch('books.json')
      .then(response => response.json())
      .then(books => {
          // Display books
          const bookContainer = document.getElementById('book-container');
          books.forEach(book => {
              const bookElement = document.createElement('div');
              bookElement.innerHTML = `
                  <h3>${book.title}</h3>
                  <p>Author: ${book.author}</p>
                  <p>Price: $${book.price.toFixed(2)}</p>
                  <button class="add-to-cart-btn" onclick="addToCart(${book.id}, '${book.title}', ${book.price})">Add to Cart</button>
              `;
              bookContainer.appendChild(bookElement);
          });
      })
      .catch(error => console.error('Error fetching books:', error));
  
  // Function to add item to cart
  function addToCart(bookId, bookTitle, bookPrice) {
      // Check if the book is already in the cart
      const existingItem = cart.find(item => item.id === bookId);
  
      if (existingItem) {
          // If the book is already in the cart, update the quantity
          existingItem.quantity += 1;
      } else {
          // If the book is not in the cart, add it
          cart.push({
              id: bookId,
              title: bookTitle,
              price: bookPrice,
              quantity: 1
          });
      }
  
      // Alert to show that the item has been added to the cart (you can replace this with your UI logic)
      alert(`${bookTitle} added to cart!`);
  
      // Update the cart display
      updateCartDisplay();
  }  