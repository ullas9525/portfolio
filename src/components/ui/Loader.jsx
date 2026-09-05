import { useEffect, useState } from 'react';
import { profile } from '../../data/profile';

export default function Loader({ hide }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // keep loader up for a beat so it reads as intentional + premium
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const out = done && hide;
  return (
    <div className={`loader${out ? ' done' : ''}`} aria-hidden={out ? 'true' : 'false'}>
      <div className="loader-name">
        {profile.name.split(' ').map((w, i) => (
          <span style={{ display: 'inline-block', marginRight: '0.22em' }} key={i}>
            {w}
          </span>
        ))}
      </div>
      <div className="loader-tag">Loading digital environment…</div>
      <div className="loader-bar">
        <span />
      </div>
    </div>
  );
}