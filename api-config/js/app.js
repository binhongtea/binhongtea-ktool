const chatBody = document.getElementById("chat-body");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addAiMessage(message) {
    const aiMessageHtml = `
        <div class="chat-message ai">
            <p>${message}</p>
        </div>
    `;
    chatBody.insertAdjacentHTML("beforeend", aiMessageHtml);
    scrollToBottom();
}

function addUserMessage(message) {
    const userMessageHtml = `
        <div class="chat-message user">
            <p>${message}</p>
        </div>
    `;
    chatBody.insertAdjacentHTML("beforeend",userMessageHtml);
    scrollToBottom();
}

function sendMessage(event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message === "") {
        return;
    }

    addUserMessage(message);
    messageInput.value = "";
    messageInput.focus();

    fetch(`http://ovoa.cc/api/ChatGPT.php?msg=${encodeURIComponent(message)}&type=wifi&id=1`)
        .then(response => response.text())
        .then(data => {
            addAiMessage(data);
        })
        .catch(error => {
            console.error("发生错误：", error);
            addAiMessage("出现了错误，请稍后重试。");
        });
}

messageForm.addEventListener("submit", sendMessage);

// 在页面加载时将聊天记录滚动到底部
scrollToBottom();
