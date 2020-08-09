var ws = new WebSocket("ws://localhost:3001");

ws.addEventListener("open", () => {
  console.log("connected to the server!");
});

ws.addEventListener("message", ({ data }) => {
  const json = JSON.parse(data);
  switch (json.type) {
    case "available-tickets":
      document.getElementById("available-ticket-count").innerHTML =
        json.payload;

      if (json.payload < 1) {
        document.querySelector(".act-now").innerHTML =
          "Sorry, this show is sold out!";
      }
  }
});

function buyTicket() {
  ws.send(
    JSON.stringify({
      type: "buy-tickets",
      payload: 1,
    })
  );
}
