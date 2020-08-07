var ws = new WebSocket("ws://localhost:3001");

ws.addEventListener("open", () => {
  console.log("connected to the server!");

  ws.send(
    JSON.stringify({
      type: "buy-tickets",
      payload: 1,
    })
  );
});

ws.addEventListener("message", ({ data }) => {
  console.dir(data);
});
