import { RouterProvider } from "react-router-dom";
import CreateRoute from "routes/CreateRoute";
import { useInitializeToken } from "hooks/useInitializeToken";

function AppRouter() {
  const router = CreateRoute();
  return <RouterProvider router={router} />;
}

function App() {
  useInitializeToken();
  return <AppRouter />;
}

export default App;
