# Mona Mayhem Design System & Developer Instructions

This document defines the custom coding guidelines, architectural patterns, terminology dictionary, and design tokens for the game **Mona Mayhem**.

---

## 🎨 Design Tokens & Cyberpunk Theme

All user interface layouts must follow a **retro cyberpunk arcade** design system using the following values:

| Token | Description | Value |
| :--- | :--- | :--- |
| **Theme Background** | Dark Cyberpunk Backdrop | `#0D0D0D` |
| **Primary Color** | Neon Pink (Glows & Highlights) | `#FF00FF` |
| **Secondary Color** | Neon Cyan (Data & Borders) | `#00FFFF` |
| **Accent Color** | Deep Purple (Details & Gradients) | `#8A2BE2` |
| **Glow Effect** | Pulsing shadow filter offsets | `0 0 10px [color], 0 0 20px [color]` |
| **Typography** | Digital monospace headers & texts | `'Press Start 2P', 'Orbitron', monospace` |

### Key Styling Rules:
1.  **Dark Canvas**: The background must always remain deep dark (`#0D0D0D`) with subtle neon scanning grids or scanlines.
2.  **Glowing Indicators**: Border frames, text titles, and action items must use bright neon text-shadows and box-shadows to emulate hardware console displays.
3.  **Visual Grid Structures**: Standard layout containers should use **CSS Grid** or **CSS Flexbox** to enable clean responsiveness.
4.  **Responsive Dimensions**: Align layouts dynamically. Tables must transform to block structures or collapse into stack panels on screen sizes below `768px`.

---

## 🕹️ Terminology Dictionary

Always replace standard gaming vocabulary with the custom **Mona Mayhem** terminology inside components, markup, comments, and variables:

*   **Player** ➜ `Arena Warrior`
*   **Match** ➜ `Battle Record`
*   **Health** ➜ `Power Core`
*   **Game Over** ➜ `SYSTEM FAILURE`
*   **Victory** ➜ `ARENA CHAMPION`

---

## 💻 Code Patterns & Architecture

1.  **Component Style**: Use **Functional Components** with React Hooks (`useState`, `useEffect`, `useMemo`, etc.) exclusively. Do not write class-based components.
2.  **Styles Isolation**: Encapsulate styles locally using **CSS Modules** (`[ComponentName].module.css`) or scoped stylesheet modules to prevent layout leakage.
3.  **State Synchronization**: Store configurations or persistent states in `localStorage` when tracking histories or local preferences.
4.  **Code Cleanliness**: Proactively clean up unused imports and prevent side-effect state alterations inside renders or effect hooks.
