import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, useGLTF, Html, Float} from '@react-three/drei';
import Contact from './components/Contact';

// Composant pour l'animation Three.js et le texte 3D
const AnimatedScene = () => {
  const groupRef = useRef();
  const particlesRef = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current;
      const positions = new Float32Array(2000 * 3);
      const scales = new Float32Array(2000);

      for (let i = 0; i < 2000; i++) {
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
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
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
      <Text
        position={[0, 0.5, 0]}
        fontSize={viewport.width * 0.07}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Mathieu Vialatte
      </Text>
      <Text
        position={[0, -0.5, 0]}
        fontSize={viewport.width * 0.03}
        color="#00FFFF"
        anchorX="center"
        anchorY="middle"
      >
        Consultant en transformation digitale
      </Text>
    </group>
  );
};

// Composant principal du portfolio
const IntegratedPortfolio = () => {
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
      <Canvas camera={{ position: [0, 0, 5] }}>
        <AnimatedScene />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </section>
  );

 /// Composant pour la section Projets
// Composant pour créer une forme 3D dynamique
const DynamicShape = ({ position, color, speed }) => {
    const meshRef = useRef();
    const [geometry] = useState(() => {
      const shapes = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.TorusGeometry(0.7, 0.3, 16, 100)
      ];
      return shapes[Math.floor(Math.random() * shapes.length)];
    });
  
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01 * speed;
        meshRef.current.rotation.y += 0.015 * speed;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
      }
    });
  
    return (
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    );
  };
  
  const ProjectCard = ({ project, index, setActiveProject }) => {
    return (
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 cursor-pointer"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(0,255,255)" }}
        onClick={() => setActiveProject(project)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <h3 className="text-2xl font-bold text-cyan-300 mb-2">{project.title}</h3>
        <p className="text-white mb-4">{project.shortDescription}</p>
        <div className="text-sm text-cyan-200">Cliquez pour plus de détails</div>
      </motion.div>
    );
  };
  
  const ProjectDetail = ({ project, onClose }) => {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full mx-4"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-4">{project.title}</h2>
          <p className="text-white mb-6">{project.fullDescription}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">Technologies utilisées:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-cyan-700 text-white px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">Résultats clés:</h3>
            <ul className="list-disc list-inside text-white">
              {project.keyResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={onClose}
            className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-colors"
          >
            Fermer
          </button>
        </motion.div>
      </motion.div>
    );
  };
  
  const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
    const projects = [
      {
        title: "IA Pédagogique Révolutionnaire",
        shortDescription: "Transformation de l'éducation par l'IA",
        fullDescription: "Développement d'une plateforme d'IA avancée qui révolutionne la préparation des cours et l'expérience d'apprentissage des étudiants. Cette solution utilise le traitement du langage naturel et l'apprentissage automatique pour créer des plans de cours personnalisés et des exercices adaptés à chaque élève.",
        technologies: ["Python", "TensorFlow", "NLP", "React", "Node.js"],
        keyResults: [
          "Réduction de 90% du temps de préparation des enseignants",
          "Amélioration de 40% des résultats des étudiants",
          "Adoption par plus de 500 écoles dans 3 pays"
        ],
        color: "#00ffff",
        position: [-2, 0, 0],
        speed: 1
      },
      {
        title: "Transformation Digitale PME",
        shortDescription: "Modernisation complète des processus d'entreprise",
        fullDescription: "Conception et mise en œuvre d'une stratégie de transformation digitale complète pour les PME, intégrant des solutions cloud, l'automatisation des processus et l'analyse de données avancée. Ce projet a permis aux entreprises de rester compétitives dans un marché en constante évolution.",
        technologies: ["Cloud Computing", "RPA", "Big Data", "BI Tools", "Agile"],
        keyResults: [
          "Amélioration de 35% de l'efficacité opérationnelle globale",
          "Réduction des coûts de 25% grâce à l'automatisation",
          "Augmentation de 50% de la satisfaction client"
        ],
        color: "#ff00ff",
        position: [0, 0, 0],
        speed: 1.2
      },
      {
        title: "Plateforme de Contenu Auto-généré",
        shortDescription: "Révolution dans la création de contenu digital",
        fullDescription: "Création d'une plateforme innovante utilisant l'IA générative pour produire du contenu marketing de haute qualité. Cette solution combine des modèles de langage avancés avec des algorithmes d'analyse de tendances pour générer des articles, des posts sur les réseaux sociaux et des scripts vidéo parfaitement adaptés à chaque marque.",
        technologies: ["GPT-3", "Machine Learning", "Content Analysis", "AWS", "Vue.js"],
        keyResults: [
          "Réduction de 80% du temps de création de contenu",
          "Augmentation de 60% de l'engagement sur les réseaux sociaux",
          "Adoption par plus de 100 marques internationales"
        ],
        color: "#ffff00",
        position: [2, 0, 0],
        speed: 0.8
      }
    ];
  
    return (
      <section id="projets" className="min-h-screen py-20 relative">
        <Canvas className="absolute inset-0">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            {projects.map((project, index) => (
              <DynamicShape
                key={index}
                position={project.position}
                color={project.color}
                speed={project.speed}
              />
            ))}
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 text-center">Projets Innovants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                setActiveProject={setActiveProject}
              />
            ))}
          </div>
        </div>
        <AnimatePresence>
          {activeProject && (
            <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />
          )}
        </AnimatePresence>
      </section>
    );
  };


  ////////////////////////

  const SkillNode = ({ skill, position, color }) => {
    const mesh = useRef();
  
    useFrame((state) => {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    });
  
    return (
      <group position={position}>
        <mesh ref={mesh}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
      </group>
    );
  };
  
  const SkillsNetwork = ({ skills }) => {
    const lines = useMemo(() => {
      const linesGeometry = new THREE.BufferGeometry();
      const positions = [];
      for (let i = 0; i < skills.length; i++) {
        for (let j = i + 1; j < skills.length; j++) {
          positions.push(...skills[i].position);
          positions.push(...skills[j].position);
        }
      }
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      return linesGeometry;
    }, [skills]);
  
    return (
      <group>
        {skills.map((skill, index) => (
          <SkillNode key={index} skill={skill} position={skill.position} color={skill.color} />
        ))}
        <lineSegments geometry={lines}>
          <lineBasicMaterial attach="material" color="#00FFFF" opacity={0.2} transparent />
        </lineSegments>
      </group>
    );
  };
  
  const SkillDetail = ({ skill, onClose }) => {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full mx-4"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-4">{skill.name}</h2>
          <p className="text-white mb-6">{skill.description}</p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">Projets associés:</h3>
            <ul className="list-disc list-inside text-white">
              {skill.projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <div className="bg-cyan-700 h-4 rounded-full overflow-hidden">
              <div
                className="bg-cyan-300 h-full rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="text-white text-center mt-2">Niveau de maîtrise: {skill.level}%</p>
          </div>
          <button
            onClick={onClose}
            className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600 transition-colors"
          >
            Fermer
          </button>
        </motion.div>
      </motion.div>
    );
  };
  
  const Skills = () => {
    const [activeSkill, setActiveSkill] = useState(null);
    const skills = [
      {
        name: "IA/ML",
        level: 90,
        color: "#00FFFF",
        position: [0, 2, 0],
        description: "Expertise approfondie en Intelligence Artificielle et Machine Learning, avec une forte expérience dans le développement de solutions innovantes.",
        projects: ["Plateforme IA pédagogique", "Système de recommandation pour e-commerce"]
      },
      {
        name: "Développement Web",
        level: 85,
        color: "#FF00FF",
        position: [-2, -1, 0],
        description: "Maîtrise des technologies web modernes, du front-end au back-end, avec une spécialisation dans les applications web réactives et performantes.",
        projects: ["Refonte du site corporate d'une multinationale", "Application web progressive pour la gestion de projet"]
      },
      {
        name: "Cloud & DevOps",
        level: 80,
        color: "#FFFF00",
        position: [2, -1, 0],
        description: "Compétences avancées en architecture cloud et pratiques DevOps, assurant des déploiements fluides et une scalabilité optimale.",
        projects: ["Migration d'infrastructure vers AWS", "Mise en place d'un pipeline CI/CD pour une startup fintech"]
      },
      {
        name: "Intégration CRM",
        level: 75,
        color: "#00FF00",
        position: [0, -2, 0],
        description: "Expérience solide dans l'intégration et la personnalisation de solutions CRM pour optimiser les processus de gestion client.",
        projects: ["Implémentation de Salesforce pour une entreprise de 500+ employés", "Développement d'extensions CRM sur mesure"]
      },
      {
        name: "Conseil Stratégique",
        level: 95,
        color: "#FF8000",
        position: [0, 0, 2],
        description: "Capacité éprouvée à fournir des conseils stratégiques en transformation digitale, aidant les entreprises à naviguer dans leur évolution technologique.",
        projects: ["Élaboration de la stratégie digitale pour une chaîne de retail", "Accompagnement d'une PME dans sa transition numérique"]
      }
    ];
  
    return (
      <section id="compétences" className="min-h-screen py-20 relative">
        <Canvas className="absolute inset-0" camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SkillsNetwork skills={skills} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-12 text-center">Compétences Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: `0px 0px 15px ${skill.color}` }}
                onClick={() => setActiveSkill(skill)}
              >
                <h3 className="text-2xl font-bold text-cyan-300 mb-2">{skill.name}</h3>
                <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  ></div>
                </div>
                <p className="text-white text-right mt-2">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {activeSkill && (
            <SkillDetail skill={activeSkill} onClose={() => setActiveSkill(null)} />
          )}
        </AnimatePresence>
      </section>
    );
  };

  return (
    < div className = "bg-gray-900" >
    
      <Navbar />
      <Home />
      <Projects />
      <Skills />
        <Contact />
    </div>
  );

}
export default IntegratedPortfolio;