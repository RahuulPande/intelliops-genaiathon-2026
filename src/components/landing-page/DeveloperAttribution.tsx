'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  User, 
  Mail, 
  Linkedin, 
  Github,
  Award,
  Building,
  CheckCircle,
  ExternalLink,
  Star,
  Code,
  Heart
} from 'lucide-react';

export default function DeveloperAttribution() {
  const openLinkedIn = () => {
    window.open('https://linkedin.com/in/rahuulpande', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:rahuul.pande@gmail.com', '_blank');
  };

  const openGitHub = () => {
    window.open('https://github.com/rahuulpande', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Attribution */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 mb-8">
            {/* Developer Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
                <div className="p-3 bg-white/10 rounded-full">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Developed by Rahuul Pande</h1>
                  <p className="text-blue-200">Senior Software Engineer | AI/ML Specialist</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                <button
                  onClick={openEmail}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">rahuul.pande@gmail.com</span>
                </button>
                
                <button
                  onClick={openLinkedIn}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                
                <button
                  onClick={openGitHub}
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Hackathon Badge */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-xl font-bold"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-6 h-6" />
                  <span className="text-lg">GenAIathon 2026</span>
                </div>
                <div className="text-sm">GenAIathon 2026</div>
                <div className="text-xs mt-1 opacity-80">AI-Powered Operations Platform</div>
              </motion.div>
            </div>
          </div>

          {/* UBS Validation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold">UBS Production Validated</h3>
              <Building className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Core platform concepts proven in production at UBS with <strong className="text-green-400">500K CHF annual savings</strong>. 
              This hackathon prototype scales those proven operational intelligence principles across 
              the complete enterprise software delivery lifecycle.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-4">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="font-semibold">Production Proven</div>
                <div className="text-sm text-gray-400">Real UBS implementation</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="font-semibold">Industry Recognition</div>
                <div className="text-sm text-gray-400">Banking sector validation</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Code className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="font-semibold">Technical Excellence</div>
                <div className="text-sm text-gray-400">Enterprise-grade architecture</div>
              </div>
            </div>
          </motion.div>

          {/* Technical Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Technical Skills */}
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5 text-blue-400" />
                <span>Technical Expertise</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/10 rounded px-3 py-2">AI/ML Engineering</div>
                <div className="bg-white/10 rounded px-3 py-2">Next.js/React</div>
                <div className="bg-white/10 rounded px-3 py-2">TypeScript</div>
                <div className="bg-white/10 rounded px-3 py-2">Python/Data Science</div>
                <div className="bg-white/10 rounded px-3 py-2">AWS/Azure Cloud</div>
                <div className="bg-white/10 rounded px-3 py-2">DevOps/CI-CD</div>
                <div className="bg-white/10 rounded px-3 py-2">Banking Systems</div>
                <div className="bg-white/10 rounded px-3 py-2">Operations Intelligence</div>
              </div>
            </div>

            {/* Platform Features */}
            <div className="bg-white/5 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Built with Passion</span>
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>20+ integrated AI-powered features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>100% responsive mobile-first design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Real-time data processing & visualization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Enterprise-grade architecture & security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Interactive ROI calculator & QR access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Comprehensive documentation & testing</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-300 mb-4 italic">
              "Transforming reactive operations into predictive intelligence through the power of AI"
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={openLinkedIn}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </button>
              <button
                onClick={openEmail}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Discuss Opportunities</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}