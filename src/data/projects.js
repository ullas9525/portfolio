// ============================================================
// PROJECTS — the 3D gallery is generated from this array.
// Add a new object to add a project. All fields optional.
// ============================================================

export const projects = [
  {
    id: 'intellithreat',
    name: 'IntelliThreat System',
    image: '/projects/intellithreat.png',
    blurb: 'Enterprise-grade AI security platform for detecting insider threats in FinTech SMEs.',
    description: 'IntelliThreat System is an enterprise-grade AI security platform that detects abnormal and malicious behavior from employees, vendors, and contractors in financial technology (FinTech) small and medium enterprises. It analyzes continuous user activity telemetry — off-hours access, login frequencies, session durations, bulk download volumes, and failed authentications — to quantify risk in real time. Because insider threats are rare and unlabelled, the platform uses an unsupervised 2-pass Isolation Forest ensemble to establish a baseline of normal behavior and flag zero-day anomalies without requiring historical attack labels.',
    problemSolved:
      'Insider threats are rare and unlabelled, making traditional supervised detection impossible. IntelliThreat models *normal* behaviour unsupervised and surfaces anomalous activity as it happens.',
    keyFeatures: [
      'Real-time risk scoring from continuous user activity telemetry',
      'Unsupervised 2-pass Isolation Forest ensemble with MinMaxScaler',
      'Zero-day anomaly detection without historical attack labels',
      'Analytics dashboard for monitoring employee/vendor risk',
    ],
    tech: ['Vite + React', 'FastAPI', 'Scikit-learn', 'SQLite', 'NumPy', 'Pandas', 'GitHub Actions'],
    contribution: 'Sole developer — architecture, ML pipeline, APIs, frontend dashboard and CI/CD.',
    github: 'https://github.com/ullas9525/IntelliThreat-System',
    demo: 'https://intelli-threat-system.vercel.app',
    status: 'Live',
    accent: '#22d3ee',
    type: 'AI / Web',
  },
  {
    id: 'navigation',
    name: 'AI-Based-Navigation-System',
    image: '/projects/navigation.png',
    blurb: 'Upload floorplan blueprints and walk them as interactive 3D indoor maps with AI routing.',
    description: 'A full-stack indoor navigation application that converts uploaded building floorplan images (blueprints) into interactive 3D navigation maps. Google Gemini 2.5 Flash vision AI extracts spatial topology — nodes, walkable edges, and wall boundaries — from a blueprint, the data persists to SQLite, and a Three.js/React frontend renders the 3D experience. Visitors scan a QR code, pick a destination, and receive a Dijkstra-computed shortest path rendered as a 3D route overlay on the virtual floor plan.',
    problemSolved:
      'Indoor spaces lack usable maps. The system turns static blueprint images into navigable 3D maps automatically, with shortest-path routing and access control.',
    keyFeatures: [
      'AI Blueprint Analysis — Gemini 2.5 Flash extracts rooms, walkways, walls, doors and nodes',
      '3D Indoor Navigation — real-time routing rendered with Three.js',
      'Shortest Path Routing — NetworkX Dijkstra with line-of-sight wall checks',
      'Admin Dashboard — upload blueprints and generate visitor QR codes',
      'Visitor Mode — scan QR to open a map with a predefined start node',
      '360° Media + Geo-Fencing — node-tied panoramas and 2000m proximity gate',
    ],
    tech: ['Vite + React', 'Python Flask', 'SQLite', 'Three.js', 'React Three Fiber', 'Gemini Vision API', 'NetworkX'],
    contribution: 'Sole developer — full-stack architecture, AI extraction pipeline, 3D renderer, routing service.',
    github: 'https://github.com/ullas9525/AI-Based-Navigation-System',
    demo: 'https://ai-based-navigation-system.vercel.app',
    status: 'Live',
    accent: '#6366f1',
    type: 'AI / 3D Web',
  },
  {
    id: 'dictation',
    name: 'Dictation App',
    image: '/projects/dictation.png',
    blurb: 'AI-powered Flutter app that turns voice notes into clean, structured text and summaries.',
    description: 'An AI-powered Flutter app that turns voice notes into clear, structured text. Record audio, get raw transcription, cleaned text, and polished summaries powered by Groq AI. Simple UI, secure API key storage, and a modern Material 3 design.',
    problemSolved:
      'Taking notes while thinking fast is hard. Dictation turns raw voice into structured, ready-to-use text and summaries in seconds.',
    keyFeatures: [
      'Voice recording with raw transcription',
      'Text cleaning + polished AI summaries',
      'Secure API key storage on device',
      'Modern Material 3 design with clean state management',
    ],
    tech: ['Flutter', 'Provider', 'Groq API', 'Nvidia / OpenRouter Models', 'Material 3'],
    contribution: 'Sole developer — UI, state management, AI integration and release packaging.',
    github: 'https://github.com/ullas9525/Dictation_App',
    demo: 'https://github.com/ullas9525/Dictation_App/releases/tag/V1.0.0',
    status: 'Live',
    accent: '#34d399',
    type: 'Flutter / AI',
  },
  {
    id: 'pilldoze',
    name: 'PillDoze',
    image: '/projects/pilldoze.png',
    blurb: 'Smart pill reminder and monitoring system for elderly care with Arduino + Flutter.',
    description: 'PillDoze is a smart pill reminder and monitoring system designed to help elderly individuals take medication accurately and on time. IR sensors, LEDs and a buzzer — all controlled by an Arduino — ensure pills are taken correctly, and it warns when the wrong compartment is accessed. A companion Flutter app schedules and tracks doses.',
    problemSolved:
      'Medication errors hurt the elderly. PillDoze removes guesswork with scheduled alerts, physical indicators and wrong-compartment detection.',
    keyFeatures: [
      'App-scheduled alerts for pill times',
      'LED indicators show the correct pill compartment',
      '6 IR sensors track compartment access',
      'Buzzer alerts on schedule or wrong pill attempt',
      'Smart detection logic to reduce human error',
      'Fully Arduino-based with Flutter companion app',
    ],
    tech: ['Arduino', 'IR Sensors', 'LEDs', 'Buzzer', 'RTC', 'Bluetooth', 'Flutter'],
    contribution: 'Sole developer — hardware logic, sensor wiring, detection logic and Flutter app.',
    github: 'https://github.com/ullas9525/PillDoze',
    demo: 'https://github.com/ullas9525/PillDoze/releases/tag/V1.0.0',
    status: 'Live',
    accent: '#fbbf24',
    type: 'IoT / Flutter',
  },
  {
    id: 'careerpilot',
    name: 'Career-Pilot',
    image: '/projects/careerpilot.png',
    blurb: 'An AI mock-interviewer that scores answers and helps you practice like it is real.',
    description: 'Career Pilot provides an intelligent, automated practice environment for job interview preparation. Instead of static question lists, the platform acts as an interactive AI interviewer — generating tailored technical and HR questions, analyzing candidate responses, and delivering objective scoring and feedback to improve interview readiness.',
    problemSolved:
      'Interview prep is unrealistic with static questions. Career Pilot simulates a live interviewer, evaluates answers in real time and shows exactly where to improve.',
    keyFeatures: [
      'AI Interactive Mock Interviewer — role-specific scenarios and dynamic questioning',
      'Real-Time Evaluation — automated scoring on correctness, clarity, relevance and completeness',
      'Multi-Level Difficulty — Beginner to Advanced with domain filtering',
      'Performance Metrics — readiness score and progress tracking across sessions',
      'Skill & Resume Context — questions matched to your skills and resume',
    ],
    tech: ['Vite + React', 'FastAPI', 'SQLite', 'OpenRouter', 'Groq', 'Nvidia', 'Tavily API'],
    contribution: 'Sole developer — product, LLM orchestration, scoring engine, frontend.',
    github: 'https://github.com/ullas9525/Career-Pilot',
    demo: '',
    status: 'Coming Soon',
    accent: '#f472b6',
    type: 'AI / Web',
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id) || null;
}