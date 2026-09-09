// ============================================================
// PROFILE — edit your personal info and social links here.
// ============================================================

export const profile = {
  name: 'Ullas B R',
  nameFirst: 'Ullas',
  initials: 'UBR',
  logo: `${import.meta.env.BASE_URL}Logo.png`,
  titles: ['AI Enthusiast', 'Software Engineer', 'Web Developer'],
  tagline:
    'Build practical software solutions that connect technology, creativity, and real-world impact.',
  intro:
    "Yo! I'm Ullas — a code-crafting student who's building intelligent web stuff, sleek Flutter apps, and quirky Python games.",
  photo: `${import.meta.env.BASE_URL}profile.jpg`,
  photoAlt: 'Portrait of Ullas B R',
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,

  // Rotating hero title words (typed effect)
  heroKeywords: ['AI Systems', 'Flutter Apps', 'Web Apps', 'IoT Hardware', 'Clean Code'],

  links: {
    email: 'ullasbr.2005@gmail.com',
    github: 'https://github.com/ullas9525',
    githubUser: 'ullas9525',
    linkedin: 'https://www.linkedin.com/in/ullas-b-r-624a29294/',
    leetcode: 'https://leetcode.com/u/Ullas_9525/',
    leetcodeUser: 'Ullas_9525',
  },
};

// ============================================================
// ABOUT — blocks rendered inside the 3D desk interaction.
// ============================================================

export const about = {
  heading: 'About Me',
  intro:
    'I am a passionate software engineer and technology enthusiast who enjoys building practical, user-focused digital solutions. Interested in Software Development, Web Development, Flutter Applications, Artificial Intelligence, Machine Learning, IoT, and Problem Solving.',
  blocks: [
    {
      id: 'who',
      label: 'Who I Am',
      icon: 'user',
      title: 'Who I Am',
      text: 'A software engineer in training who believes great products are born where code, design and empathy meet. Currently pursuing my Bachelor of Engineering at P.E.S. College of Engineering, Mandya.',
    },
    {
      id: 'build',
      label: 'What I Build',
      icon: 'code',
      title: 'What I Build',
      text: 'Intelligent web applications, Flutter mobile apps, AI/ML pipelines, and IoT-connected hardware — always transforming ideas into functional, real-world products.',
    },
    {
      id: 'interests',
      label: 'My Interests',
      icon: 'spark',
      title: 'My Interests',
      text: 'AI/ML, generative AI, web development, mobile development, IoT, open-source, and clean architecture. I love taking a fuzzy problem and reducing it to elegant, working software.',
    },
    {
      id: 'journey',
      label: 'My Journey',
      icon: 'route',
      title: 'My Development Journey',
      text: 'Started with Iot and Python games, discovered web dev with JavaScript and React, fell in love with Flutter for mobile, and now deep-diving into AI/ML.',
    },
    {
      id: 'tech',
      label: 'Tech I Enjoy',
      icon: 'cpu',
      title: 'Technologies I Enjoy',
      text: 'Python, Flutter, React, FastAPI, Firebase, Docker, Arduino/ESP32 — plus the endless ecosystem of libraries that make building fun and fast.',
    },
    {
      id: 'learning',
      label: 'Currently Learning',
      icon: 'book',
      title: 'What I Am Currently Learning',
      text: 'Data structures & algorithms, system & application architecture, backend integration, cloud technologies, AI/ML, and emerging technologies. Learning by building.',
    },
    {
      id: 'future',
      label: 'What Is Next',
      icon: 'rocket',
      title: 'What I Want to Build Next',
      text: 'Reliable, scalable software that solves real problems. Long-term goal: a highly skilled software engineer creating meaningful technology that improves people\u2019s lives.',
    },
  ],
};

// ============================================================
// NAVIGATION
// ============================================================

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];