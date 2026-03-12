import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

export default function CheckoutStatusScreen() {
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        // Simulate processing state for 3 seconds then show "Back to Home"
        const timer = setTimeout(() => {
            setIsProcessing(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={s.safe}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {/* Status Banner */}
                <View style={[s.statusBanner, isProcessing ? { marginBottom: Spacing.xl } : { marginBottom: Spacing.xl }]}>
                    <Text style={s.statusTitle}>Tabssi</Text>
                    <Text style={s.statusSub}>is processing your order!</Text>
                    {/* Decorative Shape */}
                    <View style={s.shape1} />
                    <View style={s.shape2} />
                </View>

                {/* Cancel Purchase State */}
                {isProcessing && (
                    <TouchableOpacity style={s.cancelCard} onPress={() => router.back()}>
                        <Text style={s.cancelText}>Cancel Purchase</Text>
                        <ActivityIndicator color={Colors.red} size="small" />
                    </TouchableOpacity>
                )}

                {/* Shipping Info */}
                <View style={s.card}>
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
                </View>

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

                {/* Recommendations shown only when NOT processing (matching the design image 3 vs image 2) */}
                {!isProcessing && (
                    <>
                        <View style={s.recHeader}>
                            <Text style={s.sectionTitleRec}>Recomendation</Text>
                            <TouchableOpacity>
                                <Text style={s.recSeeAll}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={s.recGrid}>
                            <TouchableOpacity style={s.recCard} activeOpacity={0.8}>
                                <View style={s.recImgBox}>
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=300&q=80' }} style={s.recImg} resizeMode="cover" />
                                </View>
                                <Text style={s.recCardTitle} numberOfLines={2}>iPhone 13 - 256GB. A15 Bionic chip, dual 12MP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={s.recCard} activeOpacity={0.8}>
                                <View style={s.recImgBox}>
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=300&q=80' }} style={s.recImg} resizeMode="cover" />
                                </View>
                                <Text style={s.recCardTitle} numberOfLines={2}>iPhone 13 - 256GB. A15 Bionic chip, dual 12MP</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Bottom Bar: Appears only in success status */}
            {!isProcessing && (
                <View style={s.bottomContainer}>
                    <TouchableOpacity style={s.confirmBtn} onPress={() => router.push('/payment-success')}>
                        <Text style={s.confirmBtnText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* If processing, bottom area is empty (in design the bottom bar doesn't exist yet) */}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    
    scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 20, paddingTop: Spacing.xxl },

    // Status Banner
    statusBanner: {
        backgroundColor: '#F3E8FF', // Light purple
        borderRadius: Radius.lg,
        padding: Spacing.xxl,
        position: 'relative',
        overflow: 'hidden',
    },
    statusTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
    statusSub: { fontSize: 16, color: '#333', marginTop: 4 },
    shape1: {
        position: 'absolute', right: 40, bottom: -70,
        width: 140, height: 140,
        backgroundColor: '#E8D4FF',
        opacity: 0.6,
        borderTopLeftRadius: 100,
        transform: [{ rotate: '45deg' }]
    },
    shape2: {
        position: 'absolute', right: -40, top: -70,
        width: 140, height: 140,
        backgroundColor: '#E8D4FF',
        opacity: 0.6,
        borderBottomLeftRadius: 100,
        transform: [{ rotate: '45deg' }]
    },

    // Cancel State
    cancelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: '#FEE2E2', // light red
        borderRadius: Radius.md,
        paddingVertical: 14,
        marginBottom: Spacing.xl,
    },
    cancelText: { fontSize: 15, fontWeight: 'bold', color: Colors.red },

    // Core Cards
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
    
    sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#444', marginBottom: Spacing.md, marginTop: Spacing.md },
    
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
    
    // Recommendation
    recHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xl },
    sectionTitleRec: { fontSize: 15, fontWeight: 'bold', color: '#111' },
    recSeeAll: { fontSize: 13, color: Colors.primary, fontWeight: 'bold' },
    recGrid: { flexDirection: 'row', gap: 12, marginTop: Spacing.md },
    recCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.sm },
    recImgBox: { height: 130, backgroundColor: '#F3F4F6', borderRadius: Radius.sm, marginBottom: 8 },
    recImg: { width: '100%', height: '100%' },
    recCardTitle: { fontSize: 11, color: '#111', lineHeight: 16 },

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
