import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EventSummit from './pages/EventSummit';

function App() {
  const [session, setSession] = useState(null); // { role: 'user', registration } | { role: 'admin' }

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
