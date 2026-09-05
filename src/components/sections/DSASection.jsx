import { leetcode } from '../../data/leetcode';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal, CountUp } from '../ui/SectionHeading';
import { formatNumber } from '../../utils/helpers';
import CanvasScene from '../three/CanvasScene';
import DSAScene from '../three/DSAScene';

export default function DSASection() {
  return (
    <section className="section" id="dsa" aria-label="Problem solving and DSA">
      <div className="wrap">
        <SectionHeading
          eyebrow="07 · Problem Solving"
          title="Daily Reps, Real Growth"
          sub="A futuristic coding terminal for a problem journey — arrays to dynamic programming, one streak at a time."
        />

        <div className="dsa-wrap">
          <Reveal>
            <div className="dsa-stage">
              <CanvasScene camera={{ position: [0, 0.2, 5.6], fov: 50 }}>
                <DSAScene />
              </CanvasScene>
            </div>
          </Reveal>

          <div>
            <div className="dsa-stats">
              <div className="dsa-stat">
                <CountUp end={leetcode.solved} format={(n) => `${formatNumber(n)}+`} />
                <span>Solved</span>
              </div>
              <div className="dsa-stat">
                <CountUp end={leetcode.easy} format={(n) => `${formatNumber(n)}+`} />
                <span>Easy</span>
              </div>
              <div className="dsa-stat">
                <CountUp end={leetcode.medium} format={(n) => `${formatNumber(n)}+`} />
                <span>Medium</span>
              </div>
              <div className="dsa-stat">
                <CountUp end={leetcode.hard} format={(n) => `${formatNumber(n)}+`} />
                <span>Hard</span>
              </div>
            </div>

            <div className="terminal-box">
              <div className="terminal-bar">
                <i /><i /><i />
                <span>ullas@workstation: ~/dsa — daily grind</span>
              </div>
              <div className="terminal-lines">
                <span style={{ color: '#22d3ee' }}>$ streak --today</span>{' '}
                <span style={{ color: '#34d399' }}>→ {leetcode.currentStreak}+ days 🔥</span>
                <br />
                <span style={{ color: '#22d3ee' }}>$ longest_streak</span>{' '}
                <span style={{ color: '#34d399' }}>→ {leetcode.longestStreak}+ days</span>
                <br />
                <span style={{ color: '#22d3ee' }}>$ global_ranking</span>{' '}
                <span style={{ color: '#34d399' }}>→ {leetcode.ranking}</span>
                <br />
                <span style={{ color: '#22d3ee' }}>$ badges</span>{' '}
                <span style={{ color: '#fbbf24' }}>→ {leetcode.badges.join(' · ')}</span>
              </div>
            </div>

            <br />
            <a className="btn btn-ghost btn-sm dsa-leetcode-btn" href={leetcode.profileUrl} target="_blank" rel="noreferrer">
              <Icon name="leetcode" size={16} /> View LeetCode profile
            </a>

            <h4 style={{ marginBottom: 10, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
              Topic coverage
            </h4>
            <div className="dsa-topics">
              {leetcode.topics.map((t) => (
                <span className="dsa-topic" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}