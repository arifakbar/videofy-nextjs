const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

  socket.on("liked", (userId) => {
    console.log("Recieved new like from: ", userId);
    io.emit("liked", userId);
  });

  socket.on("unliked", (userId) => {
    console.log("Removed like from: ", userId);
    io.emit("unliked", userId);
  });

  socket.on("disliked", (userId) => {
    console.log("Recieved new dislike from: ", userId);
    io.emit("disliked", userId);
  });

  socket.on("undisliked", (userId) => {
    console.log("Removed dislike from: ", userId);
    io.emit("undisliked", userId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
