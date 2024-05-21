import { createSlice } from "@reduxjs/toolkit";

export const ChatReducer = createSlice({
  name: "chat",
  initialState: {
    socket: undefined,
    comments: [],
    chat: [],
    userChat: undefined,
    Receiver: undefined,
  },
  reducers: {
    setSocketState: (state, action) => {
      state.socket = action.payload.socket;
    },
    setReceiver: (state, action) => {
      state.Receiver = action.payload;
    },
    setCommentsState: (state, action) => {
      state.comments = action.payload;
    },
    addCommentsState: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    setChatState: (state, action) => {
      state.chat = action.payload;
    },
    addChatState: (state, action) => {
      state.chat.push(action.payload);
    },
    setNameForChat: (state, action) => {
      state.userChat = action.payload;
    },
  },
});
