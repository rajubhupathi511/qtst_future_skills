import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import EventSummit from './pages/EventSummit';

const SESSION_KEY = 'qtf_session';

function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // A page load that lands directly on a #hash (refresh, pasted link, new
    // tab) has the browser jump straight there before AOS ever runs, so
    // every section above the fold is already "in view" and its entrance
    // animation never gets a chance to play. Start at the top instead, let
    // AOS register everything as hidden, then smooth-scroll down to the
    // target so the reveal animations actually run.
    const initialHash = window.location.hash;
    if (initialHash) window.scrollTo(0, 0);

    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });

    if (initialHash) {
      const id = initialHash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
    AOS.refreshHard();
  }, [location.pathname, location.hash]);

  return null;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function App() {
  const [session, setSessionState] = useState(loadSession);

  const setSession = (data) => {
    if (data) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    setSessionState(data);
  };

  return (
    <BrowserRouter>
      <ScrollAnimations />
      <Routes>
        <Route path="/" element={<Home session={session} setSession={setSession} />} />
        <Route path="/about" element={<AboutUs session={session} setSession={setSession} />} />
        <Route path="/contact" element={<ContactUs session={session} setSession={setSession} />} />
        <Route path="/event" element={<EventSummit session={session} setSession={setSession} />} />
        <Route path="/dashboard" element={<Dashboard session={session} setSession={setSession} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
