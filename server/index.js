const http = require("http");
const ws = new require("ws");
const wss = new ws.Server({ noServer: true });
const clients = new Set();

const server = http.createServer((req, res) => {
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), handleConnection);
});

function handleConnection(sock) {
  clients.add(sock);
  console.log("client connected!");

  sock.on("close", () => {
    console.log("client disconnected!");
  });
}

server.listen(3001, () => {
  console.log("Server is up and listening on port 3001!");
});
