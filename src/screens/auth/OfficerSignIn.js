import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MobileContainer } from '../../components';
import { Button } from '../../components';
import { Input } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../utils/theme';

export default function OfficerSignIn({ navigation }) {
    const [badgeId, setBadgeId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { signInWithBadge } = useAuth();

    const handleSignIn = async () => {
        if (!badgeId.trim()) {
            Alert.alert('Error', 'Please enter your Badge ID');
            return;
        }
        if (!password) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await signInWithBadge(badgeId.trim(), password);

            if (error) {
                Alert.alert('Sign In Failed', error.message);
                return;
            }

            // Successfully signed in
            // AuthContext will automatically update and AppNavigator will redirect to OfficerMain
            console.log('Officer sign in successful. AuthContext will update AppNavigator.');
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MobileContainer>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <View style={styles.badge}>
                            <Ionicons name="shield-checkmark" size={64} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.title}>Officer Sign In</Text>
                        <Text style={styles.subtitle}>Access your verification dashboard</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Badge ID"
                            placeholder="Enter your badge ID"
                            value={badgeId}
                            onChangeText={setBadgeId}
                            autoCapitalize="none"
                        />

                        <View>
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={20}
                                    color={COLORS.gray500}
                                />
                            </TouchableOpacity>
                        </View>

                        <Button
                            onPress={handleSignIn}
                            fullWidth
                            variant="success"
                            style={styles.signInButton}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={COLORS.white} />
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                        <View style={styles.infoBox}>
                            <Ionicons name="information-circle-outline" size={20} color={COLORS.secondary} />
                            <Text style={styles.infoText}>
                                Officer accounts are created by administrators. Contact your department if you need access.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </MobileContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    scrollContent: { flexGrow: 1 },
    header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.lg, alignItems: 'center' },
    backButton: { alignSelf: 'flex-start', marginBottom: SPACING.lg },
    badge: { marginBottom: SPACING.lg },
    title: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary, marginBottom: SPACING.sm },
    subtitle: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, textAlign: 'center' },
    form: { paddingHorizontal: SPACING.lg },
    eyeIcon: {
        position: 'absolute',
        right: SPACING.md,
        top: 38,
    },
    signInButton: { marginTop: SPACING.md },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: COLORS.gray100 || '#f0f0f0',
        padding: SPACING.md,
        borderRadius: 8,
        marginTop: SPACING.xl,
        gap: SPACING.sm,
    },
    infoText: {
        flex: 1,
        fontSize: FONT_SIZES.sm,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
});

