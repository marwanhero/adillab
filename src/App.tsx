import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';

// Import Modules
import WordScramble from './modules/Games/WordScramble';
import VideoTutorials from './modules/Videos/VideoTutorials';
import IdeasMnemonics from './modules/Ideas/IdeasMnemonics';
import DailyChallenge from './modules/Challenges/DailyChallenge';

const Home = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h2 style={{ fontSize: '2.5rem', color: '#FF9E2A', marginBottom: '20px' }}>Welcome to Spelling Success! 🦁</h2>
    <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Learn to spell with fun games, videos, and challenges!
    </p>
    <div style={{ marginTop: '40px', fontSize: '5rem' }}>
        🏰✨📚
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'games': return <WordScramble />;
      case 'videos': return <VideoTutorials />;
      case 'ideas': return <IdeasMnemonics />;
      case 'challenges': return <DailyChallenge />;
      default: return <Home />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;
