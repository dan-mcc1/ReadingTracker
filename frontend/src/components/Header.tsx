import { Link } from "react-router-dom";
import type { INavLink } from "../types/common";

export const Header = () => {
  const navLink: INavLink[] = [
    { name: "Home", path: "/", className: "text-[var(--secondary-color)]" },
    {
      name: "Sign In",
      path: "/signIn",
      className: "text-[var(--secondary-color)]",
    },
    {
      name: "Sign Up",
      path: "/signUp",
      className: "text-[var(--secondary-color)] font-bold",
    },
  ];

  return (
    <header className="w-full sticky md:px-20 top-0 bg-[var(--primary-color)] z-20 mb-4 flex items-center justify-between p-8">
      <Link to="/">
        <div className="flex items-center space-x-2 font-bold text-md md:text-3xl text-[var(--secondary-color)]">
          <span>Reading Tracker</span>
        </div>
      </Link>
      <div className="hidden lg:flex space-x-10">
        {navLink.map((item) => (
          <Link key={item.path} to={item.path} className={item.className}>
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
};
