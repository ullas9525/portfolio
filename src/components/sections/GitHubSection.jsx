import { githubData } from '../../data/achievements';
import { profile } from '../../data/profile';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';

export default function GitHubSection() {
  return (
    <section className="section section-dim" id="github" aria-label="GitHub">
      <div className="wrap">
        <SectionHeading
          eyebrow="08 · GitHub"
          title="Open Work, Visible Progress"
          sub="A snapshot of my GitHub — swap the static snapshot for the live GitHub API at any time by calling your username."
        />

        <div className="gh-grid">
          <Reveal>
            <div className="glass gh-profile">
              <div className="gh-profile-top">
                <span className="gh-avatar">UB</span>
                <div>
                  <h3>{profile.name}</h3>
                  <span className="gh-handle">@{githubData.username}</span>
                </div>
              </div>
              <a className="btn btn-ghost btn-sm" href={githubData.profileUrl} target="_blank" rel="noreferrer" style={{ marginBottom: 18 }}>
                <Icon name="github" size={15} /> github.com/{githubData.username}
              </a>
              <div className="gh-stats">
                <div className="gh-stat">
                  <b>{githubData.stats.repos}+</b>
                  <span>Repositories</span>
                </div>
                <div className="gh-stat">
                  <b>{githubData.stats.stars}+</b>
                  <span>Stars earned</span>
                </div>
                <div className="gh-stat">
                  <b>{githubData.stats.followers}+</b>
                  <span>Followers</span>
                </div>
                <div className="gh-stat">
                  <b style={{ fontSize: '0.95rem' }}>{githubData.stats.contributions}</b>
                  <span>Contributions</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <div className="gh-repos">
              {githubData.spotlight.map((r, i) => (
                <Reveal key={r.name} delay={0.05 * (i % 2)} y={16}>
                  <a className="gh-repo" href={r.url} target="_blank" rel="noreferrer">
                    <h4>
                      <Icon name="github" size={14} /> {r.name}
                      {r.star && <Icon name="star" size={13} style={{ color: '#fbbf24' }} />}
                    </h4>
                    <p>{r.desc}</p>
                    <span className="lang">{r.lang}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}