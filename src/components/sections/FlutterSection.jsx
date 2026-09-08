import { projects } from '../../data/projects';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import AppPhone from '../ui/AppPhone';

const feats = [
  { icon: 'phone', title: 'Flutter Apps', desc: 'Cross-platform mobile apps with buttery Material 3 UIs and responsive layouts.' },
  { icon: 'palette', title: 'UI Work', desc: 'Custom widgets, dark themes, gestures and pixel-perfect screens built from scratch.' },
  { icon: 'api', title: 'API Integration', desc: 'Connecting apps to REST/FastAPI backends and AI endpoints (Groq, Nvidia, OpenRouter).' },
  { icon: 'cloud', title: 'Firebase', desc: 'Auth, Firestore and cloud sync woven into the app layer when products need it.' },
  { icon: 'layers', title: 'Architecture', desc: 'Provider for state management, clean feature-first folders, and test-friendly structure.' },
  { icon: 'rocket', title: 'Deployment', desc: 'Release builds, versioning, GitHub Releases and app-store-style packaging.' },
];

const appProjects = projects.filter((p) => p.type.startsWith('Flutter') || p.type.includes('IoT'));

export default function FlutterSection() {
  return (
    <section className="section section-dim" id="apps" aria-label="Flutter and app development">
      <div className="wrap">
        <SectionHeading
          eyebrow="04 · App Development"
          title="Flutter, In My Hands"
          sub="A dedicated app layer — from state management to AI-powered features — shipped as real, downloadable apps."
        />

        <div className="app-grid">
          <Reveal>
            <div className="app-stage">
              <AppPhone />
            </div>
          </Reveal>

          <div>
            <div className="app-feats">
              {feats.map((f, i) => (
                <Reveal key={f.title} delay={0.04 * i} y={18}>
                  <div className="app-feat">
                    <Icon name={f.icon} size={22} />
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="app-projects">
              {appProjects.map((p) => (
                <a key={p.id} className="app-proj" href={p.github} target="_blank" rel="noreferrer">
                  <Icon name="github" size={16} />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}>{p.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.78rem' }}>{p.type}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}