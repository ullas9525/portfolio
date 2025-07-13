import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Instagram, List, Code, X } from 'lucide-react'; // Import X for close icon

// Logo component
const LogoSVG = () => (
  <img src="images/ChatGPT_Image_Jul_13__2025__06_17_13_PM-removebg-preview.png" alt="Ullas B R Logo" className="size-8" />
);

// ScrollReveal Component for animations
const ScrollReveal = ({
  children,
  baseOpacity = 0,
  enableBlur = false,
  baseRotation = 0,
  blurStrength = 0,
  transitionDuration = '0.7s',
  transitionDelay = '0s',
  threshold = 0.1, // Percentage of element visible to trigger
  className = '', // Added className prop to pass Tailwind classes
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optionally unobserve after it becomes visible if animation should only run once
            // observer.unobserve(entry.target);
          } else {
            // Optionally reset visibility if animation should repeat on scroll out/in
            // setIsVisible(false);
          }
        });
      },
      {
        threshold: threshold,
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const style = {
    opacity: isVisible ? 1 : baseOpacity,
    filter: isVisible ? 'blur(0px)' : (enableBlur ? `blur(${blurStrength}px)` : 'none'),
    transform: isVisible ? 'rotate(0deg) translateY(0)' : `rotate(${baseRotation}deg) translateY(20px)`, // Added translateY for subtle vertical slide
    transition: `opacity ${transitionDuration} ${transitionDelay}, filter ${transitionDuration} ${transitionDelay}, transform ${transitionDuration} ${transitionDelay}`,
    willChange: 'opacity, filter, transform', // Optimize for animation performance
  };

  return (
    <div ref={domRef} style={style} className={className}> {/* Apply className here */}
      {children}
    </div>
  );
};


// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-[var(--border-color)]] bg-[var(--secondary-color)]/80 backdrop-blur-md px-6 sm:px-10 py-4"> {/* Removed whitespace-nowrap */}
      <div className="flex items-center gap-3 text-[var(--text-primary)]">
        <div className="size-8"> {/* Changed size-10 to size-8 */}
          <LogoSVG />
        </div>
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Ullas B R</h2>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal transition-colors" href="#about">About</a>
        <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal transition-colors" href="#skills">Skills</a>
        <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal transition-colors" href="#projects">Projects</a>
        <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal transition-colors" href="#resume">Resume</a>
        <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm font-medium leading-normal transition-colors" href="#contact">Contact</a>
      </nav>
      <div className="flex items-center gap-4">
        {/* Profile photo for mobile, acts as menu toggle. Hidden on small screens and up. */}
        <button
          className="flex sm:hidden cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-cover bg-center bg-no-repeat border-2 border-[var(--primary-color)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ backgroundImage: `url('images/my-photo.png')` }}
          aria-label="Toggle navigation menu"
        >
        </button>
        {/* Profile photo for larger screens, hidden on extra-small screens and visible from small screens up. */}
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[var(--primary-color)] hidden sm:block" style={{ backgroundImage: `url('images/my-photo.png')` }}></div>
      </div>
      {isMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[var(--secondary-color)]/90 backdrop-blur-md flex flex-col items-center py-4 md:hidden">
          <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-base font-medium leading-normal transition-colors py-2" href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-base font-medium leading-normal transition-colors py-2" href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
          <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-base font-medium leading-normal transition-colors py-2" href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-base font-medium leading-normal transition-colors py-2" href="#resume" onClick={() => setIsMenuOpen(false)}>Resume</a>
          <a className="nav-link text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-base font-medium leading-normal transition-colors py-2" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  );
};

// Hero Section Component
const HeroSection = () => (
  <section className="pt-10" id="hero">
    <div className="@[480px]:p-4">
      <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10 shadow-xl" style={{ backgroundImage: `linear-gradient(rgba(16, 26, 35, 0.5) 0%, rgba(16, 26, 35, 0.9) 100%), url('images/hero-background.jpg')` }}> {/* Updated hero background image to use relative path */}
        <div className="flex flex-col gap-3 text-left">
          <h1 className="text-[var(--text-primary)] text-4xl font-black leading-tight tracking-tighter @[480px]:text-6xl">
            Ullas B R
          </h1>
          <h2 className="gradient-text text-lg font-semibold leading-normal @[480px]:text-xl">
            Web Developer 🚀 exploring the edge where Frontend meets AI
          </h2>
          <p className="text-[var(--text-secondary)] text-base @[480px]:text-lg font-normal leading-relaxed max-w-xl">
            Yo! I’m Ullas — a code-crafting student who's building intelligent web stuff, sleek Flutter apps, and quirky Python games.
          </p>
        </div>
        <a className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 @[480px]:h-14 @[480px]:px-8 bg-[var(--primary-color)] text-[var(--text-primary)] text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105" href="#projects">
          <span className="truncate">Explore Projects</span>
        </a>
      </div>
    </div>
  </section>
);

