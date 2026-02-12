// Validation Utilities
// Reusable form validation functions

/**
 * Validates an email address format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength (minimum 6 characters)
 * @param {string} password 
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
    return password && password.length >= 6;
};

/**
 * Validates a phone number (10+ digits)
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};

/**
 * Validates a badge ID (non-empty string)
 * @param {string} badgeId 
 * @returns {boolean}
 */
export const isValidBadgeId = (badgeId) => {
    return badgeId && badgeId.trim().length > 0;
};

/**
 * Validates that required fields are not empty
 * @param {Object} fields - Key-value pairs to validate
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateRequiredFields = (fields) => {
    const errors = [];
    Object.entries(fields).forEach(([key, value]) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            errors.push(`${key} is required`);
        }
    });
    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validates password confirmation matches
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns {boolean}
 */
export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};
