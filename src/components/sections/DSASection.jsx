import { leetcode } from '../../data/leetcode';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import CountUpBits from '../ui/CountUp';
import CanvasScene from '../three/CanvasScene';
import DSAScene from '../three/DSAScene';

function LiveBadge({ loading, isLive, onRetry }) {
  return (
    <span className="dsa-live-badge" data-live={isLive ? 'true' : 'false'}>
      <span className="dsa-live-dot" aria-hidden="true" />
      {loading ? 'syncing…' : isLive ? 'live' : 'cached'}
      {!loading && !isLive ? (
        <button type="button" className="dsa-live-retry" onClick={onRetry}>
          retry
        </button>
      ) : null}
    </span>
  );
}

export default function DSASection() {
  const { data: live, loading, isLive, retry } = useLeetCodeStats();
  const stats = live ?? {
    solved: leetcode.solved,
    easy: leetcode.easy,
    medium: leetcode.medium,
    hard: leetcode.hard,
    acceptanceRate: null,
    ranking: leetcode.ranking,
    totalQuestions: null,
    currentStreak: leetcode.currentStreak,
    longestStreak: leetcode.longestStreak,
  };

  return (
    <section className="section" id="dsa" aria-label="Problem solving and DSA">
      <div className="wrap">
        <SectionHeading
          eyebrow="07 · Problem Solving"
          title="Solve. Learn. Repeat"
          sub="My journey of competitive programming — from arrays to dynamic programming, one streak at a time."
        />

        <div className="dsa-wrap">
          <Reveal>
            <div className="dsa-stage">
              <CanvasScene camera={{ position: [0, 0.2, 5.6], fov: 50 }}>
                <DSAScene stats={stats} />
              </CanvasScene>
            </div>
          </Reveal>

          <div>
            <div className="dsa-head-row">
              <LiveBadge loading={loading} isLive={isLive} onRetry={retry} />
            </div>

            {loading && !live ? (
              <div className="dsa-stats dsa-stats-loading" aria-busy="true" aria-label="Loading LeetCode statistics">
                {[0, 1, 2, 3].map((i) => (
                  <div className="dsa-stat dsa-skeleton" key={i}>
                    <span className="dsa-skeleton-bar" />
                    <span className="dsa-skeleton-label" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="dsa-stats">
                <div className="dsa-stat">
                  <CountUpBits to={stats.solved} duration={1.4} className="dsa-stat-val" />
                  <span>Solved</span>
                </div>
                <div className="dsa-stat">
                  <CountUpBits to={stats.easy} duration={1.4} className="dsa-stat-val" />
                  <span>Easy</span>
                </div>
                <div className="dsa-stat">
                  <CountUpBits to={stats.medium} duration={1.4} className="dsa-stat-val" />
                  <span>Medium</span>
                </div>
                <div className="dsa-stat">
                  <CountUpBits to={stats.hard} duration={1.4} className="dsa-stat-val" />
                  <span>Hard</span>
                </div>
              </div>
            )}

            <div className="terminal-box">
              <div className="terminal-bar">
                <i /><i /><i />
                <span>ullas@workstation: ~/dsa — daily grind</span>
              </div>
              <div className="terminal-lines">
                <span style={{ color: '#22d3ee' }}>$ streak --today</span>{' '}
                <span style={{ color: '#34d399' }}>→ <CountUpBits to={stats.currentStreak} duration={1.4} /> days 🔥{stats.streaksLive ? '' : ' (cached)'}</span>
                <br />
                <span style={{ color: '#22d3ee' }}>$ longest_streak</span>{' '}
                <span style={{ color: '#34d399' }}>→ <CountUpBits to={stats.longestStreak} duration={1.4} /> days{stats.streaksLive ? '' : ' (cached)'}</span>
                <br />
                <span style={{ color: '#22d3ee' }}>$ global_ranking</span>{' '}
                <span style={{ color: '#34d399' }}>→ {typeof stats.ranking === 'number' ? stats.ranking.toLocaleString('en-US') : stats.ranking}</span>
                <br />
                {stats.acceptanceRate != null ? (
                  <>
                    <span style={{ color: '#22d3ee' }}>$ acceptance</span>{' '}
                    <span style={{ color: '#34d399' }}>→ {stats.acceptanceRate}%</span>
                    <br />
                  </>
                ) : null}
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
