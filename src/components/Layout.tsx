import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Layout({ children, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="container">
      <header className="module-header">
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Spelling Success</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button 
            className={`btn ${currentView === 'games' ? 'active' : ''}`}
            onClick={() => onNavigate('games')}
          >
            Games
          </button>
          <button 
            className={`btn ${currentView === 'videos' ? 'active' : ''}`}
            onClick={() => onNavigate('videos')}
          >
            Videos
          </button>
          <button 
            className={`btn ${currentView === 'ideas' ? 'active' : ''}`}
            onClick={() => onNavigate('ideas')}
          >
            Ideas
          </button>
          <button 
            className={`btn ${currentView === 'challenges' ? 'active' : ''}`}
            onClick={() => onNavigate('challenges')}
          >
            Challenges
          </button>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
