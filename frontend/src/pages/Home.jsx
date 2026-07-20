import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import MarqueeStrip from '../components/sections/MarqueeStrip';
// import About from '../components/sections/About';
import FocusAreas from '../components/sections/FocusAreas';
import SkillingForFuture from '../components/sections/SkillingForFuture';
import EmploymentGeneration from '../components/sections/EmploymentGeneration';
import Entrepreneurship from '../components/sections/Entrepreneurship';
import ImpactStats from '../components/sections/ImpactStats';
import BackToTop from '../components/ui/BackToTop';
import EventBanner from '../components/ui/EventBanner';
// import Programs from '../components/sections/Programs';
import CommunityOutreach from '../components/sections/CommunityOutreach';
import CSR from '../components/sections/CSR';
// import Journey from '../components/sections/Journey';
import ImpactApproach from '../components/sections/ImpactApproach';
import SponsorEducation from '../components/sections/SponsorEducation';
// import Gallery from '../components/sections/Gallery';
import WhyPartner from '../components/sections/WhyPartner';
// import Network from '../components/sections/Network';
// import Testimonials from '../components/sections/Testimonials';
import GetInvolved from '../components/sections/GetInvolved';
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
        {/* <MarqueeStrip /> */}
        {/* <About /> */}
        <FocusAreas />
        <SkillingForFuture />
        <EmploymentGeneration />
        <Entrepreneurship />
        {/* <ImpactStats /> */}
        {/* <Programs /> */}
        <CommunityOutreach />
        <CSR />
        <SponsorEducation />
        <WhyPartner />
        <ImpactApproach />
        <GetInvolved />
        {/* <Journey /> */}
        {/* <Gallery /> */}
        {/* <Network /> */}
        {/* <Testimonials /> */}
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
