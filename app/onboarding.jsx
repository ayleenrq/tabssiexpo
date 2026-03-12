import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TabssiLogo from '../components/TabssiLogo';
import { Colors, Radius, Spacing } from '../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const pages = [
    {
        title: 'Shop Now, Pay Later',
        subtitle: 'Split your purchases into easy monthly\npayments with zero interest.',
    },
    {
        title: 'Instant Approvals',
        subtitle: 'Get approved within seconds—no\npaperwork, no waiting.',
    },
    {
        title: 'Safe & Secure Payments',
        subtitle: 'Your transactions are encrypted and\nprotected every step of the way.',
    },
];

function Page1Illustration() {
    return (
        <View style={ill.wrapper}>
            <View style={ill.blob} />
            <View style={ill.photo}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' }}
                    style={ill.photoImg}
                />
            </View>
            <View style={ill.floatCard}>
                <Ionicons name="laptop-outline" size={32} color="#333" />
                <Text style={ill.floatCardText}>Macbook Pro</Text>
            </View>
            <View style={ill.successPill}>
                <Text style={ill.successText}>Payment Success</Text>
                <Ionicons name="checkmark-circle" size={16} color={Colors.green} />
            </View>
            <View style={ill.walletBubble}>
                <Ionicons name="wallet" size={18} color={Colors.white} />
            </View>
        </View>
    );
}

function Page2Illustration() {
    return (
        <View style={ill.wrapper}>
            <View style={ill.mockPhone}>
                <View style={ill.dynamicIsland} />
                <Text style={ill.mockText}>Ali Muhajirin</Text>
                <View style={ill.mockSearch}><Text style={{ color: '#999', fontSize: 11 }}>Search</Text></View>
                <View style={ill.mockPromo}><Text style={{ fontWeight: 'bold', fontSize: 12 }}>Holiday Sale 2025</Text></View>
            </View>
            <View style={ill.approvalCard}>
                <Ionicons name="headset-outline" size={36} color="#333" style={{ marginRight: 12 }} />
                <View>
                    <Text style={ill.approvalTitle}>Apple Vision Pro</Text>
                    <Text>$3499</Text>
                    <View style={ill.approvedBadge}>
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>Approved </Text>
                        <Ionicons name="checkmark-circle-outline" size={12} color="#fff" />
                    </View>
                </View>
            </View>
        </View>
    );
}

function Page3Illustration() {
    const icons = [
        { name: 'key-outline', top: 40, right: 30 },
        { name: 'finger-print', bottom: 60, right: 30 },
        { name: 'lock-closed-outline', bottom: 40, left: 60 },
        { name: 'shield-checkmark-outline', top: 80, left: 30 },
    ];
    return (
        <View style={ill.wrapper}>
            {[300, 220, 140].map((s) => (
                <View key={s} style={[ill.ring, { width: s, height: s, borderRadius: s / 2 }]} />
            ))}
            <View style={ill.centerBubble}>
                <TabssiLogo color={Colors.white} size={40} />
            </View>
            {icons.map((ic) => (
                <View key={ic.name} style={[ill.floatIcon, { top: ic.top, bottom: ic.bottom, left: ic.left, right: ic.right }]}>
                    <Ionicons name={ic.name} size={18} color={Colors.primary} />
                </View>
            ))}
        </View>
    );
}

const illustrations = [<Page1Illustration />, <Page2Illustration />, <Page3Illustration />];

