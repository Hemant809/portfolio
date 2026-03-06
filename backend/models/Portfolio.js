const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  github: String,
  linkedin: String,
  skills: [String],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String,
    github: String
  }],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    year: String
  }]
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
