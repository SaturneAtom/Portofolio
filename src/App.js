import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Composant ChatbotAI
import ChatbotAI from './AI/ChatbotAI';
import CertificationsGallery from './components/CertificationsGallery';


// Views import
import Contact from './views/Contact';
import Skills from './views/Skills';

// Composant AnimatedScene
const AnimatedScene = () => {
  const groupRef = useRef();
  const { viewport } = useThree();

  const particleCount = 500;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    return geometry;
  }, []);

  const pointsMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 0.015,
    color: "#00FFFF",
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.7,
  }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.075) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={particles} material={pointsMaterial} />
      <Text
        position={[0, 0.5, 0]}
        fontSize={viewport.width * 0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        depthTest={false}
      >
        Mathieu Vialatte
      </Text>
      <Text
        position={[0, -0.5, 0]}
        fontSize={viewport.width * 0.02}
        color="#00FFFF"
        anchorX="center"
        anchorY="middle"
        depthTest={false}
      >
        Consultant en transformation digitale
      </Text>
    </group>
  );
};

// Composant principal App
const App = () => {
  const [currentSection, setCurrentSection] = useState('accueil');
  const sections = ['accueil', 'projets', 'compétences', 'contact'];

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
    <nav className="fixed top-0 left-0 right-0 z-50 p-2 bg-gray-900 bg-opacity-80">
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

  return (
    <div className="bg-gray-900">
      <Navbar />
      <section id="accueil" className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AnimatedScene />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
       </Canvas>
      </section>


      <Skills />
      
      <CertificationsGallery />
      <Contact />
      <ChatbotAI />
    </div>
  );
};

export default App;