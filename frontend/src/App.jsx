import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EventSummit from './pages/EventSummit';

const SESSION_KEY = 'qtf_session';

function ScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
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
        <Route path="/event" element={<EventSummit session={session} setSession={setSession} />} />
        <Route path="/dashboard" element={<Dashboard session={session} setSession={setSession} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
