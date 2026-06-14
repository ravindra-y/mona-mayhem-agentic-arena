import { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import AddMatchForm from './components/AddMatchForm';
import MatchHistoryTable from './components/MatchHistoryTable';
import ConfirmModal from './components/ConfirmModal';
import { RetroAudio } from './utils/RetroAudio';
import GameOverScreen from './components/GameOverScreen';
import VictoryScreen from './components/VictoryScreen';

const INITIAL_MOCK_MATCHES = [
  { 
    id: 'mock-1', 
    playerName: 'MONA-BOT', 
    result: 'win', 
    score: 18500, 
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 mins ago
  },
  { 
    id: 'mock-2', 
    playerName: 'CRT-CRUSADER', 
    result: 'loss', 
    score: 4200, 
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
  },
  { 
    id: 'mock-3', 
    playerName: 'NEON-NINJA', 
    result: 'win', 
    score: 24500, 
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  { 
    id: 'mock-4', 
    playerName: 'VECTOR-VIXEN', 
    result: 'win', 
    score: 15600, 
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString() // 1.5 days ago
  },
  { 
    id: 'mock-5', 
    playerName: 'CHIP-CHAMP', 
    result: 'loss', 
    score: 8900, 
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // 2 days ago
  }
];

function App() {
  // Sound toggle state (loaded from local storage, defaults to true)
  const [audioEnabled, setAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('mona_arena_audio');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Matches list state (loaded from local storage, defaults to initial mock data if empty)
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('mona_arena_matches');
    return saved !== null ? JSON.parse(saved) : INITIAL_MOCK_MATCHES;
  });

  // Confirm delete modal state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Toggle different screens to preview them interactively
  const [viewMode, setViewMode] = useState('history'); // 'history', 'gameover', 'victory'

  // Sync matches to localStorage
  useEffect(() => {
    localStorage.setItem('mona_arena_matches', JSON.stringify(matches));
  }, [matches]);

  // Sync sound toggle to localStorage and Audio utility
  useEffect(() => {
    localStorage.setItem('mona_arena_audio', JSON.stringify(audioEnabled));
    RetroAudio.setEnabled(audioEnabled);
  }, [audioEnabled]);

  const addMatch = (newMatch) => {
    setMatches((prev) => [newMatch, ...prev]);
  };

  const deleteMatch = (id) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearHistory = () => {
    setIsConfirmOpen(true);
  };

  const confirmClearHistory = () => {
    setMatches([]);
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Header audioEnabled={audioEnabled} setAudioEnabled={setAudioEnabled} />
      
      {/* Screen Preview Navigation Toggles */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '15px', 
          marginBottom: '20px', 
          flexWrap: 'wrap',
          fontFamily: 'var(--font-pixel)',
          fontSize: '9px'
        }}
      >
        <button
          onClick={() => { setViewMode('history'); RetroAudio.playClick(); }}
          style={{
            padding: '8px 16px',
            background: viewMode === 'history' ? 'rgba(0, 255, 255, 0.15)' : 'transparent',
            color: viewMode === 'history' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            border: `2px solid ${viewMode === 'history' ? 'var(--neon-cyan)' : 'rgba(157, 78, 221, 0.3)'}`,
            borderRadius: '4px',
            cursor: 'pointer',
            textShadow: viewMode === 'history' ? '0 0 5px var(--neon-cyan)' : 'none'
          }}
        >
          [BATTLE HISTORY]
        </button>
        <button
          onClick={() => { setViewMode('gameover'); RetroAudio.playClick(); }}
          style={{
            padding: '8px 16px',
            background: viewMode === 'gameover' ? 'rgba(255, 0, 255, 0.15)' : 'transparent',
            color: viewMode === 'gameover' ? 'var(--neon-pink)' : 'var(--text-muted)',
            border: `2px solid ${viewMode === 'gameover' ? 'var(--neon-pink)' : 'rgba(157, 78, 221, 0.3)'}`,
            borderRadius: '4px',
            cursor: 'pointer',
            textShadow: viewMode === 'gameover' ? '0 0 5px var(--neon-pink)' : 'none'
          }}
        >
          [PREVIEW SYSTEM FAILURE]
        </button>
        <button
          onClick={() => { setViewMode('victory'); RetroAudio.playClick(); }}
          style={{
            padding: '8px 16px',
            background: viewMode === 'victory' ? 'rgba(0, 255, 255, 0.15)' : 'transparent',
            color: viewMode === 'victory' ? 'var(--neon-cyan)' : 'var(--text-muted)',
            border: `2px solid ${viewMode === 'victory' ? 'var(--neon-cyan)' : 'rgba(157, 78, 221, 0.3)'}`,
            borderRadius: '4px',
            cursor: 'pointer',
            textShadow: viewMode === 'victory' ? '0 0 5px var(--neon-cyan)' : 'none'
          }}
        >
          [PREVIEW ARENA CHAMPION]
        </button>
      </div>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {viewMode === 'history' && (
          <>
            <StatsPanel matches={matches} />
            
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '20px',
                alignItems: 'start'
              }}
            >
              {/* Form to log or simulate new combats */}
              <AddMatchForm onAddMatch={addMatch} />
              
              {/* Table display of match log details */}
              <MatchHistoryTable 
                matches={matches} 
                onDeleteMatch={deleteMatch} 
                onClearHistory={handleClearHistory} 
              />
            </div>
          </>
        )}

        {viewMode === 'gameover' && (
          <GameOverScreen
            warriorName="Mona-Warrior-01"
            battleScore={15400}
            wavesCleared={12}
            onRestart={() => setViewMode('history')}
            onReturnToArena={() => setViewMode('history')}
          />
        )}

        {viewMode === 'victory' && (
          <VictoryScreen
            warriorName="Mona-Warrior-01"
            battleScore={99250}
            wavesCleared={32}
            powerCoreRemaining={85}
            onPlayAgain={() => setViewMode('history')}
            onViewLeaderboard={() => setViewMode('history')}
          />
        )}
      </main>

      {/* Retro Alert Continue countdown cabinet prompt */}
      {isConfirmOpen && (
        <ConfirmModal 
          isOpen={isConfirmOpen} 
          onConfirm={confirmClearHistory} 
          onCancel={() => setIsConfirmOpen(false)} 
        />
      )}

      <footer 
        style={{ 
          marginTop: '30px', 
          padding: '16px', 
          textAlign: 'center', 
          fontFamily: 'var(--font-pixel)', 
          fontSize: '8px', 
          color: 'var(--text-muted)',
          borderTop: '1px solid rgba(157, 78, 221, 0.2)' 
        }}
      >
        MONA MAYHEM AGENTIC ARENA © 2026 // MADE FOR RETRO FIGHTERS // INSERT COIN TO PLAY
      </footer>
    </>
  );
}

export default App;
