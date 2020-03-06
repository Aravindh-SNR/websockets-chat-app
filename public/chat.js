// By default, connection is made with the server that serves the client side files
const socket = io();

const output = document.getElementById('output'),
    handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    button = document.getElementById('send'),
    feedback = document.getElementById('feedback');

// Emit chat event when a message is submitted
document.getElementById('chat-form').onsubmit = event => {
    event.preventDefault();
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
};

// Emit typing event when an input occurs on the message field
message.oninput = () => {
    socket.emit('typing', handle.value);
};

// Display message received with chat event
socket.on('chat', data => {
    feedback.innerHTML = '';
    const newMessage = document.createElement('p');
    const name = document.createElement('strong');
    name.textContent = data.handle;
    newMessage.appendChild(name);
    const text = document.createTextNode(`: ${data.message}`);
    newMessage.appendChild(text);
    output.appendChild(newMessage);
});

// Indicate that someone is typing a message when a typing event is received
socket.on('typing', data => {
    feedback.innerHTML = `<p>${data ? data : 'Someone'} is typing a message...</p>`;
});