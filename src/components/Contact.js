import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactIcon = ({ icon, label, onClick }) => (
  <motion.div
    className="flex flex-col items-center justify-center cursor-pointer m-4"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <div className="text-5xl mb-2">{icon}</div>
    <div className="text-cyan-300 text-lg">{label}</div>
  </motion.div>
);

const ContactForm = ({ onClose }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4"
    >
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-cyan-300 mb-6">Envoyez-moi un message</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className="w-full p-3 bg-gray-800 text-white rounded border border-cyan-700 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Votre email"
              className="w-full p-3 bg-gray-800 text-white rounded border border-cyan-700 focus:border-cyan-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Votre message"
              className="w-full p-3 bg-gray-800 text-white rounded border border-cyan-700 focus:border-cyan-500 focus:outline-none h-32"
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-500 transition-colors"
            >
              Envoyer
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [activeContact, setActiveContact] = useState(null);

  const contactMethods = [
    { icon: '✉️', label: 'Email', action: () => setActiveContact('email') },
    { icon: '📞', label: 'Téléphone', action: () => setActiveContact('phone') },
    { icon: '💼', label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/votre-profil', '_blank') },
  ];

  return (
    <section id="contact" className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold text-cyan-300 mb-8 text-center">Contactez-moi</h2>
        <p className="text-xl text-cyan-100 text-center mb-12">
          Choisissez votre méthode de contact préférée ou envoyez-moi directement un message.
        </p>
        <div className="flex flex-wrap justify-center">
          {contactMethods.map((method, index) => (
            <ContactIcon 
              key={index}
              icon={method.icon}
              label={method.label}
              onClick={method.action}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeContact === 'email' && (
          <ContactForm onClose={() => setActiveContact(null)} />
        )}
        {activeContact === 'phone' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4"
          >
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">Mon numéro de téléphone</h3>
              <p className="text-white text-xl mb-6">+33 7 87 70 69 06</p>
              <button
                onClick={() => setActiveContact(null)}
                className="bg-cyan-600 text-white px-6 py-3 rounded-full hover:bg-cyan-500 transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;