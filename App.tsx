
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ReasoningLab from './components/ReasoningLab';
import ComparisonMetrics from './components/ComparisonMetrics';
import TrainingWorkbench from './components/TrainingWorkbench';
import GemmaRecipeBook from './components/GemmaRecipeBook';
import EthicsInfo from './components/EthicsInfo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'lab':
        return <ReasoningLab />;
      case 'training':
        return <TrainingWorkbench />;
      case 'recipes':
        return <GemmaRecipeBook />;
      case 'metrics':
        return <ComparisonMetrics />;
      case 'ethics':
        return <EthicsInfo />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
