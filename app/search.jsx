import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const GAP = 12;
const CARD_W = (width - Spacing.xl * 2 - GAP) / 2;

// ── Data ────────────────────────────────────────────────────────────────────

const STORE_BRANDS = [
    { id: 'apple', label: 'Apple',  iconName: 'logo-apple' },
    { id: 'blibli', label: 'Blibli', iconName: null },
    { id: 'ibox',  label: 'iBox',   iconName: null },
];

const TABS = ['Related', 'Popular', 'Best Sellers'];

const PRODUCTS = {
    Related: [
        { id: '1', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
        { id: '2', imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
        { id: '3', imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
        { id: '4', imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
        { id: '5', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
        { id: '6', imageUrl: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 256GB, A15 Bionic chip, dual 12MP c...', originalPrice: '$412', price: '$399' },
    ],
    Popular: [
        { id: '7', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 14 Pro - 256GB, A16 Bionic chip...', originalPrice: '$899', price: '$799' },
        { id: '8', imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 14 - 128GB, A15 Bionic...', originalPrice: '$699', price: '$599' },
        { id: '9', imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 Mini - 128GB...', originalPrice: '$499', price: '$399' },
        { id: '10', imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 Pro Max - 256GB...', originalPrice: '$1099', price: '$999' },
    ],
    'Best Sellers': [
        { id: '11', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 - 128GB, A15 Bionic...', originalPrice: '$499', price: '$412' },
        { id: '12', imageUrl: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=400&q=80', title: 'iPhone SE 3rd Gen - 64GB...', originalPrice: '$329', price: '$279' },
        { id: '13', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 12 - 64GB, A14 Bionic...', originalPrice: '$399', price: '$299' },
        { id: '14', imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 11 - 64GB, A13 Bionic...', originalPrice: '$299', price: '$219' },
    ],
};

// ── Sub-components ───────────────────────────────────────────────────────────

function StoreBrand({ item }) {
    return (
        <TouchableOpacity
            style={s.brandCircle}
            activeOpacity={0.75}
            onPress={() => router.push('/store')}
        >
            {item.iconName ? (
                <Ionicons name={item.iconName} size={26} color="#111" />
            ) : (
                <Text style={s.brandText}>{item.label}</Text>
            )}
        </TouchableOpacity>
    );
}

function ProductCard({ item }) {
    return (
        <TouchableOpacity
            style={s.card}
            activeOpacity={0.8}
            onPress={() => router.push('/product-detail')}
        >
            <View style={s.imgBox}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={s.img}
                    resizeMode="cover"
                />
            </View>
            <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
            <View style={s.priceRow}>
                <Text style={s.originalPrice}>{item.originalPrice}</Text>
                <Text style={s.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function SearchScreen() {
    const [query, setQuery] = useState('iPhone');
    const [activeTab, setActiveTab] = useState('Related');
    const inputRef = useRef(null);

    const products = PRODUCTS[activeTab] || [];

    return (
        <SafeAreaView style={s.safe}>

            {/* ── Search bar ── */}
            <View style={s.searchRow}>
                <View style={s.searchBar}>
                    <TextInput
                        ref={inputRef}
                        style={s.searchInput}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search products..."
                        placeholderTextColor={Colors.textLight}
                        returnKeyType="search"
                        autoFocus
                    />
                    <Ionicons name="search" size={20} color={Colors.textGray} />
                </View>
                <TouchableOpacity style={s.bellBtn} onPress={() => router.back()}>
                    <Ionicons name="notifications-outline" size={22} color="#111" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.listContent}
                columnWrapperStyle={s.columnWrapper}
                ListHeaderComponent={
                    <>
                        {/* ── Official Store Partner ── */}
                        <Text style={s.storeLabel}>Official Store Partner</Text>
                        <View style={s.brandRow}>
                            {STORE_BRANDS.map((b) => (
                                <StoreBrand key={b.id} item={b} />
                            ))}
                        </View>

                        {/* ── Tab Filter ── */}
                        <View style={s.tabRow}>
                            {TABS.map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    style={s.tabItem}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text
                                        style={[
                                            s.tabText,
                                            activeTab === tab && s.tabTextActive,
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                    {activeTab === tab && <View style={s.tabUnderline} />}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                }
                renderItem={({ item }) => <ProductCard item={item} />}
            />
        </SafeAreaView>
    );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },

    // search
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        gap: 12,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 14,
        paddingVertical: 0,
        height: 48,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#111',
        paddingVertical: 0,
    },
    bellBtn: {
        width: 48,
        height: 48,
        borderRadius: Radius.full,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // official store
    storeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.almostBlack,
        marginBottom: Spacing.md,
    },
    brandRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: Spacing.xl,
    },
    brandCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    brandText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111',
        textAlign: 'center',
    },

    // tabs
    tabRow: {
        flexDirection: 'row',
        marginBottom: Spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tabItem: {
        paddingVertical: 10,
        paddingHorizontal: 4,
        marginRight: 24,
        alignItems: 'center',
        position: 'relative',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textGray,
    },
    tabTextActive: {
        color: Colors.almostBlack,
        fontWeight: 'bold',
    },
    tabUnderline: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: Colors.primary,
        borderRadius: 1,
    },

    // list
    listContent: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.xl,
        paddingBottom: 32,
        gap: GAP,
    },
    columnWrapper: { gap: GAP },

    // card
    card: {
        width: CARD_W,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
    },
    imgBox: {
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    img: {
        width: CARD_W - Spacing.md * 2,
        height: 130,
        borderRadius: Radius.sm,
        backgroundColor: '#F3F4F6',
    },
    cardTitle: {
        fontSize: 12,
        color: '#111',
        lineHeight: 18,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    originalPrice: {
        fontSize: 12,
        color: Colors.textGray,
        textDecorationLine: 'line-through',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111',
    },
});
