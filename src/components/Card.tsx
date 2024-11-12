import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ emoji, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <motion.div
      className="relative w-24 h-32 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className={`absolute w-full h-full rounded-xl transition-all duration-500 transform preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white text-2xl font-bold border-2 border-white">
            ?
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-4xl ${
            isMatched ? 'opacity-50' : ''
          }`}>
            {emoji}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}