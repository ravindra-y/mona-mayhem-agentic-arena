import { useState } from 'react';
import { RetroAudio } from '../utils/RetroAudio';

const MOCK_PLAYERS = ['MONA-BOT', 'PIXEL-PIONEER', 'CHIP-CHAMP', 'VECTOR-VIXEN', 'CRT-CRUSADER', 'NEON-NINJA', 'RETRO-RYAN'];
const MOCK_SCORES = [1500, 3200, 4800, 7200, 9900, 12400, 15800, 24000];

export default function AddMatchForm({ onAddMatch }) {
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState('');
  const [result, setResult] = useState('win'); // Default to win
  const [timestamp, setTimestamp] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!playerName.trim()) {
      setValidationError('PLAYER NAME REQUIRED!');
      RetroAudio.playDefeat();
      return;
    }

    const scoreNum = Number(score);
    if (isNaN(scoreNum) || scoreNum < 0 || score === '') {
      setValidationError('INVALID SCORE!');
      RetroAudio.playDefeat();
      return;
    }

    setValidationError('');

    const newMatch = {
      id: 'match-' + Date.now() + Math.random().toString(36).substr(2, 4),
      playerName: playerName.toUpperCase().trim(),
      result: result.toLowerCase(),
      score: scoreNum,
      timestamp: timestamp || new Date().toISOString()
    };

    onAddMatch(newMatch);

    // Play retro sounds
    RetroAudio.playCoin();
    if (newMatch.result === 'win') {
      setTimeout(() => RetroAudio.playVictory(), 300);
    } else {
      setTimeout(() => RetroAudio.playDefeat(), 300);
    }

    // Reset Form
    setPlayerName('');
    setScore('');
    setTimestamp('');
  };

  // Helper to generate simulated retro match instantly
  const handleSimulateMatch = () => {
    const randomPlayer = MOCK_PLAYERS[Math.floor(Math.random() * MOCK_PLAYERS.length)];
    const randomScore = MOCK_SCORES[Math.floor(Math.random() * MOCK_SCORES.length)] + Math.floor(Math.random() * 800);
    const randomResult = Math.random() > 0.4 ? 'win' : 'loss';
    
    // Random offset in last 2 days
    const timeOffset = Math.floor(Math.random() * 48 * 60 * 60 * 1000);
    const randomTimestamp = new Date(Date.now() - timeOffset).toISOString();

    const mockMatch = {
      id: 'match-' + Date.now() + Math.random().toString(36).substr(2, 4),
      playerName: randomPlayer,
      result: randomResult,
      score: randomScore,
      timestamp: randomTimestamp
    };

    onAddMatch(mockMatch);

    RetroAudio.playCoin();
    if (randomResult === 'win') {
      setTimeout(() => RetroAudio.playVictory(), 200);
    } else {
      setTimeout(() => RetroAudio.playDefeat(), 200);
    }
  };

  return (
    <div 
      className="arcade-panel" 
      style={{ 
        marginBottom: '20px',
        borderColor: 'var(--neon-pink)',
        boxShadow: '0 0 10px rgba(255, 0, 127, 0.15)'
      }}
    >
      <h2 
        style={{ 
          fontFamily: 'var(--font-pixel)', 
          fontSize: '12px', 
          color: 'var(--neon-pink)', 
          textShadow: '0 0 5px var(--neon-pink)',
          margin: '0 0 18px 0',
          letterSpacing: '1px'
        }}
      >
        // LOG NEW COMBAT DATA
      </h2>

      {validationError && (
        <div 
          style={{ 
            fontFamily: 'var(--font-pixel)', 
            fontSize: '9px', 
            color: 'var(--neon-pink)', 
            border: '1px solid var(--neon-pink)',
            background: 'rgba(255, 0, 127, 0.1)',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '15px',
            textAlign: 'center',
            boxShadow: '0 0 5px rgba(255, 0, 127, 0.2)'
          }}
        >
          *** WARNING: {validationError} ***
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px' 
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {/* Player Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label 
              style={{ 
                fontFamily: 'var(--font-pixel)', 
                fontSize: '8px', 
                color: 'var(--text-muted)' 
              }}
            >
              PLAYER AVATAR / NAME
            </label>
            <input 
              type="text" 
              placeholder="e.g. MONA-BOT"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{
                background: 'var(--bg-darker)',
                border: '2px solid rgba(157, 78, 221, 0.5)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                padding: '8px 12px',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s',
                textTransform: 'uppercase'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--neon-cyan)';
                e.target.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(157, 78, 221, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Combat Score */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label 
              style={{ 
                fontFamily: 'var(--font-pixel)', 
                fontSize: '8px', 
                color: 'var(--text-muted)' 
              }}
            >
              COMBAT SCORE
            </label>
            <input 
              type="number" 
              placeholder="e.g. 9500"
              min="0"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              style={{
                background: 'var(--bg-darker)',
                border: '2px solid rgba(157, 78, 221, 0.5)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                padding: '8px 12px',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--neon-cyan)';
                e.target.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(157, 78, 221, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {/* Win/Loss Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label 
              style={{ 
                fontFamily: 'var(--font-pixel)', 
                fontSize: '8px', 
                color: 'var(--text-muted)',
                marginBottom: '4px'
              }}
            >
              ARENA OUTCOME
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  setResult('win');
                  RetroAudio.playClick();
                }}
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '9px',
                  padding: '10px',
                  background: result === 'win' ? 'rgba(57, 255, 20, 0.2)' : 'var(--bg-darker)',
                  color: result === 'win' ? 'var(--neon-green)' : 'var(--text-muted)',
                  border: `2px solid ${result === 'win' ? 'var(--neon-green)' : 'rgba(157, 78, 221, 0.3)'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textShadow: result === 'win' ? '0 0 5px var(--neon-green)' : 'none',
                  boxShadow: result === 'win' ? '0 0 8px rgba(57, 255, 20, 0.2)' : 'none',
                  transition: 'all 0.1s'
                }}
              >
                VICTORY
              </button>
              <button
                type="button"
                onClick={() => {
                  setResult('loss');
                  RetroAudio.playClick();
                }}
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '9px',
                  padding: '10px',
                  background: result === 'loss' ? 'rgba(255, 0, 127, 0.2)' : 'var(--bg-darker)',
                  color: result === 'loss' ? 'var(--neon-pink)' : 'var(--text-muted)',
                  border: `2px solid ${result === 'loss' ? 'var(--neon-pink)' : 'rgba(157, 78, 221, 0.3)'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textShadow: result === 'loss' ? '0 0 5px var(--neon-pink)' : 'none',
                  boxShadow: result === 'loss' ? '0 0 8px rgba(255, 0, 127, 0.2)' : 'none',
                  transition: 'all 0.1s'
                }}
              >
                DEFEATED
              </button>
            </div>
          </div>

          {/* Custom Timestamp (Optional) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label 
              style={{ 
                fontFamily: 'var(--font-pixel)', 
                fontSize: '8px', 
                color: 'var(--text-muted)' 
              }}
            >
              COMBAT TIMESTAMPS (OPTIONAL)
            </label>
            <input 
              type="datetime-local" 
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              style={{
                background: 'var(--bg-darker)',
                border: '2px solid rgba(157, 78, 221, 0.5)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                padding: '8px 12px',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--neon-cyan)';
                e.target.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(157, 78, 221, 0.5)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Buttons Row */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '15px', 
            marginTop: '10px',
            flexWrap: 'wrap'
          }}
        >
          <button 
            type="submit" 
            className="btn-arcade" 
            style={{ flex: 1, minWidth: '160px' }}
            onMouseEnter={() => RetroAudio.playClick()}
          >
            <span style={{ fontSize: '14px' }}>🕹️</span> LOG COMBAT
          </button>
          
          <button 
            type="button" 
            className="btn-arcade warning" 
            style={{ flex: 1, minWidth: '160px' }}
            onClick={handleSimulateMatch}
            onMouseEnter={() => RetroAudio.playClick()}
          >
            <span>🤖</span> SIMULATE COMBAT
          </button>
        </div>
      </form>
    </div>
  );
}
