import { about } from '../../data/profile';
import Icon from '../ui/Icons';
import SectionHeading, { Reveal } from '../ui/SectionHeading';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

export default function About() {
  return (
    <section className="section" id="about" aria-label="About Ullas B R">
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
              itemScale={0.04}
              baseScale={0.9}
              itemStackDistance={26}
              stackPosition="16%"
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