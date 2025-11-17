import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white shadow">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Human Rights Education</h1>

        <div className="flex gap-6 text-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/topics"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-white"
            }
          >
            Topics
          </NavLink>
          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "hover:text-white"
            }
          >
            Quiz
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
