// ============================================================
// SKILLS — grouped with short hover-explanation text.
// Add/remove skills freely; each category renders as a 3D node
// cluster inside the Skills section.
// ============================================================

export const skillCategories = [
  {
    id: 'languages',
    label: 'Programming Languages',
    tagline: 'The foundations I think in',
    color: '#22d3ee',
    skills: [
      { name: 'C++', icon: 'SiCplusplus', note: 'Strong algorithmic foundation, STL, memory management, and problem solving.' },
      { name: 'Python', icon: 'SiPython', note: 'My go-to for AI/ML, scripting, automation, and backend development.' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    tagline: 'Tools that turn ideas into products',
    color: '#6366f1',
    skills: [
      { name: 'Flutter', icon: 'SiFlutter', note: 'Cross-platform mobile apps with beautiful Material 3 UIs and smooth state management.' },
      { name: 'Vite + React', icon: 'SiReact', note: 'Fast, component-based interactive frontends with modern tooling.' },
      { name: 'Python FastAPI', icon: 'SiFastapi', note: 'High-performance async REST APIs with automatic docs.' },
      { name: 'PostgreSQL', icon: 'SiPostgresql', note: 'Relational databases — schema design, queries, and data integrity.' },
    ],
  },
  {
    id: 'dev',
    label: 'Development',
    tagline: 'How I ship and collaborate',
    color: '#34d399',
    skills: [
      { name: 'Firebase', icon: 'SiFirebase', note: 'Auth, Firestore, cloud functions and real-time data for apps.' },
      { name: 'Git', icon: 'SiGit', note: 'Version control, branching strategies and clean commit history.' },
      { name: 'GitHub', icon: 'SiGithub', note: 'Open-source collaboration, PRs, issues and CI workflows.' },
      { name: 'Docker', icon: 'SiDocker', note: 'Containerized development and consistent deployment environments.' },
      { name: 'GitHub Actions', icon: 'SiGithubactions', note: 'CI/CD pipelines — test, build and deploy automatically.' },
    ],
  },
  {
    id: 'aiml',
    label: 'AI / ML',
    tagline: 'Teaching machines to help people',
    color: '#f472b6',
    skills: [
      { name: 'Python', icon: 'SiPython', note: 'The backbone language for every ML experiment I run.' },
      { name: 'NumPy', icon: 'SiNumpy', note: 'Vectorized numerical computing for fast data manipulation.' },
      { name: 'Pandas', icon: 'SiPandas', note: 'Data wrangling, cleaning and exploratory analysis.' },
      { name: 'Data Preprocessing', icon: 'TbChartDots', note: 'Handling missing values, normalization, encoding and feature engineering.' },
      { name: 'Model Training', icon: 'TbBrain', note: 'Designing, training and tuning classic and deep models.' },
      { name: 'Model Evaluation', icon: 'TbClipboardData', note: 'Precision, recall, F1 — measuring real model quality.' },
      { name: 'Generative AI', icon: 'TbWand', note: 'Building with LLMs for summarization, generation and agents.' },
      { name: 'LLMs', icon: 'TbMessages', note: 'Prompting, RAG patterns and integrating models via APIs.' },
      { name: 'Prompt Engineering', icon: 'TbPrompt', note: 'Crafting clear, reliable instructions for language models.' },
    ],
  },
  {
    id: 'iot',
    label: 'IoT',
    tagline: 'Code that touches the real world',
    color: '#fbbf24',
    skills: [
      { name: 'Arduino', icon: 'SiArduino', note: 'Microcontroller programming for sensors and real-world automation.' },
      { name: 'ESP32', icon: 'MdMemory', note: 'Wi-Fi + BLE microcontrollers for connected devices.' },
      { name: 'ESP8266', icon: 'TbWifi', note: 'Low-cost Wi-Fi modules for smart IoT projects.' },
      { name: 'Raspberry Pi', icon: 'SiRaspberrypi', note: 'Single-board computers for edge compute and prototyping.' },
      { name: 'Wi-Fi & Bluetooth', icon: 'TbBluetooth', note: 'Wireless communication protocols between devices and apps.' },
      { name: 'Firebase', icon: 'SiFirebase', note: 'Cloud sync and device telemetry for IoT ecosystems.' },
      { name: 'Cloud Integration', icon: 'TbCloud', note: 'Connecting hardware to cloud services for monitoring and control.' },
    ],
  },
];

export const allSkillNames = skillCategories.flatMap((c) => c.skills.map((s) => s.name));