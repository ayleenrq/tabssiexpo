import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';
import { router } from 'expo-router';

const STATUS_CONFIG = {
    'On Progress': {
        badgeBg: '#FEF3C7',
        badgeBorder: '#F59E0B',
        badgeText: '#92400E',
        payBtnBg: '#1C1C1E',
        showPay: true,
        label: 'On Progress',
    },
    'Overdue': {
        badgeBg: '#FEE2E2',
        badgeBorder: '#FECACA',
        badgeText: '#EF4444',
        payBtnBg: '#EF4444',
        showPay: true,
        label: 'Overdue',
    },
    'Completed': {
        badgeBg: '#DCFCE7',
        badgeBorder: '#86EFAC',
        badgeText: '#16A34A',
        payBtnBg: null,
        showPay: false,
        label: 'Complete',
    },
};

export default function PlanItemCard({ item, status = 'On Progress' }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['On Progress'];

    return (
        <View style={s.card}>
            {/* Top Row: Due Date & Status Badge */}
            <View style={s.topRow}>
                <Text style={s.dueText}>Due : {item.dueDate}</Text>
                <View style={[s.badge, { backgroundColor: config.badgeBg, borderColor: config.badgeBorder }]}>
                    <Text style={[s.badgeText, { color: config.badgeText }]}>{config.label}</Text>
                </View>
            </View>

            {/* Middle Row: Logo + Info + Price */}
            <View style={s.midRow}>
                <View style={s.logoBox}>
                    {item.logo ? (
                        <Image source={{ uri: item.logo }} style={s.logo} resizeMode="contain" />
                    ) : item.brand === 'Apple' ? (
                        <Ionicons name="logo-apple" size={26} color="#111" />
                    ) : (
                        <Text style={s.brandInitial}>{item.brand?.[0] || '?'}</Text>
                    )}
                </View>
                <View style={s.infoCol}>
                    <Text style={s.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={s.fraction}>{item.fraction}</Text>
                </View>
                <Text style={s.price}>{item.price}</Text>
            </View>

            {/* Bottom Row: Buttons */}
            <View style={s.actionRow}>
                {config.showPay && (
                    <TouchableOpacity
                        style={[s.payBtn, { backgroundColor: config.payBtnBg }]}
                        onPress={() => router.push('/review-payment')}
                        activeOpacity={0.8}
                    >
                        <Text style={s.payBtnText}>Pay {item.price}</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[s.detailBtn, !config.showPay && s.detailBtnFull]}
                    onPress={() => router.push('/plan-details')}
                    activeOpacity={0.8}
                >
                    <Text style={s.detailBtnText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    dueText: {
        fontSize: 13,
        color: '#111',
        fontWeight: '500',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    midRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: Spacing.lg,
    },
    logoBox: {
        width: 48,
        height: 48,
        borderRadius: Radius.sm,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    logo: {
        width: 32,
        height: 32,
    },
    brandInitial: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    infoCol: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 3,
    },
    fraction: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
    },

    // Buttons
    actionRow: {
        flexDirection: 'row',
        gap: 10,
    },
    payBtn: {
        flex: 2,
        height: 44,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    detailBtn: {
        flex: 1,
        height: 44,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    detailBtnFull: {
        flex: 1,  // full width when no pay button (Completed)
    },
    detailBtnText: {
        color: '#111',
        fontWeight: '600',
        fontSize: 14,
    },
});
