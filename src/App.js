import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

// Composant pour l'animation Three.js (uniquement sur la page d'accueil)
const AnimatedBackground = () => {
  const groupRef = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current;
      const positions = new Float32Array(1000 * 3);
      const scales = new Float32Array(1000);

      for (let i = 0; i < 1000; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        scales[i] = Math.random();
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={particlesRef} />
        <pointsMaterial
          size={0.015}
          color="#00FFFF"
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Composant principal du portfolio
const ImprovedPortfolio = () => {
  const [currentSection, setCurrentSection] = useState('accueil');
  const sections = ['accueil', 'projets', 'compétences', 'contact'];
  const containerRef = useRef(null);

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - windowHeight / 2 && 
              scrollPosition < offsetTop + offsetHeight - windowHeight / 2) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-900 bg-opacity-80">
      <ul className="flex justify-center space-x-6">
        {sections.map((section) => (
          <motion.li
            key={section}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => scrollTo(section)}
              className={`text-white text-xl font-bold transition-all duration-300 ${
                currentSection === section ? 'border-b-2 border-cyan-400' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );

  const Home = () => (
    <section id="accueil" className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      <Canvas className="absolute inset-0">
        <AnimatedBackground />
      </Canvas>
      <div className="text-center z-20">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold text-white mb-4"
        >
          Mathieu Vialatte
        </motion.h1>
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl text-cyan-400 mb-8"
        >
          Consultant en transformation digitale
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Expert en IA, développement web et conseil stratégique
        </motion.p>
      </div>
    </section>
  );

  const Projects = () => {
    const projects = [
      {
        title: "IA Pédagogique",
        description: "Réduction de 90% du temps de préparation des enseignants",
        icon: "🤖",
      },
      {
        title: "Transformation PME",
        description: "Amélioration de 35% de l'efficacité opérationnelle",
        icon: "📈",
      },
      {
        title: "Contenu Auto-généré",
        description: "Réduction de 80% du temps de création",
        icon: "✍️",
      },
    ];

    return (
      <section id="projets" className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Projets Innovants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Skills = () => {
    const skills = [
      { name: "IA/ML", level: 90 },
      { name: "Développement Web", level: 85 },
      { name: "Cloud & DevOps", level: 80 },
      { name: "Intégration CRM", level: 75 },
      { name: "Conseil Stratégique", level: 95 },
    ];

    return (
      <section id="compétences" className="min-h-screen flex items-center justify-center bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Compétences Clés</h2>
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="relative h-8 bg-gray-700 rounded-full overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{ width: `${skill.level}%` }}
                  whileHover={{ scale: 1.05 }}
                />
                <span className="absolute inset-0 flex items-center justify-between px-4 text-white font-semibold">
                  {skill.name}
                  <span>{skill.level}%</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Contact = () => (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Contactez-moi</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 inline-block"
        >
          <p className="text-gray-800 text-xl mb-4">mathieuvialattejobs@gmail.com</p>
          <p className="text-gray-800 text-xl mb-6">+33 7 87 70 69 06</p>
          <motion.a
            href="mailto:mathieuvialattejobs@gmail.com"
            className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Envoyer un message
          </motion.a>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className="bg-gray-900" ref={containerRef}>
      <Navbar />
      <Home />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default ImprovedPortfolio;