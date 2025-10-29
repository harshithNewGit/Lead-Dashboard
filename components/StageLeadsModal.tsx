import React from 'react';
import { Lead, LeadStatus } from '../types';
import { XIcon } from './icons';

interface StageLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: LeadStatus | null;
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
}

const StageLeadsModal: React.FC<StageLeadsModalProps> = ({ isOpen, onClose, stage, leads, onLeadSelect }) => {
  if (!isOpen || !stage) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      aria-labelledby="stage-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className="relative bg-brand-secondary rounded-xl shadow-2xl w-full max-w-lg border border-brand-accent/30 transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-brand-primary">
          <h2 id="stage-modal-title" className="text-xl font-bold text-white">
            Leads in: <span className="text-brand-accent">{stage}</span>
          </h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-white transition-colors" aria-label="Close modal">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {leads.length > 0 ? (
            <ul className="space-y-3">
              {leads.map(lead => (
                <li key={lead.id}>
                  <button
                    onClick={() => onLeadSelect(lead)}
                    className="w-full flex items-center justify-between p-3 bg-brand-primary rounded-lg hover:bg-brand-accent/20 transition-colors duration-200 text-left"
                  >
                    <div>
                      <p className="font-semibold text-white">{lead.companyName}</p>
                      <p className="text-sm text-brand-text-secondary">{lead.contactPerson}</p>
                    </div>
                    <p className="text-xs text-brand-text-secondary">
                      {new Date(lead.lastContacted).toLocaleDateString()}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-24">
              <p className="text-brand-text-secondary text-center">No leads in this stage.</p>
            </div>
          )}
        </div>
      </div>
       <style>{`
        @keyframes scale-in {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
        .overflow-y-auto::-webkit-scrollbar {
          width: 5px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #4338ca;
        }
      `}</style>
    </div>
  );
};

export default StageLeadsModal;
