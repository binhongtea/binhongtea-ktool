function generateQuotes() {
  const apiUrl = 'https://v1.hitokoto.cn/';
  const cardContainer = document.getElementById('cardContainer');
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const quote = data.hitokoto;
      createCard(quote);
    })
    .catch(error => {
      console.error('随机文案获取失败:', error);
      showMessage("获取随机文案失败");
    });
}

function createCard(quote) {
  const cardContainer = document.getElementById('cardContainer');
  const existingQuotes = Array.from(cardContainer.getElementsByClassName('card')).map(card => card.textContent);
  if (existingQuotes.includes(quote)) {
    generateQuotes();
    return;
  }

  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = quote;
  cardContainer.appendChild(card);

  if (cardContainer.childElementCount >= 10) {
    showMessage("已生成10个一言卡片");
  } else {
    generateQuotes();
  }
}

function showMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageElement.id = "message";
  document.body.appendChild(messageElement);
}

generateQuotes();