import React from "react";
import { motion, AnimatePresence } from 'framer-motion';

// Composant Compétences Clés avec un design orbital
const Skills = () => {
    const skills = [
      { id: 1, name: "Intelligence Artificielle", level: 90 },
      { id: 2, name: "Cloud Computing", level: 85 },
      { id: 3, name: "Analyse de Données", level: 80 },
      { id: 4, name: "Développement Web", level: 75 },
      { id: 5, name: "Cybersécurité", level: 70 },
    ];
  
    return (
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-gray-900 to-gray-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Compétences Clés</h2>
          <div className="flex flex-wrap justify-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="w-64 h-64 m-4 relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id={`gradient-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="transparent" stroke="#1F2937" strokeWidth="8" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={`url(#gradient-${skill.id})`}
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: skill.level / 100 }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <motion.span
                    className="text-4xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 1 }}
                  >
                    {skill.level}%
                  </motion.span>
                  <motion.span
                    className="text-sm text-cyan-300 text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 1.2 }}
                  >
                    {skill.name}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Skills;