import { supabase } from '../supabase';

export const authService = {
    /**
     * Sign up a new citizen
     */
    signUpCitizen: async (email, password, fullName, phone, referralCode = null) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    role: 'citizen',
                    referral_code: referralCode,
                },
            },
        });
    },

    /**
     * Sign up a new officer
     */
    signUpOfficer: async (email, password, fullName, badgeId, department, jurisdiction) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'officer',
                    badge_id: badgeId,
                    department: department,
                    jurisdiction: jurisdiction,
                },
            },
        });
    },

    /**
     * Sign in with email and password
     */
    signIn: async (email, password) => {
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    },

    /**
     * Sign in with badge ID (for officers)
     */
    signInWithBadge: async (badgeId, password) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('badge_id', badgeId)
            .single();

        if (error || !data) {
            throw new Error('Invalid Badge ID');
        }

        return await authService.signIn(data.email, password);
    },

    /**
     * Sign out
     */
    signOut: async () => {
        return await supabase.auth.signOut();
    },

    /**
     * Reset password
     */
    resetPassword: async (email) => {
        return await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'trafficeye://reset-password',
        });
    },

    /**
     * Get user profile
     */
    getProfile: async (userId) => {
        return await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
    },

    /**
     * Update user profile
     */
    updateProfile: async (userId, updates) => {
        return await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);
    }
};

export default authService;