export default function OnboardingScreen() {
    const scrollRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);

    const onNext = () => {
        if (currentPage < 2) {
            const next = currentPage + 1;
            scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
            setCurrentPage(next);
        } else {
            router.replace('/login');
        }
    };

    const onSkipOrRegister = () => {
        if (currentPage === 2) {
            router.replace('/register');
        } else {
            router.replace('/login');
        }
    };

    const onScroll = (e) => {
        const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentPage(page);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoRow}>
                <TabssiLogo color={Colors.primary} size={24} />
                <Text style={styles.logoText}>Tabssi</Text>
            </View>

            {/* Pages */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScroll}
                style={styles.pager}
            >
                {illustrations.map((el, i) => (
                    <View key={i} style={[styles.page, { width: SCREEN_WIDTH }]}>
                        {el}
                    </View>
                ))}
            </ScrollView>

            {/* Bottom */}
            <View style={styles.bottom}>
                {/* Dots */}
                <View style={styles.dots}>
                    {[0, 1, 2].map((i) => (
                        <View
                            key={i}
                            style={[styles.dot, currentPage === i && styles.dotActive]}
                        />
                    ))}
                </View>

                <Text style={styles.title}>{pages[currentPage].title}</Text>
                <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>

                <TouchableOpacity style={styles.primaryBtn} onPress={onNext}>
                    <Text style={styles.primaryBtnText}>
                        {currentPage === 2 ? 'Login' : 'Next'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineBtn} onPress={onSkipOrRegister}>
                    <Text style={styles.outlineBtnText}>
                        {currentPage === 2 ? 'Register' : 'Skip'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.xxl,
        gap: Spacing.sm,
    },
    logoText: { fontSize: 24, fontWeight: 'bold', letterSpacing: -0.5 },
    pager: { flex: 1 },
    page: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
    bottom: { paddingHorizontal: Spacing.xxl, paddingBottom: Spacing.lg },
    dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.xxxl },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },
    dotActive: { backgroundColor: Colors.primary },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', textAlign: 'center', marginBottom: 12 },
    subtitle: { fontSize: 14, color: Colors.textGray, textAlign: 'center', lineHeight: 21, marginBottom: Spacing.huge },
    primaryBtn: {
        backgroundColor: Colors.almostBlack,
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryBtnText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
    outlineBtn: {
        borderRadius: Radius.md,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginBottom: Spacing.lg,
    },
    outlineBtnText: { color: '#1A1A1A', fontSize: 16, fontWeight: 'bold' },
});

const ill = StyleSheet.create({
    wrapper: {
        width: 300,
        height: 320,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    blob: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#F3F4F6',
        position: 'absolute',
    },
    photo: {
        width: 200,
        height: 250,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#D1D5DB',
        position: 'absolute',
    },
    photoImg: { width: '100%', height: '100%' },
    floatCard: {
        position: 'absolute',
        left: -20,
        top: 40,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    floatCardText: { fontSize: 10, fontWeight: 'bold', marginTop: 4 },
    successPill: {
        position: 'absolute',
        left: -30,
        bottom: 30,
        backgroundColor: Colors.white,
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    successText: { fontWeight: 'bold', fontSize: 12 },
    walletBubble: {
        position: 'absolute',
        right: -10,
        bottom: 70,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.white,
    },
    mockPhone: {
        width: 220,
        height: 340,
        backgroundColor: '#222',
        borderRadius: 32,
        padding: 8,
        alignItems: 'center',
        gap: 8,
    },
    dynamicIsland: {
        width: 70,
        height: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 4,
    },
    mockText: { fontSize: 10, fontWeight: 'bold', color: Colors.white, alignSelf: 'flex-start', marginLeft: 12 },
    mockSearch: {
        width: '85%',
        height: 28,
        backgroundColor: '#F3F4F6',
        borderRadius: 14,
        paddingHorizontal: 12,
        justifyContent: 'center',
    },
    mockPromo: {
        width: '85%',
        height: 80,
        backgroundColor: 'rgba(124,58,237,0.2)',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    approvalCard: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 14,
        width: 240,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    approvalTitle: { fontWeight: 'bold', fontSize: 13 },
    approvedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.green,
        borderRadius: 16,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    ring: {
        position: 'absolute',
        borderWidth: 1.5,
        borderColor: 'rgba(124,58,237,0.1)',
    },
    centerBubble: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    floatIcon: {
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
});
