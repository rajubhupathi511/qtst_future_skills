import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Programs from '../components/sections/Programs';
import Gallery from '../components/sections/Gallery';
import Network from '../components/sections/Network';
import Infrastructure from '../components/sections/Infrastructure';
import CallToAction from '../components/sections/CallToAction';
import Login from '../components/sections/Login';

export default function Home({ session, setSession }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAuth = () => {
    if (!session) {
      setLoginOpen(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginSuccess = (data) => {
    setSession(data);
    setLoginOpen(false);
    navigate('/dashboard');
  };

  const authLabel = !session ? 'Admin Login' : session.role === 'admin' ? 'Admin' : 'My Ticket';

  return (
    <>
      <Navbar onOpenAuth={handleOpenAuth} authLabel={authLabel} />
      <main>
        <Hero />
        <About />
        <Programs />
        <Gallery />
        <Network />
        <Infrastructure />
        <CallToAction />
      </main>
      <Footer />
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        restrictToAdmin
      />
    </>
  );
}
