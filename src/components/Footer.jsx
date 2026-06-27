import { Link } from 'react-router-dom';
import { footerContent } from '../content/footer';

export default function Footer() {
  return (
    <footer className="ftr">
      <style>{`
        .ftr { background: #23232f; color: #fff; padding-top: 48px; }
        .ftr-inner { max-width: 1440px; margin: 0 auto; padding: 0 24px; }

        .ftr-grid { display: flex; flex-direction: column; gap: 32px; margin-bottom: 40px; }
        .ftr-brand-name { height: 64px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
        .ftr-brand-tag { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.6; margin-top: 8px; max-width: 260px; }

        .ftr-pages { display: grid; grid-template-columns: repeat(2, auto); gap: 14px 28px; }
        .ftr-pages a {
          font-size: 12px; font-weight: 500; letter-spacing: 0.03em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.15s;
        }
        .ftr-pages a:hover { color: #fff; }

        .ftr-bottom {
          border-top: 1px solid rgba(255,255,255,0.12);
          padding: 20px 0; display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .ftr-bottom span { font-size: 12px; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 6px; }
        .ftr-bottom-links { display: flex; gap: 28px; flex-wrap: wrap; }
        .ftr-bottom-links a { font-size: 12px; color: rgba(255,255,255,0.6); text-decoration: none; }
        .ftr-bottom-links a:hover { color: #fff; }

        @media(min-width: 1024px) {
          .ftr-inner { padding: 0 40px; }
          .ftr-grid { flex-direction: row; align-items: center; gap: 80px; }
          .ftr-pages { grid-template-columns: repeat(5, auto); max-width: 640px; }
        }
      `}</style>

      <div className="ftr-inner">
        <div className="ftr-grid">
          <div>
            <img className="ftr-brand-name" src="/images/Logo/ChatGPT Image 11 мая 2026 г., 14_49_17 (1).png" alt={footerContent.brand.name} />
            <div className="ftr-brand-tag">
              {footerContent.brand.taglineLines.map((line, i) => <div key={i}>{line}</div>)}
            </div>
          </div>

          <nav className="ftr-pages">
            {footerContent.pages.map((page) => (
              <Link key={page.path} to={page.path}>{page.label}</Link>
            ))}
          </nav>
        </div>

        <div className="ftr-bottom">
          <span>© 2026 Pangea PMG. Все права защищены</span>
          <div className="ftr-bottom-links">
            <a href="#">{footerContent.bottom.privacy}</a>
            <a href="#">{footerContent.bottom.terms}</a>
            <a href="#">{footerContent.bottom.contacts}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
