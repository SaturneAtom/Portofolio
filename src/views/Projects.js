import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, PerspectiveCamera, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import imagetest from '../data/images/image-copie.png';

const ProjectCard = ({ project, position, onClick }) => {
  const meshRef = useRef();
  const texture = useTexture(project.image);

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group position={position} onClick={() => onClick(project)}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </group>
  );
};

const ProjectsScene = ({ projects, onProjectClick }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
    camera.position.z = Math.cos(Date.now() * 0.0005) * 5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          position={[(index - 1) * 4, 0, 0]}
          onClick={onProjectClick}
        />
      ))}
    </>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="bg-gray-900 rounded-lg max-w-3xl w-full overflow-hidden"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
      <div className="p-8">
        <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
        <p className="text-gray-300 mb-6">{project.fullDescription}</p>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Technologies utilisées</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "NeuraLearn AI",
      fullDescription: "NeuraLearn AI est une plateforme d'apprentissage adaptatif qui utilise l'intelligence artificielle pour personnaliser l'expérience éducative de chaque étudiant.",
      image: imagetest,
      technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "CloudSphere",
      fullDescription: "CloudSphere est une plateforme cloud de nouvelle génération qui simplifie la gestion des infrastructures distribuées.",
      image: imagetest,
      technologies: ["Kubernetes", "Docker", "Terraform", "Go", "React"]
    },
    {
      id: 3,
      title: "PredictIQ",
      fullDescription: "PredictIQ est une solution d'analyse prédictive conçue pour l'industrie 4.0, utilisant des algorithmes d'apprentissage automatique avancés.",
      image: imagetest,
      technologies: ["Python", "Apache Spark", "Kafka", "TensorFlow", "React"]
    }
  ];

  return (
    <section className="h-screen bg-gray-900">
      <Canvas>
        <ProjectsScene projects={projects} onProjectClick={setSelectedProject} />
      </Canvas>
      <div className="absolute top-0 left-0 w-full p-8">
        <h2 className="text-4xl font-bold text-white mb-4">Projets Innovants</h2>
        <p className="text-xl text-gray-300">Explorez mes projets en 3D</p>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;