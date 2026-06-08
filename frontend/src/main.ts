import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Chatroom</h1>

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

const inputChat = document.querySelector<HTMLInputElement>("#input-chatroom");
const button = document.querySelector("#send-button");

const messages = document.querySelector("#messages-container");

function sendMessage() {
  if (!inputChat?.value) return;

  const messageText = inputChat.value;

  const newMessage = document.createElement("p");
  newMessage.classList.add("message");
  newMessage.innerHTML = messageText;

  messages?.append(newMessage);

  inputChat.value = "";

  fetch("http://localhost:3000/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: messageText,
    }),
  });
}

function loadMessages() {
  fetch("http://localhost:3000/messages")
    .then((res) => res.json())
    .then((data) => {
      messages!.innerHTML = "";

      data.messages.forEach((msg: string) => {
        const p = document.createElement("p");
        p.classList.add("message");
        p.innerHTML = msg;

        messages?.append(p);
      });
    });
}

button?.addEventListener("click", sendMessage);

inputChat?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

loadMessages();
