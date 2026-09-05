import { profile } from '../../data/profile';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';

const summary = [
  'Bachelor of Engineering (CSE) · P.E.S. College of Engineering, Mandya · 2027',
  'Full-stack web: Vite + React, Python FastAPI, PostgreSQL/SQLite',
  'Mobile: Flutter with Provider state management, Material 3, API & Firebase integration',
  'AI/ML: scikit-learn pipelines, Isolation Forest ensembles, LLM-powered apps',
  'IoT: Arduino, ESP32/ESP8266, Raspberry Pi, sensors, Bluetooth & Wi-Fi',
  '5+ end-to-end projects shipped · 225+ LeetCode problems solved',
];

export default function Resume() {
  return (
    <section className="section section-dim" id="resume" aria-label="Resume">
      <div className="wrap">
        <SectionHeading
          eyebrow="12 · Resume"
          title="The Short Version"
          sub="Everything worth knowing — compressed into one page. Grab the PDF or open it right here."
        />

        <div className="resume-wrap">
          <Reveal>
            <div className="glass resume-card">
              <h3>Snapshot</h3>
              <ul className="resume-list">
                {summary.map((s) => (
                  <li key={s}>
                    <Icon name="chevron" size={14} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass resume-cta">
              <h3>
                Want the <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>full résumé?</span>
              </h3>
              <p>One click. PDF, ready for any recruiter or application portal.</p>
              <div className="resume-buttons">
                <a className="btn btn-primary" href={profile.resumeUrl} download="Ullas_BR_Resume.pdf">
                  <Icon name="download" size={17} /> Download Resume
                </a>
                <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  <Icon name="external" size={15} /> Open in new tab
                </a>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>PDF · {profile.name.replace(' ', '_')}_Resume.pdf</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}