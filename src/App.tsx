import { MotionConfig } from 'framer-motion';
import { About } from './components/About';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { ScrollChrome } from './components/ScrollChrome';
import { Skills } from './components/Skills';
import { useLanguage } from './i18n/LanguageProvider';

export default function App() {
  const { t } = useLanguage();
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 start-3 z-[70] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform focus:translate-y-0"
      >
        {t.a11y.skip}
      </a>
      <div id="top" />
      <ScrollChrome />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
