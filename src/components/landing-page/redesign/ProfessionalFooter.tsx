'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink,
  Award,
  Users,
  Building,
  Calendar
} from 'lucide-react';

export interface ProfessionalFooterProps {
  onNavigateToSection: (section: string) => void;
}

export default function ProfessionalFooter({ onNavigateToSection }: ProfessionalFooterProps) {
  const developerInfo = {
    name: "Rahuul Pande",
    title: "Senior Software Engineer & AI Solutions Architect",
    company: "IntelliOps AI",
    email: "rahuul.pande@intelliops.ai",
    phone: "+1 (555) 123-4567",
    location: "Zurich, Switzerland",
    linkedin: "https://linkedin.com/in/rahuulpande",
    github: "https://github.com/rahuulpande"
  };

  const platformFeatures = [
    {
      category: "Service Health & Incident Management",
      features: [
        "Real-time Monitoring Dashboard",
        "Incident Orchestration Center", 
        "Continuous Log Analysis",
        "Auto Incident Generation"
      ]
    },
    {
      category: "Intelligent Test Quality",
      features: [
        "AI-Powered Defect Intelligence",
        "Quality Metrics Dashboard",
        "Test Management Suite",
        "Performance Intelligence"
      ]
    },
    {
      category: "Release Management",
      features: [
        "AI Release Health Scoring",
        "Deployment Intelligence",
        "Branch Management AI",
        "Release Readiness Assessment"
      ]
    },
    {
      category: "Business Intelligence",
      features: [
        "Financial Intelligence Suite",
        "Operational Analytics",
        "ROI Value Tracking",
        "License Management"
      ]
    }
  ];

  const quickLinks = [
    { name: "Service Health Demo", action: () => onNavigateToSection('service-health-intelligence') },
    { name: "AI Intelligence Demo", action: () => onNavigateToSection('test-quality-intelligence') },
    { name: "Release Management", action: () => onNavigateToSection('release-intelligence') },
    { name: "Business Analytics", action: () => onNavigateToSection('business-intelligence') },
    { name: "Settings & Config", action: () => onNavigateToSection('settings') }
  ];

  const achievements = [
    { icon: Award, label: "Banking Industry Certified", value: "SOC 2 Compliant" },
    { icon: Users, label: "Enterprise Customers", value: "500+" },
    { icon: Building, label: "Financial Institutions", value: "50+" },
    { icon: Calendar, label: "Years of Experience", value: "8+" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Developer Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Lead Developer</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold">{developerInfo.name}</div>
                  <div className="text-blue-100 text-sm">{developerInfo.title}</div>
                  <div className="text-blue-200 text-sm">{developerInfo.company}</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${developerInfo.email}`} className="hover:text-blue-200 transition-colors">
                      {developerInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{developerInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{developerInfo.location}</span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <a
                    href={developerInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={developerInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Platform Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6">Platform Capabilities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {platformFeatures.map((category, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-blue-400">{category.category}</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="hover:text-white transition-colors cursor-pointer">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-bold mb-6">Quick Navigation</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 5 }}
                  onClick={link.action}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full text-left"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{link.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Demo Shortcuts */}
            <div className="mt-8 bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Demo Shortcuts</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Ctrl/Cmd + 1: Service Health</div>
                <div>Ctrl/Cmd + 2: AI Intelligence</div>
                <div>Ctrl/Cmd + 3: Release Management</div>
                <div>Ctrl/Cmd + 4: Analytics</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-gray-800 rounded-lg p-4"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg mb-2">
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div className="text-lg font-bold text-blue-400">{achievement.value}</div>
                <div className="text-sm text-gray-300">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-gray-700 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              © 2024 IntelliOps AI. Developed by Rahuul Pande for Enterprise IT Operations Excellence.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6 text-sm text-gray-400">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Security</span>
                <span>Compliance</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Built with Next.js 14, TypeScript, and enterprise-grade security standards for banking environments.
              Featuring 40+ integrated capabilities designed for production-scale IT operations.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}