import { Avatar, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { getAllUsers } from "../api";
import MessageBoard from "../components/MessageBoard";
import UserItem from "../components/UserItem";
import { ChatReducer } from "../redux/Reducers/Chat";
import { ChatSelector } from "../redux/Selector";

export default function chat() {
  const [users, setUsers] = useState([]);
  const { userChat, Receiver } = useSelector(ChatSelector);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const handleChoose = ({ id, name }) => {
    // console.log("id, name", name);
    dispatch(ChatReducer.actions.setReceiver(id));
    dispatch(ChatReducer.actions.setNameForChat(name));
  };
  useEffect(() => {
    setLoading(true);
    getAllUsers().then((res) => {
      setUsers(res.data.users);
      setLoading(false);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        height: "90vh",
        borderTop: "1px solid",
      }}
    >
      {loading && (
        <CircleSpinnerOverlay
          loading={loading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      {/* left */}
      <div
        style={{ width: "20%", borderRight: "1px solid", overflowY: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            border: "1px solid",
          }}
        >
          <p>LIST USER</p>
        </div>
        {users.map((user, index) => {
          if (!user.isAdmin) {
            return (
              // && 'background : "red'
              <div key={index}>
                {Receiver === user._id ? (
                  <div
                    style={{
                      background: "#1976d2",
                      color: "#fff",
                      transition: "all 1s ease",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleChoose({ id: user._id, name: user.fullname })
                    }
                  >
                    <UserItem key={index} username={user.username} />
                  </div>
                ) : (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleChoose({ id: user._id, name: user.fullname })
                    }
                  >
                    <UserItem key={index} username={user.username} />
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
      {/* right */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            borderBottom: "1px solid",
          }}
        >
          <p>{userChat ? userChat : "vui long chon avt"}</p>
          <Avatar
            alt="Remy Sharp"
            src="https://www.w3schools.com/w3css/img_avatar3.png"
          />
        </div>
        {/* body */}
        <MessageBoard />
      </div>
    </div>
  );
}
