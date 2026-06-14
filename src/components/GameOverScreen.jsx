import { useEffect } from 'react';
import styles from './GameOverScreen.module.css';
import { RetroAudio } from '../utils/RetroAudio';

export default function GameOverScreen({
  warriorName = 'UNKNOWN WARRIOR',
  battleScore = 0,
  wavesCleared = 0,
  onRestart,
  onReturnToArena
}) {
  
  // Play game over effect on mount
  useEffect(() => {
    RetroAudio.playDefeat();
  }, []);

  const handleRestartClick = () => {
    RetroAudio.playCoin();
    if (onRestart) onRestart();
  };

  const handleReturnClick = () => {
    RetroAudio.playClick();
    if (onReturnToArena) onReturnToArena();
  };

  return (
    <div className={styles.screenContainer}>
      {/* Glitch CRT Filter Overlay */}
      <div className={styles.crtGridOverlay}></div>

      {/* Main Game Over Heading */}
      <header className={styles.header}>
        <h1 className={styles.glitchTitle} data-text="SYSTEM FAILURE">
          SYSTEM FAILURE
        </h1>
        <p className={styles.warningSubtitle}>
          ⚠️ CRITICAL ERROR // COGNITIVE SHIELD COMPROMISED ⚠️
        </p>
      </header>

      {/* Battle Statistics Card */}
      <section className={styles.statsCard}>
        <div className={styles.statsCardHeader}>
          <h2>BATTLE RECORD STATS</h2>
        </div>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>ARENA WARRIOR:</span>
            <span className={styles.statValue}>{warriorName.toUpperCase()}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>POWER CORE:</span>
            <span className={`${styles.statValue} ${styles.depletedStatus}`}>
              0% [OFFLINE]
            </span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>SECTOR WAVES:</span>
            <span className={styles.statValue}>{String(wavesCleared).padStart(2, '0')}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>FINAL SCORE:</span>
            <span className={`${styles.statValue} ${styles.scoreColor}`}>
              {String(battleScore).padStart(6, '0')}
            </span>
          </div>
        </div>

        {/* Progress Bar showing depleted Power Core */}
        <div className={styles.powerCoreIndicator}>
          <span className={styles.indicatorLabel}>POWER CORE DEPLETED:</span>
          <div className={styles.meterTrack}>
            <div className={styles.meterFillEmpty}></div>
          </div>
        </div>
      </section>

      {/* Action Controls */}
      <footer className={styles.controlsRow}>
        <button 
          onClick={handleRestartClick} 
          className={`${styles.btnArcade} ${styles.btnPrimary}`}
          onMouseEnter={() => RetroAudio.playClick()}
        >
          RESTART BATTLE
        </button>
        
        <button 
          onClick={handleReturnClick} 
          className={`${styles.btnArcade} ${styles.btnSecondary}`}
          onMouseEnter={() => RetroAudio.playClick()}
        >
          RETURN TO ARENA
        </button>
      </footer>
    </div>
  );
}
