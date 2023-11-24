function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // You can add more validation here if needed

    // Example: Send form data to the server (in this case, just display a message)
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.innerHTML = `<p>Thank you, ${name}! Your message has been submitted.</p>`;
}
