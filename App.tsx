
import React, { useState, useMemo } from 'react';
import PieChartCard from './components/PieChartCard';
import ImportantLeadsCard from './components/ImportantLeadsCard';
import AcceptedLeadsCard from './components/AcceptedLeadsCard';
import LeadSearchCard from './components/LeadSearchCard';
import Modal from './components/Modal';
import StageLeadsModal from './components/StageLeadsModal';
import { Lead, LeadStatus, PieChartData } from './types';

const App: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1, companyName: 'Innovate Inc.', contactPerson: 'Alex Johnson', status: LeadStatus.Connection, isImportant: true, lastContacted: '2023-10-26',
      stageDetails: {
        [LeadStatus.LeadGen]: { personInvolved: 'Marketing Team', description: 'Lead captured from the annual tech conference.', date: '2023-10-15' },
        [LeadStatus.Research]: { personInvolved: 'John Doe', description: 'Initial research completed. Found potential synergy with our Q4 product line.', date: '2023-10-18' },
        [LeadStatus.Connection]: { personInvolved: 'Alex Johnson', description: 'First contact made via email, follow-up call scheduled.', date: '2023-10-26' }
      }
    },
    {
      id: 2, companyName: 'Data Solutions', contactPerson: 'Maria Garcia', status: LeadStatus.Response, isImportant: true, lastContacted: '2023-10-25',
      stageDetails: {
        [LeadStatus.LeadGen]: { personInvolved: 'Marketing Team', description: 'Inbound lead from website contact form.', date: '2023-10-12' },
        [LeadStatus.Research]: { personInvolved: 'Jane Smith', description: 'Company profile aligns with our ideal customer. High potential.', date: '2023-10-14' },
        [LeadStatus.Connection]: { personInvolved: 'Maria Garcia', description: 'Initial call completed. Sent follow-up with pricing.', date: '2023-10-20' },
        [LeadStatus.Response]: { personInvolved: 'Maria Garcia', description: 'Received positive feedback on pricing. Demo scheduled.', date: '2023-10-25' }
      }
    },
    {
      id: 3, companyName: 'QuantumLeap', contactPerson: 'Chen Wei', status: LeadStatus.Research, isImportant: false, lastContacted: '2023-10-22',
      stageDetails: {
        [LeadStatus.LeadGen]: { personInvolved: 'Sales Team', description: 'Outbound prospecting identified this lead.', date: '2023-10-20' },
        [LeadStatus.Research]: { personInvolved: 'Chen Wei', description: 'Currently researching their tech stack and key decision-makers.', date: '2023-10-22' }
      }
    },
    { id: 4, companyName: 'Synergy Corp', contactPerson: 'Jane Doe', status: LeadStatus.LeadGen, isImportant: false, lastContacted: '2023-10-20', stageDetails: {} },
    {
      id: 5, companyName: 'NextGen AI', contactPerson: 'Sam Wilson', status: LeadStatus.Closed, isImportant: true, lastContacted: '2023-09-15',
      stageDetails: {
        [LeadStatus.LeadGen]: { personInvolved: 'Referral', description: 'Referred by a current satisfied customer.', date: '2023-08-01' },
        [LeadStatus.Research]: { personInvolved: 'Sam Wilson', description: 'Quick research phase, high-priority lead.', date: '2023-08-03' },
        [LeadStatus.Connection]: { personInvolved: 'Sam Wilson', description: 'Connected and presented demo.', date: '2023-08-10' },
        [LeadStatus.Response]: { personInvolved: 'Sam Wilson', description: 'Negotiations went smoothly.', date: '2023-08-25' },
        [LeadStatus.Closed]: { personInvolved: 'Sam Wilson', description: 'Contract signed. Deal closed successfully.', date: '2023-09-15' }
      }
    },
    { id: 6, companyName: 'CloudSphere', contactPerson: 'Emily White', status: LeadStatus.Research, isImportant: false, lastContacted: '2023-10-18', stageDetails: {} },
    { id: 7, companyName: 'GreenTech', contactPerson: 'David Brown', status: LeadStatus.Connection, isImportant: true, lastContacted: '2023-10-27', stageDetails: {} },
    { id: 8, companyName: 'HealthPlus', contactPerson: 'Dr. Lee', status: LeadStatus.Response, isImportant: false, lastContacted: '2023-10-24', stageDetails: {} },
    { id: 9, companyName: 'Financier', contactPerson: 'Olivia Green', status: LeadStatus.Research, isImportant: true, lastContacted: '2023-10-26', stageDetails: {} },
    { id: 10, companyName: 'RetailKing', contactPerson: 'Ben Carter', status: LeadStatus.LeadGen, isImportant: false, lastContacted: '2023-10-19', stageDetails: {} },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const [isStageLeadsModalOpen, setIsStageLeadsModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<LeadStatus | null>(null);

  const handleOpenModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleStageClick = (stage: LeadStatus) => {
    setSelectedStage(stage);
    setIsStageLeadsModalOpen(true);
  };

  const handleCloseStageLeadsModal = () => {
    setIsStageLeadsModalOpen(false);
    setSelectedStage(null);
  };

  const handleSelectLeadFromStage = (lead: Lead) => {
    // Keep the stage modal open in the background and open the lead detail modal on top.
    handleOpenModal(lead);
  };

  const importantLeads = useMemo(() => leads.filter(lead => lead.isImportant), [leads]);
  const activeLeads = useMemo(() => 
    leads.filter(lead => 
      lead.status === LeadStatus.Research || 
      lead.status === LeadStatus.Connection || 
      lead.status === LeadStatus.Response
    ), 
  [leads]);
  
  const leadsForSelectedStage = useMemo(() => 
    selectedStage ? leads.filter(lead => lead.status === selectedStage) : [], 
  [leads, selectedStage]);

  const pieChartData: PieChartData[] = useMemo(() => {
    const counts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<LeadStatus, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name: name as LeadStatus,
      value,
    }));
  }, [leads]);

  return (
    <div className="min-h-screen bg-brand-primary text-brand-text p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Lead Generation Dashboard</h1>
        <p className="text-brand-text-secondary">Welcome back, manage your leads efficiently.</p>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PieChartCard data={pieChartData} onStageClick={handleStageClick} />
        </div>
        <div className="lg:col-span-1">
          <ImportantLeadsCard leads={importantLeads} onLeadClick={handleOpenModal} />
        </div>
        <div className="lg:col-span-3">
          <AcceptedLeadsCard leads={activeLeads} onLeadClick={handleOpenModal} />
        </div>
        <div className="lg:col-span-3">
          <LeadSearchCard />
        </div>
      </main>

      <StageLeadsModal
        isOpen={isStageLeadsModalOpen}
        onClose={handleCloseStageLeadsModal}
        stage={selectedStage}
        leads={leadsForSelectedStage}
        onLeadSelect={handleSelectLeadFromStage}
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        lead={selectedLead}
      />
    </div>
  );
};

export default App;
