import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

import ChatbotAI from './AI/ChatbotAI';
import CertificationsGallery from './components/CertificationsGallery';
import imageTest from './data/images/image-copie.png';


/// Views
import Skills from './views/Skills';
import Contact from './views/Contact';


const ProjectCard = ({ project, index, totalProjects, onClick }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const texture = useTexture(project.image);

    const angle = (index / totalProjects) * Math.PI * 2;
    const radius = 5;
    const position = [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(t + index * 1000) * 0.1;
    });

    return (
        <motion.mesh
            ref={meshRef}
            position={position}
            whileHover={{ scale: 1.1 }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => onClick(project)}
        >
            <boxGeometry args={[2, 3, 0.1]} />
            <meshStandardMaterial map={texture} />
            <Html
                position={[0, -1.7, 0.06]}
                center
                distanceFactor={15}
                occlude={[meshRef]}
            >
                <div className="bg-black bg-opacity-75 p-2 rounded text-white text-center">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                </div>
            </Html>
            {hovered && (
                <Html position={[0, 0, 0.06]} center>
                    <div className="bg-black bg-opacity-75 p-4 rounded text-white max-w-xs">
                        <p>{project.shortDescription}</p>
                    </div>
                </Html>
            )}
        </motion.mesh>
    );
};

const ProjectsScene = ({ projects, onProjectClick }) => {
    const groupRef = useRef();
    const { camera } = useThree();

    useFrame(() => {
        groupRef.current.rotation.y += 0.001;
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    totalProjects={projects.length}
                    onClick={onProjectClick}
                />
            ))}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
            </mesh>
            <Text
                position={[0, 3, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Projets Innovants
            </Text>
        </group>
    );
};

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white p-6 rounded-lg max-w-2xl w-full m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <p className="mb-4">{project.fullDescription}</p>
                <div className="mb-4">
                    <h3 className="font-semibold">Technologies utilisées:</h3>
                    <ul className="list-disc list-inside">
                        {project.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

// Composant AnimatedScene modifié
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


// Composant Projets modifié
const Projects = () => {
    const meshRef = useRef();


    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="hotpink" />
            </mesh>
            <Text position={[0, 1.5, 0]} fontSize={0.5} color="white">
                Projets
            </Text>
        </group>
    );
};



// Composant principal App modifié
// Composant principal App
const Appli = () => {
    const [currentSection, setCurrentSection] = useState('accueil');
    const sections = ['accueil', 'projets', 'compétences', 'contact'];
    const sectionRefs = useRef({});
    const [selectedProject, setSelectedProject] = useState(null);

    // Déplacer la définition de projects ici
    const projects = [
        {
            id: 1,
            title: "NeuraLearn AI",
            fullDescription: "NeuraLearn AI est une plateforme d'apprentissage adaptatif qui utilise l'intelligence artificielle pour personnaliser l'expérience éducative de chaque étudiant.",
            image: imageTest,
            technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"]
        },
        {
            id: 2,
            title: "CloudSphere",
            fullDescription: "CloudSphere est une plateforme cloud de nouvelle génération qui simplifie la gestion des infrastructures distribuées.",
            image: imageTest,
            technologies: ["Kubernetes", "Docker", "Terraform", "Go", "React"]
        },
        {
            id: 3,
            title: "PredictIQ",
            fullDescription: "PredictIQ est une solution d'analyse prédictive conçue pour l'industrie 4.0, utilisant des algorithmes d'apprentissage automatique avancés.",
            image: imageTest,
            technologies: ["Python", "Apache Spark", "Kafka", "TensorFlow", "React"]
        }
    ];


    useEffect(() => {
        sections.forEach(section => {
            sectionRefs.current[section] = React.createRef();
        });
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const closeProjectModal = () => {
        setSelectedProject(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            let activeSection = sections[0];

            for (const section of sections) {
                const element = sectionRefs.current[section].current;
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        activeSection = section;
                        break;
                    }
                }
            }

            setCurrentSection(activeSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (sectionId) => {
        const element = sectionRefs.current[sectionId].current;
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                            className={`text-white text-xl font-bold transition-all duration-300 ${currentSection === section ? 'border-b-2 border-cyan-400' : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    </motion.li>
                ))}
            </ul>
        </nav>
    );

    const Scene3D = ({ section }) => {
        switch (section) {
            case 'accueil':
                return <AnimatedScene />;
            /*
              case 'projets':
                return <ProjectsScene projects={projects} onProjectClick={handleProjectClick} />;/
            */
            // Ajoutez d'autres cas pour les sections supplémentaires
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-900">
            <Navbar />
            {sections.map(section => (
                <section
                    key={section}
                    ref={sectionRefs.current[section]}
                    className="h-screen relative"
                >
                    <Canvas className="absolute inset-0">
                        <Scene3D section={section} />
                    </Canvas>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Contenu 2D spécifique à chaque section */}
                        {section === 'compétences' && <Skills />}
                        {section === 'contact' && <Contact />}
                    </div>
                </section>
            ))}
            <CertificationsGallery />
            <ChatbotAI />
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


export default Appli;