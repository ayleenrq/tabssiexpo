import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BannerCard from '../components/BannerCard';
import ProductCardHorizontal from '../components/ProductCardHorizontal';
import { Colors, Radius, Spacing } from '../constants/theme';

const SUMMARY = [
    { label: 'Product Name', value: 'Iphone 13' },
    { label: 'Monthly Payment', value: '$155.00' },
    { label: 'Number Of installment', value: '3th installment' },
    { label: 'Shipping Subtotal', value: '-' },
    { label: 'Service Fee', value: '-' },
];

function SummaryRow({ label, value }) {
    return (
        <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>{label}</Text>
            <Text style={s.summaryColon}>:</Text>
            <Text style={s.summaryValue}>{value}</Text>
        </View>
    );
}

export default function ReviewPaymentScreen() {
    return (
        <SafeAreaView style={s.safe}>
            <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
                {/* Payment Summary Card */}
                <View style={s.card}>
                    <Text style={s.cardTitle}>Payment Summary</Text>
                    {SUMMARY.map((row) => (
                        <View key={row.label} style={{ marginTop: Spacing.lg }}>
                            <SummaryRow {...row} />
                        </View>
                    ))}
                </View>

                {/* Banner */}
                <BannerCard />

                {/* Recommendation */}
                <View style={s.sectionRow}>
                    <Text style={s.sectionTitle}>Recommendation</Text>
                    <Text style={s.sectionAction}>See all</Text>
                </View>
                <View style={s.gridRow}>
                    <View style={{ flex: 1 }}>
                        <ProductCardHorizontal
                            badge="New"
                            imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80"
                            title="iPhone 13 Pro"
                            price="$999"
                            width={undefined}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ProductCardHorizontal
                            badge="Top"
                            imageUrl="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=300&q=80"
                            title="iPhone 13"
                            price="$799"
                            width={undefined}
                        />
                    </View>
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>

            {/* Sticky Pay Now Button */}
            <View style={s.stickyBar}>
                <TouchableOpacity
                    style={s.payBtn}
                    onPress={() => router.push('/payment-success')}
                >
                    <Text style={s.payBtnText}>Pay Now - $155.00</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    container: { padding: Spacing.xl, gap: Spacing.xxl },
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.xl,
    },
    cardTitle: { fontWeight: 'bold', fontSize: 16 },
    summaryRow: { flexDirection: 'row', alignItems: 'flex-start' },
    summaryLabel: { flex: 2, color: '#111', fontSize: 14 },
    summaryColon: { color: '#111', fontSize: 14, marginHorizontal: 8 },
    summaryValue: { flex: 3, fontWeight: '500', fontSize: 14 },
    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold' },
    sectionAction: { color: Colors.primary, fontWeight: '500' },
    gridRow: { flexDirection: 'row', gap: 16 },
    stickyBar: { padding: Spacing.xl, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: Colors.white },
    payBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
    },
    payBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});
