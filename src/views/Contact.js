import React from "react";

// Composant Contact
const Contact = () => {
    return (
      <section id="contact" className="min-h-screen py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-12 text-center">Contactez-moi</h2>
          <div className="max-w-md mx-auto bg-white bg-opacity-10 p-8 rounded-lg">
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-cyan-300 mb-2">Nom</label>
                <input type="text" id="name" className="w-full bg-gray-800 text-white p-2 rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-cyan-300 mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-gray-800 text-white p-2 rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-cyan-300 mb-2">Message</label>
                <textarea id="message" rows="4" className="w-full bg-gray-800 text-white p-2 rounded"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600 transition-colors">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };

export default Contact;