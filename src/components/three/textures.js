// ============================================================
// Procedural canvas textures for 3D objects (no asset loading).
// ============================================================
import { CanvasTexture, SRGBColorSpace } from 'three';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function toTexture(c, srgb = true) {
  const t = new CanvasTexture(c);
  if (srgb) t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// roundRect fallback for older engines (Safari < 16, Chrome < 99) —
// patches the real CanvasRenderingContext2D prototype.
if (typeof document !== 'undefined') {
  const probe = document.createElement('canvas').getContext('2d');
  const ctxProto = probe && Object.getPrototypeOf(probe);
  if (ctxProto && typeof ctxProto.roundRect !== 'function') {
    ctxProto.roundRect = function roundRectPath(x, y, w, h, r) {
      const rr = typeof r === 'number' ? r : Math.min(...(r || [0, 0, 0, 0]));
      this.moveTo(x + rr, y);
      this.lineTo(x + w - rr, y);
      this.arcTo(x + w, y, x + w, y + rr, rr);
      this.lineTo(x + w, y + h - rr);
      this.arcTo(x + w, y + h, x + w - rr, y + h, rr);
      this.lineTo(x + rr, y + h);
      this.arcTo(x, y + h, x, y + h - rr, rr);
      this.lineTo(x, y + rr);
      this.arcTo(x, y, x + rr, y, rr);
      this.closePath();
      return this;
    };
  }
}

const NUM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function randLine(colors, len) {
  let line = '';
  const l = len ?? 12 + Math.floor(Math.random() * 26);
  for (let i = 0; i < l; i++) {
    const r = Math.random();
    line += r < 0.55 ? ' ' : r < 0.7 ? NUM[Math.floor(Math.random() * 10)] : 'x';
  }
  return { text: line, color: colors[Math.floor(Math.random() * colors.length)] };
}

// Abstract "code" animation frame
export function makeCodeFrame(w = 512, h = 320, seed = 0) {
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#05080f';
  ctx.fillRect(0, 0, w, h);
  const colors = ['#22d3ee', '#34d399', '#818cf8', '#e2e8f0', '#f472b6'];
  const fs = 13;
  ctx.font = `${fs}px "JetBrains Mono", monospace`;
  const pad = 14;
  let y = 20;
  const rows = Math.floor((h - 30) / fs);
  for (let i = 0; i < rows; i++) {
    const { text, color } = randLine(colors, 24 + ((i * 7) % 22));
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.55 + Math.random() * 0.4;
    ctx.fillText(text, pad, y + (seed % 4));
    y += fs;
  }
  ctx.globalAlpha = 1;
  return c;
}

// Desktop monitor screen: gradient + code + prompt
export function makeMonitorTexture() {
  const c = makeCanvas(512, 320);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 512, 320);
  g.addColorStop(0, '#071019');
  g.addColorStop(1, '#0a0f1e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 320);
  ctx.font = '600 13px monospace';
  ctx.fillStyle = '#f472b6';
  ctx.fillText('> Build something real.', 18, 28);
  const lines = [
    ['const engineer = {', '#e2e8f0'],
    ["  name: 'Ullas B R',", '#e2e8f0'],
    ["  stack: ['React','Flutter','AI'],", '#7dd3fc'],
    ['};', '#e2e8f0'],
    ['', '#666666'],
    ['// shipping products like', '#64748b'],
    ['//   intellithreat · nav3d · dictation', '#64748b'],
  ];
  let y = 62;
  lines.forEach(([t, col]) => {
    ctx.fillStyle = col;
    ctx.fillText(t, 18, y);
    y += 24;
  });
  ctx.fillStyle = '#34d399';
  ctx.fillText('$ npm run deploy  ✓  v1.0.0 live', 18, y + 10);
  return toTexture(c);
}

// Phone screen mock UI ("Flutter app" vibes)
export function makePhoneTexture(variant = 0) {
  const c = makeCanvas(256, 520);
  const ctx = c.getContext('2d');
  const ui = [
    {
      bg: '#0b1220',
      accent: '#22d3ee',
      title: 'My App',
      rows: [
        ['Profile', '#1e293b'],
        ['Settings', '#334155'],
        ['Notifications', '#0f172a'],
      ],
    },
    {
      bg: '#0b1020',
      accent: '#818cf8',
      title: 'Tasks',
      rows: [
        ['Ship v1.0', '#312e81'],
        ['Fix API bug', '#1e1b4b'],
        ['Deploy CI', '#0b1020'],
      ],
    },
    {
      bg: '#08130f',
      accent: '#34d399',
      title: 'Dictation',
      rows: [
        ['● Recording…', '#064e3b'],
        ['Transcribing', '#064e3b'],
        ['Summary ready', '#052e16'],
      ],
    },
    {
      bg: '#12101f',
      accent: '#f472b6',
      title: 'PillDoze',
      rows: [
        ['10:00 AM — Taken', '#831843'],
        ['02:00 PM — Due', '#500724'],
        ['06:00 PM — Reminder', '#2d0614'],
      ],
    },
  ];
  const s = ui[variant % ui.length];
  ctx.fillStyle = s.bg;
  ctx.fillRect(0, 0, 256, 520);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 22px sans-serif';
  ctx.fillText(s.title, 20, 46);
  ctx.fillStyle = s.accent;
  ctx.fillRect(20, 58, 70, 3);
  let y = 96;
  s.rows.forEach(([label, col]) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.roundRect(16, y, 224, 74, 14);
    ctx.fill();
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 16px sans-serif';
    ctx.fillText(label, 34, y + 44);
    y += 90;
  });
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.roundRect(16, 400, 224, 90, 14);
  ctx.fill();
  ctx.fillStyle = s.accent;
  ctx.font = '700 16px sans-serif';
  ctx.fillText('Browse', 34, 450);
  return toTexture(c);
}

