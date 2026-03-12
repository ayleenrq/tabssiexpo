import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const GAP = 12;
const CARD_W = (width - Spacing.xl * 2 - GAP) / 2;

// ── Data ─────────────────────────────────────────────────────────────────────

const TABS = ['Store', 'Product', 'Category'];

const STORE_PRODUCTS = [
    { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP...', originalPrice: '$412', price: '$399' },
    { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, featuring a 6.1-inch di...', originalPrice: '$412', price: '$399' },
    { id: 's3', imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 Pro - 256GB, A15 Bionic...', originalPrice: '$550', price: '$499' },
    { id: 's4', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80', title: 'iPhone 14 - 128GB, A15 Bionic chip...', originalPrice: '$699', price: '$599' },
];

const ALL_PRODUCTS = [
    { id: 'p1', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
    { id: 'p2', imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
    { id: 'p3', imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
    { id: 'p4', imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
    { id: 'p5', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
    { id: 'p6', imageUrl: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
];

const CATEGORIES = [
    { id: 'c1', label: 'IPhone' },
    { id: 'c2', label: 'Ipad' },
    { id: 'c3', label: 'Macbook' },
    { id: 'c4', label: 'IMac' },
    { id: 'c5', label: 'Airpods' },
    { id: 'c6', label: 'Accesories' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function ProductCardGrid({ item }) {
    return (
        <TouchableOpacity
            style={s.card}
            activeOpacity={0.8}
            onPress={() => router.push('/product-detail')}
        >
            <View style={s.imgBox}>
                <Image source={{ uri: item.imageUrl }} style={s.img} resizeMode="cover" />
            </View>
            <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
            <View style={s.priceRow}>
                <Text style={s.originalPrice}>{item.originalPrice}</Text>
                <Text style={s.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
}

function ProductCardHoriz({ item }) {
    return (
        <TouchableOpacity
            style={s.horizCard}
            activeOpacity={0.8}
            onPress={() => router.push('/product-detail')}
        >
            <View style={s.horizImgBox}>
                <Image source={{ uri: item.imageUrl }} style={s.horizImg} resizeMode="cover" />
            </View>
            <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
            <View style={s.priceRow}>
                <Text style={s.originalPrice}>{item.originalPrice}</Text>
                <Text style={s.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
}

// ── Tab contents ──────────────────────────────────────────────────────────────

function StoreTab() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.tabContent}>
            {/* Horizontal product row 1 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.horizList}>
                {STORE_PRODUCTS.map((item) => (
                    <ProductCardHoriz key={item.id} item={item} />
                ))}
            </ScrollView>

            {/* Banner */}
            <View style={s.banner}>
                <Text style={s.bannerTitle}>Holiday Sale 2025</Text>
                <Text style={s.bannerSub}>Up to 30% OFF on top brands!</Text>
                <Text style={s.bannerCaption}>Pay easily via Tabssi Paylater</Text>
            </View>

            {/* Horizontal product row 2 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.horizList}>
                {[...STORE_PRODUCTS].reverse().map((item) => (
                    <ProductCardHoriz key={item.id + '_2'} item={item} />
                ))}
            </ScrollView>
        </ScrollView>
    );
}

function ProductTab() {
    return (
        <FlatList
            data={ALL_PRODUCTS}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={s.columnWrapper}
            contentContainerStyle={s.tabContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ProductCardGrid item={item} />}
        />
    );
}

function CategoryTab() {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.tabContent}>
            {CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.id} style={s.catRow} activeOpacity={0.7}>
                    <Text style={s.catLabel}>{cat.label}</Text>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textGray} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function StoreScreen() {
    const [activeTab, setActiveTab] = useState('Store');

    return (
        <View style={s.root}>
            {/* ── Dark Header ── */}
            <View style={s.darkHeader}>
                <SafeAreaView edges={['top']}>
                    {/* Search row */}
                    <View style={s.searchRow}>
                        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} color="#fff" />
                        </TouchableOpacity>
                        <View style={s.searchBar}>
                            <TextInput
                                style={s.searchInput}
                                placeholder="Search in store"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                            />
                            <Ionicons name="search" size={18} color="rgba(255,255,255,0.6)" />
                        </View>
                        <TouchableOpacity style={s.bellBtn} onPress={() => router.push('/notifications')}>
                            <Ionicons name="notifications-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Store info row */}
                    <View style={s.storeInfoRow}>
                        <View style={s.storeLogo}>
                            <Text style={s.storeLogoText}>iBox</Text>
                        </View>
                        <View style={s.storeInfoText}>
                            <Text style={s.storeName}>Ibox Official Shop</Text>
                            <Text style={s.storeUpdated}>Last Update 3 Hours Ago</Text>
                            <View style={s.ratingRow}>
                                <Ionicons name="star" size={13} color="#F59E0B" />
                                <Text style={s.ratingText}>4.7/5.0</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={s.followBtn}>
                            <Text style={s.followText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
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

            {/* ── Tab Content ── */}
            <View style={s.tabBody}>
                {activeTab === 'Store'    && <StoreTab />}
                {activeTab === 'Product'  && <ProductTab />}
                {activeTab === 'Category' && <CategoryTab />}
            </View>
        </View>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: Colors.backgroundGray },

    // dark header
    darkHeader: {
        backgroundColor: '#111',
        paddingBottom: Spacing.lg,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.md,
        gap: 10,
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: Radius.md,
        paddingHorizontal: 12,
        height: 42,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#fff',
        paddingVertical: 0,
    },
    bellBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 18,
    },

    // store info
    storeInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        gap: Spacing.md,
    },
    storeLogo: {
        width: 56,
        height: 56,
        borderRadius: Radius.sm,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    storeLogoText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#111',
    },
    storeInfoText: { flex: 1 },
    storeName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    storeUpdated: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.55)',
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    ratingText: {
        fontSize: 12,
        color: '#F59E0B',
        fontWeight: '600',
    },
    followBtn: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        borderRadius: Radius.sm,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    followText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },

    // tabs
    tabRow: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        position: 'relative',
    },
    tabText: {
        fontSize: 14,
        color: Colors.textGray,
        fontWeight: '500',
    },
    tabTextActive: {
        color: Colors.almostBlack,
        fontWeight: 'bold',
    },
    tabUnderline: {
        position: 'absolute',
        bottom: 0,
        left: '15%',
        right: '15%',
        height: 2,
        backgroundColor: Colors.primary,
        borderRadius: 1,
    },

    // tab body
    tabBody: { flex: 1 },
    tabContent: {
        padding: Spacing.xl,
        gap: Spacing.lg,
    },

    // grid cards (Product tab)
    columnWrapper: { gap: GAP },
    card: {
        width: CARD_W,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        marginBottom: GAP,
    },
    imgBox: { alignItems: 'center', marginBottom: Spacing.md },
    img: {
        width: CARD_W - Spacing.md * 2,
        height: 130,
        borderRadius: Radius.sm,
        backgroundColor: '#F3F4F6',
    },
    cardTitle: { fontSize: 12, color: '#111', lineHeight: 18, marginBottom: 6 },
    priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    originalPrice: { fontSize: 11, color: Colors.textGray, textDecorationLine: 'line-through' },
    price: { fontSize: 13, fontWeight: 'bold', color: '#111' },

    // horizontal cards (Store tab)
    horizList: { gap: GAP, paddingRight: Spacing.sm },
    horizCard: {
        width: 160,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
    },
    horizImgBox: { alignItems: 'center', marginBottom: Spacing.md },
    horizImg: {
        width: 136,
        height: 120,
        borderRadius: Radius.sm,
        backgroundColor: '#F3F4F6',
    },

    // banner (Store tab)
    banner: {
        backgroundColor: '#F7F5FE',
        borderRadius: Radius.lg,
        borderWidth: 2,
        borderColor: Colors.white,
        paddingVertical: Spacing.xxl,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
    },
    bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    bannerSub: { fontSize: 14, color: '#333', marginBottom: Spacing.md },
    bannerCaption: { fontSize: 12, color: Colors.primary, fontWeight: '600' },

    // category rows (Category tab)
    catRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
    },
    catLabel: { fontSize: 15, color: '#111', fontWeight: '500' },
});
