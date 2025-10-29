import React from 'react';
import { Lead, LeadStatus } from '../types';
import { XIcon, CheckIcon, LeadGenIcon, ResearchIcon, ConnectionIcon, ResponseIcon, TrophyIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const flowOrder: LeadStatus[] = [
  LeadStatus.LeadGen,
  LeadStatus.Research,
  LeadStatus.Connection,
  LeadStatus.Response,
  LeadStatus.Closed,
];

const stageConfig: Record<LeadStatus, { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string }> = {
  [LeadStatus.LeadGen]: { icon: LeadGenIcon, color: 'text-blue-400' },
  [LeadStatus.Research]: { icon: ResearchIcon, color: 'text-yellow-400' },
  [LeadStatus.Connection]: { icon: ConnectionIcon, color: 'text-purple-400' },
  [LeadStatus.Response]: { icon: ResponseIcon, color: 'text-green-400' },
  [LeadStatus.Closed]: { icon: TrophyIcon, color: 'text-emerald-400' },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, lead }) => {
  if (!isOpen || !lead) return null;

  const currentStatusIndex = flowOrder.indexOf(lead.status);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
      <div className="relative bg-brand-secondary rounded-xl shadow-2xl w-full max-w-5xl border border-brand-accent/30 transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <div className="flex items-start justify-between p-4 border-b border-brand-primary">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-white">{lead.companyName}</h2>
            <p className="text-sm text-brand-text-secondary mt-1">
              Contact: {lead.contactPerson} | Last Contacted: {new Date(lead.lastContacted).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-white transition-colors" aria-label="Close modal">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-brand-text mb-6 text-center">Lead Progress</h3>
          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex items-start">
              {flowOrder.map((status, index) => {
                const isCompleted = index < currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                const config = stageConfig[status];
                const Icon = config.icon;
                const detail = lead.stageDetails[status];

                let iconContainerClasses = 'w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ';
                let textClasses = 'font-semibold text-sm transition-colors duration-300 ';
                let iconClasses = `w-8 h-8 transition-colors duration-300 ${config.color}`;
                let connectorClasses = 'flex-grow h-1 transition-colors duration-500 ';

                if (isCompleted) {
                  iconContainerClasses += 'bg-green-500/20 border-green-500';
                  textClasses += 'text-green-400';
                  connectorClasses += 'bg-green-500';
                } else if (isCurrent) {
                  iconContainerClasses += 'bg-brand-accent/20 border-brand-accent animate-pulse';
                  textClasses += 'text-brand-accent';
                  connectorClasses += 'bg-brand-secondary border-t-2 border-b-2 border-dashed border-gray-600';
                } else { // isUpcoming
                  iconContainerClasses += 'bg-brand-primary border-gray-600';
                  textClasses += 'text-gray-500';
                  iconClasses += ' opacity-50';
                  connectorClasses += 'bg-brand-secondary border-t-2 border-b-2 border-dashed border-gray-600';
                }

                return (
                  <React.Fragment key={status}>
                    <div className="flex flex-col items-center text-center px-2 flex-shrink-0 w-44">
                      <div className={iconContainerClasses}>
                        {isCompleted ? <CheckIcon className="w-8 h-8 text-green-400" /> : <Icon className={iconClasses} />}
                      </div>
                      <p className={`mt-2 ${textClasses}`}>{status}</p>
                      
                      <div className="mt-2 w-full h-40">
                        {detail && (
                          <div className="p-2.5 bg-brand-primary rounded-lg h-full text-left text-xs shadow-inner flex flex-col">
                            <p className="text-brand-text-secondary leading-snug flex-grow overflow-y-auto pr-1 text-pretty">{detail.description}</p>
                            <div className="pt-2 mt-2 border-t border-brand-secondary/50">
                              <p className="text-gray-400">
                                <span className="font-semibold block truncate">{detail.personInvolved}</span>
                                <span className="block">{new Date(detail.date).toLocaleDateString()}</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {index < flowOrder.length - 1 && (
                      <div className="flex-grow h-16 flex items-center px-1 min-w-[4rem]">
                        <div className={connectorClasses}></div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
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
        /* Custom scrollbar for webkit browsers */
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

export default Modal;
