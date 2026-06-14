# 🕹️ Mona Mayhem Agentic Arena

Welcome to **Mona Mayhem Agentic Arena**, a premium retro-arcade themed Match History dashboard. This application tracks player records, calculates real-time dashboard statistics, and features nostalgic neon-CRT visual styling alongside synthesised 8-bit sound effects.

---

## 🚀 Key Features

*   **Combat Logging**: Log player names, scores, arena outcomes (Victory/Defeat), and custom timestamps.
*   **AI Combat Simulator**: Simulate random bot matches instantly to preview high scores and leaderboard actions.
*   **Digital Scoreboard (Stats Panel)**: Dynamic calculations of:
    *   *Total Combats* played
    *   *Win Ratio* (percentages and Victory/Defeat counts)
    *   *Leaderboard High Score*
    *   *Average Combat Score*
*   **Leaderboard Sorting & Filtering**: Filter records by player name and sort columns by combat date or score (classic high-score cabinet style).
*   **8-bit Retro Audio Synthesizer**: Native **Web Audio API** sound effects (sound toggle included in the header):
    *   🪙 *Coin double-beep* when combat is logged.
    *   ⚡ *Laser click* on button clicks/form interactions.
    *   🏆 *Victory arpeggio* on winning match addition.
    *   👾 *Defeat chord* on losing match addition or modal alerts.
    *   💥 *Explosive boom* when deleting records.
*   **Continue? Countdown Modal**: A warning popup with a ticking 9-second countdown timer that automatically aborts the reset operation if it expires.
*   **CRT Cabinet Style**: Custom deep-dark neon design, flashing status indicators, glass screen flicker animations, custom glowing scrollbars, and scanlines.
*   **Responsive Layout**: Mobile-friendly table styling that collapses wide rows into readable labeled blocks on narrow screens.
*   **Data Persistence**: All matches and audio preferences are persisted automatically using `localStorage`.

---

## 🛠️ Tech Stack & Architecture

1.  **Core Framework**: React 19 (Hooks, Contexts)
2.  **Bundler**: Vite 8 (Hot Module Replacement)
3.  **Styling**: Modern Custom CSS variables, animations, and keyframes (zero third-party CSS frameworks to maximize control over visual accents)
4.  **Audio Engine**: Web Audio API (Synthesizing square, sawtooth, and triangle wave frequencies dynamically on the client)

---

## ⚙️ How to Get Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to play!

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter
```bash
npm run lint
```

---

## 📂 Project Structure

```
├── public/
│   └── icons.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── AddMatchForm.jsx     # Log or simulate matches
│   │   ├── ConfirmModal.jsx     # Ticking cabinet-style wipe modal
│   │   ├── Header.jsx           # Glowing title, credits, audio toggle
│   │   ├── MatchHistoryTable.jsx# Sortable responsive record grid
│   │   └── StatsPanel.jsx       # Digital console dashboard
│   ├── utils/
│   │   └── RetroAudio.js        # 8-bit sound effects synthesizer
│   ├── App.jsx                  # Main coordinator & state sync
│   ├── index.css                # Visual themes & CRT animation keyframes
│   └── main.jsx                 # Client entrypoint
├── eslint.config.js             # Linter config
├── package.json
└── README.md
```
