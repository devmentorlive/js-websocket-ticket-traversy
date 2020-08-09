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
  const { type, payload } = JSON.parse(data);
  switch (type) {
    case "tickets-available":
      document.getElementById("available-ticket-count").innerHTML = payload;
  }
});

function buyTickets(num) {
  ws.send(
    JSON.stringify({
      type: "buy-tickets",
      payload: 1,
    })
  );
}
