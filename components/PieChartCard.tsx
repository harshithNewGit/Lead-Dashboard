import React from 'react';
import { PieChartData, LeadStatus } from '../types';
import Card from './Card';
import { LeadGenIcon, ResearchIcon, ConnectionIcon, ResponseIcon, TrophyIcon, ChevronRightIcon } from './icons';

interface PieChartCardProps {
  data: PieChartData[];
  onStageClick: (stage: LeadStatus) => void;
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


const PieChartCard: React.FC<PieChartCardProps> = ({ data, onStageClick }) => {
  const dataMap = new Map(data.map(d => [d.name, d.value]));

  return (
    <Card className="h-[400px] flex flex-col justify-center">
      <h2 className="text-xl font-bold text-white mb-6 text-center">Lead Conversion Funnel</h2>
      <div className="flex items-center justify-center sm:justify-around flex-wrap gap-2 sm:gap-0">
        {flowOrder.map((status, index) => {
          const count = dataMap.get(status) || 0;
          const config = stageConfig[status];
          const Icon = config.icon;
          const isClosedStage = status === LeadStatus.Closed;

          return (
            <React.Fragment key={status}>
              <button
                onClick={() => onStageClick(status)}
                className="flex flex-col items-center text-center p-2 min-w-[100px] rounded-lg hover:bg-brand-accent/10 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors duration-200"
                aria-label={`View leads in ${status} stage`}
              >
                <div className={`w-20 h-20 rounded-full bg-brand-primary border-2 flex items-center justify-center mb-2 transition-all duration-300 ${isClosedStage ? 'border-emerald-500 animate-pulse' : 'border-brand-accent/50'}`}>
                  <Icon className={`w-10 h-10 ${config.color}`} />
                </div>
                <p className="font-semibold text-white text-sm">{status}</p>
                <p className={`text-3xl font-bold ${isClosedStage ? 'text-emerald-400' : 'text-brand-text'}`}>{count}</p>
              </button>
              {index < flowOrder.length - 1 && (
                <div className="hidden lg:block mx-2">
                    <ChevronRightIcon className="w-8 h-8 text-brand-accent" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Card>
  );
};

export default PieChartCard;
