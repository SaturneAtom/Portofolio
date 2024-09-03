import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { text: input, user: true }]);
    setInput('');

    // Simuler une réponse du chatbot (à remplacer par un appel API réel)
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, { text: botResponse, user: false }]);
    }, 1000);
  };

  // Fonction pour obtenir une réponse du bot (à remplacer par un appel API réel)
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('projet')) {
      return "J'ai travaillé sur plusieurs projets innovants, notamment une plateforme IA pédagogique et une solution de transformation digitale pour PME. Lequel vous intéresse le plus ?";
    } else if (lowerInput.includes('compétence')) {
      return "Mes principales compétences incluent l'IA/ML, le développement web, le cloud & DevOps, et le conseil stratégique en transformation digitale. Sur quel domaine souhaitez-vous en savoir plus ?";
    } else if (lowerInput.includes('contact')) {
      return "Vous pouvez me contacter par email à mathieuvialattejobs@gmail.com ou par téléphone au +33 7 87 70 69 06. N'hésitez pas à utiliser le formulaire de contact sur mon portfolio pour plus de détails !";
    } else {
      return "Je suis Mathieu Vialatte, consultant en transformation digitale. Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser des questions sur mes projets, compétences ou expériences !";
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-5 w-80 bg-gray-900 rounded-lg shadow-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="bg-cyan-600 p-4 text-white font-bold">
              Chat avec Mathieu AI
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.user ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.user ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-white'
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Posez une question..."
                  className="flex-grow p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-cyan-500 text-white p-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotAI;