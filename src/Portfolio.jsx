import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const achievements = [
    "Three-time school-level drawing competition winner",
    "Two-time abacus competition winner", 
    "District-level science fair runner-up among 250+ teams",
    "State-level quiz competition winner among 50+ teams",
    "Regional-level badminton player",
    "Led decoration and organized multiple school events"
  ];

  const navigationItems = ["Home", "About", "Skills", "Projects", "Contact"];

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C", "Java", "Python", "JavaScript", "OOP"]
    },
    {
      title: "Web Technologies", 
      skills: ["Node.js", "Express.js", "RESTful APIs", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"]
    },
    {
      title: "Databases & Tools",
      skills: ["MongoDB", "MySQL", "Git", "GitHub"]
    },
    {
      title: "Soft Skills",
      skills: ["Problem-solving", "Team collaboration", "Project management", "Leadership", "Adaptability"]
    }
  ];

  const projects = [
    {
      title: "NINA - Autonomous Delivery Robot",
      period: "Sep 2023 - Sep 2024", 
      tech: "Embedded C, MERN Stack, Robotics",
      description: "Integrated GPS tracking and led a team to build portfolio website, enhancing system reliability by 25% improving data visualization with 20% faster rendering.",
      highlights: ["Real-time tracking", "30% delay reduction", "Team leadership"]
    },
    {
      title: "FoodDelivery E-commerce Platform",
      period: "Jan 2024 - Apr 2024",
      tech: "React, Node.js, MongoDB, Stripe", 
      description: "Built a responsive full-stack food ordering platform integrated with a payment gateway, increasing mobile engagement by 50% and transaction success by 20%.",
      highlights: ["50% increase", "Stripe integration", "20% better transactions"]
    },
    {
      title: "Wanderlust Travel Platform",
      period: "May 2023 - Aug 2023",
      tech: "MERN Stack, Cloudinary, Mapbox API",
      description: "Engineered a full-stack travel platform with user authentication, increasing user engagement by 35% through enhanced user experience.",
      highlights: ["35% increase", "RESTful APIs", "25% response time"]
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSectionChange = (section) => {
    setActiveSection(section.toLowerCase());
    setIsMenuOpen(false);
  };

  return (
    <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Nasruddin Annapuri</div>
          
          <div className="nav-menu">
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => handleSectionChange(item)}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navigationItems.map((item) => (
              <button
                key={item}
                onClick={() => handleSectionChange(item)}
                className="mobile-nav-link"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Home Section */}
      {activeSection === 'home' && (
        <section className="home-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">Nasruddin Annapuri</h1>
                <h2 className="hero-subtitle">Software Developer</h2>
                <p className="hero-description">
                  Motivated Computer Science student with expertise in full-stack development. 
                  Proven ability to build scalable software solutions and solve complex problems.
                </p>
                <div className="hero-buttons">
                  <button 
                    className="btn-primary"
                    onClick={() => setActiveSection('projects')}
                  >
                    View Projects
                  </button>
                  <a 
                    href="https://portfoliowebsite-5b94.onrender.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Live Portfolio
                  </a>
                </div>
              </div>
              <div className="hero-avatar">
                <div className="avatar-circle">N</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <section className="about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="education-block">
                <h3 className="block-title">Education</h3>
                <div className="education-item">
                  <h4>Parul University (2021 – 2025)</h4>
                  <p>B.Tech in Computer Science and Engineering - AI</p>
                  <p className="highlight">CGPA: 8.65</p>
                </div>
                <div className="education-item">
                  <h4>Narayana Junior College (2019 – 2021)</h4>
                  <p>Intermediate (MPC)</p>
                  <p className="highlight">Percentage: 94.5%</p>
                </div>
              </div>
              
              <div className="contact-block">
                <h3 className="block-title">Contact Information</h3>
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>+91-9676939529</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <a href="mailto:nasruddinannapuri@gmail.com">nasruddinannapuri@gmail.com</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">💼</span>
                    <a href="https://linkedin.com/in/nasruddinannapuri" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🔗</span>
                    <a href="https://github.com/nasruddinannapuri" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <section className="skills-section">
          <div className="container">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category">
                  <h3 className="category-title">{category.title}</h3>
                  <div className="skill-tags">
                    {category.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <section className="projects-section">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-period">{project.period}</p>
                  <p className="project-tech">{project.tech}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-highlights">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className="highlight-tag">{highlight}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="contact-section">
          <div className="container">
            <h2 className="section-title">Achievements & Certifications</h2>
            <div className="contact-grid">
              <div className="achievements-block">
                <h3 className="block-title">Key Achievements</h3>
                <div className="achievements-list">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <span className="achievement-icon">🏆</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="certifications-block">
                <h3 className="block-title">Certifications</h3>
                <div className="certifications-list">
                  <div className="certification-card">
                    <h4>ByteXL Summer Internship 2024</h4>
                    <p className="cert-period">Full Stack Development | Summer 2024</p>
                    <p>Gained hands-on experience in MERN stack development through intensive training program.</p>
                  </div>
                  <div className="certification-card">
                    <h4>Amazon ML Summer School 2023</h4>
                    <p className="cert-period">Machine Learning | Sep 2023 - Oct 2023</p>
                    <p>Completed comprehensive training on ML fundamentals, algorithms, and applications.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-contact">
              <h3>Let's Connect</h3>
              <p>Ready to contribute innovative solutions in dynamic environments</p>
              <div className="footer-links">
                <a href="mailto:nasruddinannapuri@gmail.com">nasruddinannapuri@gmail.com</a>
                <a href="tel:+919676939529">+91-9676939529</a>
                <a href="https://portfoliowebsite-5b94.onrender.com/" target="_blank" rel="noopener noreferrer">Live Portfolio</a>
              </div>
              <div className="copyright">
                <p>© 2024 Nasruddin Annapuri. All rights reserved.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Portfolio;
