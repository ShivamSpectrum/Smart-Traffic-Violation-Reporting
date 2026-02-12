# 🚀 How to Run Traffic Eye

The project has been restructured for better performance and maintainability. Follow these steps to get it running on your machine.

---

## 🛠️ Prerequisites

1.  **Node.js**: Version **20.x** or higher (LTS recommended).
2.  **Expo Go**: Download the app on your mobile device (iOS/Android).
3.  **Dependencies**: Git (optional, for cloning).

---

## 🏃 Running the Project

### 1. Install Dependencies
Open your terminal in the project root (`d:\Traffic_Eye`) and run:
```bash
npm install
```

### 2. Start the Development Server
Run the following command to start the Expo server:
```bash
npm start
```

### 3. Open the App
- **Real Device**: Open the **Expo Go** app on your phone and scan the QR code displayed in your terminal.
- **Android Emulator**: Press `a` in the terminal.
- **iOS Simulator**: Press `i` in the terminal.
- **Web**: Press `w` (useful for quick UI checks, but some native features like Camera may not work).

---

## 📁 Key Project Locations

- **Screens**: `src/screens/` (Citizen, Officer, and Shared)
- **Services**: `src/services/` (Auth and Supabase)
- **Hooks**: `src/hooks/` (Camera, Location)
- **Config**: `src/config/` (Centralized API and App config)
- **UI Components**: `src/components/`

---

## 💡 Troubleshooting

- **Node Version Error**: If you see a warning about Node version, ensure you are using Node 20 or higher.
- **Metro Bundler Issue**: If the app doesn't load, try clearing the cache:
  ```bash
  npx expo start -c
  ```
- **File Not Found**: Ensure you are in the root directory `d:\Traffic_Eye` when running commands.

---

> [!NOTE]
> The project structure is documented in detail in [docs/PROJECT_STRUCTURE.md](../docs/PROJECT_STRUCTURE.md).
