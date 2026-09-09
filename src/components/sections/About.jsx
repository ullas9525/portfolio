import { useEffect, useState } from 'react';
import { about } from '../../data/profile';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

// Mobile gets a tighter stack: last card must fit inside the 540px stage
// (end scale 0.88 + 6*0.02 = 1.0 exactly, vs 1.14 on desktop which overflows)
function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);
  return isMobile;
}

export default function About() {
  const isMobile = useIsMobile();
  return (
    <section className="section" id="about" aria-label="About Me">
      <div className="wrap">
        <SectionHeading
          eyebrow="01 · About"
          title={about.heading}
          sub={about.intro}
        />

        <Reveal>
          <div className="about-stage">
            <ScrollStack
              itemDistance={90}
              itemScale={isMobile ? 0.02 : 0.04}
              baseScale={isMobile ? 0.88 : 0.9}
              itemStackDistance={isMobile ? 18 : 26}
              stackPosition={isMobile ? '14%' : '16%'}
              blurAmount={2}
            >
              {about.blocks.map((block) => (
                <ScrollStackItem key={block.id} itemClassName="about-scard">
                  <span className="about-scard-icon">
                    <Icon name={block.icon} size={26} />
                  </span>
                  <span className="about-scard-num">
                    {String(about.blocks.indexOf(block) + 1).padStart(2, '0')}
                  </span>
                  <span className="about-scard-body">
                    <h3>{block.title}</h3>
                    <p>{block.text}</p>
                  </span>
                </ScrollStackItem>
              ))}
            </ScrollStack>
            <p className="about-hint">scroll the stack ↓</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}