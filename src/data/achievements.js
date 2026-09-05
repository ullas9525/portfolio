// ============================================================
// ACHIEVEMENTS
// ============================================================

export const achievements = [
  {
    title: '225+ LeetCode Problems Solved',
    detail: '147 easy · 72 medium · 6 hard across 16+ data structure topics.',
    icon: 'code',
    tag: 'Programming',
  },
  {
    title: '76-Day Coding Streak',
    detail: 'Consistent daily problem solving with 100-day and 50-day badges on LeetCode.',
    icon: 'flame',
    tag: 'Consistency',
  },
  {
    title: '5+ End-to-End Products Shipped',
    detail: 'AI security platform, 3D indoor navigation, AI dictation app, IoT pill reminder and an AI interview copilot.',
    icon: 'rocket',
    tag: 'Building',
  },
  {
    title: 'Full-Stack + AI + IoT Builder',
    detail: 'Comfortable across the entire stack — React/FastAPI web apps, Flutter mobile, scikit-learn ML, and Arduino/ESP embedded systems.',
    icon: 'cpu',
    tag: 'Breadth',
  },
];

// ============================================================
// GITHUB — static snapshot; easy to upgrade to the live API.
// ============================================================

export const githubData = {
  username: 'ullas9525',
  profileUrl: 'https://github.com/ullas9525',
  // Static snapshot — swap the "stats" object for live "fetch" data later.
  stats: {
    repos: 20,
    followers: 12,
    stars: 30,
    contributions: 'Building daily',
  },
  spotlight: [
    {
      name: 'IntelliThreat-System',
      desc: 'Unsupervised AI insider-threat detection for FinTech SMEs.',
      lang: 'Python · React',
      star: true,
      url: 'https://github.com/ullas9525/IntelliThreat-System',
    },
    {
      name: 'AI-Based-Navigation-System',
      desc: 'Blueprints → interactive 3D indoor maps with Gemini vision AI.',
      lang: 'React · Flask · Three.js',
      star: true,
      url: 'https://github.com/ullas9525/AI-Based-Navigation-System',
    },
    {
      name: 'Career-Pilot',
      desc: 'AI mock interviewer with real-time answer scoring.',
      lang: 'React · FastAPI · LLMs',
      star: true,
      url: 'https://github.com/ullas9525/Career-Pilot',
    },
    {
      name: 'PillDoze',
      desc: 'Arduino + Flutter smart pill reminder for elderly care.',
      lang: 'Arduino · Flutter',
      star: false,
      url: 'https://github.com/ullas9525/PillDoze',
    },
    {
      name: 'Dictation_App',
      desc: 'Voice notes → cleaned text and summaries with Groq AI.',
      lang: 'Flutter · Provider',
      star: false,
      url: 'https://github.com/ullas9525/Dictation_App',
    },
  ],
};

// ============================================================
// AI / ML — the full loop visualised in the AI section.
// ============================================================

export const aiMl = {
  heading: 'AI / Machine Learning',
  intro:
    'From raw data to deployed intelligence — I build the full ML loop: cleaning, feature engineering, training, evaluation, and shipping models behind real APIs.',
  pipeline: [
    { step: '01 · Data', name: 'Preprocessing', icon: 'chart', desc: 'Cleaning, normalization and feature engineering with NumPy & Pandas on raw, messy telemetry.' },
    { step: '02 · Model', name: 'Train & Optimize', icon: 'brain', desc: 'Unsupervised ensembles like Isolation Forest, plus classic supervised pipelines tuned on real metrics.' },
    { step: '03 · Eval', name: 'Model Evaluation', icon: 'gauge', desc: 'Precision, recall, F1 and calibration — metrics that tell the real story, not just accuracy.' },
    { step: '04 · Ship', name: 'API + App Integration', icon: 'cloud', desc: 'Models behind FastAPI endpoints, consumed by React and Flutter applications.' },
  ],
  concepts: ['Isolation Forest', 'MinMaxScaler', 'NumPy Math', 'Pandas Pipelines', 'LLMs', 'Prompting'],
};