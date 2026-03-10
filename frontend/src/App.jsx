import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExternalLinkAlt, FaMoon, FaSun, FaCode, FaRocket, FaLightbulb, FaTrophy, FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaGitAlt } from 'react-icons/fa';
import './App.css';

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    fetch('https://portfolio-1vjy.onrender.com/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  if (loading) return <div className="loading"><div className="spinner"></div></div>;
  if (!portfolio) return <div className="error">Failed to load portfolio</div>;

  return (
    <div className="portfolio">
      <motion.div 
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <Navbar />
      <Hero portfolio={portfolio} />
      <Stats />
      <About portfolio={portfolio} />
      <Skills />
      <Projects projects={portfolio?.projects || []} />
      <Experience experience={portfolio?.experience || []} />
      <Education education={portfolio?.education || []} />
      <Contact portfolio={portfolio} />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-content">
        <motion.div className="logo" whileHover={{ scale: 1.1 }}>
          <FaCode /> Portfolio
        </motion.div>
        <div className="nav-links">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function Hero({ portfolio }) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-badge"
        >
          <FaRocket /> Available for Opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Hi, I'm <span className="gradient-text">{portfolio.name}</span>
        </motion.h1>

        <div className="typing-container">
          <TypeAnimation
            sequence={[
              portfolio.title,
              2000,
              'Electronics Engineering',
              2000,
              'Data Analyst',
              2000,
              'Backend Developer ( FastAPI )',
              2000,
              'Solving Complex Problems',
              2000,
              'Accounting & GST Professional',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {portfolio.bio}
        </motion.p>

        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a href="#contact" className="btn-primary">
            <FaEnvelope /> Get In Touch
          </a>
          <a href="#projects" className="btn-secondary">
            <FaRocket /> View Projects
          </a>
        </motion.div>

        <motion.div 
          className="social-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a href={portfolio.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
            <FaGithub />
          </motion.a>
          <motion.a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
            <FaLinkedin />
          </motion.a>
          <motion.a href={`mailto:${portfolio.email}`} whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
            <FaEnvelope />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const stats = [
    { icon: <FaCode />, value: '5+', label: 'Projects Completed' },
    { icon: <FaRocket />, value: '10+', label: 'Technologies' },
    { icon: <FaLightbulb />, value: '50+', label: 'Problems Solved' },
    { icon: <FaTrophy />, value: '3+', label: 'Live Deployments' },
  ];

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {stat.value}
            </motion.h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About({ portfolio }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="about" className="section about-section" ref={ref}>
      <motion.div
        className="about-content"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="about-text"
        >
           I am a B.Tech Electronics Engineering student with strong interest in web development and technology. I have experience building web applications using HTML, CSS, JavaScript, FastAPI and the MERN stack. Along with my technical skills, I also have 4+ years of experience in accounting, working with Tally ERP and GST. I enjoy solving real-world problems through technology and continuously improving my development skills.
        </motion.p>
      </motion.div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'C++', icon: <FaCode /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'DSA', icon: <FaCode /> },
        { name: 'Oops', icon: <FaCode /> }
      ]
    },
    {
      title: 'Frontend Development',
      skills: [
        { name: 'HTML', icon: <FaHtml5 /> },
        { name: 'CSS', icon: <FaCss3Alt /> },
        { name: 'Bootstrap', icon: <FaCode /> },
        { name: 'Tailwind CSS', icon: <FaCode /> },
        { name: 'React', icon: <FaReact /> }
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Express.js', icon: <FaNodeJs /> },
        { name: 'FastAPI', icon: <FaPython /> }
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', icon: <FaDatabase /> },
        { name: 'MySQL', icon: <FaDatabase /> }
      ]
    },
    {
      title: ' Other Skills',
      skills: [
        { name: 'Advanced Ms Excel | Ms Word', icon: <FaCode /> },
        { name: 'Tally ERP-9', icon: <FaCode /> },
        { name: 'Tally Prime', icon: <FaCode /> }
      ]
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Git', icon: <FaCode /> },
        { name: 'Github', icon: <FaCode /> },
        { name: 'LT - Spice', icon: <FaCode /> },
        { name: 'MATLAB', icon: <FaCode /> }
      ]
    }
  ];

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        Skills & Technologies
      </motion.h2>
      <div className="skills-categories">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            className="skill-category"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: catIndex * 0.1 }}
          >
            <h3 className="category-title">{category.title}</h3>
            <div className="category-skills">
              {category.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  className="skill-card"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-name">{skill.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects({ projects }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        Featured Projects
      </motion.h2>
      <div className="projects-grid">
        {projects?.map((project, i) => (
          <motion.div
            key={i}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div className="project-glow"></div>
            <div className="project-header">
              <h3>{project.title}</h3>
              <div className="project-links">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="View on GitHub"
                  >
                    <FaGithub />
                  </a>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="View Live Demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.technologies.map((tech, j) => (
                <span key={j} className="tech-tag">{tech}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience({ experience }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        Work Experience
      </motion.h2>
      <div className="timeline">
        {experience?.map((exp, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <motion.div 
              className="timeline-content"
              whileHover={{ scale: 1.02 }}
            >
              <div className="timeline-dot"></div>
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              <span className="duration">{exp.duration}</span>
              <p>{exp.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Education({ education }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section education-section" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        Education
      </motion.h2>
      <div className="education-grid">
        {education?.map((edu, i) => (
          <motion.div
            key={i}
            className="education-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            <div className="edu-glow"></div>
            <h3>{edu.degree}</h3>
            <h4>{edu.institution}</h4>
            <span className="year">{edu.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact({ portfolio }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        Let's Work Together
      </motion.h2>
      <motion.p
        className="contact-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        Have a project in mind? Let's create something amazing together!
      </motion.p>
      <motion.div
        className="contact-info"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4 }}
      >
        <motion.div className="contact-item" whileHover={{ scale: 1.05 }}>
          <FaEnvelope />
          <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
        </motion.div>
        {/* <motion.div className="contact-item" whileHover={{ scale: 1.05 }}>
          <FaPhone />
          <span>{portfolio.phone}</span>
        </motion.div> */}
        <motion.div className="contact-item" whileHover={{ scale: 1.05 }}>
          <FaMapMarkerAlt />
          <span>{portfolio.location}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default App;
