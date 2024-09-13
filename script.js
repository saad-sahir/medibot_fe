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

        fetch('https://test-api-etok.onrender.com/chat', {
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
    const chatBox = document.getElementById('chat-box');
    if (userInput.trim() !== "") {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message');
        userMessageDiv.textContent = userInput;
        chatBox.appendChild(userMessageDiv);
        document.getElementById('user-input').value = '';
        
        fetch('https://test-api-etok.onrender.com/test', {
            method:"POST",
            headers: {'Content-Type':'application/json',},
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
    } else if (userInput === "") {
        let c = 1;
        const stressMessageDiv = document.createElement('div');
        stressMessageDiv.classList.add('test_message');
        stressMessageDiv.textContent = "Stress testing...";
        chatBox.appendChild(stressMessageDiv);

        async function sendTestRequest() {
            try {
                const response = await fetch("https://test-api-etok.onrender.com/stress_test", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({ query: "Request testing" })
                });
                const data = await response.json()
                console.log("Request"+c);
                c += 1;
                return true;
            } catch (error) {
                console.error("Error: ", error);
                return false;
            }
        }

        async function runStressTest() {
            while (true) {
                const success = await sendTestRequest();
                if (!success) {
                    stressMessageDiv.textContent = `${c - 1} requests were made before an error occurred.`;
                    break; 
                }
            }
        }

        runStressTest()
    }
}
