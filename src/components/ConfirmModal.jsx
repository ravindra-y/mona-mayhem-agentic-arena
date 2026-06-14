import { useState, useEffect } from 'react';
import { RetroAudio } from '../utils/RetroAudio';

export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    if (!isOpen) return;

    RetroAudio.playDefeat(); // Play warning sound when opened

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        RetroAudio.playClick(); // Play a beep each count
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (countdown === 0) {
      onCancel();
    }
  }, [countdown, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(5, 3, 11, 0.85)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="arcade-panel crt-effect"
        style={{
          maxWidth: '450px',
          width: '100%',
          borderColor: 'var(--neon-pink)',
          boxShadow: '0 0 25px var(--neon-pink)',
          textAlign: 'center',
          padding: '30px 20px',
          background: 'var(--bg-dark)'
        }}
      >
        <h2 
          className="blink"
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '18px',
            color: 'var(--neon-pink)',
            textShadow: '0 0 10px var(--neon-pink)',
            margin: '0 0 20px 0'
          }}
        >
          WARNING!
        </h2>

        <p 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            color: '#fff',
            margin: '0 0 30px 0',
            lineHeight: '1.4'
          }}
        >
          YOU ARE ABOUT TO WIPE ALL COMBAT LOGS FROM CABINET STORAGE.<br/>
          THIS ACTION CANNOT BE UNDONE.
        </p>

        {/* Big Retro Countdown */}
        <div style={{ marginBottom: '30px' }}>
          <div 
            style={{ 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '10px', 
              color: 'var(--neon-cyan)',
              marginBottom: '10px'
            }}
          >
            AUTO-ABORT IN:
          </div>
          <div 
            style={{ 
              fontFamily: 'var(--font-terminal)', 
              fontSize: '84px', 
              color: 'var(--neon-yellow)', 
              textShadow: '0 0 15px var(--neon-yellow)',
              lineHeight: '1',
              fontWeight: 'bold'
            }}
          >
            {countdown}
          </div>
        </div>

        {/* Modal Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              RetroAudio.playExplode();
              onConfirm();
            }}
            className="btn-arcade danger"
            style={{ flex: '1 1 150px' }}
          >
            YES, WIPE MEMORY
          </button>
          
          <button
            onClick={() => {
              RetroAudio.playClick();
              onCancel();
            }}
            className="btn-arcade"
            style={{ flex: '1 1 150px' }}
          >
            NO, ABORT!
          </button>
        </div>
      </div>
    </div>
  );
}
