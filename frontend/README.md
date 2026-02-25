# Fin-Link Frontend

A high-performance mobile application for Fin-Link Fitness, built with Expo, React Native Paper, and a custom dark-mode design system.

---

## Repository Structure

```text
frontend/
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── GlobalModal.tsx
│   │   └── GymBooking.tsx
│   ├── context/
│   │   └── ModalContext.tsx
│   ├── screens/
│   │   └── Home.tsx
│   ├── services/
│   │   └── gymService.ts
│   ├── styles/
│   │   └── Theme.ts
│   ├── types/
│   │   └── gym.ts
│   └── App.tsx
├── app.json
├── babel.config.js
├── index.ts
├── metro.config.js
├── package.json
└── tsconfig.json
```

---

## Module Breakdown

### Core Logic & State
| Module | Path | Description |
| :--- | :--- | :--- |
| **Bootstrapping** | `App.tsx` | App entry; orchestrates Paper, Modal, and Error providers. |
| **Safety Net** | `src/components/ErrorBoundary.tsx` | Catch-all for runtime failures; provides a recovery CTA. |
| **Global Modals** | `src/context/ModalContext.tsx` | Central orchestration for unified, portal-rendered modals. |
| **API Client** | `src/services/gymService.ts` | Axios abstractions for gym capacity and booking endpoints. |

### Visual Identity
| Feature | Path | Description |
| :--- | :--- | :--- |
| **Design System** | `src/styles/Theme.ts` | MD3 dark theme (Primary: `#CCFF00`, Surface: `#151515`). |
| **Feature Unit** | `src/components/GymBooking.tsx` | High-fidelity booking card with micro-animations. |
| **Dynamic UI** | `src/components/GlobalModal.tsx` | Reusable modal UI with portal-based rendering. |

---

## Configuration Map

- **app.json**: Controls the Expo build manifest, including the splash screen, native permissions, and standard Expo configurations.
- **metro.config.js**: Customizes the Metro bundler behavior (asset resolution, folder symlinks).
- **babel.config.js**: Configures Babel for React Native and react-native-paper specific transformations.
- **tsconfig.json**: Governs TypeScript strictness and path aliasing for the project.

---

## Development Workflow

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Hotkeys
- **a**: Open Android Emulator
- **i**: Open iOS Simulator
- **w**: Open Web build
- **s**: Scanner for physical device link

---

## System Pillars
1. **Resilience**: Every critical failure is humanized; technical errors map to actionable gym-themed guidance.
2. **Performance**: Selective UI imports and native-driver animations via Animated API.
3. **Consistency**: Global portal system ensures modals always occupy the top-most z-index.
