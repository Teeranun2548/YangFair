import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

let current = 0;

io.on("connection", (socket) => {
  console.log("Dashboard connected");

  setInterval(() => {
    current += Math.random() > 0.5 ? 1 : -1;
    if (current < 0) current = 0;

    socket.emit("people_update", {
      current,
    });
  }, 2000);
});

server.listen(5000, () => {
  console.log("Backend running on 5000");
});
