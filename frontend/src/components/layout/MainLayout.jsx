import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const MainLayout = () => (
  <div className="min-h-screen bg-sand/60">
    <Navbar />
    <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-10 md:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;

