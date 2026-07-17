import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import MarqueeStrip from '../components/sections/MarqueeStrip';
import About from '../components/sections/About';
import ImpactStats from '../components/sections/ImpactStats';
import BackToTop from '../components/ui/BackToTop';
import EventBanner from '../components/ui/EventBanner';
import Programs from '../components/sections/Programs';
import Journey from '../components/sections/Journey';
import Gallery from '../components/sections/Gallery';
import Network from '../components/sections/Network';
import Testimonials from '../components/sections/Testimonials';
import CallToAction from '../components/sections/CallToAction';
import Login from '../components/sections/Login';

export default function Home({ session, setSession }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(() => !sessionStorage.getItem('eventBannerSeen'));
  const navigate = useNavigate();

  const closeBanner = () => {
    sessionStorage.setItem('eventBannerSeen', '1');
    setBannerOpen(false);
  };

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
        <MarqueeStrip />
        <About />
        <ImpactStats />
        <Programs />
        <Journey />
        <Gallery />
        <Network />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
      <EventBanner open={bannerOpen} onClose={closeBanner} />
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        restrictToAdmin
      />
    </>
  );
}
