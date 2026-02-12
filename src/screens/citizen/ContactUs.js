import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MobileContainer } from '../../components';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../utils/theme';

export default function ContactUs({ navigation }) {
    const contactInfo = {
        phone: '+91 98765 43210',
        email: 'support@trafficeye.com',
    };

    const handlePhonePress = () => {
        Linking.openURL(`tel:${contactInfo.phone}`).catch(() => {
            Alert.alert('Error', 'Unable to make phone call');
        });
    };

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${contactInfo.email}`).catch(() => {
            Alert.alert('Error', 'Unable to open email client');
        });
    };

    return (
        <MobileContainer>
            <SafeAreaView style={styles.container} edges={['top']}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Contact Us</Text>
                    <View style={styles.placeholder} />
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Introduction */}
                    <View style={styles.introCard}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="chatbubbles" size={48} color={COLORS.primary} />
                        </View>
                        <Text style={styles.introTitle}>We're Here to Help!</Text>
                        <Text style={styles.introText}>
                            Have questions or need assistance? Feel free to reach out to us through any of the channels below.
                        </Text>
                    </View>

                    {/* Contact Cards */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Get in Touch</Text>

                        {/* Phone */}
                        <TouchableOpacity style={styles.contactCard} onPress={handlePhonePress}>
                            <View style={[styles.contactIcon, { backgroundColor: `${COLORS.success}15` }]}>
                                <Ionicons name="call" size={28} color={COLORS.success} />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Phone</Text>
                                <Text style={styles.contactValue}>{contactInfo.phone}</Text>
                                <Text style={styles.contactHint}>Tap to call</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.gray400} />
                        </TouchableOpacity>

                        {/* Email */}
                        <TouchableOpacity style={styles.contactCard} onPress={handleEmailPress}>
                            <View style={[styles.contactIcon, { backgroundColor: `${COLORS.primary}15` }]}>
                                <Ionicons name="mail" size={28} color={COLORS.primary} />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactLabel}>Email</Text>
                                <Text style={styles.contactValue}>{contactInfo.email}</Text>
                                <Text style={styles.contactHint}>Tap to send email</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.gray400} />
                        </TouchableOpacity>
                    </View>

                    {/* About Traffic Eye */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Traffic Eye</Text>

                        <View style={styles.aboutCard}>
                            <View style={styles.aboutHeader}>
                                <Ionicons name="information-circle" size={32} color={COLORS.primary} />
                                <Text style={styles.aboutTitle}>Our Mission</Text>
                            </View>

                            <Text style={styles.aboutText}>
                                Traffic Eye is a community-driven platform that empowers citizens to report traffic violations and help make roads safer for everyone. Our mission is to create a transparent and accountable traffic management system through technology and civic participation.
                            </Text>

                            <View style={styles.divider} />

                            <Text style={styles.aboutSubtitle}>What We Offer</Text>
                            <View style={styles.featureList}>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                                    <Text style={styles.featureText}>Easy violation reporting with AI assistance</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                                    <Text style={styles.featureText}>Real-time verification by traffic officers</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                                    <Text style={styles.featureText}>Reward points for verified reports</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                                    <Text style={styles.featureText}>Community-driven road safety initiative</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                                    <Text style={styles.featureText}>24/7 support and assistance</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </MobileContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.primary,
    },
    backButton: {
        padding: SPACING.xs,
    },
    headerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.white,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
    },
    introCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        marginBottom: SPACING.lg,
        ...SHADOWS.md,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${COLORS.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    introTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    introText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.md,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },
    contactIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    contactValue: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    contactHint: {
        fontSize: FONT_SIZES.xs,
        color: COLORS.primary,
        fontStyle: 'italic',
    },
    aboutCard: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.lg,
        ...SHADOWS.sm,
    },
    aboutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        marginBottom: SPACING.md,
    },
    aboutTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
    },
    aboutSubtitle: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
        marginTop: SPACING.sm,
    },
    aboutText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 22,
        marginBottom: SPACING.sm,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.gray300 || '#E0E0E0',
        marginVertical: SPACING.md,
    },
    featureList: {
        gap: SPACING.sm,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingVertical: SPACING.xs,
    },
    featureText: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        flex: 1,
    },
});

