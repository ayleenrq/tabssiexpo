import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Radius, Spacing } from '../constants/theme';

const INITIAL_ADDRESSES = [
    {
        id: '1',
        name: 'Ali Mujahidin',
        phone: '+971 50 123 4567',
        address: 'Unit 804, Building B, Corniche Avenue, overlooking the stunning waterfront of Dubai...',
    },
    {
        id: '2',
        name: 'Jane Anderson',
        phone: '+971 50 123 4567',
        address: 'Unit 804, Building B, Corniche Avenue, overlooking the stunning waterfront of Dub...',
    },
    {
        id: '3',
        name: 'Eddy lean',
        phone: '+971 50 123 4567',
        address: 'Unit 804, Building B, Corniche Avenue, overlooking the stunning waterfront of Dub...',
    },
];

export default function ShippingAddressesScreen() {
    // In a real app we'd fetch this from state/store. For UI slicing purposes we show the list.
    // If the user navigated back from saving a new address, we might add it here, 
    // but without global state, we just show a static visual or a local state.
    const [addresses] = useState(INITIAL_ADDRESSES);

    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Shipping Information</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                
                {addresses.map((addr) => (
                    <TouchableOpacity key={addr.id} style={s.card} activeOpacity={0.8} onPress={() => router.back()}>
                        <View style={s.row}>
                            <View style={s.iconBox}>
                                <Ionicons name="location-outline" size={20} color={Colors.primary} />
                            </View>
                            <View style={s.info}>
                                <View style={s.nameRow}>
                                    <Text style={s.name}>{addr.name}</Text>
                                    <Text style={s.phone}>{addr.phone}</Text>
                                </View>
                                <Text style={s.address} numberOfLines={2}>
                                    {addr.address}
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={Colors.textGray} />
                        </View>
                    </TouchableOpacity>
                ))}

                {/* New Address Button */}
                <TouchableOpacity 
                    style={s.newAddressBtn} 
                    onPress={() => router.push('/shipping-form')}
                >
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={s.newAddressText}>New Address</Text>
                </TouchableOpacity>
                
                <View style={{ height: 20 }} />
            </ScrollView>
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
    
    card: {
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 32, alignItems: 'center', justifyContent: 'center' },
    info: { flex: 1, marginLeft: 8, marginRight: 8 },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    name: { fontSize: 14, fontWeight: 'bold', color: '#111' },
    phone: { fontSize: 12, color: Colors.textGray },
    address: { fontSize: 13, color: Colors.textGray, lineHeight: 20 },
    
    newAddressBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        marginTop: Spacing.sm,
    },
    newAddressText: { color: Colors.white, fontSize: 15, fontWeight: 'bold' },
});
