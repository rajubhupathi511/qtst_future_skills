import { useEffect, useRef } from 'react';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { csrFocusAreas } from '../../data/content';
import csrImg from '../../assets/focus/csr.png';
import './CSR.css';

const NAV_HEIGHT = 92; // Navbar.css .navbar height

export default function CSR() {
  const featureRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const feature = featureRef.current;
    const sticky = stickyRef.current;

    if (!feature || !sticky) return undefined;

    const content = feature.querySelector('.csr__content');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let animationFrame = null;

    const clamp = (value, min = 0, max = 1) =>
      Math.min(Math.max(value, min), max);

    const smoothStep = (value) =>
      value * value * (3 - 2 * value);

    // `.csr__sticky` can't use CSS `position: sticky` here — #root has
    // `overflow-x: hidden` (needed site-wide), and any ancestor with
    // non-visible overflow breaks position:sticky for elements inside it.
    // So the "stuck while scrolling through it" behaviour is reproduced by
    // hand: absolute at the top before the track is reached, fixed (below
    // the navbar) while inside it, then absolute at the bottom once the
    // track has been scrolled past — mirroring what sticky would have done.
    const pinBefore = () => {
      sticky.style.position = 'absolute';
      sticky.style.top = '0';
      sticky.style.bottom = '';
      sticky.style.left = '0';
      sticky.style.width = '100%';
    };

    const pinDuring = () => {
      sticky.style.position = 'fixed';
      sticky.style.top = `${NAV_HEIGHT}px`;
      sticky.style.bottom = '';
      sticky.style.left = '0';
      sticky.style.width = '100%';
    };

    const pinAfter = (offsetPx) => {
      // Deliberately setting an explicit inline `top` here (not `bottom`).
      // The base CSS rule always declares `top: 0`; if this only cleared
      // its own inline `top`, that stylesheet `top: 0` would still apply
      // alongside an inline `bottom`, and per the CSS box model, `bottom`
      // is ignored whenever `top`/`height`/`bottom` are all non-auto at
      // once — so `top` silently wins and the box snaps back to the very
      // start of the track instead of its end.
      sticky.style.position = 'absolute';
      sticky.style.top = `${offsetPx}px`;
      sticky.style.bottom = '';
      sticky.style.left = '0';
      sticky.style.width = '100%';
    };

    const clearPin = () => {
      sticky.style.position = '';
      sticky.style.top = '';
      sticky.style.bottom = '';
      sticky.style.left = '';
      sticky.style.width = '';
    };

    const updateScrollAnimation = () => {
      animationFrame = null;

      const isMobile = window.innerWidth <= 860;

      if (isMobile || reducedMotion.matches) {
        clearPin();
        feature.style.setProperty('--csr-image-width', '52%');
        feature.style.setProperty('--csr-image-scale', '1');
        feature.style.setProperty('--csr-content-opacity', '1');
        feature.style.setProperty('--csr-content-move', '0px');

        if (content) {
          content.style.pointerEvents = 'auto';
        }

        return;
      }

      const featurePosition = feature.getBoundingClientRect();
      const stickyHeight = window.innerHeight - NAV_HEIGHT;
      const scrollableDistance = feature.offsetHeight - stickyHeight;

      let rawProgress;
      if (featurePosition.top > 0) {
        pinBefore();
        rawProgress = 0;
      } else if (scrollableDistance > 0 && -featurePosition.top < scrollableDistance) {
        pinDuring();
        rawProgress = clamp(-featurePosition.top / scrollableDistance);
      } else {
        pinAfter(Math.max(scrollableDistance, 0));
        rawProgress = 1;
      }

      /*
       * Both curves are driven directly off rawProgress (linear scroll
       * fraction), each with a single smoothStep ease over its own
       * window — not chained through one another. Deriving contentProgress
       * from the already-eased imageProgress (as before) compounds two
       * ease curves back-to-back, which reads as a pause (flat start of
       * the first ease) followed by a sudden catch-up (once the second
       * ease's threshold is finally crossed) instead of one continuous
       * motion.
       *
       * The animation finishes a bit before the pin releases, holding
       * the completed layout briefly (image by 0.85, content by 0.78) —
       * but most of the scrolled distance is still spent animating, not
       * sitting frozen.
       */
      const imageProgress = smoothStep(
        clamp(rawProgress / 0.85)
      );

      const contentProgress = smoothStep(
        clamp((rawProgress - 0.12) / 0.66)
      );

      const imageWidth = 100 - 48 * imageProgress;
      const imageScale = 1.04 - 0.04 * imageProgress;
      const contentMove = 65 * (1 - contentProgress);

      feature.style.setProperty(
        '--csr-image-width',
        `${imageWidth}%`
      );

      feature.style.setProperty(
        '--csr-image-scale',
        imageScale.toFixed(3)
      );

      feature.style.setProperty(
        '--csr-content-opacity',
        contentProgress.toFixed(3)
      );

      feature.style.setProperty(
        '--csr-content-move',
        `${contentMove}px`
      );

      if (content) {
        content.style.pointerEvents =
          contentProgress > 0.75 ? 'auto' : 'none';
      }
    };

    const requestAnimationUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(
          updateScrollAnimation
        );
      }
    };

    updateScrollAnimation();

    window.addEventListener('scroll', requestAnimationUpdate, {
      passive: true,
    });

    window.addEventListener('resize', requestAnimationUpdate);

    reducedMotion.addEventListener?.(
      'change',
      requestAnimationUpdate
    );

    return () => {
      window.removeEventListener(
        'scroll',
        requestAnimationUpdate
      );

      window.removeEventListener(
        'resize',
        requestAnimationUpdate
      );

      reducedMotion.removeEventListener?.(
        'change',
        requestAnimationUpdate
      );

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section id="csr" className="csr section">
      <div
        ref={featureRef}
        className="csr__feature-scroll"
      >
        <div className="csr__sticky" ref={stickyRef}>
          <div className="csr__image-wrap">
            <img
              src={csrImg}
              alt="A corporate partner greeting a community member during a CSR outreach visit"
            />
          </div>

          <div className="csr__content">
            <div className="csr__content-inner">
              <SectionHeading
                align="left"
                eyebrow="Corporate Social Responsibility"
                title="Together, We Create Programmes"
                highlight="Focused On Real Impact"
                description="Future Skills Foundation partners with corporate organizations to design and implement impactful CSR initiatives aligned with national priorities and Sustainable Development Goals."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container csr__bottom">
        <div className="csr__chips">
          {csrFocusAreas.map((item, index) => (
            <div
              className="csr__chip"
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 90}
            >
              <span
                className="csr__chip-icon icon-float"
                style={{
                  animationDelay: `${(index % 4) * 0.25}s`,
                }}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  color="var(--white)"
                />
              </span>

              {item.title}
            </div>
          ))}
        </div>

        <div className="csr__footer" data-aos="fade-up">
          <p>
            We ensure transparency, measurable outcomes, and
            sustainable impact through effective programme
            implementation and reporting.
          </p>

          <a href="#contact" className="btn btn-primary">
            Partner With Us on CSR
            <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
