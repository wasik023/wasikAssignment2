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
// Cart array to store added items
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

    // Update the cart display
    updateCartDisplay();
}

// Function to view cart
function viewCart() {
    // Display the cart items
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `<p>${item.title} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}</p>`;
            cartContainer.appendChild(itemElement);
        });
    }
}

// Function to update the cart display
function updateCartDisplay() {
    // You can implement the logic to dynamically update the cart icon or any other UI element
    // For simplicity, we'll just log the cart array to the console
    console.log(cart);
}
