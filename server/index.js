const http = require("http");
const ws = new require("ws");
const wss = new ws.Server({ noServer: true });
const clients = new Set();

let availableTickets = 2;

const server = http.createServer((req, res) => {
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), handleConnection);
});

function availableTicketsJSON() {
  return JSON.stringify(availableTickets);
}

function handleConnection(sock) {
  clients.add(sock);
  sock.send(JSON.stringify(availableTicketsJSON()));

  sock.on("message", (e) => {
    if ((json.type = "ticket-sold")) {
      availableTickets = availableTickets - 1;
      for (let client of clients) {
        client.send(JSON.stringify(availableTicketsJSON()));
      }
    }
  });

  sock.on("close", () => {
    clients.delete(sock);
  });
}

server.listen(3001, () => {
  console.log(`Server is up and running on 3001`);
});
