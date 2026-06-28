import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { homeContent } from '../content/home';

const services = [
  { id: 'resourceEvaluation', path: '/resource-evaluation', borderColor: '#7c3aed' },
  { id: 'laboratory',         path: '/laboratory',          borderColor: '#ea580c' },
  { id: 'minePlanning',       path: '/mine-planning',       borderColor: '#7c3aed' },
  { id: 'environmental',      path: '/environmental',       borderColor: '#ea580c' },
  { id: 'projectDesign',      path: '/project-design',      borderColor: '#7c3aed' },
  { id: 'permits',            path: '/permits',             borderColor: '#ea580c' },
  { id: 'commissioning',      path: '/commissioning',       borderColor: '#7c3aed' },
];

function ServicesCarousel() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActive(Number(mostVisible.target.dataset.index));
      },
      { root: track, threshold: 0.6 }
    );

    cardRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (i) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const step = (dir) => {
    scrollToIndex(Math.max(0, Math.min(services.length - 1, active + dir)));
  };

  return (
    <>
      <div className="svc-carousel">
        <button type="button" className="svc-arrow" onClick={() => step(-1)} disabled={active === 0} aria-label="prev">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M8 1L1 8l7 7" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>

        <div className="svc-track" ref={trackRef}>
          {services.map((svc, i) => (
            <Link
              key={svc.path}
              to={svc.path}
              className="svc-card"
              ref={(node) => { cardRefs.current[i] = node; if (node) node.dataset.index = i; }}
            >
              <h3 className="svc-card-title">{homeContent.services[svc.id]}</h3>
              <div className="svc-card-link" style={{ color: svc.borderColor }}>
                {homeContent.servicesCta}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <button type="button" className="svc-arrow" onClick={() => step(1)} disabled={active === services.length - 1} aria-label="next">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
      </div>

      <div className="svc-dots">
        {services.map((svc, i) => (
          <button
            key={svc.path}
            type="button"
            className={`svc-dot${active === i ? ' is-active' : ''}`}
            onClick={() => scrollToIndex(i)}
            aria-label={homeContent.services[svc.id]}
          />
        ))}
      </div>
    </>
  );
}

export default function HomeIntro() {
  const heroBlockRef = useRef(null);
  const [exitProgress, setExitProgress] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId;

    const updateTarget = () => {
      target = Math.max(0, Math.min(1, window.scrollY / 600));
    };

    const tick = () => {
      current += (target - current) * 0.15;
      if (Math.abs(target - current) < 0.001) current = target;
      setExitProgress(current);
      rafId = requestAnimationFrame(tick);
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', updateTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        .home-hero {
          position: relative; min-height: calc(100svh - 72px); overflow: hidden;
          display: flex; align-items: flex-start;
          background: linear-gradient(180deg, #c8c0b8 0%, #d4cdc5 40%, #e0d9d1 100%);
        }
        .home-hero-bg {
          position: absolute; left: 50%; bottom: 0; width: auto; height: 38vh; max-width: none;
          transform: translateX(-50%);
          display: block; opacity: 0.85;
        }
        .home-hero-reflection {
          display: none;
          position: relative; width: 100%; line-height: 0;
          background: linear-gradient(180deg,#d8d0c8 0%,#e8e2db 100%);
        }
        .home-hero-reflection img {
          display: block; width: 100%; height: auto;
        }
        .home-hero-text {
          position: relative; z-index: 1;
          padding: 38vh 24px 0; width: 100%;
        }
        .home-hero-h1 {
          font-size: 15px; font-weight: 800; line-height: 1.18; text-transform: uppercase; margin: 0 0 14px;
          background-image: linear-gradient(90deg, #3a206d, #ff724d);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .home-hero-h1-line { display: block; }
        .home-hero-sub {
          font-size: 12px; line-height: 1.7; margin-bottom: 24px; max-width: 540px;
          background-image: linear-gradient(90deg, #3a206d, #ff724d);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .home-cta {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1px solid #ff724d; padding: 10px 20px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #ff724d; text-decoration: none;
          background: transparent; cursor: pointer;
        }
        .home-cta-label {
          background-image: linear-gradient(90deg, #3a206d, #ff724d);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        /* Services section */
        .home-cards { background: linear-gradient(90deg, #c7c1be, #ffffff); padding: 48px 0 60px; }
        .home-cards-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

        .svc-carousel { display: flex; align-items: center; gap: 10px; }
        .svc-track {
          flex: 1; display: flex; gap: 16px; overflow-x: auto;
          scroll-snap-type: x mandatory; padding-bottom: 4px; scrollbar-width: none;
        }
        .svc-track::-webkit-scrollbar { display: none; }
        .svc-card {
          flex: 0 0 80%; scroll-snap-align: start;
          border-radius: 12px; padding: 24px;
          display: flex; flex-direction: column; justify-content: space-between;
          min-height: 140px; text-decoration: none;
          border: 1.5px solid transparent;
          background: linear-gradient(90deg, #c7c1be, #ffffff) padding-box, linear-gradient(90deg, #3a206d, #ff724d) border-box;
          transition: filter 0.2s;
        }
        .svc-card:hover { filter: brightness(1.04); }
        .svc-card-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #1a1a1a; line-height: 1.3; margin: 0; }
        .svc-card-link { font-size: 11px; font-weight: 600; margin-top: 20px; display: flex; align-items: center; gap: 6px; }

        .svc-arrow {
          flex-shrink: 0; width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid #c9c1b6; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #4a3728;
        }
        .svc-arrow:disabled { opacity: 0.3; cursor: default; }

        .svc-dots { display: flex; justify-content: center; gap: 6px; margin-top: 20px; }
        .svc-dot { width: 7px; height: 7px; border-radius: 50%; border: none; background: #c9c1b6; padding: 0; cursor: pointer; transition: width 0.25s, background 0.25s; }
        .svc-dot.is-active { background: #c75a1a; width: 20px; border-radius: 4px; }

        @media(min-width:768px) {
          .home-hero { min-height: 78svh; }
          .home-hero-bg { left: 0; width: 100%; height: auto; max-width: 100%; transform: none; }
          .home-hero-reflection { display: block; }
          .home-hero-text { padding: 31vh 60px 0; max-width: 820px; }
          .home-hero-h1 { font-size: 32px; }
          .home-cards-inner { padding: 0 40px; }
          .svc-card { flex: 0 0 calc((100% - 2 * 20px) / 3); }
          .svc-track { gap: 20px; }
        }
        @media(min-width:1200px) {
          .home-hero-h1 { font-size: 38px; }
          .svc-card { flex: 0 0 calc((100% - 3 * 20px) / 4); }
        }
      `}</style>

      {/* Hero + reflection, blurring into our gradient as it scrolls away */}
      <div ref={heroBlockRef} style={{ position: 'relative' }}>
        <section className="home-hero">
          <img src="/images/Hero/559757 (1).png" className="home-hero-bg" alt="Landscape" />
          <div className="home-hero-text">
            <h1 className="home-hero-h1">
              {homeContent.hero.titleLines.map((line, i) => (
                <span key={i} className="home-hero-h1-line">{line}</span>
              ))}
            </h1>
            <p className="home-hero-sub">{homeContent.hero.subtitle}</p>
            <Link to="/resource-evaluation" className="home-cta">
              <span className="home-cta-label">{homeContent.hero.cta}</span>
              <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                <path d="M0 5h22M17 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Reflection of hero background, mirrored */}
        <div className="home-hero-reflection">
          <img src="/images/Hero/559 (1) reverse.png" alt="" aria-hidden="true" />
        </div>

        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #c7c1be, #ffffff)',
          opacity: exitProgress,
        }} />
      </div>

      {/* Services carousel */}
      <section className="home-cards">
        <div className="home-cards-inner">
          <ServicesCarousel />
        </div>
      </section>
    </div>
  );
}
