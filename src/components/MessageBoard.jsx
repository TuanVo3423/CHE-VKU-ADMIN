import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { ChatSelector } from "../redux/Selector";
import { useRef } from "react";
import { ChatReducer } from "../redux/Reducers/Chat";
import { fetchChat } from "../api";

export default function MessageBoard() {
  const messageListRef = useRef(null);
  const dispatch = useDispatch();
  const ref = useRef();
  const { chat } = useSelector(ChatSelector);
  const { socket, Receiver } = useSelector(ChatSelector);
  const handleSend = () => {
    const data = ref.current.value;
    const createdAt = new Date().toISOString();
    socket.emit("createChat", {
      content: data,
      userID: Receiver,
      createdAt,
      userName: "ADMIN",
    });
    ref.current.value = "";
  };
  console.log("Receiver", Receiver);
  useEffect(() => {
    if (Receiver) {
      console.log("fetch ne");
      fetchChat(Receiver).then((res) => {
        const result = res.data.chat.map((item, index) => {
          return {
            author: item.userName === "ADMIN" ? "admin" : "me",
            type: "text",
            data: {
              text: item.content,
            },
            createdAt: item.createdAt,
          };
        });
        dispatch(ChatReducer.actions.setChatState(result));
      });
      if (socket) {
        socket.emit("joinChat", Receiver);
      }
    }
  }, [socket, Receiver]);

  useEffect(() => {
    if (socket) {
      socket.on("sendChatToClient", (msg) => {
        dispatch(
          ChatReducer.actions.addChatState({
            author: msg.userName === "ADMIN" ? "admin" : "me",
            type: "text",
            data: {
              text: msg.content,
            },
            createdAt: msg.createdAt,
          })
        );
      });
      return () => socket.off("sendChatToClient");
    }
  }, [socket]);
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [chat]);
  console.log("chat", chat);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <div
        ref={messageListRef}
        style={{
          display: "flex",

          flexDirection: "column",
          height: "75vh",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {/* message */}
        {chat.map((item, index) => (
          <Message
            key={index}
            content={item.data.text}
            createdAt={item.createdAt}
            username={item.author}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          // borderTop: "1px solid red",
        }}
      >
        <input
          style={{ width: "100%", padding: "10px", outline: "blue" }}
          ref={ref}
        />
        <Button onClick={handleSend} variant="contained">
          SEND
        </Button>
      </div>
    </div>
  );
}
