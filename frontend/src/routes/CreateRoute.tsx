import { createBrowserRouter } from "react-router-dom";

const CreateRoute = () => {
  return createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const MainLayout = await import("layouts/MainLayout");
        return { Component: MainLayout.default };
      },
      children: [
        {
          index: true,
          lazy: async () => {
            const Home = await import("pages/Home");
            return { Component: Home.default };
          },
        },
        {
          path: "chat",
          index: true,
          lazy: async () => {
            const SearchChatRoom = await import("pages/SearchChatRoom");
            return { Component: SearchChatRoom.default };
          },
        },
      ],
    },
    {
      path: "chat",
      children: [
        {
          path: ":id",
          lazy: async () => {
            const ChatRoom = await import("pages/ChatRoom");
            return { Component: ChatRoom.default };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const PageNotFound = await import("pages/PageNotFound");
        return { Component: PageNotFound.default };
      },
    },
  ]);
};

export default CreateRoute;
