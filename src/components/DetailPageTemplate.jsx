import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FlowingLine from './FlowingLine';

function Bullet({ b }) {
  if (typeof b === 'string') {
    return <li><span className="dpt-dot" />{b}</li>;
  }
  return (
    <li className="dpt-bullet-row">
      <span className="dpt-dot" />
      <span className="dpt-bullet-label">{b.text}</span>
      {b.days && <span className="dpt-bullet-days">{b.days}</span>}
    </li>
  );
}

function Item({ item, accentColor, index, activeIndex, visibleItems, itemRef }) {
  const classes = [
    'dpt-item',
    visibleItems.includes(index) ? 'is-visible' : '',
    activeIndex === index ? 'is-active' : '',
  ].filter(Boolean).join(' ');

  const numLabelLines = Array.isArray(item.numLabel) ? item.numLabel : item.numLabel ? [item.numLabel] : [];

  return (
    <div ref={itemRef} id={`dpt-item-${item.num}`} className={classes} style={{ '--dpt-accent': accentColor }}>
      <div>
        <div className="dpt-num">{item.num}</div>
        {numLabelLines.length > 0 && (
          <div className={`dpt-num-label${item.numLabelLarge ? ' large' : ''}`}>
            {numLabelLines.map((line, li) => <span key={li}>{line}</span>)}
          </div>
        )}
      </div>
      <div>
        <div className="dpt-title-row">
          <h3 className="dpt-title">{item.title}</h3>
          {item.duration && <span className="dpt-duration">{item.duration}</span>}
        </div>
        {item.accent && (
          <blockquote
            className="dpt-accent"
            style={item.accentColor ? { borderColor: item.accentColor, color: item.accentColor } : undefined}
          >
            {item.accent}
          </blockquote>
        )}
        {item.subtitle && <p className="dpt-sub">{item.subtitle}</p>}
        {item.text && (
          Array.isArray(item.text)
            ? item.text.map((t, i) => <p key={i} className="dpt-text">{t}</p>)
            : <p className="dpt-text">{item.text}</p>
        )}
        {item.bullets?.length > 0 && (
          <ul className="dpt-bullets">
            {item.bullets.map((b, i) => <Bullet key={i} b={b} />)}
          </ul>
        )}
        {item.callout && (
          <div className="dpt-callout">
            {item.callout.heading && <div className="dpt-callout-h">{item.callout.heading}</div>}
            <p className="dpt-callout-text">{item.callout.text}</p>
          </div>
        )}
        {item.cards?.length > 0 && (
          <div className="dpt-cards">
            {item.cards.map((card, ci) => (
              <div key={ci} className={`dpt-card${card.fullWidth ? ' full' : ''}`}>
                <div className="dpt-card-h">{card.title}</div>
                <p className="dpt-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        )}
        {item.sections?.map((sec, si) => (
          <div key={si} className={`dpt-subsection${sec.badge || sec.divider ? ' has-badge' : ''}`}>
            {sec.badge && (
              <span className="dpt-badge" style={{ borderColor: sec.badge.color, color: sec.badge.color }}>
                {sec.badge.label}
              </span>
            )}
            {sec.heading && <h4 className="dpt-subsection-h">{sec.heading}</h4>}
            {sec.subtitle && <p className="dpt-sub">{sec.subtitle}</p>}
            {sec.text && <p className="dpt-text">{sec.text}</p>}
            {sec.callout && (
              <div className="dpt-callout">
                {sec.callout.heading && <div className="dpt-callout-h">{sec.callout.heading}</div>}
                <p className="dpt-callout-text">{sec.callout.text}</p>
              </div>
            )}
            {sec.bullets?.length > 0 && (
              <ul className="dpt-bullets">
                {sec.bullets.map((b, bi) => <Bullet key={bi} b={b} />)}
              </ul>
            )}
            {sec.note && <p className="dpt-note">{sec.note}</p>}
            {sec.subsections?.map((sub, subi) => (
              <div key={subi} className="dpt-subsection-sub">
                {sub.heading && <h5 className="dpt-subsection-sub-h">{sub.heading}</h5>}
                {sub.text && <p className="dpt-text">{sub.text}</p>}
                {sub.bullets?.length > 0 && (
                  <ul className="dpt-bullets">
                    {sub.bullets.map((b, bi) => <Bullet key={bi} b={b} />)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DetailPageTemplate({
  heroImage,
  heroWatermark,
  heroTitleParts,
  heroTitleLines,
  heroTitleGradient,
  heroSubtitle,
  heroCredit,
  heroCreditGradient,
  heroAlign = 'center',
  accentColor = '#92400e',
  items,
  whyItMatters,
  overviewButton,
  letterNav,
}) {
  const titleLines = heroTitleLines || [heroTitleParts];
  const accentGradient = heroTitleGradient || `linear-gradient(90deg, ${accentColor}, ${accentColor})`;
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(() => (
    typeof window !== 'undefined' && 'IntersectionObserver' in window ? [] : items.map((_, i) => i)
  ));

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            const index = Number(entry.target.dataset.index);
            if (entry.isIntersecting) next.add(index);
          });
          return [...next].sort((a, b) => a - b);
        });

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            index: Number(entry.target.dataset.index),
            distance: Math.abs(entry.boundingClientRect.top + entry.boundingClientRect.height / 2 - window.innerHeight / 2),
          }))
          .sort((a, b) => a.distance - b.distance);

        if (visibleEntries.length > 0) setActiveIndex(visibleEntries[0].index);
      },
      { root: null, rootMargin: '-32% 0px -32% 0px', threshold: [0.18, 0.35, 0.6] }
    );

    itemRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  const textAlignDesktop = heroAlign === 'right' ? 'right' : heroAlign === 'center' ? 'center' : 'left';

  return (
    <div style={{ width: '100%', '--dpt-gradient': accentGradient }}>
      <style>{`
        .dpt-hero { position: relative; min-height: 80vh; overflow: hidden; background: linear-gradient(135deg,#e6e1da,#d3ccc2); display: flex; align-items: center; }
        .dpt-hero-img { width: 100%; height: 100%; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .dpt-hero-img img { width: 60%; max-width: 480px; object-fit: contain; filter: drop-shadow(0 24px 50px rgba(0,0,0,0.18)); }
        .dpt-hero-text { position: relative; z-index: 1; width: 100%; padding: 310px 24px 40px; text-align: center; }
        .dpt-watermark { font-size: 28px; font-weight: 800; letter-spacing: 0.04em; color: rgba(120,160,160,0.28); text-transform: uppercase; margin: 0 0 4px; }
        .dpt-hero-title { font-size: 22px; font-weight: 800; text-transform: uppercase; line-height: 1.2; margin: 0 0 14px; }
        .dpt-hero-title-line { display: block; }
        .dpt-hero-sub { font-size: 12px; color: #6C7C83; line-height: 1.7; max-width: 460px; margin: 0 auto; }
        .dpt-hero-credit { font-size: 12px; font-weight: 700; margin: 14px auto 0; max-width: 460px; }
        .dpt-hero-credit span:not(:last-child)::after { content: ' '; }

        .dpt-body { position: relative; background: linear-gradient(90deg, #c7c1be, #ffffff); overflow: hidden; }
        .dpt-line-wrap { position: absolute; left: 0; top: 0; bottom: 0; width: 420px; opacity: 0.5; }
        .dpt-wrap { position: relative; z-index: 1; max-width: 1320px; margin: 0 auto; padding: 40px 24px 60px; }

        .dpt-item { position: relative; display: flex; flex-direction: column; gap: 10px; padding: 30px 0 30px 18px; border-top: 1px solid #e5e7eb; }
        .dpt-item:first-child { border-top: none; }
        .dpt-item::before {
          content: ''; position: absolute; left: 0; top: 24px; bottom: 24px; width: 3px;
          border-radius: 999px; background: #d1d5db;
        }
        .dpt-num { font-size: 48px; font-weight: 300; color: #d8d4cf; line-height: 1; }
        .dpt-num-label { margin-top: 6px; font-size: 13px; font-weight: 600; color: #6b7280; line-height: 1.4; }
        .dpt-num-label span { display: block; }
        .dpt-num-label span:nth-child(2) { font-size: 11px; font-weight: 500; color: #9ca3af; }
        .dpt-num-label.large { font-size: 22px; font-weight: 700; color: #161616; }
        .dpt-callout { margin-bottom: 14px; }
        .dpt-callout-h { font-size: 12px; font-weight: 700; color: #8783c2; margin-bottom: 4px; }
        .dpt-callout-text { font-size: 12px; color: #9491c4; line-height: 1.75; margin: 0; }
        .dpt-cards { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 8px; }
        .dpt-card { border: 1px solid; border-image-source: var(--dpt-gradient); border-image-slice: 1; padding: 12px 16px; }
        .dpt-card-h { font-size: 12px; font-weight: 700; color: #161616; margin-bottom: 4px; }
        .dpt-card-text { font-size: 11px; color: #4b5563; line-height: 1.6; margin: 0; }
        .dpt-letter-nav { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end; margin-bottom: 24px; }
        .dpt-letter-pill {
          display: flex; flex-direction: column; align-items: center; gap: 2px; border: 1px solid;
          border-image-source: var(--dpt-gradient); border-image-slice: 1;
          padding: 8px 18px; min-width: 76px; text-decoration: none;
        }
        .dpt-letter-pill-num { font-size: 18px; font-weight: 700; color: #161616; }
        .dpt-letter-pill-label { font-size: 9px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.04em; }
        .dpt-title-row { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .dpt-title {
          display: inline; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.4; color: var(--dpt-accent); margin: 0 0 8px;
          background-image: linear-gradient(transparent 58%, color-mix(in srgb, var(--dpt-accent) 16%, transparent) 58%);
          background-size: 0% 100%; background-repeat: no-repeat;
        }
        .dpt-duration { flex-shrink: 0; font-size: 11px; color: #9ca3af; white-space: nowrap; }
        .dpt-accent { border-left: 2px solid var(--dpt-accent); padding-left: 12px; font-size: 12px; font-style: italic; color: var(--dpt-accent); line-height: 1.6; margin-bottom: 12px; }
        .dpt-sub { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #374151; margin-bottom: 10px; }
        .dpt-text { font-size: 12px; color: #4b5563; line-height: 1.75; margin-bottom: 12px; }
        .dpt-bullets { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 5px; }
        .dpt-bullets li { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #4b5563; line-height: 1.6; }
        .dpt-bullet-row { justify-content: space-between; }
        .dpt-bullet-label { flex: 1; }
        .dpt-bullet-days { flex-shrink: 0; color: #9ca3af; white-space: nowrap; }
        .dpt-dot { margin-top: 7px; width: 4px; height: 4px; border-radius: 50%; background: #9ca3af; flex-shrink: 0; }
        .dpt-subsection { margin: 14px 0; }
        .dpt-subsection.has-badge { margin: 16px 0; padding-top: 14px; border-top: 1px solid #ececec; }
        .dpt-subsection-h { font-size: 12px; font-weight: 700; color: #161616; margin-bottom: 8px; }
        .dpt-note { font-size: 11px; font-style: italic; color: #9ca3af; margin: -4px 0 12px; }
        .dpt-badge {
          display: inline-flex; align-items: center; border-radius: 999px; border: 1px solid;
          padding: 2px 12px; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 8px;
        }
        .dpt-subsection-sub { margin: 10px 0; padding-left: 12px; border-left: 2px solid #e5e7eb; }
        .dpt-subsection-sub-h { font-size: 11px; font-weight: 700; color: #374151; margin-bottom: 6px; }

        .dpt-overview-wrap { display: flex; justify-content: flex-end; margin-bottom: 8px; }
        .dpt-overview-btn {
          display: inline-flex; align-items: center; gap: 8px; background: none; cursor: pointer;
          border: 1px solid #ef4444; color: #ef4444; font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 8px 16px; text-decoration: none;
        }

        .dpt-phase {
          display: inline-flex; align-items: center; border-radius: 999px;
          border: 1px solid transparent;
          background: linear-gradient(90deg, #c7c1be, #ffffff) padding-box, var(--dpt-gradient) border-box;
          padding: 4px 16px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          margin: 28px 0 4px 18px;
        }
        .dpt-phase-label {
          background-image: var(--dpt-gradient); -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .dpt-wim { margin-top: 48px; display: flex; align-items: center; gap: 24px; }
        .dpt-wim.reverse { flex-direction: row-reverse; justify-content: space-between; }
        .dpt-wim-circle { width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0; background-image: radial-gradient(circle, #38bdf8 1.4px, transparent 1.6px); background-size: 5px 5px; opacity: 0.85; }
        .dpt-wim-tag { font-size: 13px; font-weight: 800; color: #111; margin-bottom: 6px; }
        .dpt-wim-tag-line { display: block; }
        .dpt-wim-text { font-size: 11px; color: #4b5563; line-height: 1.7; text-transform: uppercase; letter-spacing: 0.02em; max-width: 640px; }

        @media(min-width: 768px) {
          .dpt-hero { min-height: 80vh; }
          .dpt-hero-img { justify-content: flex-start; }
          .dpt-hero-img img { width: 42%; margin-left: 4%; }
          .dpt-hero-text { padding: 0 64px; text-align: ${textAlignDesktop}; ${heroAlign === 'right' ? 'margin-left: auto;' : 'margin-left: 48%;'} max-width: 600px; }
          .dpt-watermark { font-size: 52px; }
          .dpt-hero-title { font-size: 34px; }
          .dpt-hero-sub { margin: 0; ${heroAlign === 'right' ? 'margin-left: auto;' : heroAlign === 'center' ? 'margin: 0 auto;' : ''} }

          .dpt-wrap { padding: 56px 40px 80px 460px; }
          .dpt-item { display: grid; grid-template-columns: 120px 1fr; gap: 0 32px; padding: 48px 0 48px 24px; }
          .dpt-num { font-size: 80px; transition: color 480ms ease, transform 480ms ease; }

          .dpt-item {
            opacity: 0.48; transform: translateY(24px);
            transition: opacity 480ms ease, transform 480ms ease, border-color 480ms ease;
          }
          .dpt-item::before {
            transform: scaleY(0.3); transform-origin: top; opacity: 0;
            transition: transform 480ms ease, opacity 480ms ease, background 480ms ease;
          }
          .dpt-title { transition: background-size 480ms ease, color 480ms ease; }
          .dpt-item.is-visible { opacity: 0.82; transform: translateY(0); }
          .dpt-item.is-active { opacity: 1; }
          .dpt-item.is-active::before { background: var(--dpt-accent); opacity: 1; transform: scaleY(1); }
          .dpt-item.is-active .dpt-num { color: color-mix(in srgb, var(--dpt-accent) 28%, #e5e7eb); transform: translateX(4px); }
          .dpt-item.is-active .dpt-title { background-size: 100% 100%; }
          .dpt-cards { grid-template-columns: repeat(3, 1fr); }
          .dpt-card.full { grid-column: 1 / -1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dpt-item { transition: none; transform: none; }
          .dpt-item::before { transition: none; }
          .dpt-title { transition: none; }
        }
      `}</style>

      <section className="dpt-hero">
        <div className="dpt-hero-img">
          <img src={heroImage} alt="" />
        </div>
        <div className="dpt-hero-text">
          {heroWatermark && <div className="dpt-watermark">{heroWatermark}</div>}
          <h1
            className="dpt-hero-title"
            style={heroTitleGradient ? {
              backgroundImage: heroTitleGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            } : undefined}
          >
            {titleLines.map((line, li) => (
              <span key={li} className="dpt-hero-title-line">
                {line.map((part, i) => (
                  <span key={i} style={heroTitleGradient ? undefined : { color: part.color }}>{part.text}</span>
                ))}
              </span>
            ))}
          </h1>
          <p className="dpt-hero-sub">{heroSubtitle}</p>
          {heroCredit && (
            <p
              className="dpt-hero-credit"
              style={heroCreditGradient ? {
                backgroundImage: heroCreditGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              } : undefined}
            >
              {heroCredit.map((part, i) => (
                <span key={i} style={heroCreditGradient ? undefined : { color: part.color }}>{part.text}</span>
              ))}
            </p>
          )}
        </div>
      </section>

      <div className="dpt-body">
        <div className="dpt-line-wrap"><FlowingLine /></div>

        <div className="dpt-wrap">
          {letterNav?.length > 0 && (
            <div className="dpt-letter-nav">
              {letterNav.map((entry, i) => (
                <a key={i} className="dpt-letter-pill" href={`#dpt-item-${entry.letter}`}>
                  <span className="dpt-letter-pill-num">{entry.letter}</span>
                  <span className="dpt-letter-pill-label">{entry.label}</span>
                </a>
              ))}
            </div>
          )}
          {overviewButton && (
            <div className="dpt-overview-wrap">
              {overviewButton.path ? (
                <Link className="dpt-overview-btn" to={overviewButton.path}>
                  {overviewButton.label}
                  <svg width="14" height="9" viewBox="0 0 16 10" fill="none">
                    <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              ) : (
                <button className="dpt-overview-btn" type="button">
                  {overviewButton.label}
                  <svg width="14" height="9" viewBox="0 0 16 10" fill="none">
                    <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              )}
            </div>
          )}
          {items.map((item, i) => (
            <Fragment key={item.num}>
              {item.phase && item.phase.label !== items[i - 1]?.phase?.label && (
                <div className="dpt-phase">
                  <span className="dpt-phase-label">{item.phase.label}</span>
                </div>
              )}
              <Item
                item={item}
                accentColor={accentColor}
                index={i}
                activeIndex={activeIndex}
                visibleItems={visibleItems}
                itemRef={(node) => {
                  itemRefs.current[i] = node;
                  if (node) node.dataset.index = i;
                }}
              />
            </Fragment>
          ))}

          {whyItMatters && (
            <div className={`dpt-wim${whyItMatters.circlePosition === 'right' ? ' reverse' : ''}`}>
              <div className="dpt-wim-circle" />
              <div>
                {(whyItMatters.tagLines || whyItMatters.tag) && (
                  <div className="dpt-wim-tag">
                    {whyItMatters.tagLines
                      ? whyItMatters.tagLines.map((line, i) => (
                          <span key={i} className="dpt-wim-tag-line" style={{ color: line.color }}>{line.text}</span>
                        ))
                      : whyItMatters.tag}
                  </div>
                )}
                <div className="dpt-wim-text">{whyItMatters.text}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
