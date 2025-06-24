import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen text-white px-4">
        <Outlet />
      </div>
    </>
  );
}
