'use client';

import { motion } from 'framer-motion';
import { Code, Database, Cloud, Shield, Cpu, BarChart3 } from 'lucide-react';

export default function TechnologyStack() {
  const technologies = [
    {
      category: "Frontend Architecture",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "Next.js 14", description: "App Router & Server Components" },
        { name: "TypeScript", description: "Type-safe development" },
        { name: "Tailwind CSS", description: "Utility-first styling" },
        { name: "Framer Motion", description: "Production animations" }
      ]
    },
    {
      category: "Data Management",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      technologies: [
        { name: "React Query", description: "Server state management" },
        { name: "Zustand", description: "Global state management" },
        { name: "PostgreSQL", description: "Enterprise database" },
        { name: "Redis", description: "High-performance caching" }
      ]
    },
    {
      category: "Cloud Infrastructure",
      icon: Cloud,
      color: "from-purple-500 to-violet-500",
      technologies: [
        { name: "Vercel", description: "Edge deployment platform" },
        { name: "AWS", description: "Scalable cloud services" },
        { name: "Docker", description: "Containerized deployment" },
        { name: "Kubernetes", description: "Container orchestration" }
      ]
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      technologies: [
        { name: "OAuth 2.0", description: "Secure authentication" },
        { name: "SOC 2", description: "Security compliance" },
        { name: "Encryption", description: "Data protection at rest" },
        { name: "RBAC", description: "Role-based access control" }
      ]
    },
    {
      category: "AI & Machine Learning",
      icon: Cpu,
      color: "from-orange-500 to-yellow-500",
      technologies: [
        { name: "TensorFlow", description: "Deep learning models" },
        { name: "OpenAI API", description: "Natural language processing" },
        { name: "Python", description: "ML pipeline development" },
        { name: "Apache Kafka", description: "Real-time data streaming" }
      ]
    },
    {
      category: "Analytics & Monitoring",
      icon: BarChart3,
      color: "from-indigo-500 to-blue-500",
      technologies: [
        { name: "Recharts", description: "Interactive visualizations" },
        { name: "Prometheus", description: "Metrics collection" },
        { name: "Grafana", description: "Monitoring dashboards" },
        { name: "ElasticSearch", description: "Log analysis & search" }
      ]
    }
  ];

  const certifications = [
    "SOC 2 Type II Certified",
    "ISO 27001 Compliant",
    "GDPR Ready",
    "HIPAA Compatible",
    "PCI DSS Level 1"
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Enterprise-Grade Technology Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with cutting-edge technologies and banking-grade security standards
          </p>
        </motion.div>

        {/* Technology Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {technologies.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              {/* Technologies List */}
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white">{tech.name}</div>
                      <div className="text-sm text-gray-300">{tech.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Security & Compliance Certifications</h3>
          <div className="grid md:grid-cols-5 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="text-sm font-medium text-center">{cert}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-4 gap-8"
        >
          {[
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Response Time", value: "<100ms" },
            { label: "Data Centers", value: "15+" },
            { label: "Security Scans", value: "24/7" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Production-Ready Architecture</h3>
            <p className="text-green-100 max-w-3xl mx-auto">
              Designed for enterprise scale with microservices architecture, 
              event-driven processing, and real-time analytics capable of handling 
              millions of transactions per day with sub-second response times.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}