// Project cover card texture
function wrapText(ctx, text, x, startY, maxW, lh) {
  // Break on spaces AND hyphens so long hyphenated tokens like
  // "AI-Based-Navigation-System" wrap gracefully inside the card.
  const tokens = String(text).replace(/-/g, '- ').split(/\s+/).filter(Boolean);
  let line = '';
  let y = startY;
  tokens.forEach((tok) => {
    const t = (line ? line + ' ' : '') + tok;
    if (ctx.measureText(t).width > maxW && line) {
      ctx.fillText(line.trim(), x, y);
      line = tok;
      y += lh;
    } else if (ctx.measureText(tok).width > maxW) {
      // Single token wider than the line — hard-break by chars.
      let chunk = tok;
      while (ctx.measureText(chunk).width > maxW && chunk.length > 1) {
        chunk = chunk.slice(0, -1);
      }
      ctx.fillText(chunk.trim(), x, y);
      line = '';
      y += lh;
    } else {
      line = t;
    }
  });
  if (line) ctx.fillText(line.trim(), x, y);
}

export function makeProjectCoverTexture(project, w = 640, h = 400) {
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(20, 0, w, h);
  g.addColorStop(0, '#0a1120');
  g.addColorStop(1, '#0d1526');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // subtle grid
  ctx.strokeStyle = 'rgba(148,163,184,0.07)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let yy = 0; yy < h; yy += 32) {
    ctx.beginPath();
    ctx.moveTo(0, yy);
    ctx.lineTo(w, yy);
    ctx.stroke();
  }
  // accent blob
  ctx.fillStyle = project.accent || '#22d3ee';
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.arc(w * 0.82, h * 0.22, 130, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  // status pill
  ctx.font = '600 16px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText((project.status || 'BUILT').toUpperCase(), 34, 46);
  // type
  ctx.fillStyle = project.accent || '#22d3ee';
  ctx.fillText(project.type || 'PROJECT', 34, 76);
  // big title
  ctx.fillStyle = '#e8eef7';
  ctx.font = '700 34px "Space Grotesk", sans-serif';
  wrapText(ctx, project.name, 34, 116, w - 68, 40);
  // blurb
  ctx.fillStyle = 'rgba(164,182,203,0.92)';
  ctx.font = '500 16px "Inter", sans-serif';
  wrapText(ctx, project.blurb || project.description || '', 34, 212, w - 68, 22);
  return toTexture(c);
}

// Terminal animation frame — draws the first N snippet lines
export function makeTerminalFrame(lines, step, w = 512, h = 340) {
  const c = makeCanvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#04070d';
  ctx.fillRect(0, 0, w, h);
  // top bar
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(0, 0, w, 30);
  ctx.fillStyle = '#64748b';
  ctx.font = '600 12px monospace';
  ctx.fillText('ullas@workstation: ~/dsa', 14, 20);
  // body
  ctx.font = '500 15px "JetBrains Mono", monospace';
  const count = Math.min(step + 1, lines.length);
  let y = 62;
  for (let i = 0; i < count; i++) {
    const { line, out } = lines[i];
    ctx.fillStyle = '#22d3ee';
    ctx.fillText(line, 20, y);
    y += 22;
    if (out) {
      ctx.fillStyle = '#34d399';
      ctx.fillText(out, 20, y);
      y += 22;
    }
  }
  if (step < lines.length) {
    ctx.fillStyle = '#e8eef7';
    ctx.fillRect(20, y - 4, 9, 16);
  }
  return c;
}

// Floor grid texture
export function makeGridTexture() {
  const c = makeCanvas(512, 512);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  return toTexture(c, false);
}