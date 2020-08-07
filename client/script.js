var ws = new WebSocket("ws://localhost:3001");

ws.addEventListener("open", () => {
  console.log("connected to the server!");
});
