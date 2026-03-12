import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.xl * 2 - 12) / 2;

const ALL_PRODUCTS = [
    { id: '1', badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13 Pro', price: '$999' },
    { id: '2', badge: 'Top', imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=400&q=80', title: 'iPhone 13', price: '$799' },
    { id: '3', badge: 'Hot', imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=400&q=80', title: 'Samsung S23', price: '$899' },
    { id: '4', badge: 'Sale', imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80', title: 'Galaxy Watch 5', price: '$249' },
    { id: '5', badge: 'New', imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80', title: 'Nike Air Max', price: '$180' },
    { id: '6', badge: 'Top', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', title: 'Casio G-Shock', price: '$120' },
    { id: '7', badge: 'Gadget', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80', title: 'Macbook Pro M1', price: '$1.299' },
    { id: '8', badge: 'Gadget', imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=400&q=80', title: 'Airpods Pro Gen 3', price: '$249' },
    { id: '9', badge: 'Drop 50%!', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', title: 'Glintz Sunglasses', originalPrice: '$412', price: '$399' },
    { id: '10', badge: 'New Arrival!', imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80', title: 'Eterna Sunglasses', price: '$287' },
];

function ProductCard({ item }) {
    return (
        <TouchableOpacity
            style={s.card}
            activeOpacity={0.8}
            onPress={() => router.push('/product-detail')}
        >
            <Text style={s.badge}>{item.badge}</Text>
            <View style={s.imgBox}>
                <Image source={{ uri: item.imageUrl }} style={s.img} resizeMode="cover" />
            </View>
            <Text style={s.title} numberOfLines={1}>{item.title}</Text>
            <View style={s.priceRow}>
                {item.originalPrice ? (
                    <Text style={s.originalPrice}>{item.originalPrice}</Text>
                ) : null}
                <Text style={s.price}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function MarketSeeAllScreen() {
    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.heading}>Recommendation</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={ALL_PRODUCTS}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={s.columnWrapper}
                contentContainerStyle={s.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ProductCard item={item} />}
            />
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
        paddingVertical: Spacing.lg,
        backgroundColor: Colors.backgroundGray,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: Radius.sm,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    listContent: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: 32,
        gap: 12,
    },
    columnWrapper: {
        gap: 12,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.md,
    },
    badge: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#111',
        marginBottom: Spacing.sm,
    },
    imgBox: {
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    img: {
        width: CARD_WIDTH - Spacing.md * 2,
        height: 110,
        borderRadius: Radius.sm,
    },
    title: {
        fontWeight: '600',
        fontSize: 13,
        color: '#111',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    originalPrice: {
        fontSize: 12,
        color: Colors.textGray,
        textDecorationLine: 'line-through',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#111',
    },
});
