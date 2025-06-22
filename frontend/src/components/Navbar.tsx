import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex flex-row sticky top-0 w-full justify-between items-center bg-black text-white p-4 ">
      <div className="font-bold">BGY</div>
      <div className="flex gap-4">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active font-black" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive }) => (isActive ? "active font-black" : "")}
        >
          Ruang Chat
        </NavLink>
      </div>
      <div className="text-sm font-light">Github</div>
    </div>
  );
}
