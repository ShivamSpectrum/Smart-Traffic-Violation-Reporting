import React from 'react';
import { View, Text, Share, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MobileContainer } from '../../components';
import { useAuth } from '../../context';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../utils';

const Refer = () => {
  const { profile } = useAuth();
  const referralCode = profile?.referral_code || 'TRAFFIC' + (profile?.id?.substring(0, 5).toUpperCase() || 'GUEST');

  const onShare = async () => {
    try {
      await Share.share({
        message: `Join me on Traffic Eye 🚦📸 and help improve road safety! Use my referral code: ${referralCode}. Download here: https://your-app-link.com`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <MobileContainer>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Refer a Friend</Text>
            <Text style={styles.subtitle}>Help us make roads safer together</Text>
          </View>

          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.card}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="gift" size={64} color={COLORS.white} />
            </View>
            <Text style={styles.cardTitle}>Invite & Earn</Text>
            <Text style={styles.cardText}>
              Share Traffic Eye with your friends and earn bonus points for every successful report they make.
            </Text>
          </LinearGradient>

          <View style={styles.codeSection}>
            <Text style={styles.codeLabel}>Your Referral Code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{referralCode}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.inviteButton} onPress={onShare}>
            <LinearGradient
              colors={[COLORS.accent, COLORS.accentDark]}
              style={styles.gradientButton}
            >
              <Ionicons name="share-social" size={24} color={COLORS.white} />
              <Text style={styles.inviteButtonText}>Invite Now</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>How it works</Text>
            <View style={styles.infoItem}>
              <Ionicons name="send-outline" size={24} color={COLORS.primary} />
              <Text style={styles.infoText}>Send an invite to your friends</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="person-add-outline" size={24} color={COLORS.primary} />
              <Text style={styles.infoText}>They sign up using your link/code</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="shield-checkmark-outline" size={24} color={COLORS.primary} />
              <Text style={styles.infoText}>You both get rewarded for safer roads!</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </MobileContainer>
  );
};

export default Refer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  card: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.md,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  cardText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
  },
  codeSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  codeLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
  codeContainer: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  codeText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  inviteButton: {
    marginBottom: SPACING.xl,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
    ...SHADOWS.sm,
  },
  inviteButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  infoTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
