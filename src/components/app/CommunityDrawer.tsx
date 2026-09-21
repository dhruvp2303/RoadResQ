import React, { useState } from 'react';
import {
  Users,
  Share2,
  MessageSquare,
  AlertTriangle,
  X,
  Copy,
  CheckCircle2,
  PhoneCall,
  Shield,
  Send,
  MapPin,
  Flame,
  CloudRain,
  Radio,
} from 'lucide-react';
import { useRoadResQ } from '../../context/RoadResQContext';

interface CommunityDrawerProps {
  activeTab: 'community' | 'sharing' | 'message' | 'alert' | null;
  onClose: () => void;
}

export const CommunityDrawer: React.FC<CommunityDrawerProps> = ({ activeTab, onClose }) => {
  const { currentUser, activeIncident, addNotification, t } = useRoadResQ();
  const [copied, setCopied] = useState(false);
  const [dispatchMsg, setDispatchMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      sender: 'agent',
      text: 'RoadResQ 24/7 National Dispatch Center. How can we assist you today?',
      time: '11:28 AM',
    },
  ]);

  if (!activeTab) return null;

  const shareText = activeIncident
    ? `🚨 EMERGENCY ALERT: I am stranded at ${activeIncident.location.address}. Track my RoadResQ rescue live: https://roadresq.in/track/${activeIncident.id}`
    : `🚨 Roadside safety alert from ${currentUser.name}. Breakdown telematics broadcasted via RoadResQ India.`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      addNotification('Link Copied', 'Emergency live tracking link copied to clipboard.', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleSendDispatchMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchMsg.trim()) return;
    setChatHistory((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'user',
        text: dispatchMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setDispatchMsg('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'agent',
          text: 'Understood. Our central telematics operator is monitoring your location and coordinating the nearest standby crew.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl border border-slate-200 animate-fade-up max-h-[85vh] flex flex-col overflow-hidden text-slate-900 font-sans">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                activeTab === 'community'
                  ? 'bg-rose-100 text-rose-600'
                  : activeTab === 'sharing'
                  ? 'bg-blue-100 text-blue-600'
                  : activeTab === 'message'
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-amber-100 text-amber-600'
              }`}
            >
              {activeTab === 'community' && <Users className="h-5 w-5" />}
              {activeTab === 'sharing' && <Share2 className="h-5 w-5" />}
              {activeTab === 'message' && <MessageSquare className="h-5 w-5" />}
              {activeTab === 'alert' && <AlertTriangle className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-sora font-extrabold text-base text-slate-900 capitalize">
                {activeTab === 'community' && 'Community Safety Hub'}
                {activeTab === 'sharing' && 'Live Location & Contact Sharing'}
                {activeTab === 'message' && '24/7 Dispatch Control Room'}
                {activeTab === 'alert' && 'Highway Alerts & Incident Broadcasts'}
              </h3>
              <p className="text-xs text-slate-500">RoadResQ Pan-India Telematics Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* TAB 1: COMMUNITY FEED */}
        {activeTab === 'community' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
              <div>
                <div className="text-xs font-bold text-slate-900">NH-48 Safe Corridor Patrol Active</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  14 NHAI patrol units and 8 flatbed tow trucks are currently on standby within 5 km.
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Updated 2 mins ago · Verified</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5" />
              <div>
                <div className="text-xs font-bold text-amber-900">Heavy Rain / Low Visibility Warning</div>
                <div className="text-[11px] text-amber-800 mt-0.5">
                  Dense fog reported near Cyber City Expressway. Maintain safe braking distance and keep hazard lights standby.
                </div>
                <div className="text-[10px] text-amber-600 mt-1">Reported by 12 drivers</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
              <div>
                <div className="text-xs font-bold text-blue-900">EV Mobile Fast-Charge Hub Live</div>
                <div className="text-[11px] text-blue-800 mt-0.5">
                  2 mobile EV fast-charge vans deployed near Exit 9 for urgent rapid boosting.
                </div>
                <div className="text-[10px] text-blue-600 mt-1">RoadResQ Fleet Fleet</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHARING */}
        {activeTab === 'sharing' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Live Telematics Tracking Link</div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 break-all select-all">
                {shareText}
              </div>
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Live Sharing Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Emergency Speed Dial Helplines
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:112"
                  className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between hover:bg-red-100 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold">112 National</div>
                    <div className="text-[10px] text-red-500">Police & Medical</div>
                  </div>
                  <PhoneCall className="h-4 w-4" />
                </a>

                <a
                  href="tel:1033"
                  className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold">1033 NHAI</div>
                    <div className="text-[10px] text-blue-500">Highway Patrol</div>
                  </div>
                  <PhoneCall className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MESSAGE DISPATCH */}
        {activeTab === 'message' && (
          <div className="flex-1 flex flex-col py-3 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-64 my-2">
              {chatHistory.map((c) => (
                <div
                  key={c.id}
                  className={`flex flex-col ${c.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                      c.sender === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    {c.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5">{c.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendDispatchMsg} className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={dispatchMsg}
                onChange={(e) => setDispatchMsg(e.target.value)}
                placeholder="Message dispatch controller..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ALERTS */}
        {activeTab === 'alert' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-red-700 font-sora">
                <Flame className="h-4 w-4 text-red-600" />
                <span>Highway Breakdown Advisory</span>
              </div>
              <p className="text-xs text-red-800">
                If vehicle is immobile on express lanes, immediately exit behind the safety metal barrier and switch on hazard strobe warning lights.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Radio className="h-4 w-4 text-slate-700" />
                <span>Automated Telematics Geofencing Active</span>
              </div>
              <p className="text-xs text-slate-600">
                GPS telemetry is continuously synchronized with the nearest 24/7 highway response hub.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityDrawer;
