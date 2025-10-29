
import React from 'react';
import { Lead } from '../types';
import Card from './Card';
import StatusBadge from './StatusBadge';

interface AcceptedLeadsCardProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const AcceptedLeadsCard: React.FC<AcceptedLeadsCardProps> = ({ leads, onLeadClick }) => {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">All Leads</h2>
        <div className="flex items-center space-x-2 bg-brand-primary py-1 px-3 rounded-full text-sm">
          <span className="font-bold text-white">{leads.length}</span>
          <span className="text-brand-text-secondary">Active Leads</span>
        </div>
      </div>
      <div className="overflow-y-auto max-h-80">
        {leads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-2">
            {leads.map(lead => (
              <button 
                key={lead.id} 
                onClick={() => onLeadClick(lead)}
                className="bg-brand-primary p-4 rounded-lg flex flex-col justify-between hover:bg-brand-accent/20 transition-colors duration-200 h-full text-left cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-white truncate" title={lead.companyName}>{lead.companyName}</p>
                  <p className="text-sm text-brand-text-secondary">{lead.contactPerson}</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-brand-text-secondary mb-3">
                    Contacted: {new Date(lead.lastContacted).toLocaleDateString()}
                  </p>
                  <StatusBadge status={lead.status} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-24">
            <p className="text-brand-text-secondary text-center">No active leads.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AcceptedLeadsCard;
