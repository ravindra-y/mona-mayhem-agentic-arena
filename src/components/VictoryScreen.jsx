import { useEffect } from 'react';
import styles from './VictoryScreen.module.css';
import { RetroAudio } from '../utils/RetroAudio';

export default function VictoryScreen({
  warriorName = 'CHAMPION WARRIOR',
  battleScore = 0,
  wavesCleared = 0,
  powerCoreRemaining = 100, // percentage remaining health
  onPlayAgain,
  onViewLeaderboard
}) {
  
  // Play victory theme arpeggios on mount
  useEffect(() => {
    RetroAudio.playVictory();
  }, []);

  const handlePlayAgainClick = () => {
    RetroAudio.playCoin();
    if (onPlayAgain) onPlayAgain();
  };

  const handleLeaderboardClick = () => {
    RetroAudio.playClick();
    if (onViewLeaderboard) onViewLeaderboard();
  };

  return (
    <div className={styles.screenContainer}>
      {/* Glitch CRT Overlay lines */}
      <div className={styles.crtGridOverlay}></div>

      {/* Flashing Gold/Cyan Victory Heading */}
      <header className={styles.header}>
        <div className={styles.flashingStarAward}>🏆 🏆 🏆</div>
        <h1 className={styles.neonTitle} data-text="ARENA CHAMPION">
          ARENA CHAMPION
        </h1>
        <p className={styles.victorySubtitle}>
          ⚡ COMBAT GRID DEFEATED // ALL THREATS WIPED ⚡
        </p>
      </header>

      {/* Battle Record stats panel */}
      <section className={styles.statsCard}>
        <div className={styles.statsCardHeader}>
          <h2>VICTORY BATTLE RECORD</h2>
        </div>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>ARENA WARRIOR:</span>
            <span className={styles.statValue}>{warriorName.toUpperCase()}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>POWER CORE STATUS:</span>
            <span className={`${styles.statValue} ${styles.powerCoreActive}`}>
              {powerCoreRemaining}% [SECURE]
            </span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>SECTOR WAVES CLEARED:</span>
            <span className={styles.statValue}>{String(wavesCleared).padStart(2, '0')}</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statLabel}>FINAL ARENA SCORE:</span>
            <span className={`${styles.statValue} ${styles.scoreColor}`}>
              {String(battleScore).padStart(6, '0')}
            </span>
          </div>
        </div>

        {/* Visual progress bar of secure Power Core */}
        <div className={styles.powerCoreIndicator}>
          <span className={styles.indicatorLabel}>POWER CORE INTEGRITY:</span>
          <div className={styles.meterTrack}>
            <div 
              className={styles.meterFillActive} 
              style={{ width: `${powerCoreRemaining}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Play/Scoreboard actions */}
      <footer className={styles.controlsRow}>
        <button 
          onClick={handlePlayAgainClick} 
          className={`${styles.btnArcade} ${styles.btnPrimary}`}
          onMouseEnter={() => RetroAudio.playClick()}
        >
          PLAY AGAIN
        </button>
        
        <button 
          onClick={handleLeaderboardClick} 
          className={`${styles.btnArcade} ${styles.btnSecondary}`}
          onMouseEnter={() => RetroAudio.playClick()}
        >
          LEADERBOARD
        </button>
      </footer>
    </div>
  );
}
