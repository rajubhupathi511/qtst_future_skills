import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EventSummit from './pages/EventSummit';

const SESSION_KEY = 'qtf_session';

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
      <Routes>
        <Route path="/" element={<Home session={session} setSession={setSession} />} />
        <Route path="/event" element={<EventSummit session={session} setSession={setSession} />} />
        <Route path="/dashboard" element={<Dashboard session={session} setSession={setSession} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
