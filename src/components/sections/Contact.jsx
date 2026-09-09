import { useState } from 'react';
import { profile } from '../../data/profile';
import Icon from '../ui/Icons';
import { Reveal } from '../ui/SectionHeading';
import CanvasScene from '../three/CanvasScene';
import ContactScene from '../three/ContactScene';

const links = [
  { label: 'Email', value: profile.links.email, href: `mailto:${profile.links.email}`, icon: 'mail' },
  { label: 'LinkedIn', value: 'ullas-b-r-624a29294', href: profile.links.linkedin, icon: 'linkedin' },
  { label: 'GitHub', value: 'ullas9525', href: profile.links.github, icon: 'github' },
  { label: 'LeetCode', value: 'Ullas_9525', href: profile.links.leetcode, icon: 'leetcode' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all three fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('That email address looks off — mind checking it?');
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Hi Ullas,\n\n${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.links.email}?subject=${subject}&body=${body}`;
    setError('');
    setSent(true);
  };

  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="wrap">
        <div className="contact-stage">
          <div className="contact-canvas">
            <CanvasScene camera={{ position: [0, 0, 7], fov: 45 }}>
              <ContactScene />
            </CanvasScene>
          </div>

          <div className="contact-inner">
            <div>
              <Reveal y={14}>
                <span className="eyebrow">Ready when you are</span>
                <h2 className="contact-h2">Let's Build <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Something.</span></h2>
                <p className="contact-copy">
                  Internships, collaborations, freelance work, or just a solid technical conversation — my inbox is open.
                </p>
              </Reveal>

              <div className="contact-links">
                {links.map((l, i) => (
                  <Reveal key={l.label} delay={0.05 * i} y={14}>
                    <a className="contact-line" href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                      <Icon name={l.icon} size={18} />
                      <span>
                        <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{l.label}</strong>
                        <br />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{l.value}</span>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.1}>
              <form className="contact-form" onSubmit={onSubmit} aria-label="Contact form">
                <label htmlFor="cf-name">
                  Name
                  <input id="cf-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" autoComplete="name" required />
                </label>
                <label htmlFor="cf-email">
                  Email
                  <input id="cf-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
                </label>
                <label htmlFor="cf-message">
                  Message
                  <textarea id="cf-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about the project, role, or idea…" required />
                </label>
                {error && <p className="form-note" style={{ color: '#f87171' }}>{error}</p>}
                <button type="submit" className="btn btn-primary">
                  <Icon name="send" size={16} /> Send Message
                </button>
                {sent && (
                  <p className="form-success">
                    ✦ Opening your mail app with a ready-to-send message. Prefer email directly? {profile.links.email}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}