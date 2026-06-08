import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Chatroom</h1>

<input
  type="text"
  id="input-username"
  placeholder="Tu nombre"
/>

<div id="messages-container"></div>

<div id="input-container">
  <input
    type="text"
    id="input-chatroom"
    placeholder="Escribí un mensaje"
  />

  <button id="send-button">
    Enviar
  </button>
</div>
`;

type Message = {
  author: string;
  text: string;
  createdAt: number;
};

const inputUsername =
  document.querySelector<HTMLInputElement>("#input-username");

const inputChat = document.querySelector<HTMLInputElement>("#input-chatroom");

const button = document.querySelector<HTMLButtonElement>("#send-button");

const messagesContainer = document.querySelector<HTMLDivElement>(
  "#messages-container",
);

function renderMessages(messages: Message[]) {
  if (!messagesContainer) return;

  messagesContainer.innerHTML = "";

  messages.forEach((msg) => {
    const p = document.createElement("p");

    p.classList.add("message");
    p.textContent = `${msg.author}: ${msg.text}`;

    messagesContainer.appendChild(p);
  });
}

async function loadMessages() {
  try {
    const response = await fetch("http://localhost:3000/messages");

    const data = await response.json();

    renderMessages(data.messages);
  } catch (error) {
    console.error("Error cargando mensajes", error);
  }
}

async function sendMessage() {
  const username = inputUsername?.value.trim();
  const text = inputChat?.value.trim();

  if (!username || !text) return;

  try {
    await fetch("http://localhost:3000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: username,
        message: text,
      }),
    });

    inputChat!.value = "";

    await loadMessages();
  } catch (error) {
    console.error("Error enviando mensaje", error);
  }
}

button?.addEventListener("click", sendMessage);

inputChat?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

loadMessages();

setInterval(() => {
  loadMessages();
}, 1000);
