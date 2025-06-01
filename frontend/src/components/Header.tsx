import { Link } from "react-router-dom";
import type { INavLink } from "../types/common";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  const handleSignOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // will be null if not signed in
    });
    return () => unsubscribe(); // cleanup listener
  }, [auth]);

  const navLink: INavLink[] = user
    ? [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Settings",
          path: "/settings",
        },
        {
          name: "Sign Out",
          path: "/",
        },
      ]
    : [
        { name: "Home", path: "/" },
        {
          name: "Sign In",
          path: "/signIn",
        },
        {
          name: "Sign Up",
          path: "/signUp",
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
        {navLink.map((item) =>
          item.name === "Sign Out" ? (
            <button
              key={item.name}
              onClick={handleSignOut}
              className="text-[var(--secondary-color)]"
            >
              Sign Out
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className="text-[var(--secondary-color)]"
            >
              {item.name}
            </Link>
          )
        )}
      </div>
    </header>
  );
};
