import React from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BannerCard from '../../components/BannerCard';
import BrandCircle from '../../components/BrandCircle';
import CategoryItem from '../../components/CategoryItem';
import { Colors, Radius, Spacing } from '../../constants/theme';

const { width } = Dimensions.get('window');
const GRID_GAP = 12;
const CARD_WIDTH = (width - Spacing.xl * 2 - GRID_GAP) / 2;

const CATEGORIES = [
    { iconName: 'desktop-outline', label: 'Gadget' },
    { iconName: 'watch-outline', label: 'Watches' },
    { iconName: 'bag-outline', label: 'Bags' },
    { iconName: 'color-palette-outline', label: 'Beauty' },
    { iconName: 'shirt-outline', label: 'Clothing' },
    { iconName: 'home-outline', label: 'Lifestyle' },
];

const BRANDS = ['Cartier', 'iBox', 'GUCCI', 'Blibli', 'PRADA'];

const FLASH_SALE = [
    { id: '1', badge: 'Drop 50%!',   imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80', title: 'Glintz', originalPrice: '$412', price: '$399' },
    { id: '2', badge: 'New Arrival!',imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80', title: 'Eterna', price: '$287' },
    { id: '3', badge: 'Hot Deal!',   imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=300&q=80', title: 'Glimmer', originalPrice: '$350', price: '$199' },
    { id: '4', badge: 'Limited!',    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80', title: 'Renzo', price: '$145' },
    { id: '5', badge: 'Flash!',      imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=300&q=80', title: 'Stridex', originalPrice: '$220', price: '$110' },
    { id: '6', badge: 'Sale 40%!',   imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80', title: 'Kronos', originalPrice: '$180', price: '$108' },
];

const POPULAR = [
    { id: '1', badge: 'Gadget', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=300&q=80', title: 'Macbook Pro M1', price: 'IDR 14.000.000' },
    { id: '2', badge: 'Gadget', imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=300&q=80', title: 'Airpods Pro Gen 3', price: 'IDR 2.800.000' },
    { id: '3', badge: 'Gadget', imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=300&q=80', title: 'iPad Pro M2', price: 'IDR 18.000.000' },
];

const RECOMMENDATION = [
    { id: '1', badge: 'New',  imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 Pro', price: '$999' },
    { id: '2', badge: 'Top',  imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13', price: '$799' },
    { id: '3', badge: 'Hot',  imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80', title: 'Galaxy Watch 5', price: '$249' },
    { id: '4', badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', title: 'Nike Air Max', price: '$180' },
];

function HCard({ item }) {
    return (
        <TouchableOpacity
            style={s.hCard}
            activeOpacity={0.8}
            onPress={() => router.push('/product-detail')}
        >
            <Text style={s.hBadge}>{item.badge}</Text>
            <View style={s.hImgBox}>
                <Image source={{ uri: item.imageUrl }} style={s.hImg} resizeMode="cover" />
            </View>
            <View style={s.hFooter}>
                <Text style={s.hTitle} numberOfLines={1}>{item.title}</Text>
                <View style={s.hPriceRow}>
                    {item.originalPrice ? (
                        <Text style={s.hOriginal}>{item.originalPrice}</Text>
                    ) : null}
                    <Text style={s.hPrice}>{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function SectionTitle({ title, action, onAction }) {
    return (
        <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>{title}</Text>
            {action ? (
                <TouchableOpacity onPress={onAction}>
                    <Text style={s.sectionAction}>{action}</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

export default function MarketScreen() {
    return (
        <SafeAreaView style={s.safe}>
            <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

                {/* Search Row */}
                <View style={s.searchRow}>
                    <TouchableOpacity
                        style={s.searchBar}
                        activeOpacity={0.7}
                        onPress={() => router.push('/search')}
                    >
                        <Text style={s.searchPlaceholder}>Search</Text>
                        <Ionicons name="search" size={20} color={Colors.textLight} />
                    </TouchableOpacity>
                    <TouchableOpacity style={s.bellBtn} onPress={() => router.push('/notifications')}>
                        <Ionicons name="notifications-outline" size={24} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={s.categoryRow}>
                    {CATEGORIES.map((c) => (
                        <CategoryItem key={c.label} iconName={c.iconName} label={c.label} />
                    ))}
                </View>

                {/* Banner */}
                <BannerCard />

                {/* Flash Sale */}
                <SectionTitle title="Flash Sale!" action="See all" />
                <FlatList
                    data={FLASH_SALE}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.hListContent}
                    renderItem={({ item }) => <HCard item={item} />}
                    style={s.hScroll}
                />

                {/* Official Store */}
                <SectionTitle title="Official Store Partner" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
                    {BRANDS.map((b) => (
                        <View key={b} style={{ marginRight: 12 }}>
                            <BrandCircle name={b} />
                        </View>
                    ))}
                </ScrollView>

                {/* Popular Electronics */}
                <SectionTitle title="Popular in Electronics" />
                <FlatList
                    data={POPULAR}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.hListContent}
                    renderItem={({ item }) => <HCard item={item} />}
                    style={s.hScroll}
                />

                {/* Recommendation */}
                <SectionTitle
                    title="Recomendation"
                    action="See all"
                    onAction={() => router.push('/market-see-all')}
                />
                <View style={s.recGrid}>
                    <View style={s.recRow}>
                        {RECOMMENDATION.slice(0, 2).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={s.rCard}
                                activeOpacity={0.8}
                                onPress={() => router.push('/product-detail')}
                            >
                                <Text style={s.hBadge}>{item.badge}</Text>
                                <View style={s.rImgBox}>
                                    <Image source={{ uri: item.imageUrl }} style={s.rImg} resizeMode="cover" />
                                </View>
                                <Text style={s.hTitle}>{item.title}</Text>
                                <Text style={s.hPrice}>{item.price}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={s.recRow}>
                        {RECOMMENDATION.slice(2, 4).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={s.rCard}
                                activeOpacity={0.8}
                                onPress={() => router.push('/product-detail')}
                            >
                                <Text style={s.hBadge}>{item.badge}</Text>
                                <View style={s.rImgBox}>
                                    <Image source={{ uri: item.imageUrl }} style={s.rImg} resizeMode="cover" />
                                </View>
                                <Text style={s.hTitle}>{item.title}</Text>
                                <Text style={s.hPrice}>{item.price}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.backgroundGray },
    container: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, gap: Spacing.xxl },

    searchRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    searchPlaceholder: { flex: 1, fontSize: 15, color: Colors.textLight },
    bellBtn: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: Colors.white, borderWidth: 1, borderColor: '#E5E7EB',
        alignItems: 'center', justifyContent: 'center',
    },

    categoryRow: { flexDirection: 'row', justifyContent: 'space-between' },

    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold' },
    sectionAction: { color: Colors.primary, fontWeight: '500' },

    hScroll: { marginHorizontal: -Spacing.xl },
    hListContent: { paddingHorizontal: Spacing.xl, gap: 12 },

    hCard: {
        width: 160,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
    },
    hBadge: { fontWeight: 'bold', fontSize: 12, color: '#111', marginBottom: Spacing.sm },
    hImgBox: { alignItems: 'center', marginBottom: Spacing.md },
    hImg: { width: 120, height: 80, borderRadius: Radius.sm },
    hFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    hTitle: { fontWeight: '600', fontSize: 13, color: '#111', flex: 1, marginRight: 4 },
    hPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    hOriginal: { fontSize: 11, color: Colors.textGray, textDecorationLine: 'line-through' },
    hPrice: { fontWeight: 'bold', fontSize: 13, color: '#111' },

    recGrid: { gap: GRID_GAP },
    recRow: { flexDirection: 'row', gap: GRID_GAP },
    rCard: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
    },
    rImgBox: { alignItems: 'center', marginBottom: Spacing.md },
    rImg: { width: '100%', height: 110, borderRadius: Radius.sm },
});
