'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Tablet, 
  Monitor,
  Download,
  Share2,
  QrCode,
  CheckCircle,
  Copy,
  ExternalLink,
  Zap,
  Eye,
  Mouse,
  Wifi
} from 'lucide-react';

export default function MobileAccessSection() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showCopied, setShowCopied] = useState(false);

  // Generate QR code URL using a QR code API service
  const generateQRCode = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://intelliops-ai.com';
    // Using QR Server API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&format=png&margin=10`;
  };

  const downloadQR = () => {
    const qrUrl = generateQRCode();
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'intelliops-ai-mobile-access.png';
    link.target = '_blank';
    link.click();
  };

  const shareLink = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://intelliops-ai.com';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IntelliOps AI - Mobile Access',
          text: 'Experience IntelliOps AI on your mobile device - 100% responsive dashboard',
          url: currentUrl
        });
      } catch (err) {
        console.log('Share canceled or failed');
      }
    } else {
      // Fallback to clipboard copy
      try {
        await navigator.clipboard.writeText(currentUrl);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.log('Clipboard copy failed');
      }
    }
  };

  const copyUrl = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://intelliops-ai.com';
    try {
      await navigator.clipboard.writeText(currentUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.log('Clipboard copy failed');
    }
  };

  return (
    <div className="py-20 bg-white" id="mobile-access">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Smartphone className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Experience on Mobile</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            100% responsive design - full dashboard functionality on any device. 
            No app download required, works directly in your mobile browser.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 inline-block border-2 border-gray-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
                <QrCode className="w-6 h-6 text-blue-600" />
                <span>Scan to Access</span>
              </h3>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
                <img
                  src={generateQRCode()}
                  alt="QR Code for IntelliOps AI Mobile Access"
                  className="w-48 h-48 mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjNmI3Mjgw">UVIgQ29kZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Simply scan with your phone's camera or any QR scanner app
              </p>
              
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Dashboard URL:</div>
                  <div className="text-sm font-mono text-gray-800 break-all">
                    {typeof window !== 'undefined' ? window.location.origin : 'https://intelliops-ai.com'}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={downloadQR}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR</span>
                  </button>
                  
                  <button
                    onClick={shareLink}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Link</span>
                  </button>
                  
                  <button
                    onClick={copyUrl}
                    className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                
                {showCopied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-green-600 text-sm font-medium"
                  >
                    ✅ Link copied to clipboard!
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Mobile Features Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Works on All Devices</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Mobile</div>
                  <div className="text-sm text-gray-600">iOS & Android</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Tablet className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Tablet</div>
                  <div className="text-sm text-gray-600">iPad & Android</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Monitor className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Desktop</div>
                  <div className="text-sm text-gray-600">All browsers</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Mobile Experience Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Real-time data updates and live dashboards</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Mouse className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Touch-optimized interface with gesture support</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Monitor className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800 font-medium">Full desktop functionality on mobile</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="text-orange-800 font-medium">Progressive web app with offline capabilities</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Wifi className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">Works with any internet connection</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h4 className="font-bold text-green-900 mb-2">✨ No App Store Required</h4>
              <p className="text-green-800 text-sm leading-relaxed">
                Unlike traditional mobile apps, IntelliOps AI runs directly in your browser. 
                No downloads, no app store approvals, no storage space required. 
                Just scan the QR code and start using the full platform immediately.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => window.open(typeof window !== 'undefined' ? window.location.href : '', '_blank')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open in New Tab (Test Mobile View)</span>
              </button>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
}