import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MobileContainer } from '../../components';
import { useAppContext, useAuth } from '../../context';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, formatPoints } from '../../utils';

export default function Profile({ navigation }) {
    const { setIsAuthenticated, setUserRole } = useAppContext();
    const { profile, signOut } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);

    const menuItems = [
        { icon: 'person', label: 'Edit Profile', screen: 'EditProfile' },
        { icon: 'notifications', label: 'Notifications', screen: 'Notifications' },
        { icon: 'help-circle', label: 'Help & FAQ', screen: 'Help' },
        { icon: 'shield-checkmark', label: 'Privacy Policy', screen: 'Privacy' },
        { icon: 'call', label: 'Contact Us', screen: 'ContactUs' },
    ];

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        setLoggingOut(true);
                        try {
                            await signOut();
                            setIsAuthenticated(false);
                            setUserRole(null);
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                            console.error(error);
                        } finally {
                            setLoggingOut(false);
                        }
                    }
                },
            ]
        );
    };

    const displayName = profile?.full_name || 'User Name';
    const displayEmail = profile?.email || 'user@example.com';
    const displayPhone = profile?.phone || '';
    const displayPoints = profile?.points_balance ?? 0;

    return (
        <MobileContainer>
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={40} color={COLORS.white} />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{displayName}</Text>
                            <Text style={styles.userEmail}>{displayEmail}</Text>
                            {displayPhone ? (
                                <Text style={styles.userPhone}>{displayPhone}</Text>
                            ) : null}
                        </View>
                    </View>
                    <View style={styles.pointsBadge}>
                        <Ionicons name="trophy" size={16} color={COLORS.warning} />
                        <Text style={styles.pointsText}>{formatPoints(displayPoints)}</Text>
                    </View>
                </View>

                <ScrollView style={styles.content}>
                    {/* Referral Code Section */}
                    {profile?.referral_code && (
                        <View style={styles.referralCard}>
                            <View style={styles.referralHeader}>
                                <Ionicons name="gift" size={24} color={COLORS.primary} />
                                <Text style={styles.referralTitle}>Your Referral Code</Text>
                            </View>
                            <Text style={styles.referralCode}>{profile.referral_code}</Text>
                            <Text style={styles.referralInfo}>Share this code to earn 50 points per referral!</Text>
                        </View>
                    )}

                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <Ionicons name={item.icon} size={24} color={COLORS.primary} />
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.gray400} />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                        disabled={loggingOut}
                    >
                        {loggingOut ? (
                            <ActivityIndicator size="small" color={COLORS.error} />
                        ) : (
                            <Ionicons name="log-out" size={24} color={COLORS.error} />
                        )}
                        <Text style={styles.logoutText}>
                            {loggingOut ? 'Logging out...' : 'Logout'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </MobileContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl, backgroundColor: COLORS.primary },
    profileInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primaryDark, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
    userInfo: { flex: 1 },
    userName: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, marginBottom: SPACING.xs },
    userEmail: { fontSize: FONT_SIZES.sm, color: COLORS.white, opacity: 0.9 },
    userPhone: { fontSize: FONT_SIZES.xs, color: COLORS.white, opacity: 0.7, marginTop: 2 },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: BORDER_RADIUS.full,
        marginTop: SPACING.md,
        alignSelf: 'flex-start',
        gap: SPACING.xs,
    },
    pointsText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white },
    content: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
    referralCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.lg,
        ...SHADOWS.sm,
        borderWidth: 1,
        borderColor: COLORS.primaryLight || '#e6f2ff',
    },
    referralHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
    referralTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
    referralCode: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.primary,
        textAlign: 'center',
        letterSpacing: 2,
        marginVertical: SPACING.sm,
    },
    referralInfo: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, textAlign: 'center' },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOWS.sm },
    menuLabel: { flex: 1, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, marginLeft: SPACING.md },
    logoutButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginTop: SPACING.lg, marginBottom: SPACING.xl, ...SHADOWS.sm },
    logoutText: { flex: 1, fontSize: FONT_SIZES.md, color: COLORS.error, marginLeft: SPACING.md, fontWeight: FONT_WEIGHTS.semibold },
});
