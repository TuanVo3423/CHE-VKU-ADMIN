import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/mainlayout";
import { publicRoutes } from "./routes";
import { ChatReducer } from "./redux/Reducers/Chat";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { URL } from "./api";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io.connect(URL);
    dispatch(ChatReducer.actions.setSocketState({ socket }));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <MainLayout path={route.title}>
                  <Page />
                </MainLayout>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
