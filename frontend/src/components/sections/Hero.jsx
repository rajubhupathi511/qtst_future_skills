import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import { stats, heroSlides } from '../../data/content';
import './Hero.css';

const AUTOPLAY_MS = 5500;

function splitWords(text) {
  return text.split(' ').filter(Boolean);
}

function useMagnetic(strength = 16) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
    };
    const reset = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', reset);
    };
  }, [strength]);

  return ref;
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const primaryBtnRef = useMagnetic(14);
  const outlineBtnRef = useMagnetic(14);

  const goTo = useCallback((i) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    let frame = null;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(${nx * -24}px, ${ny * -16}px, 0)`;
        }
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(-50%, -50%)`;
          glowRef.current.style.opacity = '1';
        }
      });
    };

    const handleLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const slide = heroSlides[index];

  return (
    <section
      id="home"
      className="hero"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        {heroSlides.map((s, i) => (
          <div key={s.image} className={`hero-bg__slide${i === index ? ' is-active' : ''}`}>
            <img
              src={s.image}
              alt=""
              className="hero-bg__img"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className="hero-bg__grain" />
        <div className="hero-bg__scrim" />
      </div>

      <div className="hero-glow" ref={glowRef} aria-hidden="true" />

      <button
        type="button"
        className="hero-nav hero-nav--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <Icon name="arrow" size={20} />
      </button>
      <button
        type="button"
        className="hero-nav hero-nav--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        <Icon name="arrow" size={20} />
      </button>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__slide-text" key={index}>
            {slide.eyebrow && (
              <span className="hero__eyebrow" style={{ animationDelay: '0s' }}>
                <span className="hero__eyebrow-dot" />
                {slide.eyebrow}
              </span>
            )}
            {slide.kicker && (
              <p className="hero__kicker" style={{ animationDelay: '0.08s' }}>{slide.kicker}</p>
            )}
            <h1 className="hero__title">
              {splitWords(slide.title).map((word, i) => (
                <span className="hero__word-mask" key={`${word}-${i}`}>
                  <span
                    className="hero__word"
                    style={{ animationDelay: `${0.16 + i * 0.06}s` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            {slide.lead && (
              <p className="hero__lead" style={{ animationDelay: '0.5s' }}>{slide.lead}</p>
            )}
            {(slide.body || slide.highlight) && (
              <span className="hero__divider" style={{ animationDelay: '0.6s' }} />
            )}
            {slide.body && (
              <p className="hero__body" style={{ animationDelay: '0.66s' }}>{slide.body}</p>
            )}
            {slide.highlight && (
              <p className="hero__highlight" style={{ animationDelay: '0.72s' }}>{slide.highlight}</p>
            )}
          </div>

          <div className="hero__actions" data-aos="fade-up" data-aos-delay="400">
            <a href="#programs" className="btn btn-primary" ref={primaryBtnRef}>
              Explore Programs <Icon name="arrow" size={16} />
            </a>
            <a href="#about" className="btn btn-outline" ref={outlineBtnRef}>
              Learn More
            </a>
          </div>

          <div className="hero__stats" data-aos="fade-up" data-aos-delay="520">
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <Icon name={s.icon} size={18} color="var(--orange-light)" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {heroSlides.map((s, i) => (
          <button
            type="button"
            key={s.image}
            className={`hero-dots__dot${i === index ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === index && !paused && <span key={index} className="hero-dots__progress" />}
          </button>
        ))}
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-cue__track">
          <span className="hero-scroll-cue__dot" />
        </span>
        <span className="hero-scroll-cue__label">Scroll</span>
      </div>
    </section>
  );
}
