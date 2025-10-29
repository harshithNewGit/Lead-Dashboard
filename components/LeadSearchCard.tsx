
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { AiLead, SocialMediaStatus } from '../types';
import Card from './Card';
import { SearchIcon, PlusIcon } from './icons';

const LeadSearchCard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiLeads, setAiLeads] = useState<AiLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setAiLeads([]);
    setSearched(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const schema = {
        type: Type.OBJECT,
        properties: {
          leads: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                companyName: { type: Type.STRING, description: "Name of the company" },
                contactPerson: { type: Type.STRING, description: "A potential contact person, e.g., 'CEO' or a name" },
                description: { type: Type.STRING, description: "A brief, one-sentence description of the company" },
              },
              required: ['companyName', 'contactPerson', 'description'],
            },
          },
        },
        required: ['leads'],
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Find 10 potential leads in the "${searchTerm}" industry. Provide the company name, a likely contact person (e.g., CEO, Head of Sales), and a brief one-sentence description of the company.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const result = JSON.parse(response.text);
      const statuses: SocialMediaStatus[] = [SocialMediaStatus.Active, SocialMediaStatus.Approachable, SocialMediaStatus.Inactive];
      
      const processedLeads = (result.leads || []).map((lead: Omit<AiLead, 'socialStatus'>) => ({
        ...lead,
        socialStatus: statuses[Math.floor(Math.random() * statuses.length)],
      }));
      setAiLeads(processedLeads);

    } catch (e) {
      setError('Failed to fetch leads. The model may be unable to find information for that query. Please try a different one.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
          <p className="mt-4 text-brand-text-secondary">Searching for leads...</p>
        </div>
      );
    }

    if (error) {
      return <div className="flex items-center justify-center h-64 text-red-400">{error}</div>;
    }

    if (!searched) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <SearchIcon className="w-16 h-16 text-brand-accent/30 mb-4" />
                <h3 className="text-lg font-semibold text-brand-text">Discover New Leads</h3>
                <p className="text-brand-text-secondary">Enter an industry or sector above to find potential companies.</p>
            </div>
        );
    }

    if (aiLeads.length === 0) {
        return <div className="flex items-center justify-center h-64 text-brand-text-secondary">No leads found for your search.</div>;
    }

    const statusStyles: Record<SocialMediaStatus, { borderColor: string; bgColor: string; textColor: string; dotColor: string; }> = {
      [SocialMediaStatus.Active]: { borderColor: 'border-blue-500', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400', dotColor: 'bg-blue-500' },
      [SocialMediaStatus.Approachable]: { borderColor: 'border-green-500', bgColor: 'bg-green-500/10', textColor: 'text-green-400', dotColor: 'bg-green-500' },
      [SocialMediaStatus.Inactive]: { borderColor: 'border-red-500', bgColor: 'bg-red-500/10', textColor: 'text-red-400', dotColor: 'bg-red-500' },
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {aiLeads.map((lead, index) => {
            const styles = statusStyles[lead.socialStatus];
            return (
                <div key={index} className={`bg-brand-primary p-4 rounded-lg border-l-4 ${styles.borderColor} ${styles.bgColor} flex flex-col justify-between`}>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg text-brand-text">{lead.companyName}</h3>
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${styles.dotColor}`}></div>
                                <span className={`text-xs font-semibold ${styles.textColor}`}>{lead.socialStatus}</span>
                            </div>
                        </div>
                        <p className="text-sm text-brand-text-secondary mb-2">
                            <span className="font-semibold text-brand-text">Contact:</span> {lead.contactPerson}
                        </p>
                        <p className="text-sm text-brand-text-secondary">{lead.description}</p>
                    </div>
                    <button 
                        className="bg-brand-accent hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded-lg inline-flex items-center justify-center transition-colors text-sm mt-4 w-full"
                        onClick={() => console.log('Add lead:', lead)} // Placeholder action
                    >
                        <PlusIcon className="w-4 h-4 mr-2"/>
                        Add Lead
                    </button>
                </div>
            );
        })}
      </div>
    );
  };


  return (
    <Card>
      <h2 className="text-xl font-bold text-brand-text mb-4">AI Lead Discovery</h2>
      <form onSubmit={handleAiSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Enter an industry or sector (e.g., 'renewable energy startups')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-primary border border-brand-secondary rounded-lg py-2 pl-10 pr-4 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-brand-text-secondary" />
          </div>
        </div>
        <button
          type="submit"
          className="bg-brand-accent hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={isLoading || !searchTerm.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {renderContent()}

    </Card>
  );
};

export default LeadSearchCard;