import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const mailtoLink = `mailto:official@kou.my.id?subject=Contact from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/fk0u',
      handle: '@fk0u'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/alghani',
      handle: 'alghani'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/kou.sozo',
      handle: '@kou.sozo'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-satoshi text-4xl md:text-5xl font-bold mb-6">
            <span className="text-text-primary">Let's </span>
            <span className="anima-gradient">Connect</span>
          </h2>
          <p className="font-inter text-xl text-text-secondary max-w-3xl mx-auto">
            Ready to bring your digital vision to life? Let's collaborate and create something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-surface p-8 rounded-xl">
            <h3 className="font-satoshi text-2xl font-bold mb-6">
              <span className="anima-gradient">Send a Message</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-inter text-sm font-medium text-text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-primary border border-text-secondary/20 rounded-lg focus:border-anima-cyan focus:outline-none transition-colors duration-300 text-text-primary"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-inter text-sm font-medium text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-primary border border-text-secondary/20 rounded-lg focus:border-anima-cyan focus:outline-none transition-colors duration-300 text-text-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-inter text-sm font-medium text-text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-bg-primary border border-text-secondary/20 rounded-lg focus:border-anima-cyan focus:outline-none transition-colors duration-300 text-text-primary resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 anima-gradient-bg rounded-lg font-inter font-medium text-bg-primary hover:scale-105 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="glass-surface p-8 rounded-xl">
              <h3 className="font-satoshi text-2xl font-bold mb-6">
                <span className="anima-gradient">Direct Contact</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-bg-primary rounded-lg">
                    <Mail className="w-6 h-6 text-anima-cyan" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-text-primary">Email</p>
                    <a
                      href="mailto:official@kou.my.id"
                      className="font-mono text-text-secondary hover-anima"
                    >
                      official@kou.my.id
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-bg-primary rounded-lg">
                    <MapPin className="w-6 h-6 text-anima-magenta" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-text-primary">Location</p>
                    <p className="font-mono text-text-secondary">
                      East Kalimantan, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-surface p-8 rounded-xl">
              <h3 className="font-satoshi text-2xl font-bold mb-6">
                <span className="anima-gradient">Social Networks</span>
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 bg-bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover-anima"
                    >
                      <Icon className="w-6 h-6 text-anima-cyan" />
                      <div>
                        <p className="font-inter font-medium text-text-primary">
                          {social.name}
                        </p>
                        <p className="font-mono text-sm text-text-secondary">
                          {social.handle}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-surface p-8 rounded-xl">
              <h3 className="font-satoshi text-2xl font-bold mb-4">
                <span className="anima-gradient">Availability</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-inter text-text-primary">Available for freelance projects</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-anima-cyan rounded-full"></div>
                  <span className="font-inter text-text-primary">Open to collaboration</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-anima-magenta rounded-full"></div>
                  <span className="font-inter text-text-primary">Seeking internship opportunities</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-bg-primary rounded-lg">
                <p className="font-mono text-sm text-text-secondary">
                  <span className="text-anima-cyan">// </span>
                  Response time: Usually within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;