const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://videofy-nextjs-production.up.railway.app",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("comment", (comment) => {
    console.log("Recieved new comment: ", comment);
    io.emit("comment", comment);
  });

  socket.on("deleteComment", (deletedCommentId) => {
    io.emit("deleteComment", deletedCommentId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
