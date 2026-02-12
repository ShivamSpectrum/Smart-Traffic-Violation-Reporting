// App Configuration
// Centralized app-level configuration constants

export const APP_CONFIG = {
    appName: 'TrafficEye',
    version: '1.0.4',
    description: 'Smart Violation Reporting',
    splashDuration: 2500, // ms
    aiProcessingDelay: 3000, // ms (simulated AI delay)
};

export const REPORT_CONFIG = {
    maxVideoLength: 15, // seconds
    maxMediaCount: 3,
    supportedViolationTypes: [
        'Speeding',
        'Red Light',
        'Wrong Parking',
        'No Helmet',
        'Wrong Side',
        'Lane Cutting',
        'Drunk Driving',
        'Dangerous Driving',
        'No Seat Belt',
    ],
};

export const POINTS_CONFIG = {
    reportSubmission: 10,
    referralBonus: 50,
};
