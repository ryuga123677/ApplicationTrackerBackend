import { Server } from 'socket.io';
import { Chat } from "../models/chat.model.js"; // Ensure the path is correct

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,  
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(socket.id);
        socket.on("loadHistory", async ({ senderemail, receiveremail }) => {
          try {
            console.log(senderemail,receiveremail);
            const me = await Chat.find({
              senderemail: senderemail,
              receiveremail: receiveremail,
            });
            const you = await Chat.find({
              senderemail: receiveremail,
              receiveremail: senderemail,
            });
            let arr = [...me, ...you];
            
            arr.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      
            console.log(arr);
            socket.emit("history", arr);
          } catch (error) {
            console.error("Error loading chat history:", error);
          }
        });
        socket.on("send-message", async (messag) => {
          console.log(messag);
          const { senderemail, receiveremail, message } = messag;
          const chat = new Chat({ senderemail, receiveremail, message });
          await chat.save();
          io.emit(senderemail + receiveremail, messag);
          io.emit(receiveremail + senderemail, messag);
          socket.on("disconnect", () => {
            console.log("User disconnected");
          });
        });
      });

    return io; // Return the io instance
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    console.log("Socket.IO instance accessed");
    return io;
};