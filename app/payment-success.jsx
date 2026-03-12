import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

const OTHER_INSTALLMENTS = [
    {
        id: 1,
        dueDate: '10 May 2024',
        status: 'On Progress',
        brand: 'H&M',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1000px-H%26M-Logo.svg.png',
        title: 'H&M Heavyweight Tshirt Boxy Fit W...',
        fraction: '3/4 of installment',
        price: '$620.00',
        isApple: false,
    },
    {
        id: 2,
        dueDate: '7 May 2024',
        status: 'Overdue',
        brand: 'Apple',
        logo: null,
        title: 'Iphone 13',
        fraction: '3/4 of installment',
        price: '$155.00',
        isApple: true,
    },
];

const STATUS_CONFIG = {
    'On Progress': {
        bg: '#FEF9C3',
        border: '#EAB308',
        text: '#854D0E',
        buttonBg: Colors.almostBlack,
    },
    'Overdue': {
        bg: '#FEE2E2',
        border: '#F87171',
        text: '#B91C1C',
        buttonBg: Colors.red,
    },
};

function InstallmentCard({ item }) {
    const config = STATUS_CONFIG[item.status] || STATUS_CONFIG['On Progress'];

    return (
        <View style={s.installCard}>
            {/* Top Row */}
            <View style={s.cardTopRow}>
                <Text style={s.cardDueText}>Due : {item.dueDate}</Text>
                <View style={[s.statusBadge, { backgroundColor: config.bg, borderColor: config.border }]}>
                    <Text style={[s.statusBadgeText, { color: config.text }]}>{item.status}</Text>
                </View>
            </View>

            {/* Mid Row */}
            <View style={s.cardMidRow}>
                <View style={s.logoBox}>
                    {item.logo ? (
                        <Image source={{ uri: item.logo }} style={s.logoImg} resizeMode="contain" />
                    ) : (
                        <Ionicons name="logo-apple" size={26} color="#111" />
                    )}
                </View>
                <View style={s.cardInfo}>
                    <Text style={s.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={s.cardFraction}>{item.fraction}</Text>
                </View>
                <Text style={s.cardPrice}>{item.price}</Text>
            </View>

            {/* Action Row */}
            <View style={s.cardActionRow}>
                <TouchableOpacity
                    style={[s.payBtn, { backgroundColor: config.buttonBg }]}
                    onPress={() => router.push('/review-payment')}
                >
                    <Text style={s.payBtnText}>Pay {item.price}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={s.detailsBtn}
                    onPress={() => router.push('/plan-details')}
                >
                    <Text style={s.detailsBtnText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function PaymentSuccessScreen() {
    return (
        <SafeAreaView style={s.safe}>
            <ScrollView
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Success Icon */}
                <View style={s.successSection}>
                    <View style={s.checkCircle}>
                        <Ionicons name="checkmark" size={32} color={Colors.green} />
                    </View>
                    <Text style={s.successTitle}>Yay! Your bill is settled!</Text>
                    <Text style={s.successSubtitle}>
                        Thanks for your payment! We appreciate{'\n'}your support.
                    </Text>
                </View>

                {/* Settled Item Card */}
                <View style={s.settledCard}>
                    <View style={s.settledRow}>
                        <View style={s.settledInfo}>
                            <Text style={s.settledName}>Iphone 13</Text>
                            <Text style={s.settledFraction}>3/3 of installment</Text>
                        </View>
                        <View style={s.settledRight}>
                            <Text style={s.settledPrice}>$155.00</Text>
                            <View style={s.completeBadge}>
                                <Text style={s.completeBadgeText}>Complete</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Other Installments */}
                <Text style={s.sectionHeading}>Other Installment</Text>

                {OTHER_INSTALLMENTS.map((item) => (
                    <InstallmentCard key={item.id} item={item} />
                ))}

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Bottom Button */}
            <View style={s.bottomBar}>
                <TouchableOpacity
                    style={s.backHomeBtn}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={s.backHomeBtnText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.backgroundGray,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xxl,
        paddingBottom: 8,
    },

    // — Success Section —
    successSection: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    checkCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#DCFCE7',
        borderWidth: 3,
        borderColor: Colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.lg,
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.almostBlack,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    successSubtitle: {
        fontSize: 13,
        color: Colors.textGray,
        textAlign: 'center',
        lineHeight: 20,
    },

    // — Settled Card —
    settledCard: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.xxl,
    },
    settledRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    settledInfo: {
        flex: 1,
    },
    settledName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    settledFraction: {
        fontSize: 12,
        color: Colors.textGray,
        marginTop: 4,
    },
    settledRight: {
        alignItems: 'flex-end',
        gap: 6,
    },
    settledPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    completeBadge: {
        backgroundColor: '#DCFCE7',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#22C55E',
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    completeBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#15803D',
    },

    // — Section Heading —
    sectionHeading: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.almostBlack,
        marginBottom: Spacing.lg,
    },

    // — Installment Card —
    installCard: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    cardDueText: {
        fontSize: 12,
        color: Colors.almostBlack,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    cardMidRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: Spacing.lg,
    },
    logoBox: {
        width: 48,
        height: 48,
        backgroundColor: '#F3F4F6',
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImg: {
        width: 32,
        height: 32,
    },
    cardInfo: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    cardFraction: {
        fontSize: 12,
        color: Colors.textGray,
        marginTop: 2,
    },
    cardPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    cardActionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    payBtn: {
        flex: 2,
        height: 44,
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payBtnText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    detailsBtn: {
        flex: 1,
        height: 44,
        borderRadius: Radius.sm,
        borderWidth: 1,
        borderColor: Colors.borderGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsBtnText: {
        color: Colors.almostBlack,
        fontWeight: 'bold',
        fontSize: 14,
    },

    // — Bottom Bar —
    bottomBar: {
        padding: Spacing.xl,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    backHomeBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
    },
    backHomeBtnText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
