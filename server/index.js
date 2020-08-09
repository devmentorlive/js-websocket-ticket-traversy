const http = require("http");
const ws = new require("ws");
const wss = new ws.Server({ noServer: true });
const clients = new Set();

let availableTickets = 2;

const server = http.createServer((req, res) => {
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), handleConnection);
});

function handleConnection(sock) {
  clients.add(sock);
  console.log("client connected!");
  sendAvailableTicketsToClient(sock);

  sock.on("message", (e) => {
    const json = JSON.parse(e);
    switch (json.type) {
      case "buy-tickets":
        if (availableTickets - json.payload >= 0) {
          availableTickets = availableTickets - json.payload;
          for (let client of clients) {
            sendAvailableTicketsToClient(client);
          }
        }
    }
    console.log("tickets left:", availableTickets);
  });

  sock.on("close", () => {
    console.log("client disconnected!");
  });
}

server.listen(3001, () => {
  console.log("Server is up and listening on port 3001!");
});

function sendAvailableTicketsToClient(sock) {
  sock.send(
    JSON.stringify({
      type: "available-tickets",
      payload: availableTickets,
    })
  );
}
