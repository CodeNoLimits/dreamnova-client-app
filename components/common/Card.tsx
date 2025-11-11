
import React from 'react';

interface CardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${className}`}>
      <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        {title}
      </h3>
      <div className="text-gray-600 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
