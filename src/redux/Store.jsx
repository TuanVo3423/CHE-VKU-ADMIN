// import createSagaMiddleware from "@redux-saga/core";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// redux slices
import { SystemReducer } from "./Reducers/System";
import { ChatReducer } from "./Reducers/Chat";

// import rootSaga from './Saga';
// const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    system: SystemReducer.reducer,
    chat: ChatReducer.reducer,
    // navbar: NavbarSlice.reducer, // đáng ra chỗ này nó sẽ có 2 param là state và actions nhưng nó đã xử lí cho mình rồi
    // account : AccountReducer.reducer,
    // product : ProductReducer.reducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
// sagaMiddleware.run(rootSaga);
export default store;
