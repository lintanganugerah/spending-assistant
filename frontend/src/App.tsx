import { RouterProvider } from "react-router-dom";
import CreateRoute from "./routes/CreateRoute";

function AppRouter() {
  const router = CreateRoute();
  return <RouterProvider router={router} />;
}

function App() {
  return <AppRouter />;
}

export default App;
