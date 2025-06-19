import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white px-4">
      <Outlet />
    </div>
  );
}
