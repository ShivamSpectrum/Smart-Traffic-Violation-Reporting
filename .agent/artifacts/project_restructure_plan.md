# Traffic Eye - Project Restructure Plan

## Current Issues
1. **Unnecessarily nested directory structure**: `Traffic_Eye/Traffic_EYE/TrafficViolationApp/`
2. **Documentation scattered**: Multiple MD files in different locations
3. **No clear separation of concerns**: Documentation mixed with source code
4. **Inconsistent naming**: `Traffic_Eye` vs `Traffic_EYE`

## Proposed New Structure

```
Traffic_Eye/
├── .git/                           # Git repository
├── .gitignore                      # Git ignore rules
├── README.md                       # Main project documentation
├── package.json                    # Root package.json
├── package-lock.json               # Root lock file
│
├── docs/                           # 📚 All documentation
│   ├── SETUP_GUIDE.md
│   ├── DEMO_GUIDE.md
│   ├── AI_VERIFICATION_FEATURE.md
│   ├── NEW_REPORT_UPDATES.md
│   ├── EXPO_GO_TROUBLESHOOTING.md
│   ├── GOOGLE_SIGNIN_SETUP.md
│   └── URGENT_READ_ME.md
│
├── database/                       # 🗄️ Database related files
│   └── supabase_auth_setup.sql
│
├── assets/                         # 🎨 Images, fonts, icons
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/                           # 💻 Source code
│   ├── components/                # Reusable UI components
│   │   ├── common/               # Common components
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   └── MobileContainer.js
│   │   ├── citizen/              # Citizen-specific components
│   │   └── officer/              # Officer-specific components
│   │
│   ├── screens/                   # Screen components
│   │   ├── auth/                 # Authentication screens
│   │   │   ├── RoleSelection.js
│   │   │   ├── CitizenSignIn.js
│   │   │   ├── CitizenSignUp.js
│   │   │   ├── OfficerSignIn.js
│   │   │   └── ForgotPassword.js
│   │   │
│   │   ├── citizen/              # Citizen screens
│   │   │   ├── CitizenHome.js
│   │   │   ├── NewReport.js
│   │   │   ├── MyReports.js
│   │   │   ├── ReportDetail.js
│   │   │   ├── ReportSuccess.js
│   │   │   ├── Profile.js
│   │   │   ├── Rewards.js
│   │   │   ├── Notifications.js
│   │   │   ├── FineInformation.js
│   │   │   └── ContactUs.js
│   │   │
│   │   ├── officer/              # Officer screens
│   │   │   ├── OfficerDashboard.js
│   │   │   ├── PendingQueue.js
│   │   │   ├── VerifiedReports.js
│   │   │   ├── ReportVerification.js
│   │   │   ├── OfficerProfile.js
│   │   │   └── OfficerSettings.js
│   │   │
│   │   ├── shared/               # Shared screens
│   │   │   ├── SplashScreen.js
│   │   │   ├── OnboardingCarousel.js
│   │   │   ├── PermissionsRequest.js
│   │   │   ├── AIProcessing.js
│   │   │   └── AIResultsVerification.js
│   │   │
│   │   └── index.js              # Screen exports
│   │
│   ├── navigation/                # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── CitizenNavigator.js   # (Future: Citizen-specific navigation)
│   │   └── OfficerNavigator.js   # (Future: Officer-specific navigation)
│   │
│   ├── context/                   # React Context providers
│   │   ├── AuthContext.js
│   │   └── AppContext.js
│   │
│   ├── services/                  # API and external services
│   │   ├── supabase.js           # Supabase client
│   │   ├── api/                  # API calls
│   │   │   ├── auth.js
│   │   │   ├── reports.js
│   │   │   └── users.js
│   │   └── ai/                   # AI services
│   │       └── violationDetection.js
│   │
│   ├── utils/                     # Utility functions
│   │   ├── theme.js
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useLocation.js
│   │   └── useCamera.js
│   │
│   └── types/                     # TypeScript types (if migrating)
│       └── index.js
│
├── .expo/                         # Expo configuration (auto-generated)
├── node_modules/                  # Dependencies (gitignored)
├── App.js                         # App entry point
├── index.js                       # Root index
├── app.json                       # Expo app configuration
└── babel.config.js                # Babel configuration (if needed)
```

## Benefits of New Structure

### 1. **Cleaner Root Directory**
- No nested `Traffic_EYE/TrafficViolationApp/` folders
- All project files at the root level
- Easier navigation and understanding

### 2. **Better Organization**
- **`docs/`**: All documentation in one place
- **`database/`**: Database scripts and schemas
- **`src/`**: Clean separation of source code
- **`assets/`**: All static resources

### 3. **Improved Scalability**
- **Screens organized by role**: `auth/`, `citizen/`, `officer/`, `shared/`
- **Components organized by usage**: `common/`, `citizen/`, `officer/`
- **Services layer**: Separate API calls from UI logic
- **Hooks**: Reusable custom hooks for common functionality

### 4. **Better Developer Experience**
- Easier to find files
- Clear separation of concerns
- Follows React Native best practices
- Easier onboarding for new developers

## Migration Steps

1. **Create new directory structure** at root level
2. **Move documentation** files to `docs/`
3. **Move database** files to `database/`
4. **Reorganize screens** by role (auth, citizen, officer, shared)
5. **Reorganize components** by usage pattern
6. **Create services layer** (move `lib/supabase.js` to `services/`)
7. **Update all imports** in files
8. **Update configuration** files (app.json, package.json)
9. **Test the application** to ensure everything works
10. **Remove old nested directories**

## Implementation Priority

### Phase 1: Core Structure (High Priority)
- ✅ Flatten directory structure
- ✅ Move documentation to `docs/`
- ✅ Reorganize screens by role
- ✅ Update imports

### Phase 2: Enhanced Organization (Medium Priority)
- ✅ Create services layer
- ✅ Organize components by usage
- ✅ Create hooks directory

### Phase 3: Future Improvements (Low Priority)
- 📋 Add TypeScript support
- 📋 Create separate navigators for citizen/officer
- 📋 Add API service layer
- 📋 Add custom hooks for common functionality
