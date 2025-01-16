const COHERE_API_KEY = "dhgi9cQoMepzRI7pKBxlK3e91OjYuU6Qoj09ppt8";  // Insira sua chave de API aqui

const textarea = document.getElementById('userInput');

// Ajusta a altura do campo ao digitar
textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; // Redefine a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta à altura do conteúdo
});

async function enviarPergunta() {
    const userInput = textarea.value;

    if (userInput.trim() === "") return; // Verifica se o campo está vazio

    adicionarMensagem(userInput, 'user'); // Adiciona a mensagem do usuário

    const resposta = await obterRespostaCohere(userInput);

    adicionarMensagem(resposta, 'bot'); // Adiciona a resposta do bot

    textarea.value = ""; // Limpa o campo de entrada
    textarea.style.height = 'auto'; // Reseta a altura do textarea
}

function adicionarMensagem(texto, tipo) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', tipo === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = texto;

    const messagesContainer = document.getElementById('messages');
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Rolagem automática para a última mensagem
}

async function obterRespostaCohere(pergunta) {
    const promptEmPortugues = `Responda a seguinte pergunta em português: "${pergunta}"`;

    const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: promptEmPortugues,
            max_tokens: 200,
            temperature: 0.5
        })
    });

    const data = await response.json();

    if (response.ok) {
        return data.generations[0].text.trim();
    } else {
        return "Desculpe, não consegui entender sua pergunta.";
    }
}
