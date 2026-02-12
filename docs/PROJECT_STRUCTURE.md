# 🏗️ Traffic Eye Project Structure

Traffic Eye uses a modernized **Modular Architecture** designed for scalability, maintainability, and clean separation of concerns.

## 🗂️ Directory Hierarchy

```
Traffic_Eye/
├── src/
│   ├── components/            # 🧱 Shared UI Components
│   │   ├── common/           # Generic atoms (Button, Input, Alert)
│   │   └── index.js          # Barrel export for all components
│   │
│   ├── config/               # ⚙️ App Configuration
│   │   ├── app.config.js     # Global constants and magic numbers
│   │   ├── supabase.config.js# Backend connection details
│   │   └── index.js          # Barrel export for config
│   │
│   ├── context/              # 🌐 State Management (Context API)
│   │   ├── AuthContext.js    # Identity & Session management
│   │   ├── AppContext.js     # Shared application state
│   │   └── index.js          # Barrel export for contexts
│   │
│   ├── hooks/                 # 🎣 Custom Hooks
│   │   ├── useImagePicker.js # Camera & Gallery logic
│   │   ├── useLocation.js    # GPS & Geocoding logic
│   │   └── index.js          # Barrel export for hooks
│   │
│   ├── navigation/            # 🧭 Navigation Layer
│   │   ├── AppNavigator.js    # Root entry point & Auth Guard
│   │   ├── CitizenNavigator.js# Citizen-specific flows
│   │   ├── OfficerNavigator.js# Officer-specific flows
│   │   └── index.js          # Barrel export for navigators
│   │
│   ├── screens/               # 📱 UI Screens (Organized by role)
│   │   ├── auth/             # Login, Signup, Role selection
│   │   ├── citizen/          # Citizen dashboard and reporting
│   │   ├── officer/          # Officer verified/pending queues
│   │   ├── shared/           # Onboarding, Splash, AI screens
│   │   └── index.js          # Master barrel export for all screens
│   │
│   ├── services/              # 🔌 Backend Services
│   │   ├── auth/             # Auth-specific business logic
│   │   ├── supabase/         # Supabase client initialization
│   │   └── index.js          # Barrel export for services
│   │
│   └── utils/                 # 🛠️ Helper Functions & Theme
│       ├── validation/       # Form validation logic
│       ├── formatters/       # Date, Number, and Text formatting
│       ├── constants.js      # Shared Enums (ROLES, STATUS)
│       ├── theme.js          # Design tokens (COLORS, FONTS)
│       └── index.js          # Master barrel export for utilities
```

## 📐 Architectural Principles

### 1. **Barrel Exports (index.js)**
Every major directory contains an `index.js` file. This allows for clean, single-line imports:
`import { Button, Input } from '../../components';`
instead of multiple lines pointing to nested files.

### 2. **Service Layer Abstraction**
Screens and Contexts **never** call `supabase` directly for auth or database operations. They use abstracted services. This makes it easy to swap backend logic without touching UI components.

### 3. **Centralized Utility & Config**
Validation logic, formatters, and app-wide constants are moved out of screens and into the `utils/` and `config/` directories. This ensures consistency (e.g., all dates are formatted the same way).

### 4. **Logic Extraction (Hooks)**
Repeated, complex logic like Camera/Gallery handling or Location detection is extracted into custom hooks (`src/hooks/`). This keeps screens small and focused on UI.

### 5. **Role-Based Separation**
Screens and Navigation are strictly separated by user role to avoid leaking logic between different user types.

---

> 📖 For setup instructions, see [docs/SETUP_GUIDE.md](../docs/SETUP_GUIDE.md)
