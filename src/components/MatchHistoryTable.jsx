import { useState } from 'react';
import { RetroAudio } from '../utils/RetroAudio';

export default function MatchHistoryTable({ matches = [], onDeleteMatch, onClearHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'score-desc', 'score-asc'

  // Filter matches
  const filteredMatches = matches.filter((match) =>
    match.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === 'date-asc') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortBy === 'score-desc') {
      return b.score - a.score;
    } else if (sortBy === 'score-asc') {
      return a.score - b.score;
    }
    return 0;
  });

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    RetroAudio.playClick();
  };

  const handleDelete = (id) => {
    RetroAudio.playExplode();
    onDeleteMatch(id);
  };

  const handleClear = () => {
    RetroAudio.playExplode();
    onClearHistory();
  };

  const formatTimestamp = (isoString) => {
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return 'UNKNOWN TIME';
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} @ ${hours}:${minutes}`;
    } catch {
      return 'UNKNOWN TIME';
    }
  };

  return (
    <div className="arcade-cabinet" style={{ borderColor: 'var(--neon-cyan)', boxShadow: '0 0 15px rgba(0, 255, 255, 0.15)' }}>
      {/* Table Toolbar controls */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px', 
          flexWrap: 'wrap', 
          gap: '15px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px' }}>
          <span 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '8px', 
              color: 'var(--neon-cyan)',
              textShadow: '0 0 3px var(--neon-cyan)'
            }}
          >
            FIND:
          </span>
          <input 
            type="text" 
            placeholder="FILTER BY PLAYER..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'var(--bg-darker)',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              color: 'var(--neon-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              padding: '6px 12px',
              borderRadius: '4px',
              outline: 'none',
              width: '100%',
              maxWidth: '220px',
              textTransform: 'uppercase'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--neon-cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)'}
          />
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--text-muted)' }}>
            SORT BY:
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => handleSortChange(sortBy === 'date-desc' ? 'date-asc' : 'date-desc')}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '8px',
                padding: '6px 10px',
                background: sortBy.startsWith('date') ? 'rgba(0, 255, 255, 0.15)' : 'transparent',
                color: sortBy.startsWith('date') ? 'var(--neon-cyan)' : 'var(--text-muted)',
                border: `1px solid ${sortBy.startsWith('date') ? 'var(--neon-cyan)' : 'rgba(157, 78, 221, 0.3)'}`,
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              DATE {sortBy === 'date-desc' ? '▼' : sortBy === 'date-asc' ? '▲' : ''}
            </button>
            <button
              onClick={() => handleSortChange(sortBy === 'score-desc' ? 'score-asc' : 'score-desc')}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '8px',
                padding: '6px 10px',
                background: sortBy.startsWith('score') ? 'rgba(0, 255, 255, 0.15)' : 'transparent',
                color: sortBy.startsWith('score') ? 'var(--neon-cyan)' : 'var(--text-muted)',
                border: `1px solid ${sortBy.startsWith('score') ? 'var(--neon-cyan)' : 'rgba(157, 78, 221, 0.3)'}`,
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              SCORE {sortBy === 'score-desc' ? '▼' : sortBy === 'score-asc' ? '▲' : ''}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="retro-table-container">
        {sortedMatches.length === 0 ? (
          <div 
            style={{ 
              padding: '40px 20px', 
              textAlign: 'center', 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '11px', 
              color: 'var(--neon-pink)',
              textShadow: '0 0 5px var(--neon-pink)'
            }}
          >
            *** NO RECORDS DETECTED IN MEMORY ***
          </div>
        ) : (
          <table className="retro-table">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>RANK</th>
                <th style={{ width: '30%' }}>PLAYER</th>
                <th style={{ width: '20%' }}>OUTCOME</th>
                <th style={{ width: '15%' }}>SCORE</th>
                <th style={{ width: '20%' }}>DATE / TIME</th>
                <th style={{ width: '5%', textAlign: 'center' }}>WIPE</th>
              </tr>
            </thead>
            <tbody>
              {sortedMatches.map((match, idx) => {
                const rankText = `#${idx + 1}`;
                let rankIcon = rankText;
                if (sortBy === 'score-desc') {
                  if (idx === 0) rankIcon = '🥇 01';
                  else if (idx === 1) rankIcon = '🥈 02';
                  else if (idx === 2) rankIcon = '🥉 03';
                  else rankIcon = `#${String(idx + 1).padStart(2, '0')}`;
                }

                const outcomeClass = match.result === 'win' ? 'victory' : 'defeat';
                const outcomeText = match.result === 'win' ? 'VICTORY' : 'DEFEATED';

                return (
                  <tr key={match.id}>
                    <td data-label="RANK" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--neon-yellow)' }}>
                      {rankIcon}
                    </td>
                    <td data-label="PLAYER" style={{ fontWeight: 'bold', color: '#fff', letterSpacing: '0.5px' }}>
                      {match.playerName}
                    </td>
                    <td data-label="OUTCOME">
                      <span className={`badge-retro ${outcomeClass}`}>
                        {outcomeText}
                      </span>
                    </td>
                    <td data-label="SCORE" style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                      {String(match.score).padStart(6, '0')}
                    </td>
                    <td data-label="DATE / TIME" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      {formatTimestamp(match.timestamp)}
                    </td>
                    <td data-label="WIPE" style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(match.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--neon-pink)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-pixel)',
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          transition: 'all 0.1s'
                        }}
                        title="Delete this record"
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255, 0, 127, 0.15)';
                          e.target.style.textShadow = '0 0 5px var(--neon-pink)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.textShadow = 'none';
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Table Footer actions */}
      {matches.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button 
            onClick={handleClear} 
            className="btn-arcade danger"
            style={{ fontSize: '9px' }}
          >
            💥 WIPE CABINET MEMORY
          </button>
        </div>
      )}
    </div>
  );
}
