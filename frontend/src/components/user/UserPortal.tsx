import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { EmergencyRequestFlow } from './EmergencyRequestFlow';
import { MatchingScreen } from './MatchingScreen';
import { LiveTrackingView } from './LiveTrackingView';
import { InvoicePaymentModal } from './InvoicePaymentModal';
import { RatingReviewModal } from './RatingReviewModal';
import { IncidentHistoryView } from './IncidentHistoryView';
import { History, Flame, ShieldAlert } from 'lucide-react';

export const UserPortal: React.FC = () => {
  const { activeIncident, setSafetyModeOpen } = useRoadResQ();
  const [activeTab, setActiveTab] = useState<'emergency' | 'history'>('emergency');

  return (
    <div className="container-px py-6 space-y-6">
      {/* Sub-tab switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'emergency'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            <span>Emergency Assistance</span>
            {activeIncident && (
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="h-3.5 w-3.5" />
            <span>Assistance History</span>
          </button>
        </div>

        <button
          onClick={() => setSafetyModeOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-all shadow-sm"
        >
          <ShieldAlert className="h-3.5 w-3.5 text-red-600 animate-pulse" />
          <span>Driver Safety Kit (112)</span>
        </button>
      </div>

      {/* Dynamic Tab Body */}
      {activeTab === 'history' ? (
        <IncidentHistoryView />
      ) : activeIncident ? (
        <>
          {activeIncident.status === 'MATCHING' ? (
            <MatchingScreen />
          ) : (
            <LiveTrackingView />
          )}

          {activeIncident.status === 'PAYMENT' && <InvoicePaymentModal />}
          {activeIncident.status === 'CLOSED' && <RatingReviewModal />}
        </>
      ) : (
        <EmergencyRequestFlow />
      )}
    </div>
  );
};

export default UserPortal;
