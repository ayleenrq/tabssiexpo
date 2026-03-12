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

const PAYMENT_NOTIFS = [
    {
        id: 'p1',
        icon: 'checkmark',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Payment Successful',
        desc: 'Yoru payment of $155.00 for Eelectronics Store has been processed successfully.',
        time: '2 hours ago',
        unread: true,
    },
    {
        id: 'p2',
        icon: 'checkmark',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Payment Successful',
        desc: 'Yoru payment of $250 for Eelectronics Store has been processed successfully.',
        time: '2 hours ago',
        unread: true,
    },
    {
        id: 'p3',
        icon: 'checkmark',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Payment Successful',
        desc: 'Yoru payment of $250 for Eelectronics Store has been processed successfully.',
        time: '2 hours ago',
        unread: true,
    },
    {
        id: 'p4',
        icon: 'notifications-outline',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Upcoming Payment Reminder',
        desc: 'Your next payment of $300 is  due on Feb 15, 2025.',
        time: 'Yasterday',
        unread: false,
    },
];

const UPDATE_NOTIFS = [
    {
        id: 'u1',
        icon: 'help-circle-outline',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Security Update',
        desc: "We've added new security features to project your account.",
        time: '2 days ago',
        unread: false,
    },
    {
        id: 'u2',
        icon: 'pricetag-outline',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Special Offer Available',
        desc: 'Get 0% interest on purchases above $1000 for 6 months.',
        time: '2 days ago',
        unread: false,
    },
    {
        id: 'u3',
        icon: 'help-circle-outline',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Security Update',
        desc: "We've added new security features to project your account.",
        time: '3 days ago',
        unread: false,
    },
    {
        id: 'u4',
        icon: 'pricetag-outline',
        iconBg: '#EDE9FE',
        iconColor: '#7C3AED',
        title: 'Special Offer Available',
        desc: 'Get 0% interest on purchases above $1000 for 6 months.',
        time: '2 days ago',
        unread: false,
    },
];

const ALL_NOTIFS = [
    PAYMENT_NOTIFS[1],    // Payment Successful $250
    PAYMENT_NOTIFS[3],    // Upcoming Payment Reminder
    UPDATE_NOTIFS[1],     // Special Offer
    UPDATE_NOTIFS[0],     // Security Update
];

function NotifCard({ item }) {
    return (
        <View style={[s.card, !item.unread && s.cardRead]}>
            <View style={[s.iconCircle, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={18} color={item.iconColor} />
            </View>
            <View style={s.cardContent}>
                <View style={s.cardTitleRow}>
                    <Text style={s.cardTitle}>{item.title}</Text>
                    {item.unread && <View style={s.redDot} />}
                </View>
                <Text style={s.cardDesc}>{item.desc}</Text>
                <Text style={s.cardTime}>{item.time}</Text>
            </View>
        </View>
    );
}

const TABS = ['All', 'Payment', 'Update'];

export default function NotificationScreen() {
    const [activeTab, setActiveTab] = useState('All');

    const data = activeTab === 'All' ? ALL_NOTIFS
        : activeTab === 'Payment' ? PAYMENT_NOTIFS
        : UPDATE_NOTIFS;

    return (
        <SafeAreaView style={s.safe}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.iconBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={s.headerTitle}>Notification</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tab Bar */}
            <View style={s.tabBar}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[s.tabItem, activeTab === tab && s.tabItemActive]}
                        onPress={() => setActiveTab(tab)}
                        activeOpacity={0.7}
                    >
                        <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Notification List */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
                {data.map((item) => (
                    <NotifCard key={item.id} item={item} />
                ))}
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
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },

    // Tabs
    tabBar: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginHorizontal: Spacing.xl,
        borderRadius: Radius.md,
        padding: 4,
        marginBottom: Spacing.xl,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: Radius.sm,
        alignItems: 'center',
    },
    tabItemActive: {
        backgroundColor: '#7C3AED',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textGray,
    },
    tabTextActive: {
        color: Colors.white,
        fontWeight: 'bold',
    },

    scroll: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: 40,
    },

    // Notification card
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        alignItems: 'flex-start',
        gap: 12,
    },
    cardRead: {
        backgroundColor: '#F9FAFB',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    cardContent: { flex: 1 },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#111', flex: 1 },
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        marginLeft: 6,
        flexShrink: 0,
    },
    cardDesc: { fontSize: 12, color: Colors.textGray, lineHeight: 18, marginBottom: 4 },
    cardTime: { fontSize: 11, color: Colors.textGray },
});
