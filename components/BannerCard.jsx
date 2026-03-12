import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function BannerCard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Holiday Sale 2025</Text>
            <Text style={styles.subtitle}>Up to 30% OFF on top brands!</Text>
            <Text style={styles.caption}>Pay easily via Tabssi Paylater</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F7F5FE',
        borderRadius: Radius.lg,
        borderWidth: 2,
        borderColor: Colors.white,
        paddingVertical: Spacing.xxl,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: Spacing.lg,
    },
    caption: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '600',
    },
});
