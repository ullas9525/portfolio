import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/ui/Navbar';
import Loader from './components/ui/Loader';
import TargetCursor from './components/ui/TargetCursor';
import Hero from './components/sections/Hero';
import Footer from './components/sections/Footer';

const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const FlutterSection = lazy(() => import('./components/sections/FlutterSection'));
const AISection = lazy(() => import('./components/sections/AISection'));
const IoT = lazy(() => import('./components/sections/IoT'));
const DSASection = lazy(() => import('./components/sections/DSASection'));
const GitHubSection = lazy(() => import('./components/sections/GitHubSection'));
const Education = lazy(() => import('./components/sections/Education'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Resume = lazy(() => import('./components/sections/Resume'));
const Contact = lazy(() => import('./components/sections/Contact'));

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#e8eef7"
        cursorColorOnTarget="#22d3ee"
        targetSelector=".btn, a, button, .ag-panel, [role='tab']"
      />
      <ScrollProgress />
      <Loader hide={ready} />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <FlutterSection />
          <AISection />
          <IoT />
          <DSASection />
          <GitHubSection />
          <Education />
          <Experience />
          <Achievements />
          <Resume />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}