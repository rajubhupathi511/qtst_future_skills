import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import eventRegistrations from './routes/eventRegistrations.js';
import auth from './routes/auth.js';
import contactMessages from './routes/contactMessages.js';

const app = express();
const corsOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
const isLocalhost = (origin) => /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(cors({
  origin(origin, callback) {
    if (!origin || isLocalhost(origin) || corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', auth);
app.use('/api/event-registrations', eventRegistrations);
app.use('/api/contact-messages', contactMessages);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

const port = process.env.PORT || 4177;
app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
