import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS, BORDER_RADIUS } from '../../utils';

export const ReferralFAB = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('Refer')}
            activeOpacity={0.8}
        >
            <Ionicons name="gift" size={24} color={COLORS.white} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
        zIndex: 999,
    },
});
