
import React from 'react';
import { LeadStatus } from '../types';

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusColors: Record<LeadStatus, string> = {
  [LeadStatus.LeadGen]: 'bg-blue-500/20 text-blue-300',
  [LeadStatus.Research]: 'bg-yellow-500/20 text-yellow-300',
  [LeadStatus.Connection]: 'bg-purple-500/20 text-purple-300',
  [LeadStatus.Response]: 'bg-green-500/20 text-green-300',
  [LeadStatus.Closed]: 'bg-gray-500/20 text-gray-400',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
