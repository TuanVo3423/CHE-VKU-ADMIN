import { Avatar } from "@mui/material";
import React from "react";

export default function UserItem({ username }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        borderBottom: "1px solid",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://www.w3schools.com/w3css/img_avatar3.png"
      />
      <p>{username}</p>
    </div>
  );
}
