import { GoogleGenAI, Chat } from "@google/genai";
import type { AuditData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generatePriorityActions = async (data: AuditData): Promise<string> => {
  try {
    const prompt = `Tu es David, un consultant expert en facturation électronique pour les PME françaises. Ton ton est amical, urgent mais rassurant. Utilise le tutoiement.
      Analyse la situation de cette entreprise et génère 3 actions prioritaires claires et concises sous forme de liste à puces Markdown.
      - Nombre de fournisseurs approximatif: ${data.suppliers}
      - Volume de factures mensuel estimé: ${data.invoices}
      - Système de facturation actuel: ${data.system}
      - Taille de l'entreprise: ${data.size}
      
      Termine par une phrase d'encouragement percutante.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating priority actions:", error);
    return "Désolé, une erreur est survenue lors de l'analyse. Merci de réessayer.";
  }
};

let chat: Chat | null = null;

export const startChat = (): void => {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "Tu es David, un consultant expert en facturation électronique pour les PME françaises. Ton ton est amical, expert et rassurant. Utilise le tutoiement. Tes réponses doivent être concises et aller droit au but. N'hésite pas à utiliser des emojis pour rendre la conversation plus vivante. Tu réponds aux questions et objections des utilisateurs sur la mise en conformité.",
        },
    });
};

export const continueChat = async (message: string): Promise<string> => {
    if (!chat) {
        startChat();
    }
    try {
        const response = await (chat as Chat).sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error in chat:", error);
        return "Oups, je rencontre un petit souci technique. Peux-tu reformuler ta question ?";
    }
};

export const analyzeSuppliers = async (supplierList: string): Promise<string> => {
    if (!supplierList.trim()) return "Merci d'entrer au moins un nom de fournisseur.";
    try {
      const prompt = `Tu es David, un consultant expert. Analyse cette liste de fournisseurs pour une PME française : "${supplierList}".
      Pour chaque fournisseur, indique s'il est probablement B2B (et donc concerné par l'envoi de factures électroniques), estime un volume de facturation (faible, moyen, élevé) et suggère une action rapide.
      Sois concis et direct. Utilise le tutoiement et un format clair en Markdown.`;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Error analyzing suppliers:", error);
      return "Désolé, une erreur est survenue lors de l'analyse des fournisseurs. Merci de réessayer.";
    }
};

// Fix: Added missing generateActionPlan function required by ActionPlanGenerator component.
export const generateActionPlan = async (companyInfo: string): Promise<string> => {
    if (!companyInfo.trim()) return "Merci de décrire ton entreprise.";
    try {
      const prompt = `Tu es David, un consultant expert en facturation électronique.
      Crée une feuille de route personnalisée et concise sous forme de liste Markdown pour cette entreprise afin qu'elle soit prête pour l'échéance de 2026.
      Description de l'entreprise : "${companyInfo}".
      Le plan doit être réaliste, étape par étape, et rassurant. Utilise le tutoiement.`;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Error generating action plan:", error);
      return "Désolé, une erreur est survenue lors de la génération du plan d'action. Merci de réessayer.";
    }
};

type DocType = 'audit' | 'business_case' | 'checklist';

// Fix: Added missing generateDocument function required by DocumentGenerator component.
export const generateDocument = async (docType: DocType, companyInfo: string): Promise<string> => {
    if (!companyInfo.trim()) return "Merci de décrire ton entreprise.";

    let docPrompt = '';
    switch (docType) {
        case 'audit':
            docPrompt = `Génère un rapport d'audit de conformité à la facturation électronique concis.
            Le rapport doit identifier les points de risque principaux (processus manuels, outils non adaptés, etc.) et donner des recommandations claires.
            Utilise un format professionnel mais accessible, avec des titres en Markdown.`;
            break;
        case 'business_case':
            docPrompt = `Génère un business case pour convaincre un dirigeant d'investir dans une solution de facturation électronique.
            Le document doit mettre en avant le ROI (Retour sur Investissement) en chiffrant les gains de temps, la réduction des erreurs et l'évitement des pénalités.
            Sois percutant et utilise des données chiffrées estimées. Utilise des titres en Markdown.`;
            break;
        case 'checklist':
            docPrompt = `Génère une checklist complète des actions à mener pour la mise en conformité à la facturation électronique.
            La checklist doit être organisée par étapes (ex: Diagnostic, Choix de la solution, Déploiement, Formation).
            Les points doivent être clairs et actionnables. Utilise des cases à cocher Markdown (- [ ]).`;
            break;
    }

    try {
      const prompt = `Tu es David, un consultant expert.
      Description de l'entreprise : "${companyInfo}".
      ${docPrompt}
      La réponse doit être structurée, professionnelle et utiliser le tutoiement.`;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error(`Error generating document (${docType}):`, error);
      return "Désolé, une erreur est survenue lors de la génération du document. Merci de réessayer.";
    }
};
