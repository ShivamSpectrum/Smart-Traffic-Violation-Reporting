// OfficerProfile.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MobileContainer } from '../../components';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function OfficerProfile({ navigation }) {
    const { setIsAuthenticated, setUserRole } = useAppContext();
    const { profile, signOut } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);

    const stats = [
        { label: 'Verified', value: '156', icon: 'checkmark-circle' },
        { label: 'Rejected', value: '24', icon: 'close-circle' },
        { label: 'This Month', value: '45', icon: 'calendar' },
    ];

    const settingsItems = [
        { icon: 'settings-outline', label: 'App Settings', description: 'Configure application preferences', screen: 'OfficerSettings' },
        { icon: 'chatbubbles-outline', label: 'Contact Administrator', description: 'Technical support & account issues', action: 'contact' },
        { icon: 'help-circle-outline', label: 'Help Center', description: 'Guidelines and documentation', action: 'help' },
    ];


    const handleAction = (item) => {
        if (item.action === 'contact') {
            Alert.alert(
                'Contact Administrator',
                'How would you like to contact support?',
                [
                    { text: 'Email Support', onPress: () => Alert.alert('Email', 'Support email: admin@trafficeye.gov') },
                    { text: 'Call IT Department', onPress: () => Alert.alert('Call', 'Connecting to IT support...') },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        } else {
            Alert.alert('Info', `${item.label} feature coming soon!`);
        }
    };

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

    // Use Supabase profile data
    const displayName = profile?.full_name || 'Officer';
    const displayBadge = profile?.badge_id || 'N/A';
    const displayEmail = profile?.email || 'officer@trafficeye.com';
    const displayDepartment = profile?.department || 'Traffic Department';
    const displayJurisdiction = profile?.jurisdiction || 'City Center';

    return (
        <MobileContainer>
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <Text style={styles.title}>Officer Profile</Text>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.profileCard}>
                        <View style={styles.avatar}>
                            <Ionicons name="shield-checkmark" size={48} color={COLORS.white} />
                        </View>
                        <Text style={styles.name}>{displayName}</Text>
                        <View style={styles.badgeContainer}>
                            <Ionicons name="id-card" size={16} color={COLORS.secondary} />
                            <Text style={styles.badgeId}>Badge #{displayBadge}</Text>
                        </View>
                        <Text style={styles.email}>{displayEmail}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Ionicons name="business" size={16} color={COLORS.textSecondary} />
                                <Text style={styles.infoText}>{displayDepartment}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Ionicons name="location" size={16} color={COLORS.textSecondary} />
                                <Text style={styles.infoText}>{displayJurisdiction}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <View key={index} style={styles.statCard}>
                                <Ionicons name={stat.icon} size={32} color={COLORS.secondary} />
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Settings & Support</Text>
                        {settingsItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.settingCard}
                                onPress={() => item.action ? handleAction(item) : navigation.navigate(item.screen)}
                            >
                                <View style={[styles.settingIcon, { backgroundColor: `${COLORS.secondary}10` }]}>
                                    <Ionicons name={item.icon} size={22} color={COLORS.secondary} />
                                </View>
                                <View style={styles.settingContent}>
                                    <Text style={styles.settingLabel}>{item.label}</Text>
                                    <Text style={styles.settingDescription}>{item.description}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
                            </TouchableOpacity>
                        ))}
                    </View>

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
    header: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.lg },
    title: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary },
    content: { flex: 1, paddingHorizontal: SPACING.lg },
    profileCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xl, padding: SPACING.xl, alignItems: 'center', marginBottom: SPACING.lg, ...SHADOWS.md },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
    name: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary, marginBottom: SPACING.xs },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        backgroundColor: COLORS.secondaryLight || '#e8f5e9',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.full,
        marginBottom: SPACING.sm,
    },
    badgeId: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.secondary },
    email: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.md },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.lg,
        marginTop: SPACING.sm,
    },
    infoItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
    infoText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary },
    statsContainer: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.lg },
    statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOWS.sm },
    statValue: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary, marginTop: SPACING.sm },
    statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, textAlign: 'center' },
    section: { marginBottom: SPACING.lg },
    sectionTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary, marginBottom: SPACING.md },
    settingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.sm,
        ...SHADOWS.sm
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md
    },
    settingContent: {
        flex: 1
    },
    settingLabel: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary
    },
    settingDescription: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textSecondary,
        marginTop: 2
    },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, padding: SPACING.md, backgroundColor: `${COLORS.error}15`, borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.xl },
    logoutText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.error },
});

