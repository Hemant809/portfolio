const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.get('/portfolio', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({
        name: 'Hemant Verma',
        title: 'Full Stack Developer & UI/UX Enthusiast',
        bio: 'Passionate developer crafting elegant solutions with modern technologies. Specialized in building scalable web applications with exceptional user experiences.',
        email: 'hemant.verma@example.com',
        phone: '+91 98765 43210',
        location: 'India',
        github: 'https://github.com/hemantverma',
        linkedin: 'https://linkedin.com/in/hemantverma',
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Next.js', 'Tailwind CSS', 'Docker', 'AWS', 'Git', 'REST APIs', 'GraphQL', 'Redux', 'Framer Motion'],
        projects: [
          {
            title: 'E-Commerce Platform',
            description: 'Full-featured online shopping platform with payment integration, real-time inventory management, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            link: 'https://ecommerce-demo.com',
            github: 'https://github.com/hemantverma/ecommerce'
          },
          {
            title: 'Task Management System',
            description: 'Collaborative project management tool with real-time updates, team collaboration features, and analytics dashboard.',
            technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Tailwind'],
            link: 'https://taskmanager-demo.com',
            github: 'https://github.com/hemantverma/taskmanager'
          },
          {
            title: 'Social Media Dashboard',
            description: 'Analytics platform for social media metrics with data visualization, automated reporting, and multi-platform integration.',
            technologies: ['React', 'Express', 'MongoDB', 'Chart.js', 'AWS'],
            link: 'https://socialdash-demo.com',
            github: 'https://github.com/hemantverma/socialdash'
          }
        ],
        experience: [
          {
            company: 'Tech Innovations Inc.',
            position: 'Senior Full Stack Developer',
            duration: '2022 - Present',
            description: 'Leading development of enterprise web applications, mentoring junior developers, and implementing best practices for code quality and performance optimization.'
          },
          {
            company: 'Digital Solutions Ltd.',
            position: 'Full Stack Developer',
            duration: '2020 - 2022',
            description: 'Developed and maintained multiple client projects, implemented RESTful APIs, and collaborated with cross-functional teams to deliver high-quality solutions.'
          },
          {
            company: 'StartUp Hub',
            position: 'Junior Developer',
            duration: '2019 - 2020',
            description: 'Built responsive web applications, worked with modern JavaScript frameworks, and contributed to open-source projects.'
          }
        ],
        education: [
          {
            institution: 'Indian Institute of Technology',
            degree: 'Bachelor of Technology in Computer Science',
            year: '2015 - 2019'
          },
          {
            institution: 'Online Certifications',
            degree: 'AWS Certified Developer & MongoDB Professional',
            year: '2021'
          }
        ]
      });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/portfolio', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
