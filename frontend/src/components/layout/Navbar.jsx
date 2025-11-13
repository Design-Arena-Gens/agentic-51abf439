import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/remedies', label: 'Remedies' },
  { to: '/chatbot', label: 'Chatbot' },
];

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <header className="bg-white/80 backdrop-blur border-b border-white/50 sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-heading text-2xl tracking-wide"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            ॐ
          </span>
          AnnapurnaAI
        </Link>

        <button
          className="inline-flex items-center justify-center rounded-lg border border-primary/20 p-2 text-primary lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          className={`${
            open ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-3'
          } absolute left-0 right-0 top-full mx-4 mt-2 rounded-2xl bg-white/95 p-6 shadow-soft transition-all lg:static lg:mx-0 lg:flex lg:translate-y-0 lg:items-center lg:gap-12 lg:bg-transparent lg:p-0 lg:opacity-100`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-forest/70 hover:text-primary'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 lg:mt-0">
            {isAuthenticated ? (
              <button
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-primary/20 hover:bg-forest"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold uppercase tracking-wide text-primary hover:text-forest"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-secondary px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-secondary/30 hover:bg-clay"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

