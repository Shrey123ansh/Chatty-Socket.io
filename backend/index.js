const app = require("express")();

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // console.log("socket:", socket);
  console.log("socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("payload:", payload);
    io.emit("chat", payload);
  });
});

//Incorrect
// app.listen(3000, () => {
//   console.log("listening to port 3000");
// });

//Correct
httpServer.listen(5000, () => {
  console.log("Server is listening to port 5000");
});
