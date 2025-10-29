
import React from 'react';
import { Lead } from '../types';
import Card from './Card';
import { StarIcon } from './icons';

interface ImportantLeadsCardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const ImportantLeadsCard: React.FC<ImportantLeadsCardProps> = ({ leads, onLeadClick }) => {
  return (
    <Card className="h-[400px] flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">High Priority Leads</h2>
      <div className="overflow-y-auto flex-grow">
        <ul className="space-y-3">
          {leads.map(lead => (
            <li key={lead.id}>
              <button
                onClick={() => onLeadClick(lead)}
                className="w-full flex items-center justify-between p-3 bg-brand-accent/30 rounded-lg hover:bg-brand-accent/50 transition-colors duration-200 text-left"
              >
                <div>
                  <p className="font-semibold text-white">{lead.companyName}</p>
                  <p className="text-sm text-brand-text-secondary">{lead.contactPerson}</p>
                </div>
                <StarIcon className="w-5 h-5 text-yellow-400" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ImportantLeadsCard;
