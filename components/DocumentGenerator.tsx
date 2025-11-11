
import React, { useState } from 'react';
import Card from './common/Card';
import Loader from './common/Loader';
import MarkdownRenderer from './common/MarkdownRenderer';
import { generateDocument } from '../services/geminiService';

type DocType = 'audit' | 'business_case' | 'checklist';

const DocumentGenerator: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [docContent, setDocContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentDocType, setCurrentDocType] = useState<DocType | null>(null);

  const handleSubmit = async (docType: DocType) => {
    setIsLoading(true);
    setDocContent('');
    setCurrentDocType(docType);
    const result = await generateDocument(docType, companyInfo);
    setDocContent(result);
    setIsLoading(false);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(docContent);
    alert('Contenu copié dans le presse-papiers !');
  };

  return (
    <Card title="Générateur de Documents" icon="📄" className="w-full">
      <p className="mb-4">Besoin de convaincre ta direction ou de t'organiser ? Décris ton entreprise et génère le document qu'il te faut.</p>
        <div>
          <label htmlFor="companyInfoDoc" className="block text-sm font-medium text-gray-700">Description de ton entreprise</label>
          <input
            type="text"
            name="companyInfoDoc"
            id="companyInfoDoc"
            value={companyInfo}
            onChange={(e) => setCompanyInfo(e.target.value)}
            placeholder="Ex: PME dans le BTP, 50 salariés, peu digitalisée"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <button onClick={() => handleSubmit('audit')} disabled={isLoading || !companyInfo} className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400">Générer Audit</button>
            <button onClick={() => handleSubmit('business_case')} disabled={isLoading || !companyInfo} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400">Générer Business Case</button>
            <button onClick={() => handleSubmit('checklist')} disabled={isLoading || !companyInfo} className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-400">Générer Checklist</button>
        </div>
      
      {isLoading && <Loader />}
      {docContent && !isLoading && (
        <div className="mt-6 p-4 border-l-4 border-indigo-500 rounded-r-lg bg-indigo-50 relative">
          <h4 className="text-lg font-bold">
            {currentDocType === 'audit' && "Rapport d'Audit"}
            {currentDocType === 'business_case' && "Business Case"}
            {currentDocType === 'checklist' && "Checklist de Conformité"}
          </h4>
          <button onClick={handleCopy} className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold py-1 px-2 rounded">Copier</button>
          <div className="mt-2 text-gray-700 max-h-96 overflow-y-auto">
            <MarkdownRenderer content={docContent} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default DocumentGenerator;
