// ============================================================
// useLeetCodeStats — fetches live LeetCode stats for the DSA section.
// Primary: alfa-leetcode-api (onrender) profile endpoint.
// Fallback mirrors: faisalshohag vercel, legacy herokuapp.
// Priority: live API → localStorage last-good (cached) → static fallback.
// NOTE: failures are NEVER shown in the UI — only console.warn.
// The UI just keeps showing cached/static numbers silently.
// ============================================================
import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { leetcode as fallback } from '../data/leetcode';

const USER = profile.links.leetcodeUser;
const ENDPOINTS = [
  `https://alfa-leetcode-api.onrender.com/${USER}/profile`,
  `https://leetcode-api-faisalshohag.vercel.app/${USER}`,
  `https://leetcode-stats-api.herokuapp.com/${USER}`,
];
const API_URL = ENDPOINTS[0];
const TIMEOUT_MS = 12000;
const CACHE_KEY = 'leetcode-stats-cache-v1';

// Shared across all hook instances so DSA + Achievements don't double-fetch.
let memoryCache = null; // { stats, timestamp }
let inflight = null;

function fallbackStats() {
  return {
    solved: fallback.solved,
    easy: fallback.easy,
    medium: fallback.medium,
    hard: fallback.hard,
    acceptanceRate: null,
    ranking: fallback.ranking,
    totalQuestions: null,
    currentStreak: fallback.currentStreak,
    longestStreak: fallback.longestStreak,
    streaksLive: false,
  };
}

function loadCache() {
  if (memoryCache) return memoryCache;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.stats?.solved) return null;
    memoryCache = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function saveCache(stats) {
  const entry = { stats, timestamp: Date.now() };
  memoryCache = entry;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage full/blocked — ignore, memory cache still works
  }
}

function toNum(v, fb) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fb;
}

/** Compute current + longest streaks from LeetCode submissionCalendar { unixSec: count }. */
function computeStreaks(calendar) {
  if (!calendar || typeof calendar !== 'object') return null;
  const daySet = new Set();
  for (const k of Object.keys(calendar)) {
    const ts = Number(k);
    if (!Number.isFinite(ts)) continue;
    if (Number(calendar[k]) <= 0) continue;
    // Normalize to UTC calendar day so timezone can't split/merge days
    const day = new Date(ts * 1000).toISOString().slice(0, 10);
    daySet.add(day);
  }
  if (daySet.size === 0) return null;
  const days = [...daySet].sort();
  const toMs = (d) => new Date(`${d}T00:00:00.000Z`).getTime();

  // Longest streak: single pass over sorted active days
  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    if (toMs(days[i]) - toMs(days[i - 1]) === 86400000) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 1;
    }
  }

  // Current streak: walk back from today (allow today unsolved → start at yesterday)
  const todayStr = new Date().toISOString().slice(0, 10);
  let cursorMs = toMs(todayStr);
  if (!daySet.has(todayStr)) cursorMs -= 86400000;
  let current = 0;
  while (daySet.has(new Date(cursorMs).toISOString().slice(0, 10))) {
    current += 1;
    cursorMs -= 86400000;
  }
  return { current, longest };
}

/** Normalize all known API shapes → UI shape. Returns null if unusable. */
function normalize(json) {
  if (!json || typeof json !== 'object') return null;
  // alfa / faisal profile shape: { totalSolved, easySolved, ... }
  // alfa solved shape: { solvedProblem, easySolved, ... }
  // heroku shape: { status, totalSolved, easySolved, ... }
  const solvedRaw = json.totalSolved ?? json.solvedProblem ?? json.totalSolvedQuestions;
  const solved = toNum(solvedRaw, NaN);
  if (!Number.isFinite(solved)) return null;
  const acceptance =
    json?.acceptanceRate != null && Number.isFinite(Number(json.acceptanceRate))
      ? Number(json.acceptanceRate)
      : null;
  const streaks = computeStreaks(json?.submissionCalendar);
  return {
    solved,
    easy: toNum(json?.easySolved, fallback.easy),
    medium: toNum(json?.mediumSolved, fallback.medium),
    hard: toNum(json?.hardSolved, fallback.hard),
    acceptanceRate: acceptance,
    ranking: json?.ranking ?? fallback.ranking,
    totalQuestions: toNum(json?.totalQuestions, null),
    currentStreak: streaks?.current ?? fallback.currentStreak,
    longestStreak: streaks?.longest ?? fallback.longestStreak,
    streaksLive: Boolean(streaks),
  };
}

async function fetchFirstAlive(signal) {
  let lastErr = null;
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${new URL(url).hostname}`);
      const json = await res.json();
      if (json?.status && json.status !== 'success') {
        throw new Error(json?.message || `API error from ${new URL(url).hostname}`);
      }
      const stats = normalize(json);
      if (!stats) throw new Error(`Unexpected shape from ${new URL(url).hostname}`);
      return { stats, url };
    } catch (err) {
      if (err?.name === 'AbortError') throw err;
      lastErr = err;
      // try next mirror
    }
  }
  throw lastErr || new Error('NetworkError when attempting to fetch resource.');
}

export default function useLeetCodeStats() {
  const [data, setData] = useState(() => loadCache()?.stats ?? null);
  const [loading, setLoading] = useState(() => !loadCache());
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(() => {
    const ts = loadCache()?.timestamp;
    return ts ? new Date(ts) : null;
  });
  const abortRef = useRef(null);

  const fetchStats = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    // Only flash skeletons when we have nothing to show yet.
    setLoading((prev) => (data ? false : true));
    try {
      const { stats } = await fetchFirstAlive(controller.signal);
      saveCache(stats);
      setData(stats);
      setIsLive(true);
      setLastUpdated(new Date());
    } catch (err) {
      if (err?.name === 'AbortError') {
        console.warn('[LeetCode stats] Request timed out. Showing last-good result.');
      } else {
        console.warn('[LeetCode stats] Live fetch failed. Showing last-good result.', err);
      }
      const last = loadCache();
      if (last?.stats) {
        setData(last.stats);
        setLastUpdated(new Date(last.timestamp));
      } else {
        setData(fallbackStats());
      }
      setIsLive(false);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchStats]);

  return { data, loading, error: null, isLive, lastUpdated, retry: fetchStats, apiUrl: API_URL };
}

export { API_URL };
