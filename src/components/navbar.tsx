import { NavLink } from "react-router";
import { logout, useAuthStore } from "../store/auth.store";

export default function Navbar() {
  const { username } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-center gap-10 text-xl shadow-xl w-[50%] m-auto rounded-xl">
      <div>
        <NavLink to={"/"}>Home</NavLink>
      </div>

      {username ? (
        <div className="flex gap-6 text-gray-400 font-bold">
          <p>{username}</p>
          <button className="bg-red-500" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-blue-600 text-white">
          <NavLink to={"/login"}>
            <button>Login</button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
