import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MobileContainer } from '../../components';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function OfficerSettings({ navigation }) {
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);


    const SettingRow = ({ icon, label, description, value, onToggle, isLast }) => (
        <View style={[styles.settingRow, isLast && styles.noBorder]}>
            <View style={styles.settingInfo}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={22} color={COLORS.secondary} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: COLORS.gray300, true: `${COLORS.secondary}50` }}
                thumbColor={value ? COLORS.secondary : COLORS.white}
            />
        </View>
    );

    return (
        <MobileContainer>
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.title}>App Settings</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView style={styles.content}>
                    {/* Notifications Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Notifications</Text>
                        <View style={styles.card}>
                            <SettingRow
                                icon="notifications-outline"
                                label="Push Notifications"
                                description="Receive alerts for new reports"
                                value={notifications}
                                onToggle={setNotifications}
                            />
                            <SettingRow
                                icon="volume-high-outline"
                                label="Sound"
                                description="Play sound for notifications"
                                value={soundEnabled}
                                onToggle={setSoundEnabled}
                            />
                            <SettingRow
                                icon="phone-portrait-outline"
                                label="Vibration"
                                description="Vibrate on notifications"
                                value={vibrationEnabled}
                                onToggle={setVibrationEnabled}
                                isLast
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.versionText}>TrafficEye Officer Edition • v1.0.4</Text>
                        <Text style={styles.copyrightText}>© 2024 TrafficEye System. All rights reserved.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </MobileContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm
    },
    title: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary },
    content: { flex: 1, paddingHorizontal: SPACING.lg },
    section: { marginBottom: SPACING.xl },
    sectionTitle: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: SPACING.sm,
        marginLeft: SPACING.xs
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        paddingHorizontal: SPACING.md,
        ...SHADOWS.md
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray100
    },
    noBorder: { borderBottomWidth: 0 },
    settingInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: `${COLORS.secondary}10`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md
    },
    textContainer: { flex: 1 },
    label: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
    description: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray100
    },
    menuItemText: { flex: 1, fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary, marginLeft: SPACING.md },
    menuItemValue: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginRight: SPACING.xs },
    footer: { alignItems: 'center', marginTop: SPACING.xl, marginBottom: SPACING.xxl },
    versionText: { fontSize: FONT_SIZES.xs, color: COLORS.textSecondary, fontWeight: FONT_WEIGHTS.medium },
    copyrightText: { fontSize: 10, color: COLORS.gray400, marginTop: 4 }
});

