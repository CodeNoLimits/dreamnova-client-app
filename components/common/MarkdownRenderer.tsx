
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-indigo-800">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-indigo-900">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mt-8 mb-4 text-indigo-900">{line.substring(2)}</h1>;
        }
        if (line.startsWith('* ') || line.startsWith('- ')) {
          return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        // Basic bold support
        const parts = line.split('**');
        const renderedParts = parts.map((part, i) => {
            return i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>;
        });

        return <p key={index} className="mb-2">{renderedParts}</p>;
      });
  };

  return <div className="prose text-gray-700 max-w-none">{renderContent()}</div>;
};

export default MarkdownRenderer;
