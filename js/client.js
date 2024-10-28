let socket = io("http://localhost:8000");
var name = prompt("enter the name");
socket.emit("joined", name);

var first = document.querySelector(".first");
function generateMessage(message, side) {
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("alert");
  if (side == "left") {
    messageDiv.classList.add("alert-primary");
    messageDiv.classList.add("left");
  } else if (side == "right") {
    messageDiv.classList.add("alert-success");
    messageDiv.classList.add("right");
  } else {
    messageDiv.classList.add("alert-danger");
    messageDiv.classList.add("center");
  }
  messageDiv.innerHTML = message;
  first.append(messageDiv);
}
socket.on("new-user-joined", (name) => {
  generateMessage(`${name} joined the chat`, "center");
});
socket.on("left", (name) => {
  generateMessage(`${name} left the chat`, "center");
});
function sendMessage() {
  var input = document.getElementById("message");
  generateMessage(`you : ${input.value} `, "right");
  socket.emit("send", input.value);
  input.value = "";
}

socket.on("recieve", ({ message, name }) => {
  generateMessage(`${name} :${message}`, "left");
  console.log(message);
});
