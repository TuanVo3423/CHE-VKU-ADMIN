import routes from "../configs/routes";
// Pages
import home from "../pages/home";
import user from "../pages/users";
import CreateProduct from "../pages/createProduct";
import Chat from "../pages/Chat";

export const publicRoutes = [
  { path: routes.home, component: home, title: "home" },
  { path: routes.users, component: user, title: "user" },
  { path: routes.create, component: CreateProduct, title: "CreateProduct" },
  { path: routes.chat, component: Chat, title: "chat" },
];
export const privateRoutes = [];
