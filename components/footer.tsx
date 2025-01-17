import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 text-gray-400 border-white border-t-2">
      <div className="container mx-auto text-center text-sm">
        <p className="mb-2">Approaches to Kerala | Tradition and Transition in Kerala</p>
        <p className="text-xs">&copy; {new Date().getFullYear()} NYU Abu Dhabi</p>
      </div>
    </footer>
  );
}

export default Footer;