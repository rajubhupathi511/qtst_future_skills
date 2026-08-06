import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * Lightweight, dependency-free page-transition wrapper. Keying the div by
 * pathname forces React to remount it on every route change, which restarts
 * the CSS entrance animation below — the same trick used for the Hero's
 * per-slide text entrance, just applied at the page level.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div className="page-transition" key={location.pathname}>
      {children}
    </div>
  );
}
