import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function ActiveInstallmentCard({ fraction, title, dueDate, dueDateColor }) {
    let progress = 0.5;
    try {
        const parts = fraction.split('/');
        if (parts.length === 2) {
            progress = parseFloat(parts[0]) / parseFloat(parts[1]);
        }
    } catch (_) { }

    const size = 48;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#E5E7EB"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={Colors.primary}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </Svg>
                <Text style={styles.fractionText}>{fraction}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={[styles.dueDate, { color: dueDateColor || Colors.textGray }]}>
                    {dueDate}
                </Text>
            </View>

            <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
    },
    progressContainer: {
        width: 48,
        height: 48,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fractionText: {
        position: 'absolute',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111',
    },
    info: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#111',
        marginBottom: 4,
    },
    dueDate: {
        fontSize: 12,
        fontWeight: '500',
    },
    payButton: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.sm,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    payButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
});