// About Section Component
const AboutSection = () => (
  <section className="scroll-mt-20" id="about">
    <h2 className="text-[var(--text-primary)] text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">About Me</h2>
    <p className="text-[var(--text-secondary)] text-lg font-normal leading-relaxed pb-3 pt-1 px-4">
      I’m a passionate student with a developer mindset, always eager to learn and create. My journey in web development has been an exciting blend of frontend aesthetics and backend logic, with a growing interest in AI integration. I also enjoy building cross-platform apps with Flutter and experimenting with Python for game development. Let's build something amazing together!
    </p>
  </section>
);

// Skill Tab Component
const SkillTab = ({ title, isActive, onClick }) => (
  <a
    className={`skill-tab flex flex-col items-center justify-center border-b-[3px] text-[var(--text-secondary)] pb-[13px] pt-4 ${isActive ? 'active border-[var(--primary-color)]' : 'border-transparent'}`}
    href="#skills" // Changed href to "#skills" to keep focus within the skills section
    onClick={(e) => {
      e.preventDefault(); // Prevent default anchor behavior (jumping to top)
      onClick(); // Call the original onClick to change the active tab
      // Optional: Scroll to the skills section smoothly if needed, but not required if tab content is in view
      document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <p className="text-sm sm:text-base font-bold leading-normal tracking-[0.015em] whitespace-nowrap">{title}</p>
  </a>
);

// Skill Item Component
const SkillItem = ({ title }) => (
  <div className="flex flex-1 gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--accent-color)] p-4 items-center hover:shadow-lg hover:border-[var(--primary-color)] transition-all duration-300 transform hover:scale-105">
    <div className="text-[var(--primary-color)]" data-icon="Code" data-size="24px" data-weight="regular">
      <Code size={24} /> {/* Using Lucide React Code icon */}
    </div>
    <h2 className="text-[var(--text-primary)] text-base font-bold leading-tight">{title}</h2>
  </div>
);

// Skills Section Component
const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('Frontend');

  const skillsData = {
    Frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express.js', 'MongoDB'], // Removed Python, Flask, SQL
    Languages: ['JavaScript', 'Python', 'C', 'C++', 'Dart'], // Added Python back, Replaced Java with C
    'App Dev': ['Flutter'], // Removed React Native
    Tools: ['Git', 'VS Code', 'Figma'], // Removed Docker
  };

  return (
    <section className="scroll-mt-20" id="skills">
      <h2 className="text-[var(--text-primary)] text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-5">Skills</h2>
      <div className="pb-3">
        <div className="flex border-b border-[var(--border-color)] px-4 gap-6 sm:gap-8 overflow-x-auto">
          {Object.keys(skillsData).map((tab) => (
            <SkillTab
              key={tab}
              title={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 p-4">
        {skillsData[activeTab].map((skill) => (
          <SkillItem key={skill} title={skill} />
        ))}
      </div>
    </section>
  );
};

// Project Detail Modal Component
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className="bg-[var(--secondary-color)] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>
        <h3 className="text-[var(--text-primary)] text-2xl font-bold mb-4">{project.title}</h3>
        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4" style={{ backgroundImage: `url("${project.imageUrl}")` }}></div>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6 whitespace-pre-wrap">{project.fullDescription}</p>
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg h-10 px-5 bg-[var(--primary-color)] text-[var(--text-primary)] text-sm font-bold leading-normal w-fit hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 gap-2"
          >
            <Code size={20} />
            <span className="truncate">View Code</span>
          </a>
        )}
      </div>
    </div>
  );
};


// Project Card Component
const ProjectCard = ({ category, title, description, imageUrl, projectLink, onViewProject }) => (
  <div
    className="flex flex-col items-stretch justify-between gap-4 rounded-xl bg-[var(--accent-color)] p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    onClick={onViewProject} // Make the entire card clickable
  >
    <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4" style={{ backgroundImage: `url("${imageUrl}")` }}></div>
    <div className="flex flex-col gap-2">
      <p className="text-[var(--primary-color)] text-sm font-semibold leading-normal">{category}</p>
      {/* Ensure text wraps by removing whitespace-nowrap if it was implicitly applied */}
      <p className="text-[var(--text-primary)] text-xl font-bold leading-tight break-words">{title}</p>
      <p className="text-[var(--text-secondary)] text-base font-normal leading-relaxed break-words">{description}</p>
    </div>
    {/* Removed the "View Project" button */}
  </div>
);

// Projects Section Component
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      category: 'IoT + App',
      title: 'PillDoze',
      description: 'An IoT-enabled pill dispenser with a companion app for medication management.',
      fullDescription: `💊 Smart Pill Reminder System for Elderly People

This project is a smart pill reminder and monitoring system designed to assist elderly individuals with accurate and timely medication intake. It uses IR sensors, LEDs, and buzzer alerts — all controlled by an Arduino — to ensure pills are taken correctly, and warns if the wrong compartment is accessed.
🚀 Project Overview

Taking the right medicine at the right time is critical, especially for the elderly. Our system ensures:
Accurate pill reminders via buzzer alerts at scheduled times (set using a mobile app).
LED guidance to indicate the correct compartment.
Real-time pill verification using IR sensors.
Alerts if a wrong compartment is opened.
The system is optimized with LEDs and sensors, keeping it simple and effective.
🧠 Features

🕒 App-Scheduled Alerts for pill times
🔦 LED Indicators show the correct pill compartment
👀 6 IR Sensors track compartment access
🔊 Buzzer alerts on schedule or wrong pill attempt
🧠 Smart Detection Logic to reduce human error
🧩 Fully Arduino-based
🔧 Hardware Components

Component Quantity Arduino Uno 1 IR Sensors 6 LEDs 6 Buzzer 1 Pill Box Compartments 6 (manually divided) Power Supply / USB 1
🖥️ Software Tools

Arduino IDE – Code development and upload
Flutter – For custom scheduling app
GitHub – Version control and collaboration
🧾 How It Works

User schedules pill times via the app(Pilldoze).
At the scheduled time, the buzzer sounds, and the system activates the LED for the correct compartment.
IR sensors detect if the correct pill compartment is accessed.
If the correct pill is taken, system goes silent.
If the wrong compartment is accessed, buzzer sounds again as a warning.
System resets and waits for the next dose.
🔁 Circuit Overview

💡 The system uses 6 IR sensors aligned with 6 compartments.
On scheduled time (via app), Arduino powers the correct LED.
IR checks which compartment is opened and triggers alerts accordingly.
Circuit Diagram: (Please note: the image for the circuit diagram is not directly embeddable here. You would typically link to it or include it as a separate image asset in your project.)

🔮 Future Improvements

🛰️ Add IoT support with ESP32 for remote monitoring
📱 Add SMS or app-based alert for missed doses
📊 Pill intake history logging
🔋 Battery backup system
📦 Use Cases

🧓 Elderly individuals with regular medication
🧠 Alzheimer’s or dementia patients
🏥 Clinics and care centers
📚 Academic embedded system projects`,
      imageUrl: `images/pilldoze.png`, // Updated to use the new local image path
      projectLink: 'https://github.com/ullas9525/PillDoze/tree/main',
    },
    {
      category: 'Embedded System', // Changed category
      title: 'Traffic Speed Detection', // New project title
      description: 'Measures vehicle speed using Arduino and IR sensors.', // Short description updated
      fullDescription: `🚦 Traffic Speed Detection with Arduino + IR Sensors
This project uses an Arduino and two IR sensors to measure the speed of a moving vehicle by calculating the time it takes to pass between the two sensors. Simple setup, solid logic, and a cool way to visualize basic physics.
🧠 What’s Happening Here? Two IR sensors are placed certain distance apart. When a vehicle breaks the first beam, a timer starts. When it crosses the second, the timer stops. Using the time difference and fixed distance, we calculate the speed and convert it to km/h.
Speed = (Distance / Time) × 3.6
🛠️ Hardware Required
Arduino UNO (or compatible)!
2x IR Sensor Modules Breadboard + Jumper Wires USB Cable (for power & programming)
A small moving object (like a toy car or ball)
⚙️ Setup Diagram Block Diagram: (Please note: the image for the block diagram is not directly embeddable here. You would typically link to it or include it as a separate image asset in your project.)
💬 Why This Is Cool Helps understand real-world physics with sensors`,
      imageUrl: `images/traffic-speed-detection.png`, // Corrected to use relative path directly
      projectLink: 'https://github.com/ullas9525/Traffic_Speed_Detection',
    },
    {
      category: 'Smart System',
      title: 'Smart Irrigation System',
      description: 'An intelligent irrigation system optimizing water usage based on real-time data.',
      fullDescription: "An automated irrigation system designed to optimize water usage in farming. It leverages sensors to monitor soil moisture, temperature, and humidity, and then intelligently controls irrigation based on real-time data and weather forecasts. This system aims to conserve water, reduce manual labor, and improve crop yield.",
      imageUrl: `images/smart-irrigation.png`, // Corrected to use relative path directly
      projectLink: 'https://github.com/ullas9525/Smart_Irrigation_System',
    },
    {
      category: 'Mini-Games',
      title: 'Python Mini-Games',
      description: 'A collection of fun and engaging mini-games developed using Python.',
      fullDescription: "A collection of classic and original mini-games developed using Python. This repository showcases various game development concepts, including user input handling, game logic, scoring, and simple graphics, providing an entertaining and educational experience.",
      imageUrl: `images/games.png`, // Updated to use the new local image path
      projectLink: 'https://github.com/ullas9525/WordGame',
    },
  ];

  return (
    <section className="scroll-mt-20" id="projects">
      <h2 className="text-[var(--text-primary)] text-3xl font-bold leading-tight tracking-tight px-4 pb-6 pt-5">Projects</h2>
      {/* Adjusted grid columns for better responsiveness and to prevent overlap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onViewProject={() => setSelectedProject(project)} // Pass project data to state
          />
        ))}
      </div>
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

// Resume Section Component
const ResumeSection = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleDownloadClick = (e) => {
    e.preventDefault(); // Prevent the default download behavior
    setShowMessage(true); // Show the "Coming Soon" message
    setTimeout(() => {
      setShowMessage(false); // Hide the message after a few seconds
    }, 3000); // 3 seconds
  };

  return (
    <section className="scroll-mt-20" id="resume">
      <h2 className="text-[var(--text-primary)] text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">Resume</h2>
      <div className="flex flex-col items-start px-4 py-3">
        <button
          onClick={handleDownloadClick}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[var(--primary-color)] text-[var(--text-primary)] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
        >
          <span className="truncate">Download Resume</span>
        </button>
        {showMessage && (
          <p className="text-[var(--text-secondary)] text-sm mt-2">Coming Soon!</p>
        )}
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => (
  <section className="scroll-mt-20" id="contact">
    <h2 className="text-[var(--text-primary)] text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">Contact</h2>
    <div className="flex flex-col sm:flex-row gap-4 px-4 py-3">
      <a
        href="https://github.com/ullas9525"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 sm:flex-none min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[var(--accent-color)] text-[var(--text-primary)] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[var(--primary-color)] transition-all duration-300 transform hover:scale-105 gap-2"
      >
        <Github size={20} /> {/* GitHub Icon */}
        <span className="truncate">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/ullas-b-r-624a29294/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 sm:flex-none min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[var(--accent-color)] text-[var(--text-primary)] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[var(--primary-color)] transition-all duration-300 transform hover:scale-105 gap-2"
      >
        <Linkedin size={20} /> {/* LinkedIn Icon */}
        <span className="truncate">LinkedIn</span>
      </a>
      <a
        href="https://www.instagram.com/ullas_br2005/" // Updated Instagram link
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 sm:flex-none min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[var(--accent-color)] text-[var(--text-primary)] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[var(--primary-color)] transition-all duration-300 transform hover:scale-105 gap-2"
      >
        <Instagram size={20} /> {/* Instagram Icon */}
        <span className="truncate">Instagram</span>
      </a>
    </div>
    <p className="text-[var(--text-secondary)] text-lg font-normal leading-relaxed pb-3 pt-1 px-4">
      Email: <a className="text-[var(--primary-color)] hover:underline" href="mailto:ullasbr.2005@gmail.com">ullasbr.2005@gmail.com</a>
    </p>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="text-center py-8 border-t border-[var(--border-color)]">
    <p className="text-[var(--text-secondary)] text-sm">© 2025 Ullas B R. All rights reserved.</p>
  </footer>
);

// Main App Component
const App = () => {
  return (
    <div className="bg-[var(--secondary-color)] text-[var(--text-primary)]" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Header />
          <main className="px-6 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
            <ScrollReveal className="w-full"> {/* Added w-full */}
              <HeroSection />
            </ScrollReveal>
            <ScrollReveal className="w-full" transitionDelay="0.1s"> {/* Added w-full */}
              <AboutSection />
            </ScrollReveal>
            <ScrollReveal className="w-full" transitionDelay="0.2s"> {/* Added w-full */}
              <SkillsSection />
            </ScrollReveal>
            <ScrollReveal className="w-full" transitionDelay="0.3s"> {/* Added w-full */}
              <ProjectsSection />
            </ScrollReveal>
            <ScrollReveal className="w-full" transitionDelay="0.4s"> {/* Added w-full */}
              <ResumeSection />
            </ScrollReveal>
            <ScrollReveal className="w-full" transitionDelay="0.5s"> {/* Added w-full */}
              <ContactSection />
            </ScrollReveal>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
