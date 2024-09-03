import React, { useState } from 'react';
import { motion } from 'framer-motion';

/// Images 
import solutionsArchitectImage from '../data/images/solutionsArchitectImage.png';
import machineLearningImage from '../data/images/machineLearningImage.png';

const certifications = [
  {
    id: 1,
    name: "AWS Cloud Quest : Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    description: "Certification démontrant l'expertise dans la conception de systèmes distribués sur AWS.",
    image: solutionsArchitectImage
  },
  {
    id: 2,
    name: "AWS Cloud Quest : Machine Learning",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Validation des compétences en conception et gestion de solutions de données sur Google Cloud.",
    image: machineLearningImage
  },
  {
    id: 3,
    name: "Prix de l'Innovation Digitale",
    issuer: "Tech Industry Awards",
    date: "2021",
    description: "Reconnaissance pour le projet de transformation digitale le plus innovant de l'année.",
    image: "/images/innovation-award.png"
  },
  // Ajoutez d'autres certifications et récompenses ici
];

const CertificationCard = ({ cert, onClick }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg p-4 cursor-pointer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(cert)}
  >
    <img src={cert.image} alt={cert.name} className="w-full h-40 object-contain mb-4" />
    <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
    <p className="text-sm text-gray-600">{cert.issuer} - {cert.date}</p>
  </motion.div>
);

const CertificationModal = ({ cert, onClose }) => (
  <motion.div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-white rounded-lg p-6 max-w-lg w-full"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">{cert.name}</h2>
      <img src={cert.image} alt={cert.name} className="w-full h-48 object-contain mb-4" />
      <p className="text-gray-600 mb-2">{cert.issuer} - {cert.date}</p>
      <p className="mb-4">{cert.description}</p>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onClose}
      >
        Fermer
      </button>
    </motion.div>
  </motion.div>
);

const CertificationsGallery = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Certifications et Récompenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map(cert => (
            <CertificationCard key={cert.id} cert={cert} onClick={setSelectedCert} />
          ))}
        </div>
        {selectedCert && (
          <CertificationModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </div>
    </section>
  );
};

export default CertificationsGallery;