import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';
import PlanItemCard from '../../components/PlanItemCard';
import SummaryCard from '../../components/SummaryCard';
import { router } from 'expo-router';

const TABS = ['On Progress', 'Overdue', 'Completed'];

const MOCK_DATA = {
    'On Progress': [
        {
            brand: 'H&M',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1000px-H%26M-Logo.svg.png',
            title: 'H&M Heavyweight Tshirt Boxy Fit W...',
            fraction: '3/4 of installment',
            price: '$620.00',
            dueDate: '10 May 2024',
        },
        {
            brand: 'Apple',
            title: 'Macbook Pro M1',
            fraction: '3/6 of installment',
            price: '$899',
            dueDate: '10 May 2024',
        },
    ],
    'Overdue': [
        {
            brand: 'Apple',
            title: 'Iphone 13',
            fraction: '3/4 of installment',
            price: '$155.00',
            dueDate: '7 May 2024',
        },
    ],
    'Completed': [
        {
            brand: 'Apple',
            title: 'Macbook Pro M1',
            fraction: 'Installment Complete',
            price: '$899',
            dueDate: '-',
        },
        {
            brand: 'H&M',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1000px-H%26M-Logo.svg.png',
            title: 'T-shirt',
            fraction: 'Installment Complete',
            price: '$899',
            dueDate: '-',
        },
    ],
};

export default function PlanScreen() {
    const [selectedTab, setSelectedTab] = useState('On Progress');

    const currentPlans = MOCK_DATA[selectedTab] || [];

    return (
        <SafeAreaView style={s.safe}>
            <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={s.header}>
                    <Text style={s.heading}>My Plans</Text>
                    <TouchableOpacity style={s.bellBtn} onPress={() => router.push('/notifications')}>
                        <Ionicons name="notifications-outline" size={20} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* Summary Card */}
                <SummaryCard
                    totalAmount="$2.573,0"
                    onProgress="$2418"
                    overdue="$155.00"
                    totalItems="4"
                />

                {/* Tab Selector */}
                <View style={s.tabSelector}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[s.tabItem, selectedTab === tab && s.tabItemActive]}
                            onPress={() => setSelectedTab(tab)}
                            activeOpacity={0.7}
                        >
                            <Text style={[s.tabText, selectedTab === tab && s.tabTextActive]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Plans List */}
                <View style={s.listContainer}>
                    {currentPlans.map((plan, i) => (
                        <PlanItemCard key={i} item={plan} status={selectedTab} />
                    ))}
                </View>

                <View style={{ height: 32 }} />
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
        gap: Spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.almostBlack,
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
    // Tab bar: white pill container
    tabSelector: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: Radius.md,
        padding: 4,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: Radius.sm,
        alignItems: 'center',
    },
    tabItemActive: {
        backgroundColor: '#1C1C1E',
    },
    tabText: {
        color: '#9CA3AF',
        fontWeight: '500',
        fontSize: 13,
    },
    tabTextActive: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    listContainer: {
        gap: 0,
    }
});
