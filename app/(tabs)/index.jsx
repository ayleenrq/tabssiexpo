import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BannerCard from '../../components/BannerCard';
import ProductCardHorizontal from '../../components/ProductCardHorizontal';
import BrandCircle from '../../components/BrandCircle';
import ActiveInstallmentCard from '../../components/ActiveInstallmentCard';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';

const BRANDS = ['Cartier', 'BVLGARI', 'GUCCI', 'CHANEL', 'PRADA'];

const FLASH_SALE = [
    {
        badge: 'Drop 50%!',
        imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=300&q=80',
        title: 'Glintz',
        originalPrice: '$412',
        price: '$399'
    },
    {
        badge: 'New Arrival!',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
        title: 'Eterna',
        price: '$287'
    },
    {
        badge: 'New Arrival!',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80',
        title: 'Glintz',
        price: '$340'
    },
];

function SectionTitle({ title, action, onPress }) {
    return (
        <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>{title}</Text>
            {action ? (
                <TouchableOpacity onPress={onPress}>
                    <Text style={s.sectionAction}>{action}</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

export default function HomeScreen() {
    return (
        <SafeAreaView style={s.safe}>
            <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={s.header}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=11' }}
                        style={s.avatar}
                    />
                    <View style={s.headerInfo}>
                        <Text style={s.headerName}>Ali Muhajirin</Text>
                        <Text style={s.headerSub}>Shop now. Pay later. Stay in control.</Text>
                    </View>
                    <TouchableOpacity style={s.bellBtn} onPress={() => router.push('/notifications')}>
                        <Ionicons name="notifications-outline" size={20} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View style={s.searchBar}>
                    <TextInput
                        style={s.searchInput}
                        placeholder="Search"
                        placeholderTextColor={Colors.textLight}
                    />
                    <Ionicons name="search-outline" size={20} color={Colors.textLight} />
                </View>

                {/* Banner */}
                <BannerCard />

                {/* Brands */}
                <SectionTitle title="Official Seller Partner" action="See all" onPress={() => router.push('/market')} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
                    {BRANDS.map((b, i) => (
                        <TouchableOpacity 
                            key={b} 
                            style={{ marginRight: i < BRANDS.length - 1 ? 16 : 0 }}
                            onPress={() => router.push('/store')}
                            activeOpacity={0.7}
                        >
                            <BrandCircle name={b} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Flash Sale */}
                <SectionTitle title="Flash Sale!" action="See all" onPress={() => router.push('/market-see-all')} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
                    {FLASH_SALE.map((p, i) => (
                        <View key={i} style={{ marginRight: i < FLASH_SALE.length - 1 ? 16 : 0 }}>
                            <ProductCardHorizontal {...p} />
                        </View>
                    ))}
                </ScrollView>

                {/* Available to spend */}
                <View style={s.spendBar}>
                    <View style={s.spendLeft}>
                        <Ionicons name="information-circle-outline" size={20} color={Colors.almostBlack} />
                        <Text style={s.spendText}>Available to spent : $512.23</Text>
                    </View>
                    <View style={s.spendGraphic} />
                </View>

                {/* Active Installments */}
                <SectionTitle title="Active Installment" action="See all" onPress={() => router.push('/plan')} />
                <View style={s.installmentList}>
                    <ActiveInstallmentCard
                        fraction="3/6"
                        title="Macbook Pro M4"
                        dueDate="Due Tomorrow"
                        dueDateColor={Colors.red}
                    />
                    <ActiveInstallmentCard
                        fraction="7/8"
                        title="Apple Vision Display"
                        dueDate="Due May 21, 2025"
                        dueDateColor={Colors.orange}
                    />
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.backgroundGray
    },
    container: {
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.lg,
        gap: Spacing.xxl
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22
    },
    headerInfo: {
        flex: 1
    },
    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    headerSub: {
        fontSize: 12,
        color: Colors.textGray,
        marginTop: 2,
    },
    bellBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: Colors.almostBlack,
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
    sectionAction: {
        color: Colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    hScroll: {
        marginHorizontal: -Spacing.xl,
        paddingHorizontal: Spacing.xl
    },
    spendBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F3E8FF',
        borderRadius: Radius.lg,
        paddingHorizontal: 16,
        paddingVertical: 14,
        overflow: 'hidden',
    },
    spendLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    spendText: {
        fontWeight: '600',
        fontSize: 14,
        color: Colors.almostBlack,
    },
    spendGraphic: {
        position: 'absolute',
        right: -20,
        top: -10,
        width: 100,
        height: 80,
        backgroundColor: '#E9D5FF',
        borderRadius: 50,
        opacity: 0.5,
    },
    installmentList: {
        gap: 12,
    },
});
