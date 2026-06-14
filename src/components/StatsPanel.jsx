export default function StatsPanel({ matches = [] }) {
  // Compute Stats
  const totalMatches = matches.length;
  const victories = matches.filter(m => m.result && m.result.toLowerCase() === 'win').length;
  const defeats = totalMatches - victories;
  
  const winRate = totalMatches > 0 ? Math.round((victories / totalMatches) * 100) : 0;
  
  const highScore = totalMatches > 0 
    ? Math.max(...matches.map(m => Number(m.score) || 0)) 
    : 0;

  const avgScore = totalMatches > 0 
    ? Math.round(matches.reduce((sum, m) => sum + (Number(m.score) || 0), 0) / totalMatches)
    : 0;

  return (
    <div 
      className="arcade-panel crt-effect" 
      style={{ 
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '24px',
        borderColor: 'var(--neon-purple)',
        boxShadow: '0 0 10px rgba(157, 78, 221, 0.15)'
      }}
    >
      {/* Stat 1: Total Matches */}
      <div 
        style={{ 
          borderLeft: '3px solid var(--neon-cyan)', 
          paddingLeft: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <span 
          style={{ 
            fontFamily: 'var(--font-pixel)', 
            fontSize: '9px', 
            color: 'var(--neon-cyan)',
            textShadow: '0 0 4px var(--neon-cyan)',
            marginBottom: '6px'
          }}
        >
          TOTAL COMBATS
        </span>
        <span 
          style={{ 
            fontFamily: 'var(--font-terminal)', 
            fontSize: '36px', 
            lineHeight: '1', 
            color: '#fff', 
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}
        >
          {String(totalMatches).padStart(3, '0')}
        </span>
      </div>

      {/* Stat 2: Win Rate */}
      <div 
        style={{ 
          borderLeft: '3px solid var(--neon-green)', 
          paddingLeft: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <span 
          style={{ 
            fontFamily: 'var(--font-pixel)', 
            fontSize: '9px', 
            color: 'var(--neon-green)',
            textShadow: '0 0 4px var(--neon-green)',
            marginBottom: '6px'
          }}
        >
          WIN RATIO
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span 
            style={{ 
              fontFamily: 'var(--font-terminal)', 
              fontSize: '36px', 
              lineHeight: '1', 
              color: '#fff', 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            {winRate}%
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            ({victories}W - {defeats}L)
          </span>
        </div>
        {/* Retro visual bar */}
        <div style={{ width: '100%', height: '6px', background: 'var(--bg-darker)', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
          <div style={{ width: `${winRate}%`, height: '100%', background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)' }}></div>
        </div>
      </div>

      {/* Stat 3: High Score */}
      <div 
        style={{ 
          borderLeft: '3px solid var(--neon-yellow)', 
          paddingLeft: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <span 
          style={{ 
            fontFamily: 'var(--font-pixel)', 
            fontSize: '9px', 
            color: 'var(--neon-yellow)',
            textShadow: '0 0 4px var(--neon-yellow)',
            marginBottom: '6px'
          }}
        >
          HIGH SCORE
        </span>
        <span 
          style={{ 
            fontFamily: 'var(--font-terminal)', 
            fontSize: '36px', 
            lineHeight: '1', 
            color: 'var(--neon-yellow)', 
            fontWeight: 'bold',
            textShadow: '0 0 6px rgba(255,255,0,0.4)',
            letterSpacing: '1px'
          }}
        >
          {String(highScore).padStart(6, '0')}
        </span>
      </div>

      {/* Stat 4: Average Score */}
      <div 
        style={{ 
          borderLeft: '3px solid var(--neon-pink)', 
          paddingLeft: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <span 
          style={{ 
            fontFamily: 'var(--font-pixel)', 
            fontSize: '9px', 
            color: 'var(--neon-pink)',
            textShadow: '0 0 4px var(--neon-pink)',
            marginBottom: '6px'
          }}
        >
          AVG SCORE
        </span>
        <span 
          style={{ 
            fontFamily: 'var(--font-terminal)', 
            fontSize: '36px', 
            lineHeight: '1', 
            color: '#fff', 
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}
        >
          {String(avgScore).padStart(6, '0')}
        </span>
      </div>
    </div>
  );
}
