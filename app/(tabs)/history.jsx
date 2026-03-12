import React from 'react';
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
import { Colors, Radius, Spacing } from '../../constants/theme';

const HISTORY_DATA = [
    {
        id: '1',
        date: 'May 15, 2025',
        status: 'Complete',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80',
        title: 'iPhone 13 - features a sleek design with a stunning Super R...',
        variant: 'Dark Green',
        totalItems: 1,
        totalPrice: '$339.00',
    },
    {
        id: '2',
        date: 'Jan 15, 2025',
        status: 'Complete',
        imageUrl: 'https://images.unsplash.com/photo-1592288019943-41f87ca79fd9?auto=format&fit=crop&w=300&q=80', 
        title: 'Vention Hub 4in1 USB 3.0 with Port',
        variant: null,
        totalItems: 1,
        totalPrice: '$599.99',
    },
    {
        id: '3',
        date: 'Dec 28, 2024',
        status: 'Complete',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80',
        title: 'H&M Heavyweight Tshirt Boxy Fit Black',
        variant: 'Size : M',
        totalItems: 1,
        totalPrice: '$43.20',
    },
];

function HistoryItem({ item }) {
    return (
        <View style={s.itemCard}>
            {/* Header */}
            <View style={s.itemHeader}>
                <Text style={s.itemDate}>{item.date}</Text>
                <View style={s.badge}>
                    <Text style={s.badgeText}>{item.status}</Text>
                </View>
            </View>

            {/* Product Info */}
            <View style={s.productRow}>
                <View style={s.imgBox}>
                    <Image source={{ uri: item.imageUrl }} style={s.img} resizeMode="cover" />
                </View>
                <View style={s.productInfo}>
                    <Text style={s.title} numberOfLines={2}>{item.title}</Text>
                    {item.variant ? (
                        <Text style={s.variant}>{item.variant}</Text>
                    ) : null}
                    
                    <View style={s.totalRow}>
                        <Text style={s.totalText}>Total {item.totalItems} product: </Text>
                        <Text style={s.totalPrice}>{item.totalPrice}</Text>
                    </View>
                </View>
            </View>

            {/* Actions */}
            <View style={s.actionRow}>
                <TouchableOpacity style={s.outlineBtn} activeOpacity={0.7}>
                    <Text style={s.outlineBtnText}>See Rating</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.primaryBtn} activeOpacity={0.7}>
                    <Text style={s.primaryBtnText}>Buy Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function HistoryScreen() {
    return (
        <SafeAreaView style={s.safe} edges={['top']}>
            {/* Header */}
            <View style={s.header}>
                <Text style={s.headerTitle}>Payment History</Text>
                <View style={s.headerActions}>
                    <TouchableOpacity style={s.iconBtn}>
                        <Ionicons name="search-outline" size={24} color="#111" />
                    </TouchableOpacity>
                    <TouchableOpacity style={s.iconBtn}>
                        <Ionicons name="funnel-outline" size={24} color="#111" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                {HISTORY_DATA.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.white },
    
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    iconBtn: {
        padding: 4,
    },
    
    scroll: {
        paddingBottom: Spacing.xxl,
    },

    // ListItem
    itemCard: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#ECFDF5', 
        borderWidth: 1,
        borderColor: '#A7F3D0', 
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#10B981', 
    },
    
    productRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    imgBox: {
        width: 80,
        height: 80,
        borderRadius: Radius.sm,
        backgroundColor: '#F3F4F6',
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
    },
    productInfo: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
        marginBottom: 4,
        lineHeight: 20,
    },
    variant: {
        fontSize: 13,
        color: Colors.textGray,
        marginBottom: 8,
    },
    totalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto', 
    },
    totalText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },
    totalPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111',
    },

    actionRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    outlineBtn: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
    },
    primaryBtn: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#8B5CF6', // Purple matching design
        borderRadius: Radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.white,
    },
});
