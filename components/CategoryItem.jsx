import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function CategoryItem({ iconName, label }) {
    return (
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <Ionicons name={iconName} size={24} color={Colors.textGray} />
            </View>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconBox: {
        width: 56,
        height: 56,
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: '#111',
    },
});
