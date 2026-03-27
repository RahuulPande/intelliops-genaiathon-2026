'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Monitor, Tablet, Wifi, Download, Share2, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import { getAppUrl } from '@/lib/utils/formatters';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [currentURL, setCurrentURL] = useState<string>('');
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const url = getAppUrl();
    setCurrentURL(url);
    
    // Generate QR code
    QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1f2937', // Dark gray
          light: '#ffffff' // White
        }
      }).then(dataURL => {
        setQrCodeDataURL(dataURL);
      }).catch(err => {
        console.error('Error generating QR code:', err);
      });

    // Detect device type (client-side only)
    if (typeof window !== 'undefined') {
      const detectDevice = () => {
        const width = window.innerWidth;
        if (width < 768) {
          setDeviceType('mobile');
        } else if (width < 1024) {
          setDeviceType('tablet');
        } else {
          setDeviceType('desktop');
        }
      };

      detectDevice();
      window.addEventListener('resize', detectDevice);
      return () => window.removeEventListener('resize', detectDevice);
    }
  }, []);

  const downloadQRCode = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.download = 'dashboard-qr-code.png';
      link.href = qrCodeDataURL;
      link.click();
    }
  };

  const shareURL = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Health Monitor Dashboard',
          text: 'Access the AI Health Monitor Dashboard on your mobile device',
          url: currentURL,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(currentURL);
      // You might want to show a toast notification here
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    <QrCode className="w-6 h-6 mr-2" />
                    📱 Mobile Access
                  </h2>
                  <p className="text-blue-100 mt-1 text-sm">
                    Scan to experience on your phone
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              {/* QR Code */}
              <div className="mb-6">
                {qrCodeDataURL ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block p-4 bg-gray-50 rounded-2xl border-2 border-gray-200"
                  >
                    <img 
                      src={qrCodeDataURL} 
                      alt="QR Code for Dashboard Access" 
                      className="w-48 h-48 mx-auto"
                    />
                  </motion.div>
                ) : (
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-2xl flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  No App Download Required
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Simply scan this QR code with your phone's camera or QR scanner app. 
                  The dashboard will open directly in your mobile browser with full functionality.
                </p>
                
                {/* URL Display */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Dashboard URL:</div>
                  <div className="text-sm font-mono text-gray-800 break-all">
                    {currentURL}
                  </div>
                </div>
              </div>

              {/* Device Compatibility */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  ✅ Works on all devices
                </h4>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className={`p-3 rounded-full ${deviceType === 'mobile' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Mobile</div>
                  </div>
                  <div className="text-center">
                    <div className={`p-3 rounded-full ${deviceType === 'tablet' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      <Tablet className="w-6 h-6" />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Tablet</div>
                  </div>
                  <div className="text-center">
                    <div className={`p-3 rounded-full ${deviceType === 'desktop' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      <Monitor className="w-6 h-6" />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Desktop</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadQRCode}
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={shareURL}
                  className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </motion.button>
              </div>

              {/* Benefits */}
              <div className="mt-6 text-left">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  🚀 Mobile Experience Highlights:
                </h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <Wifi className="w-3 h-3 mr-2 text-green-500" />
                    Real-time data updates
                  </li>
                  <li className="flex items-center">
                    <Smartphone className="w-3 h-3 mr-2 text-blue-500" />
                    Touch-optimized interface
                  </li>
                  <li className="flex items-center">
                    <Monitor className="w-3 h-3 mr-2 text-purple-500" />
                    Full desktop functionality
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}