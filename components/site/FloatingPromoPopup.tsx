import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingPromoPopupProps {
  scrollToPromo: () => void;
}

const FloatingPromoPopup: React.FC<FloatingPromoPopupProps> = ({ scrollToPromo }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds of user being on the page
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Clean up timeout
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setHasInteracted(true);
    scrollToPromo();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  // If user has already interacted with popup, don't show it again
  if (hasInteracted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            x: 30,
            transition: { 
              type: "spring", 
              stiffness: 400, 
              damping: 15 
            }
          }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 z-50 cursor-pointer shadow-2xl"
          onClick={handleClick}
        >
          <div className="relative max-w-xs bg-blue-600 text-white rounded-lg p-5 shadow-lg transform transition-transform hover:scale-105">
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <div className="mr-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                  className="text-3xl"
                >
                  🎁
                </motion.div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Спеціальна пропозиція!</h3>
                <p className="text-sm">Підключіться зараз та отримайте 2 місяці безкоштовного інтернету!</p>
              </div>
            </div>
            
            <motion.div 
              className="mt-3 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="inline-block bg-white text-blue-700 font-semibold px-4 py-2 rounded-full text-sm">
                Дізнатись більше
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPromoPopup;