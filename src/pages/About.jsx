import { Link } from 'react-router-dom';
import FlowingLine from '../components/FlowingLine';
import HomeIntro from '../components/HomeIntro';
import { aboutContent } from '../content/about';

const ICONS = {
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.3-4.3" />
    </svg>
  ),
  link: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 15l6-6M10 6l1-1a3.5 3.5 0 015 5l-1 1M14 18l-1 1a3.5 3.5 0 01-5-5l1-1" />
    </svg>
  ),
  precision: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" />
    </svg>
  ),
};

export default function About() {
  return (
    <div style={{ width: '100%' }}>
      <style>{`
        .about-strip {
          height: 170px;
          background: linear-gradient(100deg, #c8c0b8 0%, #d9d3cb 45%, #f3f1ee 100%);
        }
        .about-body { position: relative; background: linear-gradient(90deg, #c7c1be, #ffffff); overflow: hidden; }
        .about-wrap { position: relative; z-index: 1; max-width: 1320px; margin: 0 auto; padding: 56px 24px 80px; }

        .about-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #2563eb; margin-bottom: 16px; }
        .about-title { font-size: 24px; font-weight: 800; color: #161616; line-height: 1.25; margin: 0 0 24px; max-width: 720px; }
        .about-intro { border-left: 3px solid #2563eb; padding-left: 18px; font-size: 14px; color: #374151; line-height: 1.8; max-width: 680px; margin-bottom: 48px; }

        .about-section-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #2563eb; margin-bottom: 16px; }
        .about-p { font-size: 13px; color: #4b5563; line-height: 1.85; max-width: 760px; margin-bottom: 16px; }

        .about-foundations { margin-top: 56px; display: grid; grid-template-columns: 1fr; gap: 20px; }
        .about-foundation { border-top: 3px solid; padding-top: 18px; }
        .about-foundation-num { font-size: 13px; font-weight: 700; color: #9ca3af; margin-bottom: 8px; }
        .about-foundation-title { font-size: 14px; font-weight: 700; color: #161616; margin-bottom: 8px; }
        .about-foundation-text { font-size: 12px; color: #6b7280; line-height: 1.7; }

        .about-quote { margin-top: 64px; border-left: 3px solid #2563eb; padding-left: 18px; font-size: 15px; font-style: italic; color: #374151; line-height: 1.8; max-width: 760px; }
        .about-quote-author { margin-top: 12px; font-size: 12px; font-weight: 700; color: #111; font-style: normal; }

        .about-grid { display: grid; grid-template-columns: 1fr; gap: 28px 40px; margin-top: 16px; }
        .about-card { border-left: 2px solid; padding-left: 16px; display: block; text-decoration: none; }
        .about-card-title { font-size: 13px; font-weight: 700; color: #161616; margin-bottom: 6px; }
        .about-card-text { font-size: 12px; color: #6b7280; line-height: 1.7; }

        .about-principles { margin-top: 16px; display: grid; grid-template-columns: 1fr; gap: 28px; }
        .about-principle-icon { color: #2563eb; margin-bottom: 10px; }
        .about-principle-title { font-size: 13px; font-weight: 700; color: #161616; margin-bottom: 6px; }
        .about-principle-text { font-size: 12px; color: #6b7280; line-height: 1.7; }

        .about-line-wrap { position: absolute; left: 0; top: 0; bottom: 0; width: 420px; opacity: 0.5; }

        @media(min-width: 768px) {
          .about-strip { height: 200px; }
          .about-wrap { padding: 80px 40px 100px 460px; }
          .about-title { font-size: 32px; }
          .about-foundations { grid-template-columns: repeat(3, 1fr); gap: 28px; }
          .about-grid { grid-template-columns: repeat(2, 1fr); }
          .about-principles { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      <HomeIntro />

      <div className="about-strip" />

      <div className="about-body">
        <div className="about-line-wrap">
          <FlowingLine />
        </div>

        <div className="about-wrap">
          <div className="about-tag">{aboutContent.tag}</div>
          <h1 className="about-title">{aboutContent.title}</h1>
          {aboutContent.overviewParagraphs.map((p, i) => (
            <p key={i} className="about-p">{p}</p>
          ))}
          <p className="about-intro">{aboutContent.intro}</p>

          <div className="about-section-tag">{aboutContent.whoWeAreTag}</div>
          {aboutContent.whoWeAreParagraphs.map((p, i) => (
            <p key={i} className="about-p">{p}</p>
          ))}

          <div className="about-section-tag" style={{ marginTop: 40 }}>{aboutContent.foundationsTag}</div>
          <div className="about-foundations">
            {aboutContent.foundations.map((item) => (
              <div key={item.num} className="about-foundation" style={{ borderColor: item.color }}>
                <div className="about-foundation-num">{item.num}</div>
                <div className="about-foundation-title">{item.title}</div>
                <div className="about-foundation-text">{item.text}</div>
              </div>
            ))}
          </div>

          <div className="about-quote">
            {aboutContent.quote}
            <div className="about-quote-author">{aboutContent.quoteAuthor}</div>
          </div>

          <div className="about-section-tag" style={{ marginTop: 56 }}>{aboutContent.whatWeDoTag}</div>
          <p className="about-p">{aboutContent.whatWeDoIntro}</p>

          <div className="about-grid">
            {aboutContent.services.map((svc) => (
              <Link key={svc.path} to={svc.path} className="about-card" style={{ borderColor: svc.color }}>
                <div className="about-card-title">{svc.title}</div>
                <div className="about-card-text">{svc.text}</div>
              </Link>
            ))}
          </div>

          <Link
            to={aboutContent.epcm.path}
            className="about-card"
            style={{ borderColor: aboutContent.epcm.color, marginTop: 28 }}
          >
            <div className="about-card-title">{aboutContent.epcm.title}</div>
            <div className="about-card-text">{aboutContent.epcm.text}</div>
          </Link>

          <div className="about-section-tag" style={{ marginTop: 56 }}>{aboutContent.principlesTag}</div>
          <div className="about-principles">
            {aboutContent.principles.map((p) => (
              <div key={p.title}>
                <div className="about-principle-icon">{ICONS[p.icon]}</div>
                <div className="about-principle-title">{p.title}</div>
                <div className="about-principle-text">{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
