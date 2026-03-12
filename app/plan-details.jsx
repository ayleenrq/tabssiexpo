import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../constants/theme';

const SCHEDULE = [
    { date: '15 Jan 2025', amount: '$155.00', paid: true },
    { date: '15 Feb 2025', amount: '$155.00', paid: true },
    { date: '15 Mar 2025', amount: '$155.00', paid: false },
];

function ScheduleRow({ date, amount, paid, isLast }) {
    return (
        <View style={s.scheduleRow}>
            <View style={s.timelineCol}>
                <View style={[s.dot, paid && s.dotPaid]}>
                    {paid && <Ionicons name="checkmark" size={12} color={Colors.white} />}
                </View>
                {!isLast && <View style={s.line} />}
            </View>
            <View style={s.scheduleInfo}>
                <Text style={[s.scheduleDate, { fontWeight: paid ? '500' : '400' }]}>{date}</Text>
                <Text style={[s.scheduleAmount, { color: paid ? Colors.textGray : '#111', fontWeight: paid ? '500' : 'bold' }]}>
                    {amount}
                </Text>
            </View>
        </View>
    );
}

export default function PlanDetailsScreen() {
    return (
        <SafeAreaView style={s.safe}>
            <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

                {/* Dark Summary Card */}
                <View style={s.darkCard}>
                    <Text style={s.darkLabel}>Remaining</Text>
                    <Text style={s.darkAmount}>$310.00</Text>
                    <View style={s.darkStats}>
                        <View>
                            <Text style={s.darkStatLabel}>Order ID</Text>
                            <Text style={s.darkStatValue}>#1234567</Text>
                        </View>
                        <View>
                            <Text style={s.darkStatLabel}>Order Amount</Text>
                            <Text style={s.darkStatValue}>$599.00</Text>
                        </View>
                        <View>
                            <Text style={s.darkStatLabel}>Total Payable</Text>
                            <Text style={s.darkStatValue}>$620.00</Text>
                        </View>
                    </View>
                </View>

                {/* Product Info Card */}
                <View style={[s.card, { flexDirection: 'row' }]}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80' }}
                        style={s.productImage}
                    />
                    <View style={s.productInfo}>
                        <Text style={s.productTitle} numberOfLines={2}>
                            H&M Heavyweight Tshirt Box...
                        </Text>
                        <Text style={s.productColor}>Black</Text>
                        <Text style={s.productDate}>15 Jan 2025</Text>
                    </View>
                </View>

                {/* Payment Schedule */}
                <View style={s.card}>
                    <Text style={s.scheduleTitle}>Your Payment Schedule</Text>
                    {SCHEDULE.map((item, i) => (
                        <ScheduleRow
                            key={i}
                            date={item.date}
                            amount={item.amount}
                            paid={item.paid}
                            isLast={i === SCHEDULE.length - 1}
                        />
                    ))}
                </View>

                {/* Download Receipt */}
                <TouchableOpacity style={s.downloadBtn}>
                    <Ionicons name="receipt-outline" size={20} color={Colors.textGray} />
                    <Text style={s.downloadText}>Download Receipt</Text>
                </TouchableOpacity>

                <View style={{ height: 32 }} />
            </ScrollView>

            {/* Sticky Pay Button */}
            <View style={s.stickyBar}>
                <TouchableOpacity style={s.payBtn}>
                    <Text style={s.payBtnText}>Pay $124.83</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    container: { padding: Spacing.xl, gap: Spacing.lg },
    darkCard: { backgroundColor: Colors.darkCard, borderRadius: Radius.lg, padding: Spacing.xl },
    darkLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
    darkAmount: { color: Colors.white, fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
    darkStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.xxl },
    darkStatLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
    darkStatValue: { color: Colors.white, fontSize: 16, fontWeight: '600', marginTop: 4 },
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        flexDirection: undefined,
    },
    productImage: { width: 80, height: 80, borderRadius: Radius.sm },
    productInfo: { flex: 1, marginLeft: Spacing.lg },
    productTitle: { fontWeight: 'bold', fontSize: 15 },
    productColor: { color: Colors.textGray, fontSize: 13, marginTop: 4 },
    productDate: { fontWeight: 'bold', fontSize: 14, marginTop: 8 },
    scheduleTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: Spacing.xl },
    scheduleRow: { flexDirection: 'row', gap: Spacing.lg, marginBottom: 0 },
    timelineCol: { alignItems: 'center' },
    dot: {
        width: 20, height: 20, borderRadius: 10,
        borderWidth: 2, borderColor: '#D1D5DB',
        alignItems: 'center', justifyContent: 'center',
    },
    dotPaid: { backgroundColor: '#4ADE80', borderColor: '#4ADE80' },
    line: { width: 2, flex: 1, backgroundColor: '#E5E7EB', minHeight: 30 },
    scheduleInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: Spacing.lg,
    },
    scheduleDate: { fontSize: 14, color: '#111' },
    scheduleAmount: { fontSize: 14 },
    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: Radius.md,
        paddingVertical: 14,
    },
    downloadText: { color: '#111', fontWeight: '500' },
    stickyBar: { padding: Spacing.xl, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: Colors.white },
    payBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
    },
    payBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});
