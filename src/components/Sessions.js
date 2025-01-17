import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";

const socket = io.connect("http://localhost:3001");

function Sessions() {
  // Room and Messages States
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  // Join room function
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // Send message function
  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { message, room });
      setMessage(""); // Clear input after sending message
    }
  };

  // Handle message reception
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Sessions & Collaborations
        </Typography>

        {/* Room Input */}
        <TextField
          label="Room Number"
          variant="outlined"
          fullWidth
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={joinRoom}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Join Room
        </Button>

        {/* Message Input */}
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={sendMessage}
          fullWidth
        >
          Send Message
        </Button>

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Last Received Message:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {messageReceived || "No messages yet..."}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Sessions;
