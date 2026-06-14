import { RetroAudio } from '../utils/RetroAudio';

export default function Header({ audioEnabled, setAudioEnabled }) {
  const toggleAudio = (e) => {
    const enabled = e.target.checked;
    setAudioEnabled(enabled);
    RetroAudio.setEnabled(enabled);
    if (enabled) {
      setTimeout(() => {
        RetroAudio.playCoin();
      }, 50);
    }
  };

  const handleTitleClick = () => {
    RetroAudio.playLaser();
  };

  return (
    <header className="arcade-cabinet" style={{ padding: '16px 24px', marginBottom: '20px' }}>
      <div 
        className="header-content" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <div className="title-area" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          <h1 
            className="glow-pulsing" 
            style={{ 
              fontFamily: 'var(--font-title)', 
              fontWeight: 900, 
              fontSize: '2.5rem', 
              margin: '0', 
              letterSpacing: '3px',
              textTransform: 'uppercase',
              background: 'linear-gradient(to right, var(--neon-pink), var(--neon-purple), var(--neon-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 5px rgba(255, 0, 127, 0.5))'
            }}
          >
            Mona Mayhem
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '9px', 
              color: 'var(--neon-cyan)', 
              margin: '6px 0 0 0',
              textShadow: '0 0 5px var(--neon-cyan)',
              letterSpacing: '1px'
            }}
          >
            // AGENTIC ARENA: MATCH RECORDS
          </p>
        </div>

        <div 
          className="arcade-info" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px',
            flexWrap: 'wrap'
          }}
        >
          {/* Pulsing Insert Coin / Cabin State */}
          <div 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '10px', 
              color: 'var(--neon-yellow)',
              border: '1px solid var(--neon-yellow)',
              padding: '6px 12px',
              borderRadius: '4px',
              boxShadow: '0 0 5px rgba(255, 255, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span className="blink" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-yellow)', display: 'inline-block' }}></span>
            <span>CABINET ACTIVE</span>
          </div>

          <div 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '10px', 
              color: 'var(--text-muted)' 
            }}
          >
            CREDITS: <span className="glow-yellow" style={{ color: 'var(--neon-yellow)' }}>99</span>
          </div>

          {/* Audio toggle */}
          <label className="audio-switch">
            <span>SOUND FX</span>
            <input 
              type="checkbox" 
              checked={audioEnabled} 
              onChange={toggleAudio} 
            />
            <div className="switch-track">
              <div className="switch-thumb"></div>
            </div>
          </label>
        </div>
      </div>
    </header>
  );
}
