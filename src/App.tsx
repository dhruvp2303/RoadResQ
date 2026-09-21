import React from 'react';
import { RoadResQProvider } from './context/RoadResQContext';
import RoadResQWebApp from './components/app/RoadResQWebApp';
import SafetyModeModal from './components/common/SafetyModeModal';
import VehicleManagerModal from './components/common/VehicleManagerModal';
import DemoControlBar from './components/common/DemoControlBar';

function MainContent() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#d2d5d9]">
      {/* PRIMARY WEB APPLICATION SHELL (Reference UI/UX Design System) */}
      <RoadResQWebApp />

      {/* Global Modals & Telematics Demo Controls */}
      <SafetyModeModal />
      <VehicleManagerModal />
      <DemoControlBar />
    </div>
  );
}

export function App() {
  return (
    <RoadResQProvider>
      <MainContent />
    </RoadResQProvider>
  );
}

export default App;
