import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function CheckoutScreen() {
    const [selectedInstallment, setSelectedInstallment] = useState(3);

    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Checkout Product</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Shipping Info */}
                <Text style={s.sectionTitle}>Shipping Information</Text>
                <TouchableOpacity style={s.card} onPress={() => router.push('/shipping-addresses')} activeOpacity={0.8}>
                    <View style={s.shippingRow}>
                        <View style={s.iconBox}>
                            <Ionicons name="location-outline" size={20} color={Colors.primary} />
                        </View>
                        <View style={s.shippingInfo}>
                            <View style={s.nameRow}>
                                <Text style={s.name}>Ali Mujahidin</Text>
                                <Text style={s.phone}>+971 50 123 4567</Text>
                            </View>
                            <Text style={s.address} numberOfLines={2}>
                                Unit 804, Building B, Corniche Avenue, overlooking the stunning waterfront of Dubai...
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textGray} />
                    </View>
                </TouchableOpacity>

                {/* Purchase Details */}
                <Text style={s.sectionTitle}>Purchase Details</Text>
                
                {/* Product Card */}
                <View style={[s.card, { padding: Spacing.md }]}>
                    <View style={s.productRow}>
                        <View style={s.productImgBox}>
                            <Image 
                                source={{ uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80' }} 
                                style={s.productImg} 
                                resizeMode="cover" 
                            />
                        </View>
                        <View style={s.productDetail}>
                            <Text style={s.productTitle} numberOfLines={2}>
                                The iPhone 13 features a sleek...
                            </Text>
                            <Text style={s.productVariant}>Dark Green variant</Text>
                            <Text style={s.productPrice}>$339.00</Text>
                        </View>
                    </View>
                </View>

                {/* Tabssi Card */}
                <View style={[s.card, { padding: Spacing.md }]}>
                    <View style={s.tabssiRow}>
                        <View style={s.tabssiLogoBox}>
                            {/* Dummy icon for Tabssi */}
                            <Ionicons name="triangle-outline" size={20} color={Colors.white} style={{ transform: [{ rotate: '180deg' }] }} />
                            <Ionicons name="triangle" size={14} color={Colors.white} style={{ position: 'absolute', transform: [{ rotate: '180deg' }], top: 11 }} />
                        </View>
                        <View style={s.tabssiInfo}>
                            <Text style={s.tabssiTitle}>Tabssi Pay Later</Text>
                            <Text style={s.tabssiDesc}>Available to spent : $512.23</Text>
                        </View>
                    </View>
                </View>

                {/* Installments Option */}
                <View style={[s.card, { padding: Spacing.md }]}>
                    <View style={s.installTabsContainer}>
                        {/* 3 Months */}
                        <TouchableOpacity style={[s.installTab, selectedInstallment === 3 && s.installTabActive]} onPress={() => setSelectedInstallment(3)}>
                            <Text style={[s.installTabText, selectedInstallment === 3 && s.installTabTextActive]}>$133.25 x 3 mo</Text>
                        </TouchableOpacity>
                        {/* 6 Months */}
                        <TouchableOpacity style={[s.installTab, selectedInstallment === 6 && s.installTabActive]} onPress={() => setSelectedInstallment(6)}>
                            <Text style={[s.installTabText, selectedInstallment === 6 && s.installTabTextActive]}>$66.50 x 6</Text>
                        </TouchableOpacity>
                        {/* 12 Months */}
                        <TouchableOpacity style={[s.installTab, selectedInstallment === 12 && s.installTabActive]} onPress={() => setSelectedInstallment(12)}>
                            <Text style={[s.installTabText, selectedInstallment === 12 && s.installTabTextActive]}>$33.25 x 12 mo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Schedule */}
                    <View style={s.scheduleList}>
                        <View style={s.scheduleRow}>
                            <Text style={s.scheduleDate}>March 15, 2024</Text>
                            <Text style={s.scheduleAmt}>$133.25</Text>
                        </View>
                        <View style={s.scheduleRow}>
                            <Text style={s.scheduleDate}>April 15, 2024</Text>
                            <Text style={s.scheduleAmt}>$133.25</Text>
                        </View>
                        <View style={s.scheduleRow}>
                            <Text style={s.scheduleDate}>May 15, 2024</Text>
                            <Text style={s.scheduleAmt}>$133.25</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Summary */}
                <Text style={s.sectionTitle}>Payment Summary</Text>
                
                <View style={s.summaryContainer}>
                    <View style={s.summaryRow}>
                        <Text style={s.summaryLabelDark}>Subtotal Product</Text>
                        <Text style={s.summaryValueDark}>$399.00</Text>
                    </View>
                    <View style={s.summaryRowSub}>
                        <Text style={s.summaryLabelLight}>Monthly Payment</Text>
                        <Text style={s.summaryValueLight}>$66.50</Text>
                    </View>
                    <View style={s.summaryRowSub}>
                        <Text style={s.summaryLabelLight}>Number Of Payment</Text>
                        <Text style={s.summaryValueLight}>3x</Text>
                    </View>
                    <View style={s.summaryRow}>
                        <Text style={s.summaryLabelDark}>Shipping Subtotal</Text>
                        <Text style={s.summaryValueDark}>$15.00</Text>
                    </View>
                    <View style={s.summaryRow}>
                        <Text style={s.summaryLabelDark}>Service Fee</Text>
                        <Text style={s.summaryValueDark}>$6.00</Text>
                    </View>
                </View>

                {/* Total */}
                <View style={s.totalCard}>
                    <Text style={s.totalLabel}>Total</Text>
                    <Text style={s.totalValueDark}>$420,0</Text>
                </View>
                
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Bottom Bar */}
            <View style={s.bottomContainer}>
                <TouchableOpacity style={s.confirmBtn} onPress={() => router.push('/checkout-status')}>
                    <Text style={s.confirmBtnText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: Radius.sm,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 20, paddingTop: 10 },
    
    sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#444', marginBottom: Spacing.md, marginTop: Spacing.md },
    
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
    },
    
    // Shipping
    shippingRow: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 32, alignItems: 'center', justifyContent: 'center' },
    shippingInfo: { flex: 1, marginLeft: 8, marginRight: 8 },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    name: { fontSize: 14, fontWeight: 'bold', color: '#111' },
    phone: { fontSize: 12, color: Colors.textGray },
    address: { fontSize: 12, color: Colors.textGray, lineHeight: 18 },
    
    // Product
    productRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    productImgBox: {
        width: 64, height: 64,
        borderRadius: Radius.sm,
        backgroundColor: '#F3F4F6',
        overflow: 'hidden',
    },
    productImg: { width: '100%', height: '100%' },
    productDetail: { flex: 1, justifyContent: 'space-between', height: 60 },
    productTitle: { fontSize: 14, fontWeight: 'bold', color: '#111' },
    productVariant: { fontSize: 12, color: Colors.textGray },
    productPrice: { fontSize: 14, fontWeight: 'bold', color: '#111' },
    
    // Tabssi Pay Later
    tabssiRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
    tabssiLogoBox: {
        width: 40, height: 40,
        borderRadius: Radius.sm,
        backgroundColor: '#43207A', // Dark purple / brand color
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabssiInfo: { flex: 1 },
    tabssiTitle: { fontSize: 14, fontWeight: 'bold', color: '#111', marginBottom: 2 },
    tabssiDesc: { fontSize: 12, color: Colors.textGray },
    
    // Installments
    installTabsContainer: { flexDirection: 'row', gap: 8, marginBottom: Spacing.lg },
    installTab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Radius.sm,
        backgroundColor: 'transparent',
    },
    installTabActive: {
        backgroundColor: '#F3F4F6', // Light gray active
    },
    installTabText: { fontSize: 12, color: Colors.textGray },
    installTabTextActive: { fontWeight: 'bold', color: '#111' },
    scheduleList: { gap: Spacing.sm },
    scheduleRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.sm },
    scheduleDate: { fontSize: 12, color: '#666' },
    scheduleAmt: { fontSize: 12, color: '#666' },
    
    // Summary
    summaryContainer: { paddingHorizontal: 4, gap: 10, marginBottom: Spacing.xl },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryRowSub: { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: Spacing.xl },
    summaryLabelDark: { fontSize: 13, fontWeight: 'bold', color: '#444' },
    summaryValueDark: { fontSize: 13, fontWeight: 'bold', color: '#111' },
    summaryLabelLight: { fontSize: 13, color: Colors.textGray },
    summaryValueLight: { fontSize: 13, color: Colors.textGray },
    
    // Total Card
    totalCard: {
        flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: '#F3F4F6', // Light gray background
        padding: Spacing.lg,
        borderRadius: Radius.md,
    },
    totalLabel: { fontSize: 15, fontWeight: 'bold', color: '#111' },
    
    // Bottom
    bottomContainer: {
        backgroundColor: Colors.white,
        padding: Spacing.xl,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    confirmBtn: {
        backgroundColor: Colors.almostBlack,
        paddingVertical: 16,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    confirmBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});
