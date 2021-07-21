const connection = new signalR.HubConnectionBuilder()
                            .withUrl("https://localhost:44392/chat")
                            .build();

function receiveMessage(username, message, usernameColor) {
  appendMessage(username, message, usernameColor);
}

function sendMessage(event) {
  let username = document.getElementById("usernameField").value;
  let message = document.getElementById("messageField").value;

  if (isEmpty(username)) {
    alert("Please, set username");
    return;
  }

  if (isEmpty(message)) {
    alert("Please, set message");
    return;
  }

  let usernameColor = getUserNameColor();

  appendMessage("You", message, usernameColor);

  connection.invoke("SendMessage", username, message, usernameColor);
}

function appendMessage(username, message, color) {
  let messagesBox = document.getElementById("messages");
  let firstElement = messagesBox.firstChild;
  let container = document.createElement("div");

  container.appendChild(createUserNameElement(username, color));
  container.appendChild(createMessageContentElement(message));

  messagesBox.insertBefore(container, firstElement);
}

function createUserNameElement(username, color) {
  let usernameElement = document.createElement("span");

  usernameElement.appendChild(document.createTextNode(`${username}: `));
  usernameElement.className = "username"
  usernameElement.style.color = color;

  return usernameElement;
}

function createMessageContentElement(message) {
  let contentElement = document.createElement("span");

  contentElement.appendChild(document.createTextNode(message));

  return contentElement;
}

function getUserNameColor() {
  let usernameColor = document.getElementById("usernameColorPicker").value;

  return usernameColor;
}

function isEmpty(str) {
  return str.length == 0;
}

document.getElementById("sendButton").addEventListener("click", sendMessage);

connection.on("ReceiveMessage", receiveMessage);

connection.start();
