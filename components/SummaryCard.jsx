import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function SummaryCard({ totalAmount, onProgress, overdue, totalItems }) {
    return (
        <View style={s.card}>
            {/* Decorative circles */}
            <View style={s.circleOuter} />
            <View style={s.circleInner} />

            <Text style={s.label}>Total to pay</Text>
            <Text style={s.amount}>{totalAmount}</Text>
            <View style={s.divider} />
            <View style={s.statsRow}>
                <View>
                    <Text style={s.statLabel}>On progress</Text>
                    <Text style={s.statValue}>{onProgress}</Text>
                </View>
                <View>
                    <Text style={s.statLabel}>Overdue</Text>
                    <Text style={s.statValue}>{overdue}</Text>
                </View>
                <View>
                    <Text style={s.statLabel}>Total Item</Text>
                    <Text style={s.statValue}>{totalItems}</Text>
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: '#E9D5FF',
        borderRadius: Radius.xxl || 20,
        padding: Spacing.xxl,
        position: 'relative',
        overflow: 'hidden',
    },
    // Decorative circles on top-right
    circleOuter: {
        position: 'absolute',
        right: -40,
        top: -40,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(196,181,253,0.45)',
    },
    circleInner: {
        position: 'absolute',
        right: -10,
        top: -10,
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(167,139,250,0.3)',
    },
    label: {
        fontSize: 13,
        color: '#7C3AED',
        marginBottom: 6,
        fontWeight: '500',
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
        marginVertical: Spacing.lg,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statLabel: {
        fontSize: 12,
        color: '#7C3AED',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
});
