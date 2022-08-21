const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//when user connect room => socket for user
io.on("connect", (socket) => {
  console.log(`User connected: ${socket.id}`); // log id user connect

  //When user join room with id room => user join roomId
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //When one user in room send message
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => console.log(`Disconnect user: ${socket.id}`));
  //When user disconnect room => alert for server
});

server.listen(3001, () => console.log(`Server is running at port ${3001}`));
