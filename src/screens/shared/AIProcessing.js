// AIProcessing.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { MobileContainer } from '../../components';
import { useAppContext } from '../../context';
import { aiService } from '../../services';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../utils';

export default function AIProcessing({ navigation }) {
    const { currentReport } = useAppContext();
    const [status, setStatus] = useState('Initializing AI...');

    useEffect(() => {
        const processImage = async () => {
            if (!currentReport?.image) {
                // If no image, wait a bit and fallback or error
                setTimeout(() => {
                    navigation.replace('AIResultsVerification', {
                        aiResults: { vehicleNumber: 'N/A', violationType: 'Unknown', confidence: 0 }
                    });
                }, 2000);
                return;
            }

            try {
                setStatus('Extracting vehicle details...');
                const results = await aiService.analyzeViolationImage(currentReport.image);

                setStatus('Finalizing results...');
                // Small delay for UI smoothness
                setTimeout(() => {
                    navigation.replace('AIResultsVerification', { aiResults: results });
                }, 1000);

            } catch (error) {
                console.error('AI Processing Screen Error:', error);
                Alert.alert(
                    'AI Processing Failed',
                    'We couldn\'t analyze the image automatically. Please enter details manually.',
                    [
                        {
                            text: 'Enter Manually',
                            onPress: () => navigation.replace('AIResultsVerification', {
                                aiResults: { vehicleNumber: '', violationType: '', confidence: 0 }
                            })
                        }
                    ]
                );
            }
        };

        processImage();
    }, [currentReport, navigation]);

    return (
        <MobileContainer>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.title}>Analyzing Violation...</Text>
                <Text style={styles.subtitle}>{status}</Text>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detail}>• Detecting vehicle number plate</Text>
                    <Text style={styles.detail}>• Identifying violation type</Text>
                    <Text style={styles.detail}>• Calculating confidence level</Text>
                </View>
            </View>
        </MobileContainer>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.lg },
    title: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, marginTop: SPACING.lg, color: COLORS.textPrimary },
    subtitle: { fontSize: FONT_SIZES.md, marginTop: SPACING.sm, marginBottom: SPACING.xl, color: COLORS.primary },
    detailsContainer: {
        width: '100%',
        paddingHorizontal: SPACING.xl,
    },
    detail: { fontSize: FONT_SIZES.sm, marginTop: SPACING.xs, color: COLORS.textSecondary },
});
