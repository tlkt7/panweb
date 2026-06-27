import { experienceContent } from '../content/experience';

export default function Experience() {
  return (
    <div style={{ width: '100%' }}>
      <style>{`
        .exp-placeholder { min-height: 60vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 80px 24px; background: linear-gradient(90deg, #c7c1be, #ffffff); }
        .exp-placeholder-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #9ca3af; margin-bottom: 16px; }
        .exp-placeholder-title { font-size: 18px; font-weight: 600; color: #6b7280; max-width: 480px; margin: 0 auto; }
      `}</style>
      <div className="exp-placeholder">
        <div>
          <div className="exp-placeholder-tag">{experienceContent.tag}</div>
          <p className="exp-placeholder-title">{experienceContent.title}</p>
        </div>
      </div>
    </div>
  );
}
