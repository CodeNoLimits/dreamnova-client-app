
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="ml-4 text-indigo-600">Analyse en cours...</p>
    </div>
  );
};

export default Loader;
