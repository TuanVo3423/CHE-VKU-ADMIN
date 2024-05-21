import { Avatar } from "@mui/material";
import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";
import { ChatSelector } from "../redux/Selector";

export default function Message({ username, content, createdAt }) {
  const { userChat } = useSelector(ChatSelector);
  return (
    <div>
      {username === "admin" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p style={{ textDecoration: "underline" }}>
              {new Date(createdAt).toLocaleString()}
            </p>
            <p>me</p>
            <p>{moment(createdAt).fromNow()}</p>
            <Avatar
              alt="Remy Sharp"
              src="https://www.w3schools.com/w3css/img_avatar3.png"
            />
          </div>
          <p>{content}</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://www.w3schools.com/w3css/img_avatar3.png"
            />
            <p>{userChat}</p>
            <p>{moment(createdAt).fromNow()}</p>
            <p style={{ textDecoration: "underline" }}>
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}
