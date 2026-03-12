import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const GAP = 12;
const REC_CARD_W = (width - Spacing.xl * 2 - GAP) / 2;

// ── Data ─────────────────────────────────────────────────────────────────────

const THUMBNAILS = [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=200&q=80',
];

const COLORS = [
    { id: 'black',  hex: '#111111' },
    { id: 'green',  hex: '#166534' },
    { id: 'red',    hex: '#DC2626' },
    { id: 'blue',   hex: '#2563EB' },
];

const RECOMMENDATIONS = [
    { id: 'r1', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 Pro', originalPrice: '$999', price: '$849' },
    { id: 'r2', imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13', originalPrice: '$799', price: '$699' },
];

const TABS = ['Description', 'Size & Color'];

const DESCRIPTION = `The iPhone 13 features a sleek design with a stunning Super Retina XDR display, offering vibrant colors and sharp details. Powered by the A15 Bionic chip, it ensures smooth...`;

// ── Screen ────────────────────────────────────────────────────────────────────

export default function ProductDetailScreen() {
    const [activeTab, setActiveTab] = useState('Description');
    const [selectedImg, setSelectedImg] = useState(0);
    const [selectedColor, setSelectedColor] = useState('black');
    const [liked, setLiked] = useState(false);

    return (
        <SafeAreaView style={s.safe}>
            {/* ── Header ── */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Product Detail</Text>
                <View style={s.headerRight}>
                    <TouchableOpacity style={s.iconBtn} onPress={() => setLiked(!liked)}>
                        <Ionicons
                            name={liked ? 'heart' : 'heart-outline'}
                            size={22}
                            color={liked ? Colors.red : '#111'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={s.iconBtn}>
                        <Ionicons name="share-social-outline" size={22} color="#111" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

                {/* ── Main Image ── */}
                <View style={s.mainImgBox}>
                    <Image
                        source={{ uri: THUMBNAILS[selectedImg] }}
                        style={s.mainImg}
                        resizeMode="contain"
                    />
                </View>

                {/* ── Thumbnails ── */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.thumbRow}
                >
                    {THUMBNAILS.map((url, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[s.thumbBox, selectedImg === i && s.thumbBoxActive]}
                            onPress={() => setSelectedImg(i)}
                        >
                            <Image source={{ uri: url }} style={s.thumb} resizeMode="cover" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* ── Title & Price ── */}
                <View style={s.infoSection}>
                    <Text style={s.productTitle}>iPhone 13 - 256 Gb</Text>

                    <View style={s.priceRow}>
                        <Text style={s.price}>$399</Text>
                        <Text style={s.originalPrice}>$430</Text>
                    </View>

                    <Text style={s.installment}>Tabssi installments, $21.42 x 12</Text>

                    {/* Feature badges */}
                    <View style={s.badgeRow}>
                        <View style={s.badge}>
                            <Ionicons name="globe-outline" size={13} color={Colors.primary} />
                            <Text style={s.badgeText}>Apple Store</Text>
                        </View>
                        <View style={s.badgeDivider} />
                        <View style={s.badge}>
                            <Ionicons name="shield-checkmark-outline" size={13} color={Colors.primary} />
                            <Text style={s.badgeText}>100% Original</Text>
                        </View>
                        <View style={s.badgeDivider} />
                        <View style={s.badge}>
                            <Ionicons name="cube-outline" size={13} color={Colors.primary} />
                            <Text style={s.badgeText}>Free Shipping</Text>
                        </View>
                    </View>
                </View>

                {/* ── Tabs ── */}
                <View style={s.tabRow}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={s.tabItem}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>
                                {tab}
                            </Text>
                            {activeTab === tab && <View style={s.tabUnderline} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Tab content ── */}
                <View style={s.tabContent}>
                    {activeTab === 'Description' ? (
                        <>
                            <Text style={s.descText}>{DESCRIPTION}</Text>
                            <TouchableOpacity>
                                <Text style={s.seeMore}>See more...</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={s.sizeColorContent}>
                            <View style={s.colorRow}>
                                <View>
                                    <Text style={s.colorLabel}>Color</Text>
                                    <View style={s.colorDots}>
                                        {COLORS.map((c) => (
                                            <TouchableOpacity
                                                key={c.id}
                                                onPress={() => setSelectedColor(c.id)}
                                                style={[
                                                    s.colorDot,
                                                    { backgroundColor: c.hex },
                                                    selectedColor === c.id && s.colorDotActive,
                                                ]}
                                            />
                                        ))}
                                    </View>
                                </View>
                                <View style={s.stockBox}>
                                    <Text style={s.stockLabel}>Stock</Text>
                                    <Text style={s.stockValue}>230</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* ── Recommendation ── */}
                <View style={s.recHeader}>
                    <Text style={s.recTitle}>Recomendation</Text>
                    <TouchableOpacity onPress={() => router.push('/market-see-all')}>
                        <Text style={s.recSeeAll}>See all</Text>
                    </TouchableOpacity>
                </View>

                <View style={s.recGrid}>
                    {RECOMMENDATIONS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={s.recCard}
                            onPress={() => router.push('/product-detail')}
                            activeOpacity={0.8}
                        >
                            <Image source={{ uri: item.imageUrl }} style={s.recImg} resizeMode="cover" />
                            <View style={s.recInfo}>
                                <Text style={s.recName} numberOfLines={2}>{item.title}</Text>
                                <View style={s.recPriceRow}>
                                    <Text style={s.recOriginal}>{item.originalPrice}</Text>
                                    <Text style={s.recPrice}>{item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* ── Sticky CTA ── */}
            <View style={s.ctaBar}>
                <TouchableOpacity style={s.ctaBtn} onPress={() => router.push('/checkout')}>
                    <Text style={s.ctaBtnText}>Continue With Tabssi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },

    // header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.backgroundGray,
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    headerRight: { flexDirection: 'row', gap: 6 },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: Radius.sm,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scroll: { paddingBottom: 16 },

    // main image
    mainImgBox: {
        backgroundColor: Colors.white,
        marginHorizontal: Spacing.xl,
        borderRadius: Radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        height: 240,
        marginBottom: Spacing.lg,
    },
    mainImg: { width: width * 0.55, height: 200 },

    // thumbnails
    thumbRow: {
        paddingHorizontal: Spacing.xl,
        gap: 10,
        marginBottom: Spacing.xl,
    },
    thumbBox: {
        width: 56,
        height: 56,
        borderRadius: Radius.sm,
        borderWidth: 2,
        borderColor: 'transparent',
        overflow: 'hidden',
        backgroundColor: Colors.white,
    },
    thumbBoxActive: { borderColor: Colors.primary },
    thumb: { width: '100%', height: '100%' },

    // info section
    infoSection: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
        gap: Spacing.sm,
    },
    productTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    price: { fontSize: 22, fontWeight: 'bold', color: '#111' },
    originalPrice: {
        fontSize: 16,
        color: Colors.textGray,
        textDecorationLine: 'line-through',
    },
    installment: { fontSize: 12, color: Colors.textGray },

    // badges
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.sm,
        gap: 0,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    badgeText: { fontSize: 11, color: Colors.textGray, fontWeight: '500' },
    badgeDivider: {
        width: 1,
        height: 14,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 10,
    },

    // tabs
    tabRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    tabText: { fontSize: 14, fontWeight: '500', color: Colors.textGray },
    tabTextActive: { color: '#111', fontWeight: 'bold' },
    tabUnderline: {
        position: 'absolute',
        bottom: -1,
        left: '20%',
        right: '20%',
        height: 2,
        backgroundColor: Colors.primary,
        borderRadius: 1,
    },

    // tab content
    tabContent: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    descText: {
        fontSize: 13,
        color: '#444',
        lineHeight: 20,
        marginBottom: 6,
    },
    seeMore: { fontSize: 13, color: Colors.textGray, fontWeight: '500' },

    // size & color
    sizeColorContent: {},
    colorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    colorLabel: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 10 },
    colorDots: { flexDirection: 'row', gap: 10 },
    colorDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    colorDotActive: {
        borderWidth: 3,
        borderColor: Colors.primary,
    },
    stockBox: { alignItems: 'flex-end' },
    stockLabel: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 4 },
    stockValue: { fontSize: 20, fontWeight: 'bold', color: '#111' },

    // recommendation
    recHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    recTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
    recSeeAll: { fontSize: 14, color: Colors.primary, fontWeight: '500' },
    recGrid: {
        flexDirection: 'row',
        gap: GAP,
        paddingHorizontal: Spacing.xl,
    },
    recCard: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        overflow: 'hidden',
    },
    recImg: {
        width: '100%',
        height: 130,
        backgroundColor: '#F3F4F6',
    },
    recInfo: { padding: Spacing.md },
    recName: { fontSize: 12, color: '#111', lineHeight: 18, marginBottom: 6 },
    recPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    recOriginal: { fontSize: 11, color: Colors.textGray, textDecorationLine: 'line-through' },
    recPrice: { fontSize: 13, fontWeight: 'bold', color: '#111' },

    // CTA
    ctaBar: {
        padding: Spacing.xl,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    ctaBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
    },
    ctaBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});
