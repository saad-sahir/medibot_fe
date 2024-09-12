const inputField = document.getElementById('user-input');
inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim() !== "") {
        const chatBox = document.getElementById('chat-box');

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message');
        userMessageDiv.textContent = userInput;

        chatBox.appendChild(userMessageDiv);

        document.getElementById('user-input').value = '';

        fetch('https://medibot-tdf2.onrender.com/chat', {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({query: userInput})
        })
        .then(response => response.json())
        .then(data =>{
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('bot_message');
            botMessageDiv.innerHTML = marked.parse(data.response);
            chatBox.appendChild(botMessageDiv)
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error("Error: ", error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.classList.add('message');
            errorMessageDiv.textContent = "Error: Couldn't connect to the server.";
            chatBox.appendChild(errorMessageDiv);
        })
    }
}

function testAPI() {
    const userInput = document.getElementById('user-input').value;

    if (userInput.trim() !== "") {
        const chatBox = document.getElementById('chat-box');

        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message');
        userMessageDiv.textContent = userInput;

        chatBox.appendChild(userMessageDiv);

        document.getElementById('user-input').value = '';

        fetch('https://test-api-etok.onrender.com/test', {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({query: userInput})
        })
        .then(response => response.json())
        .then(data =>{
            const botMessageDiv = document.createElement('div');
            botMessageDiv.classList.add('bot_message');
            botMessageDiv.innerHTML = marked.parse(data.response);
            chatBox.appendChild(botMessageDiv)
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error("Error: ", error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.classList.add('message');
            errorMessageDiv.textContent = "Error: Couldn't connect to the server.";
            chatBox.appendChild(errorMessageDiv);
        })
    }
}
